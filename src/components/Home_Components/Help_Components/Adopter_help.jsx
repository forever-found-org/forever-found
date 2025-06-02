function Adopter_help()
{
    return(
            <div className="max-w-5xl mx-auto px-6">
                <h1 className="text-4xl font-serif font-extrabold text-gray-900 mb-8 pb-2 border-b-2 border-gray-300 bg-gray-100 px-4 py-2 rounded">Adopter Support</h1>

                <div className="space-y-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">1. Getting Started</h2>

                    <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">How to create an adopter account</h3>
                        <h4 className="text-xl font-serif font-semibold text-gray-600 mb-2 ml-2">To create an adopter account:</h4>
                        <ol className="list-decimal text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Navigate to the Login Page.</li>
                            <li>Select "Adopter" as your role from the dropdown or toggle option.</li>
                            <li>The corresponding Adopter Signup Form will then be displayed.</li>
                            <li>Complete all required fields in the form and submit.</li>
                            <li>You will receive an email to verify your address and activate your account.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Required information</h3>
                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">When signing up as an adopter, please provide:</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Full Name</li>
                            <li>Email Address & Mobile Number</li>
                            <li>Aadhaar Number (for identity verification)</li>
                            <li>Upload Aadhaar Card Photo (size less than 2MB and format can be jpg,jpeg or png)</li>
                            <li>Occupation and Annual Income</li>
                            <li>Residential Address</li>
                            <li>Date of Birth</li>
                            <li>Religion</li>
                            <li>Marital Status</li>
                        </ul>
                        <p className="mt-2 ml-4 text-lg text-gray-600">
                        This information helps NGOs and agencies evaluate eligibility in accordance with government guidelines.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Role selection</h3>
                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">Role selection occurs on the login screen before showing the signup form:</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Choose either "Adopter" or "NGO".</li>
                            <li>The appropriate signup/login form will then be displayed based on your selection.</li>
                            <li>This streamlines the experience by showing only relevant fields and dashboard features.</li>
                        </ul>
                    </div>
                    </div>



                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">2. Post-registration</h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Account Verification and Initial Landing</h3>
                            <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">Email Verification</h4>
                            <p className="text-gray-700 font-medium ml-3 mb-2">After signing up successfully:</p>
                            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                                <li>A verification email will be sent to your registered email address.</li>
                                <li>Click the link in the email to verify your account.</li>
                                <li>Only verified accounts can access the platform features.</li>
                            </ul>

                            <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mt-6 mb-2">Adopter Home Page</h4>
                            <p className="text-gray-700 font-serif font-medium ml-3 mb-2">Once verified:</p>
                            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                                <li>You will be redirected to the Adopter Home Page.</li>
                                <li>Here, you can view a list of registered NGOs involved in child adoption.</li>
                            </ul>
                        </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">NGO Interaction and Child Matching</h3>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">Viewing NGOs</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Click any NGO to view detailed information about them.</li>
                            <li>NGO details include all necessary information for adoption consideration.</li>
                        </ul>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mt-6 mb-2">Age & Gender Preference Selection</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Below the NGO details, select your preferred child age group and gender.</li>
                            <li>Click "Next" to see a list of children matching your preferences.</li>
                        </ul>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mt-6 mb-2">Matched Children Display</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>A list of matched children from the NGO will be shown based on your preferences.</li>
                            <li>Each child's card shows basic details like name, age, gender, and a brief background.</li>
                            <li>Click “Request Meet” if you wish to arrange a meeting.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Meeting Request Flow</h3>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">Adopter Meeting History Page</h4>
                        <p className="text-gray-700 font-medium ml-3 mb-2">After you request a meeting:</p>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>You will be redirected to the Adopter Meeting History Page.</li>
                            <li>This page tracks all your meeting requests with status tags:</li>
                            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                                <li><b>Pending -</b> Request sent and awaiting NGO response.</li>
                                <li><b>Accepted -</b> NGO approved your meeting and proposed a time slot.</li>
                                <li><b>Rejected -</b> NGO declined the meeting request.</li>
                            </ul>
                        </ul>
                        <p className="text-gray-700 font-medium ml-3 mt-2">
                        You can also access this page anytime via the "Request History" button in your dashboard.
                        </p>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mt-6 mb-2">Selecting Time Slot</h4>
                        <p className="text-gray-700 font-medium ml-3 mb-2">If your request is accepted:</p>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>A time slot proposed by the NGO will be displayed.</li>
                            <li>You may:</li>
                            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                                <li>Click <b>"Fix Meet"</b> to confirm the meeting (status changes to Fixed).</li>
                                <li>Or click <b>"Decline"</b> to cancel (status changes to Cancelled).</li>
                            </ul>
                        </ul>
                        <p className="text-gray-700 font-medium mt-2 ml-3">
                        This ensures clear communication and transparency in the adoption process.
                        </p>    
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Adoption History Tracking</h3>

                        <h4 className="text-xl font-serif font-semibold text-gray-600 ml-2 mb-2">Adoption History Page</h4>

                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Accessible via the dashboard menu as <b>“Adoption History”</b>.</li>
                            <li>Displays records of all successful adoptions.</li>
                            <li>Details for each adoption can be viewed for reference and verification.</li>
                        </ul>
                        <p className="text-gray-700 font-medium ml-3 mt-2">
                        This section serves as an official record of your adoption history.
                        </p>  
                    </div>
                </div>



                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">3. Common FAQs</h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">Can I update my profile?</h3>
                        <p className="italic text-gray-600 font-medium mb-2 ml-3">This feature is currently under consideration and not yet implemented.</p>
                        <p className="text-gray-700 font-medium ml-3 mb-2">
                        Future updates may allow adopters to edit certain profile details such as contact information, while restricting changes to critical data (e.g., Aadhaar number, income) to maintain security and verification integrity.
                        </p>
                        <p className="text-gray-700 font-medium ml-3">Stay tuned for updates regarding this functionality.</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">What happens after my interest is accepted?</h3>

                        <h4 className="text-lg font-serif font-semibold text-gray-600 ml-2 mb-2">Once the NGO accepts your interest in a child:</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>The NGO will review your background.</li>
                            <li>They may propose multiple time slots for meetings.</li>
                            <li>You can choose to:</li>
                            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                                <li>Confirm a meeting (status updates to Fixed).</li>
                                <li>Or decline the meeting (status updates to Cancelled).</li>
                            </ul>
                            <li>If the meeting goes well, you will proceed with formal adoption processes including counseling, home visits, and legal procedures.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">How do I contact the NGO?</h3>

                        <h4 className="text-lg font-serif font-semibold text-gray-600 ml-2 mb-2">You can reach out to the NGO via:</h4>
                        <ul className="list-disc text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
                            <li>Contact information provided on the NGO details page (phone, email, address).</li>
                            <li>Communication options available on the Meeting History page depending on your meeting status.</li>
                        </ul>
                    </div>
                </div>

                </div>
            </div>
    );
}

export default Adopter_help