"use server";

import { z, ZodError } from "zod"; // Import ZodError
import Projects from "../../../models/Projects";
import connectDB from "../db";
import { revalidatePath } from "next/cache";

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
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  liveDemo: z.string().url("Invalid Live Demo URL").optional().or(z.literal("")),
  documentation: z.string().url("Invalid Documentation URL").optional().or(z.literal("")),
  features: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((feature) => feature.trim()) : [])),
  challenges: z.string().optional(),
  learnings: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.number().min(1).max(100).optional().or(z.string().transform(val => parseInt(val) || 1)),
  priority: z.number().min(0).max(10).optional().or(z.string().transform(val => parseInt(val) || 0)),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((tag) => tag.trim()) : [])),
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
      status: (formData.get("status") as 'draft' | 'published' | 'archived') || 'draft',
      featured: formData.get("featured") === 'true',
      liveDemo: (formData.get("liveDemo") as string) || "",
      documentation: (formData.get("documentation") as string) || "",
      features: formData.get("features") as string,
      challenges: (formData.get("challenges") as string) || "",
      learnings: (formData.get("learnings") as string) || "",
      duration: (formData.get("duration") as string) || "",
      teamSize: formData.get("teamSize") ? parseInt(formData.get("teamSize") as string) : 1,
      priority: formData.get("priority") ? parseInt(formData.get("priority") as string) : 0,
      tags: formData.get("tags") as string,
      _id: formData.get("_id") ? (formData.get("_id") as string) : undefined,
    };


    // Validate
    const result = projectSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      // Assert result.error as ZodError
      const error = result.error as ZodError;
      error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as string] = err.message;
        }
      });
      return { Error: formattedErrors };
    }

    const validData = result.data;

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

    // Revalidate pages to clear cache
    revalidatePath('/dashboard/projects');
    revalidatePath('/'); // Home page
    
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