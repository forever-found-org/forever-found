import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function FormReviewPage()
{
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, role } = location.state || {};

  useEffect(() => {
  if (!formData || !role) {
    
    if (role === "ngo") {
      navigate("/ngo-signup");
    } else if (role === "adopter") {
      navigate("/adopter-SignUp");
    } else {
      navigate("/");
    }
  }
}, [formData, role, navigate]);

if (!formData || !role) 
    return null;


  return (
    <ReviewForm
      formData={formData}
      role={role}
      onEdit={() => {
        role === "adopter" ? navigate("/adopter-SignUp") : navigate("/ngo-signup");
      }}
      onSubmit={() => {
        if(role === "adopter")
        {
            alert("Form Submitted successfully");
            navigate("/adopter-home");
            window.scrollTo(0,0);
        }
        else
        {
            alert("Form Submitted successfully");
            navigate("/");//change to ngo home
            window.scrollTo(0,0);
        } 
      }}
    />
  );
};

export default FormReviewPage
