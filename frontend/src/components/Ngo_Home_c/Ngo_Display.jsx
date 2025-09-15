import { useNavigate } from "react-router-dom";
import {UsersIcon,EditIcon,EyeIcon,ClockIcon,ListChecksIcon} from "lucide-react";

const options = [
  { label: "Insert Child", Icon: UsersIcon, path: "/ngo/insert-child" },
  { label: "Update Child", Icon: EditIcon, path: "/ngo/update-child" },
  { label: "View Children", Icon: EyeIcon, path: "/ngo/view-children" },
  { label: "Pending Requests", Icon: ListChecksIcon, path: "/ngo/pending-requests" },
  { label: "Meetings/Status", Icon: ClockIcon, path: "/ngo/meetings-status" },
];

function Ngo_Display() {
  //const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white py-5 shadow-sm">
        <h1 className="text-4xl font-serif font-bold text-center text-black tracking-wider">
          NGO Dashboard
        </h1>
      </div>

      <div className="px-4 py-10 bg-[#e3f8fd] min-h-[calc(100vh-11rem)]">
        <div className="grid grid-cols-1 py-4 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map(({ label, Icon, path }) => (
            <button
              key={label}
              // onClick={() => navigate(path)}
              className="flex flex-col items-center justify-center bg-[#fdfdfd] rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition hover:scale-105 border border-[#b2ebf2]"
            >
              <Icon className="w-12 h-14 mb-4 text-[#006D77]" />
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



export default Ngo_Display;
