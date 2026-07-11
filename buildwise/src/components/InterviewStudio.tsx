import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import PackageResult from './PackageResult'
import SavedProjects from './SavedProjects'
import { askNextQuestion, buildPackage } from '../lib/ai'
import { listProjects, removeProject, saveProject, type SavedProject } from '../lib/store'
import {
  type Answers,
  type Question,
  type ProjectPackage,
  answeredCount,
  matchChoice,
  totalQuestions,
} from '../interview/engine'

interface Msg {
  role: 'ai' | 'user'
  text: string
}

const SAMPLE_FILES = ['kitchen-floorplan.pdf', 'back-of-house.jpg', 'zillow-listing.png']

export default function InterviewStudio() {
  const [started, setStarted] = useState(false)
  const [attached, setAttached] = useState<string[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [messages, setMessages] = useState<Msg[]>([])
  const [question, setQuestion] = useState<Question | null>(null)
  const [thinking, setThinking] = useState(false)
  const [pkg, setPkg] = useState<ProjectPackage | null>(null)
  const [draft, setDraft] = useState('')
  const [projects, setProjects] = useState<SavedProject[]>([])
  const scroller = useRef<HTMLDivElement>(null)
  const savedRef = useRef(false)

  useEffect(() => setProjects(listProjects()), [])

  const progress = useMemo(() => {
    const total = totalQuestions(answers)
    return { done: answeredCount(answers), total }
  }, [answers])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking, pkg])

  async function advance(next: Answers) {
    setThinking(true)
    const q = await askNextQuestion(next)
    await wait(650) // human-feeling pause
    if (q) {
      setMessages((m) => [...m, { role: 'ai', text: q.prompt }])
      setQuestion(q)
      setThinking(false)
    } else {
      setMessages((m) => [
        ...m,
        { role: 'ai', text: 'Perfect — I have what I need. Generating your construction package…' },
      ])
      setQuestion(null)
      await wait(1100)
      const result = await buildPackage(next)
      setPkg(result)
      setThinking(false)
      persist(next, result)
    }
  }

  function persist(finalAnswers: Answers, result: ProjectPackage) {
    if (savedRef.current) return
    savedRef.current = true
    saveProject({ title: result.headline, attachments: attached, answers: finalAnswers, pkg: result })
    setProjects(listProjects())
  }

  async function begin() {
    setStarted(true)
    await advance({})
  }

  function commit(q: Question, value: string, userText: string) {
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    setMessages((m) => [...m, { role: 'user', text: userText }])
    setQuestion(null)
    setDraft('')
    void advance(next)
  }

  function submitTyped(e: React.FormEvent) {
    e.preventDefault()
    if (!question || !draft.trim()) return
    const c = matchChoice(question, draft)
    if (c) {
      commit(question, c.value, draft.trim())
    } else {
      // Couldn't map it — keep the question and gently ask again.
      const q = question
      setMessages((m) => [
        ...m,
        { role: 'user', text: draft.trim() },
        { role: 'ai', text: "I want to get this right — could you pick one of the options below?" },
      ])
      setDraft('')
      setQuestion(q)
    }
  }

  function openSaved(p: SavedProject) {
    savedRef.current = true
    setStarted(true)
    setAttached(p.attachments)
    setAnswers(p.answers)
    setPkg(p.pkg)
    setQuestion(null)
    setThinking(false)
    setMessages([{ role: 'ai', text: `Reopened your saved ${p.pkg.headline.toLowerCase()}.` }])
  }

  function reset() {
    savedRef.current = false
    setStarted(false)
    setAttached([])
    setAnswers({})
    setMessages([])
    setQuestion(null)
    setThinking(false)
    setPkg(null)
    setDraft('')
    setProjects(listProjects())
  }

  return (
    <section id="studio" className="scroll-mt-24 py-24 md:py-28">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Live demo</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Talk to the AI. Watch a plan appear.
          </h2>
          <p className="mt-4 text-muted">
            This runs entirely in your browser on a construction rules engine — no sign-up, no keys.
            It’s a preview of the real interview.
          </p>
        </div>

        <div className="reveal mx-auto mt-12 max-w-3xl">
          <div className="card overflow-hidden shadow-soft">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-panel2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-xs text-muted">buildwise · project studio</span>
              {started && (
                <button
                  onClick={reset}
                  className="ml-auto flex items-center gap-1.5 text-xs text-muted transition hover:text-mist"
                >
                  <Icon path="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" size={14} /> Restart
                </button>
              )}
            </div>

            {!started ? (
              <UploadPanel
                attached={attached}
                projects={projects}
                onOpen={openSaved}
                onDelete={(id) => {
                  removeProject(id)
                  setProjects(listProjects())
                }}
                onAttach={(f) => setAttached((a) => Array.from(new Set([...a, ...f])))}
                onBegin={begin}
              />
            ) : (
              <>
                {/* Progress */}
                {!pkg && (
                  <div className="border-b border-line px-5 py-3">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Interview</span>
                      <span>
                        {progress.done}/{progress.total}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel2">
                      <div
                        className="h-full rounded-full bg-blueprint transition-all duration-500"
                        style={{ width: `${(progress.done / Math.max(1, progress.total)) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Chat */}
                <div ref={scroller} className="thin-scroll max-h-[460px] space-y-4 overflow-y-auto px-5 py-6">
                  {attached.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attached.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel2 px-2.5 py-1 font-mono text-xs text-muted"
                        >
                          <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6" size={12} />
                          {f}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-blueprint/30 bg-blueprint/10 px-2.5 py-1 text-xs text-blueprint">
                        <Icon path="M20 6 9 17l-5-5" size={12} /> Vision AI read your uploads
                      </span>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <Bubble key={i} msg={m} />
                  ))}

                  {thinking && <Typing />}

                  {pkg && <PackageResult pkg={pkg} answers={answers} onRestart={reset} />}
                </div>

                {/* Answer chips + free text */}
                {question && !thinking && (
                  <div className="border-t border-line bg-panel2 px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {question.choices.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => commit(question, c.value, c.label)}
                          className="group rounded-xl border border-line bg-panel px-4 py-2.5 text-left text-sm transition hover:border-blueprint hover:bg-blueprint/10"
                          title={c.hint}
                        >
                          <span className="font-500 text-mist">{c.label}</span>
                          {c.hint && (
                            <span className="ml-2 hidden text-xs text-muted group-hover:inline">{c.hint}</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <form onSubmit={submitTyped} className="mt-3 flex items-center gap-2">
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="…or type your answer"
                        className="flex-1 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm outline-none transition focus:border-blueprint"
                      />
                      <button
                        type="submit"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blueprint text-white transition hover:bg-blue-600 disabled:opacity-40"
                        disabled={!draft.trim()}
                        aria-label="Send"
                      >
                        <Icon path="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" size={16} />
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Estimates are illustrative. Final plans are reviewed by licensed professionals before permitting.
          </p>
        </div>
      </div>
    </section>
  )
}

function UploadPanel({
  attached,
  projects,
  onOpen,
  onDelete,
  onAttach,
  onBegin,
}: {
  attached: string[]
  projects: SavedProject[]
  onOpen: (p: SavedProject) => void
  onDelete: (id: string) => void
  onAttach: (files: string[]) => void
  onBegin: () => void
}) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className="p-8 md:p-10">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const names = Array.from(e.dataTransfer.files).map((f) => f.name)
          if (names.length) onAttach(names)
        }}
        onClick={() => input.current?.click()}
        className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-line bg-panel2/50 px-6 py-12 text-center transition hover:border-blueprint"
      >
        <input
          ref={input}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            const names = Array.from(e.target.files ?? []).map((f) => f.name)
            if (names.length) onAttach(names)
          }}
        />
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blueprint/15 text-blueprint">
          <Icon path="M12 16V4m0 0 4 4m-4-4L8 8|M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" size={26} />
        </span>
        <p className="mt-4 font-500 text-mist">Drop a floor plan, photo or PDF</p>
        <p className="mt-1 text-sm text-muted">or click to browse — nothing is uploaded in this demo</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">Or try a sample:</span>
        {SAMPLE_FILES.map((f) => (
          <button
            key={f}
            onClick={() => onAttach([f])}
            className="rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-xs text-muted transition hover:border-blueprint hover:text-mist"
          >
            {f}
          </button>
        ))}
      </div>

      {attached.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {attached.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blueprint/30 bg-blueprint/10 px-2.5 py-1 font-mono text-xs text-blueprint"
            >
              <Icon path="M20 6 9 17l-5-5" size={12} /> {f}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={onBegin} className="btn-build flex-1 py-4 text-base">
          {attached.length ? 'Continue to interview' : 'Skip — just interview me'}
          <Icon path="M5 12h14M12 5l7 7-7 7" size={18} />
        </button>
      </div>

      {projects.length > 0 && <SavedProjects projects={projects} onOpen={onOpen} onDelete={onDelete} />}
    </div>
  )
}

function Bubble({ msg }: { msg: Msg }) {
  const ai = msg.role === 'ai'
  return (
    <div className={`flex ${ai ? 'justify-start' : 'justify-end'}`}>
      {ai && (
        <span className="mr-2 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-blueprint/15 text-blueprint">
          <Icon path="M8 30 20 9l12 21|M14 30v-8h12v8" size={16} strokeWidth={2} />
        </span>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          ai ? 'rounded-tl-sm bg-panel2 text-mist' : 'rounded-tr-sm bg-blueprint text-white'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-blueprint/15 text-blueprint">
        <Icon path="M8 30 20 9l12 21|M14 30v-8h12v8" size={16} strokeWidth={2} />
      </span>
      <span className="flex gap-1 rounded-2xl rounded-tl-sm bg-panel2 px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-blink rounded-full bg-muted"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </span>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
