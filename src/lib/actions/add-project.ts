"use server";

import { z, ZodError } from "zod"; // Import ZodError
import connectDB from "../db";
import Projects from "../../../models/Projects";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid URL"),
  image: z.string().url("Invalid Image URL"),
  images: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((url) => url.trim()) : [])),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  techUsed: z.string().optional(),
  gitClient: z.string().url("Invalid GitHub Client URL").optional().or(z.literal("")),
  gitServer: z.string().url("Invalid GitHub Server URL").optional().or(z.literal("")),
  _id: z.string().optional(),
});

interface ActionState {
  success?: boolean;
  Error?: Record<string, string>;
}

export async function addProject(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    // Convert FormData to raw object
    const rawData = {
      title: formData.get("title") as string,
      link: formData.get("link") as string,
      image: formData.get("image") as string,
      images: formData.get("images") as string,
      category: formData.get("category") as string,
      description: (formData.get("description") as string) || "",
      techUsed: (formData.get("techUsed") as string) || "",
      gitClient: (formData.get("gitClient") as string) || "",
      gitServer: (formData.get("gitServer") as string) || "",
      _id: formData.get("_id") ? (formData.get("_id") as string) : undefined,
    };

    console.log("Raw Data:", rawData);

    // Validate
    const result = projectSchema.safeParse(rawData);
    console.log("Validation Result:", result);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      // Assert result.error as ZodError
      const error = result.error as ZodError;
      error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as string] = err.message;
        }
      });
      console.log("Validation Errors:", formattedErrors);
      return { Error: formattedErrors };
    }

    const validData = result.data;
    console.log("Valid Data:", validData);

    await connectDB();

    if (validData._id) {
      // Update existing project
      const updatedProject = await Projects.findByIdAndUpdate(
        validData._id,
        { $set: validData },
        { new: true, runValidators: true }
      );
      if (!updatedProject) {
        return { Error: { general: "Project not found" } };
      }
    } else {
      // Create new project
      await Projects.create(validData);
    }

    return { success: true };
  } catch (error) {
    console.error("Error in addProject:", error);
    return {
      Error: {
        general: "Something went wrong. Please try again.",
      },
    };
  }
}