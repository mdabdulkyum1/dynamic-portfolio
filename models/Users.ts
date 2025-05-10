import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document<Types.ObjectId> {
  providerAccountId: string;
  provider: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
  createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        providerAccountId: { type: String, required: true, unique: true },
        provider: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        createdAt: { type: Date, default: Date.now },
    }, 
    {
        timestamps: true
    }
);

const Users: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default Users;
