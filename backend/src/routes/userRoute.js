import { Router } from "express";
import { loginUser, registerUser,logoutUser,userProfile,updateProfile} from "../controllers/userController.js";
import isUser from "../middlewares/isUser.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile",isUser,userProfile)
userRouter.post("/updateProfile",isUser,updateProfile)

export default userRouter;