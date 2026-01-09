import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  Building2,
  Users,
  Baby,
  UserCog,
  ListChecks,
} from "lucide-react";

function Admin_Dashboard() {
  const navigate = useNavigate();

  const options = [
    {
      label: "Adopter Approval",
      Icon: UserCheck,
      path: "/admin/adopter-approval",
    },
    {
      label: "NGO Approval",
      Icon: Building2,
      path: "/admin/ngo-approval",
    },
    {
      label: "View NGOs",
      Icon: ListChecks,
      path: "/admin/view-ngos",
    },
    {
      label: "Manage Adopters",
      Icon: Users,
      path: "/admin/manage-adopters",
    },
    {
      label: "Manage Children",
      Icon: Baby,
      path: "/admin/manage-children",
    },
    /*{
      label: "Manage Users",
      Icon: UserCog,
      path: "/admin/manage-users",
    },*/
  ];

  return (
    <div>
      <div className="bg-white py-5 shadow-sm">
        <h1 className="text-4xl font-serif font-bold text-center tracking-wider">
          Admin Dashboard
        </h1>
      </div>

      <div className="px-4 py-10 bg-[#e3f8fd] min-h-[calc(100vh-11rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map(({ label, Icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition hover:scale-105 border border-[#b2ebf2]"
            >
              <Icon className="w-12 h-12 text-[#006D77] mb-4" />
              <span className="text-lg font-serif font-semibold text-[#006D77]">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;