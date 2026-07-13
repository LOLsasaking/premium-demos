import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import InterviewStudio from './components/InterviewStudio'
import Disciplines from './components/Disciplines'
import DigitalTwin from './components/DigitalTwin'
import Marketplace from './components/Marketplace'
import Pricing from './components/Pricing'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'
import CredibilityStrip from './components/CredibilityStrip'
import ProjectExample from './components/ProjectExample'
import TrustHandoff from './components/TrustHandoff'
import ExampleProjects from './components/ExampleProjects'
import Faq from './components/Faq'
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
        <CredibilityStrip />
        <ProjectExample />
        <HowItWorks />
        <Disciplines />
        <DigitalTwin />
        <TrustHandoff />
        <ExampleProjects />
        <InterviewStudio />
        <Marketplace />
        <Pricing />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
