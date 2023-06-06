import { userModel } from "../../Model/user.model.js";
import bcrypt from "bcrypt";

export const createUserProfile = async (req, res) => {
  try {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.gender ||
      !req.body.email ||
      !req.body.password ||
      !req.body.location ||
      !req.body.phone
    ) {
      console.log("@Message:", "few data are not found");
      return res.send({
        success: false,
        message:
          "insufficient user data , please provide all the required data",
      });
    }

    const { email } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      console.log("@Message:", "user email seems to be present already");
      res.send({ success: false, message: "User Email already Exists" });
      return;
    }

    if (!req.body.password) return res.send("Password not passed");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { password, ...rest } = req.body;

    const userInstance = new userModel({ ...rest, password: hashedPassword });
    await userInstance.save();
    res.send({ success: true, message: "User Saved :)" });
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const userList = await userModel.find({});
    res.send(userList);
  } catch (error) {
    console.log("Try catch error", error);
  }
};
export const getUserProfileByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.send({ message: "Id isn't passed" });
      console.log("@Message:id is not passed in the param");
      return;
    }

    const user = await userModel.findById(id);
    res.send(user);
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const updateUserProfileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) {
      console.log("Message: id not passed ");
      res.send("Id is not passed");
      return;
    }

    const user = await userModel.findByIdAndUpdate(id, data || {}, {
      new: true,
    }); //Here the param {new:true} gives new value after updating the document;
    res.send(user);
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log("@Message:id is not found");
      res.send("Id is not passed");
      return;
    }

    await userModel.findByIdAndDelete(id);
    res.send({ message: "Profile Deleted" });
  } catch (error) {
    console.log("Try catch error", error);
  }
};
