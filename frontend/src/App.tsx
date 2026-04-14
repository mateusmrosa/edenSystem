import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Differentials } from './sections/Differentials'
import { FinalCta } from './sections/FinalCta'
import { Hero } from './sections/Hero'
import { Portfolio } from './sections/Portfolio'
import { Problems } from './sections/Problems'
import { Services } from './sections/Services'
import { Tech } from './sections/Tech'

export default function App() {
  return (
    <div className="min-h-screen bg-eden-950">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Problems />
        <Differentials />
        <Portfolio />
        <Tech />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
