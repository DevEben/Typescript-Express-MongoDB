import mongoose, {Document} from "mongoose";
const Schema = mongoose.Schema;

// Define the user document interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  notification: string[];
  status: string;
  isVerified: boolean;
  isAdmin: boolean;
  userPicture: {
      url: string;
      public_id: string;
  };
  token: string;
  role: string;
  stack: string;
}

// User schema definition
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notification: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      lowercase: true,
      default: "pending",
      enum: ["pending", "not-approved", "approved"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userPicture: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
    },
    stack: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["frontend", "backend", "productDesign"],
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = async (values: Record<string, any>): Promise<IUser> => {
    const user = new userModel(values);
    await user.save();
    return user.toObject(); // Returns a plain object
};
export const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string | unknown, values: Record<string, any>, newOption: boolean | any) =>
    userModel.findOneAndUpdate({ _id: id }, values, { new: newOption });
