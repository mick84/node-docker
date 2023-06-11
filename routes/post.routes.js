import e, { Router } from "express";
import { Types } from "mongoose";
import * as postCtrl from "../controllers/postCtrl.js";
import protect from "../middleware/authMW.js";

export const postRouter = Router();

/**
 * @type e.RequestHandler
 */
const validateId = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      throw {
        code: 406,
        message: "Error: Invalid ID format provided.",
      };
    }
    next();
  } catch ({ code, message }) {
    return res.status(code).send(message);
  }
};

postRouter.get("/", protect, postCtrl.getAllPosts);
postRouter.post("/", protect, postCtrl.createPost);

postRouter.get("/:id", protect, validateId, postCtrl.getPost);
postRouter.patch("/:id", protect, validateId, postCtrl.updatePost);
postRouter.delete("/:id", protect, validateId, postCtrl.deletePost);
