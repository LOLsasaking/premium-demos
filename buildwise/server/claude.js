/**
 * Claude integration for BuildWise AI.
 *
 * Three jobs:
 *   1. interview()  — decide the next best question given answers so far,
 *   2. generate()   — turn answers into a full ProjectPackage,
 *   3. vision()     — interpret uploaded floor plans / photos.
 *
 * The output shapes match src/interview/engine.ts so the same React UI drives
 * either the local rules engine or this live backend.
 */

import Anthropic from '@anthropic-ai/sdk'

const MODEL = process.env.BUILDWISE_MODEL || 'claude-opus-4-8'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

/** Extract the first well-formed JSON object/array from a text response. */
function parseJSON(text) {
  const start = text.search(/[[{]/)
  if (start === -1) throw new Error('No JSON found in model response')
  // Walk to the matching closing brace/bracket.
  const open = text[start]
  const close = open === '{' ? '}' : ']'
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inStr) {
      if (esc) esc = false
      else if (ch === '\\') esc = true
      else if (ch === '"') inStr = false
    } else if (ch === '"') inStr = true
    else if (ch === open) depth++
    else if (ch === close) {
      depth--
      if (depth === 0) return JSON.parse(text.slice(start, i + 1))
    }
  }
  throw new Error('Unbalanced JSON in model response')
}

async function ask({ system, user, images = [], maxTokens = 2000 }) {
  const content = [{ type: 'text', text: user }]
  for (const img of images) {
    const m = /^data:(image\/[a-z]+);base64,(.*)$/i.exec(img.dataUrl || '')
    if (!m) continue
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: m[1], data: m[2] },
    })
  }
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content }],
  })
  const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('')
  return parseJSON(text)
}

const DISCIPLINE_IDS = [
  'electrical',
  'plumbing',
  'hvac',
  'structural',
  'interior',
  'exterior',
  'solar',
  'smart',
]

export async function interview(answers) {
  const system = `You are a master residential contractor conducting an intake interview.
Ask ONE question at a time. Keep it to at most 10 questions total, then stop.
Cover: project type, construction (wood/concrete), affected area, gas availability,
budget, how long they'll stay, EV ownership, smart-home interest, solar, and region.
Return ONLY JSON. When you still need info, return:
{"id":"<slug>","prompt":"<question>","choices":[{"label":"...","value":"...","hint":"..."}]}
When you have enough, return exactly: {"done":true}`
  const user = `Answers so far (JSON): ${JSON.stringify(answers)}`
  const out = await ask({ system, user, maxTokens: 700 })
  return out.done ? null : out
}

export async function generate(answers) {
  const system = `You are BuildWise AI, an AI architect and engineer for residential construction.
Given the homeowner's answers, produce a coordinated construction package as JSON that EXACTLY
matches this TypeScript type:

interface ProjectPackage {
  headline: string;
  summary: string;
  disciplines: (${DISCIPLINE_IDS.map((d) => `"${d}"`).join(' | ')})[];
  deliverables: { discipline: string; title: string; items: string[]; needsReview: boolean }[];
  materials: { category: string; item: string; qty: string }[];
  costLow: number; costHigh: number;   // USD
  timelineWeeks: [number, number];
  permitNote: string;
  highlights: string[];
}

Rules: choose only disciplines relevant to the project. Quantities must be realistic for the
stated area. Mark structural (and long-term solar) deliverables needsReview:true. Costs should
reflect the region and budget band. Return ONLY the JSON object.`
  const user = `Answers (JSON): ${JSON.stringify(answers)}`
  return ask({ system, user, maxTokens: 2600 })
}

export async function vision(images) {
  const system = `You are a construction vision system. Interpret the uploaded floor plans/photos
and extract the geometry needed to draft an electrical plan.
Return ONLY JSON:
{
  "spaceType": "...",
  "approxSqft": <number|null>,
  "approxWidthFt": <number|null>,
  "approxHeightFt": <number|null>,
  "rooms": ["..."],
  "fixtures": ["sink","range","refrigerator",...],
  "doors": [{"wall":"N|S|E|W","posFt":<number>,"widthFt":<number>}],
  "windows": [{"wall":"N|S|E|W","posFt":<number>,"widthFt":<number>}],
  "counters": [{"xFt":<number>,"yFt":<number>,"wFt":<number>,"hFt":<number>}],
  "notes": "...",
  "missing": ["<what to ask the user>"]
}
Estimate dimensions from door widths (~3 ft) and fixture sizes when no scale is given.
Use null/[] for anything you cannot determine — never invent precision.`
  const user = `Interpret these ${images.length} image(s) of a home.`
  return ask({ system, user, images, maxTokens: 1400 })
}
