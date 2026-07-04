import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />

      {/* pt-[57px] offsets content below the fixed navbar, per your spec */}
      <main className="pt-[57px]">
        <section id="home">{/* Hero goes here */}</section>
        <section id="services">{/* Services */}</section>
        <section id="about">{/* About Me */}</section>
        <section id="portfolio">{/* Portfolio */}</section>
        <section id="contact">{/* Contact */}</section>
      </main>

      <Footer />
    </>
  );
}

export default App;
