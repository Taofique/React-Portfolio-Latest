import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Contact from "./components/sections/Contact";
import AboutMe from "./components/sections/AboutMe";
import Portfolio from "./components/sections/Portfolio";
import Services from "./components/sections/Services";

function App() {
  return (
    <>
      <Navbar />

      {/* pt-[57px] offsets content below the fixed navbar, per your spec */}
      <main className="pt-[57px]">
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <AboutMe />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
