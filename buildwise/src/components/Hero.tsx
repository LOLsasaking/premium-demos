import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { assetUrl } from '../lib/brand'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [failed, setFailed] = useState(false)
  const poster = assetUrl(import.meta.env.BASE_URL, 'cadvora-hero-poster.webp')
  const video = assetUrl(import.meta.env.BASE_URL, 'cadvora-hero.mp4')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause()
      setPlaying(false)
    }
  }, [])

  async function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      await video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <header id="product" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="hero-aura pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
        <div className="reveal">
          <span className="technical-pill"><span className="status-dot" /> AI-powered technical planning</span>
          <h1 className="mt-6 font-display text-5xl font-600 leading-[1.02] tracking-[-0.055em] text-white md:text-6xl xl:text-7xl">
            Turn project requirements into <span className="text-gradient">coordinated technical diagrams.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">
            Generate electrical, plumbing and construction drawings in 2D and 3D—ready to review,
            revise and share with qualified professionals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#studio" className="btn-blue px-7 py-3.5 text-sm">Generate a Diagram <Icon path="M5 12h14m-5-5 5 5-5 5" size={17} /></a>
            <a href="#example" className="btn-ghost px-7 py-3.5 text-sm"><Icon path="M5 3l14 9-14 9V3z" size={16} /> Watch 45-Second Demo</a>
          </div>
          <p className="mt-5 text-xs text-muted">No CAD experience required · Editable outputs · Professional review workflow</p>
        </div>

        <div className="reveal cad-window" aria-label="Cadvora product demonstration">
          <div className="cad-window-bar">
            <div className="flex items-center gap-1.5"><span /><span /><span /></div>
            <p>cadvora / coordinated-project.cdv</p>
            <span className="live-badge">LIVE MODEL</span>
          </div>
          <div className="relative aspect-video overflow-hidden bg-[#07101d]">
            {failed ? (
              <img src={poster} alt="Cadvora 3D coordinated building model" className="h-full w-full object-cover" />
            ) : (
              <video ref={videoRef} autoPlay muted loop playsInline poster={poster} onError={() => setFailed(true)} className="h-full w-full object-cover">
                <source src={video} type="video/mp4" />
              </video>
            )}
            {!failed && <button type="button" onClick={togglePlayback} className="video-control" aria-label={playing ? 'Pause product demo' : 'Play product demo'}>
              <Icon path={playing ? 'M8 5v14M16 5v14' : 'M7 4v16l13-8z'} size={16} /> {playing ? 'Pause' : 'Play'}
            </button>}
          </div>
          <div className="cad-status"><span>2D PLAN</span><span className="active">SYSTEMS COORDINATED</span><span>3D MODEL</span></div>
        </div>
      </div>
    </header>
  )
}
