import { About } from '../sections/About'
import { Differentials } from '../sections/Differentials'
import { FinalCta } from '../sections/FinalCta'
import { Hero } from '../sections/Hero'
import { Portfolio } from '../sections/Portfolio'
import { Problems } from '../sections/Problems'
import { Services } from '../sections/Services'
import { Tech } from '../sections/Tech'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Problems />
      <Differentials />
      <Portfolio />
      <Tech />
      <FinalCta />
    </>
  )
}
