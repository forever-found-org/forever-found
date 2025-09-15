function General_help() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-serif font-bold bg-gray-200 rounded p-3 text-gray-900">
                General Usage For All Users
            </h1>

            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold bg-gray-100 rounded p-3 text-gray-800">
                    1. Role-based navigation (where each role can go):
                </h2>
                <p className="font-medium text-lg ml-3">
                    The application provides tailored navigation paths and access permissions based on the user's role to ensure relevant and secure user experiences.
                </p>

                <h3 className="text-xl font-serif font-semibold bg-gray-50 rounded p-2 text-gray-700 ml-2">
                    For Adopters:
                </h3>
                <p className="font-medium ml-3">
                    After logging in, adopters land on their dedicated Adopter Home Page. Here, they can easily access:
                </p>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li><b>Request History:</b> A list of all meet requests they have made to NGOs, showing the current status of each (pending, accepted, rejected, scheduled, or cancelled).</li>
                    <li><b>Adoption History:</b> Details of all completed adoptions including child profiles and dates.</li>
                    <li><b>Parenting Guide:</b> Helpful resources and tips for parents.</li>
                </ul>
                <p className="font-medium ml-3">
                    Once they identify a child or NGO of interest, adopters can send a Meet Request to the NGO. The NGO can then:
                </p>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li>Accept or reject the request.</li>
                    <li>If accepted, propose available time slots for the meet.</li>
                    <li>The adopter can then select a time slot to schedule the meeting or cancel if needed.</li>
                </ul>

                <h3 className="text-xl font-serif font-semibold bg-gray-50 rounded p-2 text-gray-700 ml-2">
                    For NGOs:
                </h3>
                <p className="font-medium text-lg ml-3">
                    NGO users have access to a specialized dashboard where they can:
                </p>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-2">
                    <li>View Registered Children profiles.</li>
                    <li>Insert new child data or update existing records.</li>
                    <li><b>Monitor Pending Requests:</b> These are meet requests sent by adopters. NGOs review adopter details and decide whether to accept or reject the requests.</li>
                    <li>When accepting a meet request, NGOs send proposed time slots for the adopter to choose from.</li>
                    <li>Keep track of all meeting statuses—approved, rejected, scheduled, or cancelled—in a comprehensive <b>Meeting Status</b> section.</li>
                </ul>
                <p className="font-medium ml-3 py-2">
                    This role-based navigation ensures that each user type has access only to the relevant features they need, streamlining the adoption process, enhancing communication, and maintaining a secure and user-friendly platform.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold bg-gray-100 rounded p-3 text-gray-800">
                    2. Home, Logout, and Dashboard Features:
                </h2>
                <p className="font-medium text-lg ml-3">
                    The platform offers clear, role-based navigation alongside a general site-level navbar for visitors.
                </p>

                <h3 className="text-xl font-serif font-semibold bg-gray-50 rounded p-2 text-gray-700 ml-2">
                    Site Home Page Navigation (Before Login):
                </h3>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li><b>Home:</b> Returns to the website's homepage</li>
                    <li><b>NGO Approval Status:</b> NGOs can check if their signup has been approved using name and email.</li>
                    <li><b>Login with Role:</b> Role-based login/signup (Adopter, NGO, Admin) with Google Sign-In support.</li>
                    <li><b>About and Help:</b> Provide platform information and user guidance.</li>
                </ul>

                <h3 className="text-xl font-serif font-semibold bg-gray-50 rounded p-2 text-gray-700 ml-2">
                    Adopter Navigation (After Login):
                </h3>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li><b>Home:</b> Redirects to the adopter dashboard with NGO list, preferences, matched children, and meet request flow.</li>
                    <li><b>Adoption History and Request History:</b> Show past adoptions and meet request statuses.</li>
                    <li><b>Parenting Guide:</b> Offers resources for adoptive parents.</li>
                    <li><b>Profile and Logout:</b> For managing info and securely ending the session.</li>
                </ul>

                <h3 className="text-xl font-serif font-semibold bg-gray-50 rounded p-2 text-gray-700 ml-2">
                    NGO Navigation (After Login):
                </h3>
                <p className="font-medium text-lg ml-3">
                    NGO users have access to a specialized dashboard where they can:
                </p>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li><b>Home:</b> Leads to the NGO dashboard with tools to manage child data and adopter meet requests.</li>
                    <li><b>Profile and Logout:</b> For updating organization details and secure logout.</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold bg-gray-100 rounded p-3 text-gray-800">
                    3. Secure Login/Logout Practices:
                </h2>
                <p className="font-medium ml-3">
                    The platform ensures secure authentication and session management for all roles:
                </p>
                <ul className="list-disc ml-8 text-gray-700 text-lg space-y-1">
                    <li><b>Role-Based Login:</b> Users select their role (Adopter, NGO, Admin) during login/signup. Each role is verified and granted access only to its respective features and routes.</li>
                    <li><b>Secure Authentication:</b> Passwords are hashed before storage. Login credentials are validated on the backend, and authentication tokens (e.g., JWT or session cookies) are issued securely.</li>
                    <li><b>Google Sign-In:</b> Tokens are stored safely (e.g., httpOnly cookies) to prevent cross-site scripting (XSS) and session hijacking.</li>
                    <li><b>Logout Handling:</b> Logging out invalidates the token/session, clearing user data and redirecting to the site home, ensuring no unauthorized access post-logout.</li>
                </ul>
                <p className="font-medium text-lg ml-3">
                    These measures help maintain platform security while providing a smooth and role-specific login experience.
                </p>
            </div>
        </div>
    );
}

export default General_help;
