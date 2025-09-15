import logo from "../images/logo.png"
import { useNavigate } from "react-router-dom";
function AdoptiveGuidelines(){
    const navigate=useNavigate();
    const handleHome=()=>{
        navigate("/");
        window.scrollTo(0,0);
    }
    return(
        <div className="font-serif min-h-screen bg-[#F9F4F1] py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="flex flex-wrap items-center justify-between bg-[#E7D4C6] rounded-xl h-24">
                <img src={logo} alt="logo" className="h-20 ml-2"/>
                <h1 className="text-4xl font-bold">Adoptive Guidelines</h1>
                <button className="bg-[#d4b6a8] text-black text-base font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-[#bb9a8a] hover:text-indigo-800 transition duration-200 mr-4" onClick={handleHome}>Home</button>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 text-lg text-center">
                <p>The journey of adoption is beautiful but involves several important steps to ensure the best interests of the child. Once you’ve matched with an NGO through Forever Found, the actual adoption process is carried out in person by the NGO in coordination with CARA and other authorities. This page guides you through all the physical steps and required documents you'll need to complete the adoption.</p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center">Age Criteria for Prospective Adoptive Parents </h1>
                <p className="text-center text-base italic">(as per CARA guidelines)</p>
                <hr className="mt-5"/>
                <div className="mt-5 p-5 border border-gray-400 bg-blue-50 flex justify-between text-center">
                    <div className="flex flex-col items-center">
                        <ul>
                            <li><b>Age of the Child</b></li>
                            <li>0-4 years</li>
                            <li>4-8 years</li>
                            <li>8-18 years</li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <ul>
                            <li><b>Maximum Composite Age of Couple</b></li>
                            <li>90 years</li>
                            <li>100 years</li>
                            <li>110 years</li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <ul>
                            <li><b>Maximum Age of Single Parent</b></li>
                            <li>45 years</li>
                            <li>50 years</li>
                            <li>55 years</li>
                        </ul>
                    </div>
                    
                </div>
                <ul className="mt-8 text-red-500 italic text-lg list-inside">
                    <li>The minimum age difference between the child and either parent should be at least 25 years.</li>
                    <li>These are upper age limits — adoption may not be allowed if the adopter is older than this, depending on the child's age.</li>
                </ul>
            </div>
            <div className="text-lg bg-white shadow-lg rounded-2xl p-6">
                <h1 className="mt-5 text-3xl font-bold text-center">Marital Status & Family Structure Rules</h1>
                <hr className="mt-5"/>
                <h2 className="mt-5 text-2xl font-bold bg-gray-200 p-3"> Married Couples</h2>
                <ul className="list-disc list-inside mt-3" >
                    <li>Both partners must consent to the adoption.</li>
                    <li>The marriage should be stable and lasting (at least 2 years recommended).</li>
                    <li>The couple's combined age must fit within CARA’s limits depending on the child’s age.</li>
                    <li>Must be emotionally, physically, and financially capable of raising a child</li>
                </ul>
                <p>Example: A couple aged 45 and 43 (combined age 88) can adopt a child aged 0–4 years.</p>

                <hr className="mt-5"/>
                <h2 className="mt-5 text-2xl font-bold bg-gray-200 p-3 "> Single Women</h2>
                <ul className="list-disc list-inside mt-3" >
                    <li>Can adopt both boys and girls.</li>
                    <li>Must meet the required age limits:
                        <ul  className="list-disc list-inside ml-5">
                            <li>Up to 45 years: eligible to adopt a child aged 0–4.</li>
                            <li>Up to 50 years: for 4–8 years.</li>
                            <li>Up to 55 years: for 8–18 years.</li>
                        </ul>
                    </li>
                    <li>Should have a strong support system and stable income.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-5 text-2xl font-bold bg-gray-200 p-3 "> Single Men</h2>
                <ul className="list-disc list-inside mt-3" >
                    <li>Can only adopt male children.</li>
                    <li>Not allowed to adopt girls as per CARA regulations.</li>
                    <li>Must meet all other eligibility criteria like age, income, and emotional stability.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-5 text-2xl font-bold bg-gray-200 p-3">Divorced, Separated, or Widowed Individuals</h2>
                <ul className="list-disc list-inside mt-3" >
                    <li>Eligible to adopt as single parents.</li>
                    <li>Must be able to provide a secure and loving environment.</li>
                    <li>Required to submit documents supporting their legal marital status.</li>
                </ul>
                <p className="mt-4 italic text-red-500">Joint adoptions by unmarried couples are not permitted.</p>
                <p className="italic text-red-500">Single LGBTQ+ persons can adopt in India. However, joint adoption by same-sex couples is not legally allowed (as of now).</p>
            </div>

            <div className="text-lg bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center">Documents Required from Prospective Adoptive Parents</h1>
                <hr className="mt-5"/>
                <ul className="mt-5 list-disc p-4 list-inside space-y-1 bg-gray-100">
                    <li>Identity Proof (Aadhar Card, Passport, etc.)</li>
                    <li>Address Proof (Utility bill, Rent Agreement, etc.)</li>
                    <li>PAN Card</li>
                    <li>Marriage Certificate (if married)</li>
                    <li>Medical Fitness Certificate (from a registered doctor)</li>
                    <li>3 Years Income Proof (Salary slips, IT Returns, Form 16)</li>
                    <li>Photographs (recent passport-size)</li>
                    <li>Consent Letter from spouse (if married)</li>
                    <li>Proof of Residence Stability (ownership/rent agreement)</li>
                    <li>Affidavit of Intent to Adopt (as per NGO format)</li>
                </ul>
            </div>
            <div className="text-lg bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center">In-Person Adoption Process</h1>
                <hr className="my-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 1: Initial Meeting with the NGO</h2>
                <ul className="mt-5">
                    <li>After matching via Forever Found, the adoptive parent(s) are invited to the NGO's premises.</li>
                    <li>The NGO staff provides an orientation on:</li>
                    <ul className="list-disc list-inside ml-4">
                        <li>The child’s background.</li>
                        <li>The legal and emotional responsibilities of adoptive parenting.</li>
                        <li>The next steps in the adoption process.</li>
                    </ul>
                    <li>The NGO may ask preliminary questions and explain timelines and document expectations.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 2: Submission & Verification of Documents</h2>
                <ul className="mt-5">
                    <li>Parents submit hard copies of required documents (identity, income proof, medical certificates, etc.).</li>
                    <li>The NGO checks for completeness and authenticity. Documents are uploaded to CARINGS (CARA's online portal) if applicable, or filed directly with district authorities for court processing.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 3: Home Study Visit</h2>
                <ul className="mt-5">
                    <li>Conducted by a trained social worker, assigned by the NGO or an authorized adoption agency.</li>
                    <li>The visit includes:</li>
                    <ul className="list-disc list-inside ml-4">
                        <li>Tour of the home.</li>
                        <li>Interviews with parents (and extended family, if present).</li>
                        <li>Assessment of physical safety, emotional environment, and readiness.</li>
                    </ul>
                    <li>A Home Study Report (HSR) is prepared and submitted to CARA or attached in the court filing.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 4: Child Interaction & Bonding Period</h2>
                <ul className="mt-5">
                    <li>Parents meet the child in a controlled setting within the NGO premises.</li>
                    <li>Multiple visits may be arranged to:</li>
                    <ul className="list-disc list-inside ml-4">
                        <li>Build emotional connection.</li>
                        <li>Let the child feel comfortable and safe.</li>
                    </ul>
                    <li>The NGO staff observes the bonding process and readiness of both parties.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 5: Pre-Adoption Foster Care Agreement</h2>
                <ul className="mt-5">
                    <li>Once bonding is established, the parents sign this legal document. It allows them to take the child home temporarily before final court approval.</li>
                    <li>During this period:</li>
                    <ul className="list-disc list-inside ml-4">
                        <li>Parents care for the child full-time.</li>
                        <li>The NGO may conduct a few follow-ups or check-ins.</li>
                    </ul>
                    <li className="italic">This agreement is not permanent adoption, but a supervised placement.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 6: Legal Filing and Final Adoption Order</h2>
                <ul className="mt-5">
                    <li>The case is filed in the district family court or Juvenile Justice Board under the JJ Act.</li>
                    <li>The NGO (or its legal representative) assists in preparing:</li>
                    <ul  className="list-disc list-inside ml-4">
                        <li>The court petition.</li>
                        <li>Annexures like the Home Study Report, medical records of the child, and parent documents.</li>
                    </ul>
                    <li>Parents must attend a court hearing, where the judge may:</li>
                    <ul className="list-disc list-inside ml-4">
                        <li>Review all submitted documents.</li>
                        <li>Ask basic questions to ensure the decision is informed and voluntary.</li>
                    </ul>
                    <li>If satisfied, the judge issues a Final Adoption Decree, legally recognizing the child as part of the family.</li>
                </ul>
                <hr className="mt-5"/>
                <h2 className="mt-8 text-2xl font-bold bg-gray-200 p-3">Step 7: Final Handover & Post-Adoption Follow-Up</h2>
                <ul className="mt-5">
                    <li>Once the court order is granted the child’s custody is officially and permanently transferred to the adoptive family.</li>
                    <li>A new birth certificate with the adoptive parents' names may be issued.</li>
                    <li>The NGO remains in touch for post-adoption follow-ups, typically:</li>
                    <ul  className="list-disc list-inside ml-4">
                        <li>Quarterly for the first year.</li>
                        <li>Half-yearly in the second year.</li>
                    </ul>
                    <li className="italic text-red-500">Reports are submitted to CARA for recordkeeping.</li>
                </ul>
            </div>

            <div className="text-lg bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center">Estimated Timelines</h1>
                <hr className="mt-5"/>
                <ul className="mt-5 list-disc p-4 list-inside space-y-1 bg-gray-100">
                    <li>Document verification and home study: 1–2 months</li>
                    <li>Bonding and court filing: 1 month</li>
                    <li>Court process and adoption order: 1–3 months</li>
                </ul>
                <p className="italic text-red-500">Total time: Approx. 3–6 months, depending on state and court.</p>
            </div>
            <div className="text-center"><button className="bg-[#d4b6a8] text-black text-base font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-[#bb9a8a] hover:text-indigo-800 transition duration-200 mr-4" onClick={handleHome}>Home</button></div>
            </div>
        </div>
    );
}
export default AdoptiveGuidelines;