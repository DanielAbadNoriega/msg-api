const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const profesionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [EMAIL_PATTERN, "Email is not valid"],
      lowercase: true,
      unique: true,
      trim: true,
      required: "Email is required",
    },
    phone: {
      type: String,
      required: "Phone is required",
      minlength: [9, "Phone is not valid"],
    },
    avatar: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/1378/PNG/128/avatardefault_92824.png",
      required: "Image is required",
    },
    address: {
      type: {
        street: { type: String },
        suite: { type: String },
        city: { type: String },
        zipcode: { type: String },
      },
      required: "Address is required",
    },
    company: {
      type: {
        name: {
          type: String,
        },
        catchPhrase: {
          type: String,
        },
        bs: {
          type: String,
        },
      },
      required: "Category is required",
    },
    password: {
      type: String,
      required: "A valid password is required",
      match: [PASSWORD_PATTERN, "the password is invalid"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

profesionalSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

profesionalSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const Profesional = mongoose.model("Profesional", profesionalSchema);
module.exports = Profesional;
