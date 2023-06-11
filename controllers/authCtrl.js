import User from "../models/user.js";
import e from "express";
import bcrypt from "bcrypt";
import res from "express/lib/response.js";
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
    const user = await User.findOne({ username });
    if (!user) {
      throw {
        code: 404,
        message: `User ${username} does not exist.`,
      };
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw {
        code: 401,
        message: `Password ${password} is invalid`,
      };
    }
    const sessionUser = user.toJSON();
    delete sessionUser.password;
    req.session.user = sessionUser; //!- crashes app!
    res.status(200).json({ status: "success", data: sessionUser });
  } catch (error) {
    res.status(error.code).json({ status: "fail", error });
  }
};
