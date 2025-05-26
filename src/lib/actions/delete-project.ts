"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";

export const deleteProject = async (id?: string) => {
  try {
    if (!id) {
      return {
        status: false,
        message: "Project ID is required",
      };
    }

    await connectDB();

    const deletedProject = await Projects.findOneAndDelete({ _id: id });

    if (!deletedProject) {
      return {
        status: false,
        message: "Project not found",
      };
    }

    return {
      status: true,
      data: deletedProject,
    };
  } catch (error) {
    console.error("Error deleting project:", error);

    return {
      status: false,
      message: "Something went wrong while deleting the project",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
