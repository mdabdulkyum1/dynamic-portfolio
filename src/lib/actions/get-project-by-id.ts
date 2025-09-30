"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";

export const getProjectById = async (id: string) => {
  try {
    await connectDB();
    const project = await Projects.findById(id);
    
    if (!project) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.log("Error getting project by ID: " + error);
    return null;
  }
};