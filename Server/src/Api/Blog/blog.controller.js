import { upload } from "../../services/mediaUpload.js";
import { blogModel } from "../../Model/blog.model.js";

export const createNewPost = (req, res) => {
  const uploadSingle = upload.single("file");
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    const { title, category, description, owner,location } = req.body;

    let blog = {
      title,
      category,
      description,
      owner,
      location,
      media: req.file.location,
    };

    const blogInstance = new blogModel(blog);
    await blogInstance.save();
    res.send({ message: "blog saved :)" ,success:true});
  });
};

export const getAllPosts = async (req, res) => {
  try {
    const postList = await blogModel.find({});
    res.send(postList);
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const getPostByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log("@Message:id is not passed in the post");
      res.send({ message: "Id isn't passed" });
    }

    const blog = await blogModel.findById(id);
    res.send(blog);
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const getAllPostsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    if (!location) {
      console.log("@Message:location is not passed in the post");
      res.send({ message: "location isn't passed", isFound: false });
      return;
    }

    const postList = await blogModel.find({ location });
    if (postList.length === 0) {
      return res.send({
        message: `No Post found in region ${location} `,
        isFound: false,
      });
    }

    res.send({ blogList: postList, isFound: true });
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const deletePostByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log("@Message:id is not passed in the post");
      res.send({ message: "Id isn't passed" });
    }

    await blogModel.findByIdAndDelete(id);
    res.send({ message: "post deleted" ,success:true});
  } catch (error) {
    console.log("Try catch error", error);
  }
};

export const updateBlogByID = (req, res) => {


  try {
    const { id } = req.params;
    if (!id) {
      console.log("@Message:id is not passed in the post");
      res.send({ message: "ID isn't passed" });
    }

    const uploadSingle = upload.single("file");

    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          errors: {
            title: "media Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }

      let updateObj = { ...req.body };
      console.log('@update data',updateObj);
      if (req.file) {
        updateObj = { ...updateObj, media: req.file.location };
      }

      await blogModel.findByIdAndUpdate(id, updateObj);
      res.send({ message: "Updated",success:true });
    });
  } catch (error) {
    console.log("Try catch error", error);
  }
};
