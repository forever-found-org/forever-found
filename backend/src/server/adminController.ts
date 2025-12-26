import { Request, Response } from "express";
import Admin from "../db/adminModel";
import NGO from "../db/ngoModel";
import Child from "../db/childrenModel";
import Adopter from "../db/adopterModel";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    // admin not found
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // admin blocked
    if (admin.status !== "ACTIVE") {
      return res.status(403).json({ error: "Admin account is blocked" });
    }

    // plain-text password check (TEMPORARY)
    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // update last login time
    admin.lastLogin = new Date();
    await admin.save();

    // send minimal required data
    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// --- Get all approved NGOs (Admin Page 1) ---
export const getApprovedNGOsForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const ngos = await NGO.find(
      { verified: true },
      "name city numberOfChildren verified"
    ).lean();

    res.json({
      totalNGOs: ngos.length,
      ngos,
    });
  } catch (error) {
    console.error("Error fetching approved NGOs:", error);
    res.status(500).json({ message: "Failed to fetch NGOs" });
  }
};











/*GET: All children for admin*/
export const getAllChildrenForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const children = await Child.find()
      .populate("ngoId", "name") // only NGO name
      .select(
        "name age gender adoptionStatus canEdit ngoId"
      )
      .lean();

    const formattedChildren = children.map((child: any) => ({
      _id: child._id,
      name: child.name,
      age: child.age,
      gender: child.gender,
      adoptionStatus: child.adoptionStatus,
      canEdit: child.canEdit,
      ngoName: child.ngoId?.name || "N/A",
    }));

    res.status(200).json({
      total: formattedChildren.length,
      children: formattedChildren,
    });
  } catch (error) {
    console.error("Error fetching children for admin:", error);
    res.status(500).json({
      message: "Failed to fetch children",
    });
  }
};









/* GET ALL ADOPTERS */
export const getAllAdopters = async (req: Request, res: Response) => {
  try {
    const adopters = await Adopter.find(
      {},
      "fullName gender occupation contactNumber status"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      count: adopters.length,
      adopters,
    });
  } catch (error) {
    console.error("Error fetching adopters:", error);
    res.status(500).json({
      message: "Failed to fetch adopters",
    });
  }
};

