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
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  liveDemo?: string;
  documentation?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  duration?: string;
  teamSize?: number;
  analytics: {
    views: number;
    clicks: number;
    lastViewed?: Date;
  };
  priority: number;
  tags: string[];
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
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    },
    featured: { type: Boolean, default: false },
    liveDemo: { type: String, trim: true, default: "" },
    documentation: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: String, trim: true, default: "" },
    learnings: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    teamSize: { type: Number, default: 1 },
    analytics: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      lastViewed: { type: Date }
    },
    priority: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Projects: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Projects;