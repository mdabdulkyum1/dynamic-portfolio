import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProject extends Document<Types.ObjectId> {
  title: string;
  link: string;
  image: string;
  images: string[];
  category: string;
  description?: string;
  techUsed?: string;
  gitClient?: string;
  gitServer?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    techUsed: { type: String, trim: true, default: "" },
    gitClient: { type: String, trim: true, default: "" },
    gitServer: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
);

const Projects: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Projects;