/**
 * Local project store. Persists generated projects to localStorage so a
 * homeowner can leave and come back to their construction packages.
 *
 * When the real backend is live this is the natural place to sync to a
 * server-side projects table instead of (or in addition to) localStorage.
 */

import type { Answers, ProjectPackage } from '../interview/engine'
import type { PlanEdits } from './drawing'

export interface SavedProject {
  id: string
  createdAt: number
  title: string
  attachments: string[]
  answers: Answers
  pkg: ProjectPackage
  /** User edits made in the sheet editor (device moves, circuits, removals). */
  edits?: PlanEdits
}

const KEY = 'buildwise.projects.v1'

function read(): SavedProject[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SavedProject[]) : []
  } catch {
    return []
  }
}

function write(list: SavedProject[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* storage full / unavailable — non-fatal for the demo */
  }
}

export function listProjects(): SavedProject[] {
  return read().sort((a, b) => b.createdAt - a.createdAt)
}

export function saveProject(p: Omit<SavedProject, 'id' | 'createdAt'>): SavedProject {
  const project: SavedProject = { ...p, id: cryptoId(), createdAt: Date.now() }
  write([project, ...read()])
  return project
}

export function updateProjectEdits(id: string, edits: PlanEdits) {
  write(read().map((p) => (p.id === id ? { ...p, edits } : p)))
}

export function removeProject(id: string) {
  write(read().filter((p) => p.id !== id))
}

export function clearProjects() {
  write([])
}

function cryptoId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'p_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}
