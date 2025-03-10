import About from "./LandingPage/About/About"
import Contact from "./LandingPage/ContactUs/Contact"
import Features from "./LandingPage/Features/Features"
import Footer from "./LandingPage/Footer/Footer"
import Hero from "./LandingPage/Hero/Hero"
import Join from "./LandingPage/Join/Join"
const LandingPage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <Join />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
