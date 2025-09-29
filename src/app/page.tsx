import MyBanner from "./components/MyBanner/MyBanner";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <>
      <div className="">
        {/* Hero/Banner Section */}
        <MyBanner />
        
        {/* About Section */}
        <About />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Contact Section */}
        <Contact />
      </div>
    </>
  );
}
