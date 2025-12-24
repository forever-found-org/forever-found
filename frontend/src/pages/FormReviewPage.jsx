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
    navigate("/");
  }
}, [formData, role, navigate]);

if (!formData || !role) 
    return null;


  return (
    <ReviewForm
      formData={formData}
      role={role}
      onEdit={() => {
        role === "adopter" ? navigate("/adopter-SignUp",{ state: { formData } }): navigate("/ngo-signup",{ state: { formData } });
        window.scrollTo(0,0);
      }}
      onSubmit={() => {
        if(role === "adopter")
        {
            alert("Form Submitted successfully");
            navigate("/review-signup-form/adopter-acknowledgement");
            window.scrollTo(0,0);
        }
        else
        {
            alert("Form Submitted successfully");
            navigate("/review-signup-form/ngo-acknowledgement");//change to ngo home
            window.scrollTo(0,0);
        } 
      }}
    />
  );
};

export default FormReviewPage
