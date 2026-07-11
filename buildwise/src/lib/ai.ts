/**
 * AI integration seam.
 *
 * The MVP ships with a deterministic local engine (src/interview/engine.ts) so
 * it runs with zero configuration. This file is where a real LLM plugs in.
 *
 * To go live with Claude:
 *   1. Stand up a small server route (never call the API from the browser with
 *      a raw key) that proxies to the Anthropic Messages API with model
 *      "claude-opus-4-8" (or "claude-sonnet-5" for lower latency/cost).
 *   2. Give it two jobs:
 *        - vision: interpret uploaded floor plans / photos into a structured
 *          room + fixture inventory,
 *        - reasoning: run the interview and emit a ProjectPackage JSON that
 *          matches the shape in engine.ts.
 *   3. Set VITE_BUILDWISE_API_URL and flip USE_REMOTE below.
 *
 * The UI only depends on the return shapes, so nothing else has to change.
 */

import {
  type Answers,
  type ProjectPackage,
  type Question,
  generatePackage as localGenerate,
  nextQuestion as localNext,
} from '../interview/engine'

const USE_REMOTE = Boolean(import.meta.env.VITE_BUILDWISE_API_URL)

export async function askNextQuestion(answers: Answers): Promise<Question | null> {
  if (!USE_REMOTE) return localNext(answers)
  // const res = await fetch(`${import.meta.env.VITE_BUILDWISE_API_URL}/interview`, {...})
  // return res.json()
  return localNext(answers)
}

export async function buildPackage(answers: Answers): Promise<ProjectPackage> {
  if (!USE_REMOTE) return localGenerate(answers)
  // const res = await fetch(`${import.meta.env.VITE_BUILDWISE_API_URL}/package`, {...})
  // return res.json()
  return localGenerate(answers)
}
