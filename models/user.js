import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const User = model(
  "User",
  new Schema({
    username: {
      type: Schema.Types.String,
      required: [true, "User must have a username"],
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: [true, "User must have a password"],
      set(val) {
        return bcrypt.hashSync(val, 10);
      },
    },
  })
);
export default User;
