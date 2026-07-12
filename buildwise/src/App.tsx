import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import InterviewStudio from './components/InterviewStudio'
import Disciplines from './components/Disciplines'
import DigitalTwin from './components/DigitalTwin'
import Marketplace from './components/Marketplace'
import Pricing from './components/Pricing'
import Roadmap from './components/Roadmap'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'
import { useReveal } from './lib/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <a href="#studio" className="skip-link">
        Skip to the project studio
      </a>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <InterviewStudio />
        <Disciplines />
        <DigitalTwin />
        <Marketplace />
        <Pricing />
        <Roadmap />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
