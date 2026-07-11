/**
 * BuildWise AI — API server.
 *
 * A thin, keyless-safe proxy in front of Claude. The browser never sees the
 * Anthropic key; it only talks to these endpoints. Start with:
 *
 *   cd server && npm install && ANTHROPIC_API_KEY=sk-... npm run dev
 *
 * Then point the frontend at it via VITE_BUILDWISE_API_URL (see ../.env.example).
 */

import express from 'express'
import cors from 'cors'
import { interview, generate, vision } from './claude.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '25mb' })) // room for base64 images

const hasKey = Boolean(process.env.ANTHROPIC_API_KEY)

app.get('/health', (_req, res) => res.json({ ok: true, model: process.env.BUILDWISE_MODEL || 'claude-opus-4-8', keyConfigured: hasKey }))

function guard(res) {
  if (!hasKey) {
    res.status(503).json({ error: 'ANTHROPIC_API_KEY not set on the server.' })
    return false
  }
  return true
}

app.post('/api/interview', async (req, res) => {
  if (!guard(res)) return
  try {
    const question = await interview(req.body?.answers ?? {})
    res.json({ question })
  } catch (err) {
    console.error('interview error:', err)
    res.status(502).json({ error: String(err.message || err) })
  }
})

app.post('/api/package', async (req, res) => {
  if (!guard(res)) return
  try {
    const pkg = await generate(req.body?.answers ?? {})
    res.json({ package: pkg })
  } catch (err) {
    console.error('package error:', err)
    res.status(502).json({ error: String(err.message || err) })
  }
})

app.post('/api/vision', async (req, res) => {
  if (!guard(res)) return
  try {
    const result = await vision(req.body?.images ?? [])
    res.json({ result })
  } catch (err) {
    console.error('vision error:', err)
    res.status(502).json({ error: String(err.message || err) })
  }
})

const port = process.env.PORT || 8787
app.listen(port, () => {
  console.log(`BuildWise API on :${port} — key ${hasKey ? 'configured' : 'MISSING (set ANTHROPIC_API_KEY)'}`)
})
