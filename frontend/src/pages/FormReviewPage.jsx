import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function FormReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, role } = location.state || {};

  useEffect(() => {
    if (!formData || !role) navigate("/");
  }, [formData, role, navigate]);

  if (!formData || !role) return null;

  const handleAdopterSubmit = async () => {
    try {
      const normalizedFormData = {
        ...formData,
        healthStatus: formData.healthStatus
          ? formData.healthStatus.split(",").map((s) => s.trim())
          : [],
      };

      const data = new FormData();

      Object.entries(normalizedFormData).forEach(([key, value]) => {
        if (key === "medicalCertificates" && Array.isArray(value)) {
          value.forEach((v) => data.append("medicalCertificates", v));
        } else if (value instanceof File) {
          data.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => data.append(key, v));
        } else {
          data.append(key, value);
        }
      });

      const res = await fetch(
        "http://localhost:5000/api/adopter/signup",
        { method: "POST", body: data }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Signup failed");
        return;
      }

      navigate("/review-signup-form/adopter-acknowledgement");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  const handleNGOSubmit = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("location", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("contact", formData.contact);
      data.append("alternateContact", formData.altcontact || "");
      data.append("email", formData.email);
      data.append("registrationNumber", formData.regnum);
      data.append("caraRegistrationNumber", formData.caranum);
      data.append("about", formData.about || "");
      data.append("pass", formData.pass);

      if (formData.year) data.append("yearOfEstablishment", formData.year);
      if (formData.num_child) data.append("numberOfChildren", formData.num_child);
      if (formData.name_contact)
        data.append("contactPersonName", formData.name_contact);
      if (formData.desg_contact)
        data.append("contactPersonDesignation", formData.desg_contact);
      if (formData.website) data.append("website", formData.website);

      if (
        !(formData.logoimg instanceof File) ||
        !(formData.reg_certimg instanceof File) ||
        !(formData.cara_certimg instanceof File)
      ) {
        alert("Logo, Registration Certificate & CARA Certificate are required");
        return;
      }

      data.append("logo", formData.logoimg);
      data.append("registrationCert", formData.reg_certimg);
      data.append("caraCert", formData.cara_certimg);

      ["galimg1", "galimg2", "galimg3"].forEach((key) => {
        if (formData[key] instanceof File) {
          data.append("gallery", formData[key]);
        }
      });

      if (Array.isArray(formData.testimonials)) {
        data.append(
          "testimonials",
          JSON.stringify(formData.testimonials)
        );
      }

      const res = await fetch(
        "http://localhost:5000/api/ngos/signup",
        { method: "POST", body: data }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "NGO signup failed");
        return;
      }

      navigate("/review-signup-form/ngo-acknowledgement");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("NGO Signup Error:", err);
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
      onSubmit={() =>
        role === "adopter" ? handleAdopterSubmit() : handleNGOSubmit()
      }
    />
  );
}

export default FormReviewPage;
