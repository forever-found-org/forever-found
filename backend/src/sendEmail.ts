import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  userType: "adopter" | "ngos",
  userId: string,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = 
    `http://localhost:3000/review-signup-form/verify/${userType}/${userId}?token=${token}`;

  await transporter.sendMail({
    from: `"Forever Found" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - Forever Found",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
        
        <h2 style="color:#333; text-align:center;">Welcome to Forever Found</h2>
        
        <p>Hello,</p>
        
        <p>
          Thank you for registering as a <strong>${userType.toUpperCase()}</strong> 
          on <strong>Forever Found</strong>.
        </p>
        
        <p>
          Please verify your email address by clicking the button below:
        </p>

        <div style="text-align:center; margin:25px 0;">
          <a href="${verificationLink}" 
             style="background-color:#d4a373; color:white; padding:12px 20px; 
                    text-decoration:none; border-radius:5px; font-weight:bold;">
             Verify Email
          </a>
        </div>

        <p style="font-size:14px; color:#555;">
          ⏳ This verification link will expire in <strong>2 hours</strong>.
        </p>

        <p style="font-size:14px; color:#555;">
          If you did not create this account, please ignore this email.
        </p>

        <hr style="margin:20px 0;" />

        <p style="font-size:12px; color:gray; text-align:center;">
          Forever Found Team<br/>
          This is an automated email. Please do not reply.
        </p>

      </div>
    `,
  });
};
