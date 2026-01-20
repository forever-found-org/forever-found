import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function FormReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, role } = location.state || {};

  useEffect(() => {
    if (!formData || !role) {
      navigate("/");
    }
  }, [formData, role, navigate]);

  if (!formData || !role) return null;

  const handleAdopterSubmit = async () => {
    try {
      // ✅ FIX 2: normalize healthStatus
      const normalizedFormData = {
        ...formData,
        healthStatus: formData.healthStatus
          ? formData.healthStatus
              .split(",")
              .map((s) => s.trim())
          : [],
      };

      const data = new FormData();

      // ✅ FIX 3: append files correctly
      Object.entries(normalizedFormData).forEach(([key, value]) => {
        if (key === "medicalCertificates" && value?.length) {
          for (let i = 0; i < value.length; i++) {
            data.append("medicalCertificates", value[i]);
          }
        } else if (value instanceof File) {
          data.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => data.append(key, v));
        } else {
          data.append(key, value);
        }
      });

      const res = await fetch("http://localhost:5000/api/adopter/signup", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Signup failed");
        return;
      }

      navigate("/review-signup-form/adopter-acknowledgement");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <ReviewForm
      formData={formData}
      role={role}
      onEdit={() => {
        role === "adopter"
          ? navigate("/adopter-SignUp", { state: { formData } })
          : navigate("/ngo-signup", { state: { formData } });

        window.scrollTo(0, 0);
      }}
      onSubmit={() => {
        if (role === "adopter") {
          handleAdopterSubmit();
        } else {
          alert("Form Submitted successfully");
          navigate("/review-signup-form/ngo-acknowledgement");
          window.scrollTo(0, 0);
        }
      }}
    />
  );
}

export default FormReviewPage;
