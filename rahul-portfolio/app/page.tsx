import Hero from './components/Hero'
import Projects from './components/Projects'
import Blog from './components/Blog'
import About from './components/About'
import Contact from './components/Contact'
import Technical from './components/Technical'
import SEOSection from './components/SEOSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Technical />
      <SEOSection />
      <Blog />
      <About />
      <Contact />
    </>
  )
}
