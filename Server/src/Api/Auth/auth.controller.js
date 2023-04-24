import { userModel } from "../../Model/user.model.js";
import { createToken, verifyToken } from "../../Jwt/jwt.js";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

export const loginLogic = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      console.log("email not found");
      res.send("email isn't found");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({ message: "user not found please check your username" });
    }

    // console.log(user);
    // console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send({ message: "Please check your password" });
    }

    const token = createToken({ id: user._id });

    res.send({
      isUserValid: true,
      message: "Credentials matching",
      token,
      userID: user._id,
    });
  } catch (error) {
    console.log("Try catch error", error);
    res.send({ message: "oops something went wrong" });
  }
};
