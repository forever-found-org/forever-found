import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"
function About() 
{
    const navigate=useNavigate();
    const handleHome=()=>{
        navigate("/");
    }
    const onBegin=()=>{
        navigate("/", { state: { showLogin: true } });
        window.scrollTo(0,0);
    }

    return (
        <div className="min-h-screen bg-[#F9F4F1] py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-10">

                <div className="flex flex-wrap items-center justify-between bg-[#E7D4C6] rounded-xl h-24">
                    <img src={logo} alt="logo" className="h-20 ml-2" />
                    <h1 className="text-4xl font-serif font-bold text-gray-800">About Forever Found</h1>
                    <button className="bg-[#d4b6a8] text-black font-serif text-base font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-[#bb9a8a] hover:text-indigo-800 transition duration-200 mr-4" onClick={handleHome}>Home</button>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 text-lg">
                    <p className="text-gray-700 mb-4">
                        <b>Forever Found</b> is a purpose-driven platform created to build meaningful connections between children in need and loving families ready to provide them with a forever home. We partner with verified NGOs to bring transparency, trust, and structure to the child adoption and foster care process.
                    </p>
                    <p className="text-gray-700">
                        Whether you're an individual looking to adopt or an NGO supporting child welfare, Forever Found is your companion through every step of this life-changing journey.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
                    <h2 className="text-2xl font-serif font-bold text-gray-800">How It Works</h2>

                    <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-700">For Adopters:</h3>
                        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
                            <li>Sign up and explore verified NGOs listed on our platform.</li>
                            <li>Share your child preferences (age and gender).</li>
                            <li>View eligible children based on your criteria.</li>
                            <li>Express interest and receive time slots for meetings from the selected NGO.</li>
                            <li>Choose a convenient time to meet or cancel as needed — all from within the platform.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-700">For NGOs:</h3>
                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>List and manage eligible children securely.</li>
                            <li>Receive real-time notifications when an adopter expresses interest.</li>
                            <li>Send available time slots for meetings.</li>
                            <li>Oversee, review, and track adoption requests easily through your dashboard.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 space-y-2">
                    <h2 className="text-2xl font-serif font-bold text-gray-800">Our Vision</h2>
                    <p className="text-gray-700">We envision a future where every child finds a loving, secure, and permanent home—one that nurtures their emotional well-being, social growth, and physical health.</p>
                    <p className="text-gray-700">We recognize the vital role that NGOs and adopters play in making this vision a reality. Together, we strive to build strong partnerships that ensure children receive the care, protection, and opportunities they deserve.</p>
                    <p className="text-gray-700">For NGOs, we aim to empower and support your tireless efforts in safeguarding children's rights, facilitating smooth adoption processes, and providing ongoing care.</p>
                    <p className="text-gray-700">For adopters, we commit to guiding and assisting you on the journey to creating a nurturing family environment where children can thrive.</p>
                    <p className="text-gray-700">Through shared dedication and collaboration, we seek to create a compassionate community where every child can experience the security and love of a permanent home—giving them the foundation to grow confidently, build meaningful relationships, and lead fulfilling lives.</p>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 space-y-2">
                    <h2 className="text-2xl font-serif font-bold text-gray-800">Our Mission</h2>
                    <p className="text-gray-700">To create a seamless, trustworthy, and compassionate platform that supports families and child welfare organizations throughout every step of the adoption journey.</p>
                    <p className="text-gray-700">We strive to eliminate confusion and delays by providing clear information, ethical guidance, and reliable tools—making adoption more accessible and stress-free for everyone involved.</p>
                    <p className="text-gray-700">Our focus is to safeguard the best interests of children by ensuring their safety, dignity, and happiness remain at the core of all decisions.</p>
                    <p className="text-gray-700">By fostering a community built on transparency, respect, and shared commitment, we seek to transform adoption into a hopeful, positive experience that changes lives forever.</p>
                    <p className="text-gray-700 font-bold">Together, we can transform lives and build brighter futures—one family, one child at a time.</p>

                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Trust & Safety</h2>
                    <p className="text-gray-700">We understand the sensitivity of adoption. That's why Forever Found maintains strict privacy standards, encrypted communication, and only partners with verified NGOs. Every interaction is secure, and your data is protected at every stage.</p>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Who Can Use Forever Found?</h2>
                    <ul className="list-disc ml-6 text-gray-700 space-y-1">
                        <li>Individuals or couples seeking to adopt</li>
                        <li>NGOs working with children in need of care and adoption</li>
                        <li>Social workers and counselors facilitating adoption processes</li>
                    </ul>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Why Choose Forever Found?</h2>
                    <ul className="list-disc ml-6 text-gray-700 space-y-1">
                        <li>Verified NGO listings and child profiles</li>
                        <li>Filter by age and gender preferences</li>
                        <li>Meeting scheduling made seamless</li>
                        <li>End-to-end adoption process tracking</li>
                        <li>Ethical and secure system for both parties</li>
                        <li>Supportive community and resources for guidance</li>
                    </ul>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Get Involved</h2>
                    <p className="text-gray-700 mb-2">Whether you're ready to grow your family or you're an NGO aiming to find loving homes for children, Forever Found is here to help.</p>
                    <button><span className="text-blue-700 hover:text-indigo-700 hover:underline">Contact us </span><span className="text-gray-700 font-semibold"> today to learn how you can be part of the change.</span></button>    
                </div>
                <div className="flex justify-center">
                    <button onClick={onBegin} className="bg-[#d4b6a8] text-gray-800 font-serif text-lg font-semibold px-6 py-2   rounded-xl shadow-md hover:bg-[#bb9a8a] hover:text-indigo-800 transition duration-300">
                    Begin Your Journey
                    </button>
                </div>

            </div>
        </div>
    );
}

export default About;
