/**
 * AI integration seam.
 *
 * The MVP ships with a deterministic local engine (src/interview/engine.ts) so
 * it runs with zero configuration. When VITE_BUILDWISE_API_URL is set, these
 * functions call the real Claude-backed API (see ../../server) and gracefully
 * fall back to the local engine if the network or model call fails — so the UI
 * never breaks.
 */

import {
  type Answers,
  type ProjectPackage,
  type Question,
  generatePackage as localGenerate,
  nextQuestion as localNext,
} from '../interview/engine'

const API = import.meta.env.VITE_BUILDWISE_API_URL
const USE_REMOTE = Boolean(API)

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export async function askNextQuestion(answers: Answers): Promise<Question | null> {
  if (!USE_REMOTE) return localNext(answers)
  try {
    const { question } = await post<{ question: Question | null }>('/api/interview', { answers })
    return question
  } catch (err) {
    console.warn('Remote interview failed, using local engine:', err)
    return localNext(answers)
  }
}

export async function buildPackage(answers: Answers): Promise<ProjectPackage> {
  if (!USE_REMOTE) return localGenerate(answers)
  try {
    const { package: pkg } = await post<{ package: ProjectPackage }>('/api/package', { answers })
    return pkg
  } catch (err) {
    console.warn('Remote package generation failed, using local engine:', err)
    return localGenerate(answers)
  }
}

export interface VisionResult {
  spaceType?: string
  approxSqft?: number | null
  rooms?: string[]
  fixtures?: string[]
  notes?: string
  missing?: string[]
}

/** Interpret uploaded images. Returns null when no backend is configured. */
export async function analyzeUploads(images: { name: string; dataUrl: string }[]): Promise<VisionResult | null> {
  if (!USE_REMOTE || images.length === 0) return null
  try {
    const { result } = await post<{ result: VisionResult }>('/api/vision', { images })
    return result
  } catch (err) {
    console.warn('Remote vision failed:', err)
    return null
  }
}
