"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";
import { unstable_noStore as noStore } from "next/cache";

export const getProjectById = async (id: string) => {
  noStore(); // Disable caching for this function
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