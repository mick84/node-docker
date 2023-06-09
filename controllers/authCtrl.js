import User from "../models/user.js";
import e from "express";
import bcrypt from "bcrypt";
/**
 * @type e.RequestHandler
 */
export const signUp = async (req, res) => {
  try {
    //const { username, password } = req.body;
    const data = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch ({ code, message }) {
    res.status(code).json({
      status: "fail",
      message,
    });
  }
};
/**
 * @type e.RequestHandler
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({ username });
    if (!data) {
      throw {
        code: 404,
        message: `User ${username} does not exist.`,
      };
    }
    const match = bcrypt.compareSync(password, data.password);
    if (!match) {
      throw {
        code: 401,
        message: `Password ${password} is invalid`,
      };
    }
    req.session.username = username; //!- crashes app!
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(error.code).json({ status: "fail", error });
  }
};
