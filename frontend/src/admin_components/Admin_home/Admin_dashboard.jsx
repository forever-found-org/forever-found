import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminFetch } from "../../securitymiddlewares/adminFetch";

import {
  UserCheck,
  Building2,
  Users,
  Baby,
  ListChecks,
} from "lucide-react";

function Admin_Dashboard() {
  const navigate = useNavigate();
  const [editRequestCount, setEditRequestCount] = useState(0);

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
  ];

  useEffect(() => {
    const fetchEditRequestCount = async () => {
      try {
        const res = await adminFetch(
          "http://localhost:5000/api/admin/adopters/edit-requests/count"
        );

        if (!res.ok) throw new Error("Failed to fetch count");

        const data = await res.json();
        setEditRequestCount(data.count || 0);
      } catch (error) {
        console.error("Failed to fetch edit request count:", error);
      }
    };

    fetchEditRequestCount();
  }, []);

  return (
    <div>
      <div className="bg-white py-5 shadow-sm">
        <h1 className="text-4xl font-serif font-bold text-center tracking-wider">
          Admin Dashboard
        </h1>
      </div>

      <div className="px-4 py-10 bg-[#e3f8fd] min-h-[calc(100vh-11rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map(({ label, Icon, path }) => {
            const isManageAdopters = label === "Manage Adopters";

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition hover:scale-105 border border-[#b2ebf2]"
              >
                {/* Notification Badge */}
                {isManageAdopters && editRequestCount > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {editRequestCount}
                  </span>
                )}

                <Icon className="w-12 h-12 text-[#006D77] mb-4" />

                <span className="text-lg font-serif font-semibold text-[#006D77]">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;
