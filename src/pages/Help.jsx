
import logo from "../images/logo.png"
function Help()
{
    
    return(<>
        <div className="flex flex-wrap items-center justify-around bg-slate-600">
            <img src={logo} alt="logo" className="h-20 p-2 -ml-10" />
            <a href="#adopters">Adopter Help</a>
            <a href="#ngos">Ngo Help</a>
            <a href="#general">General</a>
            <a href="#troubleshooting">Troubleshooting</a>
            <a href="#contact">Contact</a>
        </div>
        <div className="bg-[#F9F4F1] min-h-screen">
            <div>
                <h1 className="text-center">Welcome to the Help Center</h1>
                <p>This Help Center is designed to guide adopters, NGOs, and administrators through the features and workflows of our Child Adoption and Foster Care Support Platform. Select a section to find step-by-step guides, FAQs, and troubleshooting help.</p>
            </div>
            <section id="adopters">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-800">Getting Started</h2>

                    <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-700">How to create an adopter account</h3>
                        <h4 className="text-lg font-serif font-semibold text-gray-700">To create an adopter account:</h4>
                        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
                            <li>Go to the Login Page.</li>
                            <li>Select your role as "Adopter" from the dropdown or toggle option.</li>
                            <li>Based on your selection, the corresponding Adopter Signup Form will be displayed.</li>
                            <li>Fill in all required details and submit the form.</li>
                            <li>You will be asked to verify your email to activate your account.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-700">Required information</h3>
                        <h4 className="text-lg font-serif font-semibold text-gray-700">When signing up as an adopter, you'll need to provide:</h4>
                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>Full Name</li>
                            <li>Email Address & Mobile Number</li>
                            <li>Aadhaar Number (for identity verification)</li>
                            <li>Occupation and Annual Income</li>
                            <li>Residential Address</li>
                            <li>Date of Birth</li>
                            <li>Religion</li>
                            <li>Marital Status</li>
                        </ul>
                        <p>This information helps NGOs and agencies assess eligibility for adoption under government guidelines.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-700">Role selection</h3>
                        <h4 className="text-lg font-serif font-semibold text-gray-700">Role selection happens on the login screen, before the signup form is shown:</h4>
                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>You choose either "Adopter" or "NGO".</li>
                            <li>Based on your selection, the appropriate signup/login experience is presented.</li>
                            <li>This helps streamline the form and ensure you only see relevant fields and dashboard features.</li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
        </>
        
    );
}
export default Help