import { mongoose } from "mongoose";
import validator from "validator";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide your name"],
    minLength: [3, "Name must be atleast 3 characters long"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "provide your email"],
    validate: [validator.isEmail, "please provide proper email format"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [6, "Password must contain atleast 6 characters"],
    maxLength: [30, "Password cannot exceed 30 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

//Compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};

//genereting JWT token for authentication
// The this context is undefined in the generateToken method because of how arrow functions handle this. Arrow functions do not bind their own this but inherit it from the parent scope, which isn't the document instance in this case.
userSchema.methods.generateToken = function () {
  try {
    const jwtExpire = process.env.JWT_EXPIRE || "1h"; // Default to 1 hour if not set
    return jwt.sign(
      {
        id: this._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: jwtExpire }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error generating token");
  }
};

const User = mongoose.model("User", userSchema);
export default User;
