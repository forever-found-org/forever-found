function AdminLoginValidator(data) {
  const errors = {};

  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Email validation
  if (!data.email || data.email.trim() === "") {
    errors.email = "*Email is required.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "*Invalid email format.";
  }

  // Password validation
  if (!data.password || data.password.trim() === "") {
    errors.password = "*Password is required.";
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      "*Password must be at least 8 characters, contain 1 uppercase letter and 1 special character.";
  }

  return errors;
}

export default AdminLoginValidator;
