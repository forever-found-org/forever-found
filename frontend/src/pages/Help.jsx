import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Adopter_help from "../components/Home_Components/Help_Components/Adopter_help";
import NGOs_help from "../components/Home_Components/Help_Components/NGOs_help";
import General_help from "../components/Home_Components/Help_Components/General_help";
import Troubleshooting from "../components/Home_Components/Help_Components/Troubleshooting";
import Contact from "../components/Home_Components/Help_Components/Contact";

function Help() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-serif">
        <header className="flex flex-wrap items-center justify-around bg-slate-700 text-white shadow-md py-3 px-6 sticky top-0 z-50">
          <img src={logo} alt="logo" className="h-20 p-2 -ml-10" />
          <a href="#adopters" className="hover:text-yellow-300 border border-white rounded-lg p-3 font-serif transition-colors duration-300 font-semibold">
            Adopter Help</a>
          <a href="#ngos" className="hover:text-yellow-300 border border-white rounded-lg p-3 font-serif transition-colors duration-300 font-semibold">
            Ngo Help</a>
          <a href="#general" className="hover:text-yellow-300 border border-white rounded-lg p-3 font-serif transition-colors duration-300 font-semibold">
            General</a>
          <a href="#troubleshooting" className="hover:text-yellow-300 border border-white rounded-lg p-3 font-serif transition-colors duration-300 font-semibold">Troubleshooting</a>
          <a href="#contact" className="hover:text-yellow-300 border border-white rounded-lg p-3 font-serif transition-colors duration-300 font-semibold">
            Contact</a>
          <button onClick={handleHome}className="bg-yellow-400 border border-white rounded-lg p-3 font-serif text-slate-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors duration-300">Home</button>
        </header>

        <main className="flex-grow bg-[#F9F4F1] pb-10">
          <div className="p-6 max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-800">Welcome to the Help Center</h1>
            <p className="text-xl font-semibold text-slate-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              This Help Center is designed to guide adopters, NGOs, and administrators
              through the features and workflows of our Child Adoption and Foster Care
              Support Platform. Select a section to find step-by-step guides, FAQs, and
              troubleshooting help.</p>
          </div>

          <section id="adopters" className="max-w-5xl mx-auto px-6 py-8 bg-white border border-[#E5E1DC] shadow-sm rounded-2xl mb-8"> 
            <Adopter_help />
          </section>

          <section id="ngos"className="max-w-5xl mx-auto px-6 py-8 bg-white border border-[#E5E1DC] shadow-sm rounded-2xl mb-8">
            <NGOs_help />
          </section>

          <section id="general" className="max-w-5xl mx-auto px-6 py-8 bg-white border border-[#E5E1DC] shadow-sm rounded-2xl mb-8">
            <General_help />
          </section>

          <section id="troubleshooting" className="max-w-5xl mx-auto px-6 py-8 bg-white border border-[#E5E1DC] shadow-sm rounded-2xl mb-8">
            <Troubleshooting />
          </section>

          <section id="contact" className="max-w-5xl mx-auto px-6 py-8 bg-white border border-[#E5E1DC] shadow-sm rounded-2xl">
            <Contact />
          </section>
        </main>

        <footer className="bg-slate-700 text-white text-center py-4">
          <p className="max-w-3xl mx-auto px-4 text-sm">
            All user interactions are secure. Data submitted is used solely for child
            welfare and platform functioning.
          </p>
        </footer>
      </div>
    </>
  );
}

export default Help;
