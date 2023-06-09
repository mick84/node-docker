import Post from "../models/post.js";
import e from "express";
/**
 * @type e.RequestHandler
 * *GET localhost:3000/posts/
 */
export const getAllPosts = async (req, res, next) => {
  try {
    const data = await Post.find();
    res.status(200).json({
      data,
      results: data.length,
      status: "success",
    });
  } catch ({ code, message }) {
    res.status(code).json({ status: "fail", message: message });
  }
};
/**
 * @type e.RequestHandler
 * *GET localhost:3000/posts/:id
 */
export const getPost = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id);
    if (!data) {
      throw {
        code: 404,
        message: "Post with given id was not found.",
      };
    }
    res.status(200).json({ status: "success", data });
  } catch ({ code, message }) {
    res.status(code).json({ status: "fail", message });
  }
};
/**
 * @type e.RequestHandler
 * *POST localhost:3000/posts/
 */
export const createPost = async (req, res) => {
  try {
    const data = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch ({ code, message }) {
    res.status(code).json({ status: "fail", message });
  }
};

/**
 * @type e.RequestHandler
 * *PATCH localhost:3000/posts/:id
 */
export const updatePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(201)
      /*.cookie("connect.sid", req.sessionID, {
        httpOnly: true,
        secure: false,
        maxAge: 30000,
      })
      */
      .json({
        status: "success",
        data,
      });
  } catch ({ code, message }) {
    res.status(code).json({ status: "fail", message });
  }
};
/**
 * @type e.RequestHandler
 * *DELETE localhost:3000/posts/:id
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findByIdAndDelete(id);
    if (!data) {
      throw {
        code: 404,
        message: `Nothing to delete. Post with id ${id} was not found.`,
      };
    }
    res.status(202).json({
      status: "success",
      data,
    });
  } catch ({ code, message }) {
    res.status(code).json({ status: "fail", message });
  }
};
