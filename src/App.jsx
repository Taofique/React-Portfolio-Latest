import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Contact from "./components/sections/Contact";
import AboutMe from "./components/sections/AboutMe";
import Portfolio from "./components/sections/Portfolio";
import Expertise from "./components/sections/Expertise";

// Blog Pages
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";
import AdminLogin from "./pages/AdminLogin";

function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <AboutMe />
      <Portfolio />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-brand-dark">
          <Navbar />

          {/* pt-[57px] offsets content below the fixed navbar */}
          <main className="pt-[57px] flex-1">
            <Routes>
              {/* Home page - all sections */}
              <Route path="/" element={<HomePage />} />

              {/* Blog routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog/create" element={<BlogCreate />} />
              <Route path="/blog/edit/:id" element={<BlogEdit />} />
              <Route path="/blog/login" element={<AdminLogin />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
