function NGOs_help() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-serif font-extrabold text-gray-900 mb-8 pb-2 border-b-2 border-gray-300 bg-gray-100 px-4 py-2 rounded">NGO Support</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">     1. NGO Registration and Verification</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Step 1: Selecting the Role
            </h3>
            <ol className="list-decimal text-lg ml-8 text-gray-700 space-y-2 leading-relaxed">
              <li>Navigate to the Login page.</li>
              <li>Select <b className="text-gray-900 font-semibold">“NGO”</b> as your role.</li>
              <li>You'll be redirected to the <b className="text-gray-900 font-semibold">NGO Signup Form</b>.</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
            Step 2: Filling the NGO Signup Form</h3>
            <p className="mb-3 font-medium ml-3 text-gray-700">
              Please complete the form with accurate and verifiable information. The fields include:
            </p>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>NGO Name, Email, Contact Number</li>
              <li>Uploads: NGO Logo, NGO Photo, Registration Certificate, CARA Certificate</li>
              <li>CARA Registration Number</li>
              <li>Number of Children</li>
              <li>Controller's Name & Position</li>
              <li>Create Password</li>
            </ul>
            <p className="italic font-medium ml-3 text-gray-600 mt-2">All fields are mandatory. Upload clear, valid documents.  </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">Step 3: Submit for Admin Review</h3>
            <h4 className="font-semibold text-gray-800 text-lg ml-2 mb-2">Once the form is submitted:</h4>
            <ol className="list-decimal ml-8 text-lg text-gray-700 space-y-1 leading-relaxed">
              <li>Your application will be reviewed by the Admin team.</li>
              <li>
                This process includes:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-700 leading-relaxed">
                  <li>Validating uploaded certificates (Registration + CARA)</li>
                  <li>Cross-checking controller details</li>
                  <li>Confirming number of children with records if available</li>
                </ul>
              </li>
            </ol>
            <p className="mt-2 font-medium ml-3 text-gray-700">
              You'll receive an email update once your account is reviewed.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Step 4: Checking Verification Status</h3>
            <h4 className="text-lg font-semibold text-gray-800 ml-2 mb-2">While waiting for approval:</h4>
            <ol className="list-decimal ml-8 text-lg text-gray-700 space-y-2 leading-relaxed">
              <li>Visit the <b className="text-gray-900 font-semibold">Home Page</b> and click on 
                <b className="text-gray-900 font-semibold">"NGO Approval Status"</b>.
              </li>
              <li>Enter your <b className="text-gray-900 font-semibold">NGO Name</b> and 
                <b className="text-gray-900 font-semibold">Email ID</b>.
              </li>
              <li>
                You'll see one of the following statuses:
                <ul className="list-disc list-inside mt-1 ml-6 space-y-1 text-gray-700 leading-relaxed">
                  <li><b className="text-yellow-600 font-semibold">Pending</b> - Application under review</li>
                  <li><b className="text-green-600 font-semibold">Approved</b> - You're verified and can log in</li>
                  <li><b className="text-red-600 font-semibold">Rejected</b> - Check email for reasons and re-apply</li>
                </ul>
              </li>
            </ol>
            <p className="italic ml-3 font-medium text-gray-600 mt-2">
              Make sure your email address is correct and regularly checked.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Step 5: Login After Approval</h3>
            <h4 className="font-semibold text-lg ml-3 text-gray-800 mb-2">Once approved:</h4>
            <ul className="list-decimal text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Go to the Login page.</li>
              <li>Select the NGO role.</li>
              <li>Enter your user email and password created during signup.</li>
              <li>
                On success, you'll be redirected to your NGO Dashboard where you can:
                <ul className="list-disc ml-8 mt-1 text-gray-700 space-y-1 leading-relaxed">
                  <li>Manage children profiles</li>
                  <li>View adopter requests</li>
                  <li>Fix meeting times</li>
                  <li>Track adoption and meeting history</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">
            2. Managing Child Profiles</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Add or Update Child Entries
            </h3>
            <ol className="list-decimal text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>
                Insert New Children
                <ul className="list-disc ml-8 mt-1 space-y-1">
                    <li>Click <b className="text-gray-900 font-semibold">“Add New Child”</b> from the dashboard.</li>
                    <li>Fill in:</li>
                    <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
                        <li>Child's Full Name</li>
                        <li>Date Of Birth with accurate or estimation flag</li>
                        <li>Gender and Medical History</li>
                        <li>Education Status</li>
                    </ul>
                </ul>
              </li>
               <li>
                    Update Child Details
                    <ul className="list-disc ml-8 text-gray-700 mt-1 space-y-1 leading-relaxed">
                    <li>Under “Update My Children”, enter the child id and update details.</li>
                    <li>Modify any field and save changes.</li>
                    </ul>
                </li>
            </ol>
            <p className="mt-2 ml-3 font-medium text-gray-700">Keep records up to date for transparency and valid matches.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Viewing Adopter Requests</h3>
            <p className="text-gray-700 ml-3 font-medium mb-2">
              In the dashboard, click <b className="text-gray-900 font-semibold">“Pending Requests”</b> to view requests.
            </p>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Adopter's Details</li>
              <li>Interested Children's Profile</li>
              <li>Submitted Preferences (age, gender)</li>
              <li>Requested Date</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Accepting or Rejecting Meeting Requests</h3>
            <h4 className="text-lg font-semibold text-gray-800 ml-2 mb-2">To Approve:</h4>
            <ul className="list-decimal  ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Click “Approve” on a request.</li>
              <li>Provide up to 3 time slots.</li>
              <li>Click “Send Time Slots”.</li>
            </ul>
            <h4 className="font-semibold text-lg ml-2 text-gray-800 my-2">To Reject:</h4>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Click “Reject”, and optionally enter a short reason.</li>
            </ul>
            <p className="mt-2 ml-3 font-medium text-gray-700">The adopter will confirm a selected slot post-approval.</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded">
              Tracking Meeting Status </h3>
            <h4 className="text-lg ml-2 font-semibold text-gray-800 mb-2">
              Use <b className="text-gray-900 font-semibold">“Meeting Status”</b> in your dashboard.</h4>
            <ul className="list-decimal text-lg ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>See if adopter accepted a time slot</li>
              <li>Final scheduled date & time</li>
              <li>
                Status history:
                <ul className="list-disc ml-8 space-y-1 text-gray-700 leading-relaxed">
                  <li><b className="text-green-600 font-semibold">Accepted</b>- NGO has accepted request and sent time slots</li>
                  <li><b className="text-red-600 font-semibold">Rejected</b>- NGO has declined the request</li>
                  <li><b className="text-blue-600 font-semibold">Scheduled</b>- Time slot accepted and meeting is fixed</li>
                  <li><b className="text-gray-500 font-semibold">Cancelled</b>- Time slot rejected and meeting is cancelled</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 bg-gray-100 px-4 py-2 rounded">
            3. Common FAQs
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              How to track meeting statuses?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Accepted - NGO has accepted request and sent time slots</li>
              <li>Rejected - NGO has declined the request</li>
              <li>Scheduled - Time slot accepted and meeting is fixed</li>
              <li>Cancelled - Time slot rejected and meeting is cancelled</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              What documents are needed for NGO registration?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>NGO Registration Certificate</li>
              <li>CARA Certificate & Number</li>
              <li>NGO Logo, Premises Photo</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              How to respond to adopter interest?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Go to Pending Requests</li>
              <li>Approve (send time slots) or Reject</li>
              <li>Track confirmations in Meeting Status</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              What if registration is rejected?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>You'll receive an email with the reason</li>
              <li>Fix and resubmit your application</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              How long does approval take?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>Usually 24-48 hours</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 bg-gray-50 px-3 py-2 rounded">
              Will adopters see all children?
            </h3>
            <ul className="list-disc ml-8 text-gray-700 space-y-1 leading-relaxed">
              <li>No, only those matching selected age/gender preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGOs_help;
