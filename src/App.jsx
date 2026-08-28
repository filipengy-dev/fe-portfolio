import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
