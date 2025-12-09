import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
export async function registerUser(req, res) {
  const { name, username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

// LOGIN USER
export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

// LOGOUT USER
export async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}

export async function deleteUser(req,res) {
    const id=req.user._id
    try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    
  }
}

export async function userProfile(req, res) {
  const id = req.user._id;

  try {
    const user = await UserModel.findById(id);  // FIX

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Error in userProfile:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching userProfile"
    });
  }
}

export async function updateProfile(req, res) {
  const id = req.user._id;

  const name = req.body.formData.name;
  const email = req.body.formData.email;
  const bio = req.body.formData.bio;
  const githubUrl = req.body.formData.githubUrl;
  const linkedinUrl = req.body.formData.linkedinUrl;
  const avatar= req.body.formData.avatar;
 
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, email, bio, githubUrl, linkedinUrl,avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating"
    });
  }
}
