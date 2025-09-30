// @/lib/actions/get-projects.ts
"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";
import { unstable_noStore as noStore } from "next/cache";

export const getProjects = async (category?: string) => {
  noStore(); // Disable caching for this function
  try {
    await connectDB();
    const query = category ? { category } : {};
    const projects = await Projects.find(query);
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log("Error getting projects: " + error);
    return [];
  }
};