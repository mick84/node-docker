import e, { Router } from "express";
import { Types } from "mongoose";
import * as postCtrl from "../controllers/postCtrl.js";

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

postRouter.get("/", postCtrl.getAllPosts);
postRouter.post("/", postCtrl.createPost);

postRouter.get("/:id", validateId, postCtrl.getPost);
postRouter.patch("/:id", validateId, postCtrl.updatePost);
postRouter.delete("/:id", validateId, postCtrl.deletePost);
