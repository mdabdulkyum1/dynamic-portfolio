"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/lib/actions/get-projects";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import ProjectCreateModal from "./ProjectCreateModal";
import { deleteProject } from "@/lib/actions/delete-project";

interface Project {
  _id: string;
  title: string;
  link: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  techUsed: string;
  gitClient: string;
  gitServer: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ProjectsList = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [currentProject, setCurrentProject] = useState<Project>({} as Project);
  const [, setSelectedCategory] = useState("All");

  
    const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [isPending, startTransition] = useTransition();
  

  // Extract unique categories for the filter
  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  // Handle category filter change (server-side)
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    startTransition(async () => {
      try {
        const fetchedProjects = await getProjects(category === "All" ? undefined : category);
        setProjects(fetchedProjects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    });
  };


  const handleDelete = async (projectId: string) => {
  try {
    const deleteRes = await deleteProject(projectId);

    if (deleteRes?.status) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } else {
      console.error("Failed to delete project:", deleteRes?.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};


  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-4">
        <Select onValueChange={handleCategoryChange} defaultValue="All" disabled={isPending}>
          <SelectTrigger className="w-[200px] border-gray-300 shadow-sm">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isPending && <span className="text-sm text-gray-500">Loading...</span>}
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tech Used</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <Link
                        href={`/dashboard/projects/${project._id}`}
                        className="text-blue-600 hover:underline font-medium block"
                      >
                        {project.title}
                      </Link>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="text-xs text-gray-500 hover:underline block"
                      >
                        View Live →
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                  <TableCell>{project.techUsed}</TableCell>
                  <TableCell>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={project.gitClient}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Client Repo
                      </Link>
                      <Link
                        href={project.gitServer}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Server Repo
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Link href={`/dashboard/projects/${project._id}`}>
                        <Button
                          className="cursor-pointer"
                          variant="secondary"
                          size="sm"
                          disabled={isPending}
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="sm"
                       onClick={() => { setIsModalOpen(true); setCurrentProject(project); }}
                        disabled={isPending}
                      >
                        Edit
                      </Button>
                       <ProjectCreateModal isOpen={isModalOpen}
                                 closeModal={() => setIsModalOpen(false)} project={currentProject} isEdit={true}/>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="cursor-pointer" variant="destructive" size="sm" disabled={isPending}>
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the project {project.title} This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={() => handleDelete(project._id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No projects found for this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsList;