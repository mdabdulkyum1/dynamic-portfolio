"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/actions/get-projects";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectSlider from "./ProjectSlider";
import { Eye, ExternalLink, Star, FileText } from "lucide-react";

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
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const fetched = await getProjects(
        selectedCategory === "All" ? undefined : selectedCategory,
        "published" // Only show published projects on home page
      );
      setProjects(fetched || []);
      setLoading(false);
    };
    fetchProjects();
  }, [selectedCategory]);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Showcasing my recent work and development projects
          </p>
        </div>

      {/* Filter */}
      <div className="mb-6 w-full max-w-xs">
        <Select onValueChange={setSelectedCategory} defaultValue="All">
          <SelectTrigger>
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
      </div>

      {/* Grid */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="group transition-all hover:shadow-lg border border-muted">
                <ProjectSlider image={project.image} images={project.images} />
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl flex-1">{project.title}</CardTitle>
                  {project.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{project.category}</Badge>
                  {project.status === 'published' && (
                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Live
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
                  {project.description || project.techUsed}
                </p>
                
                {/* Analytics */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {project.analytics?.views || 0} views
                  </div>
                  <div className="text-xs">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="pt-2 flex gap-2">
                  <Link href={project.link} target="_blank" className="cursor-pointer">
                    <Button size="sm" className="text-sm cursor-pointer flex-1">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live Preview
                    </Button>
                  </Link>
                  
                  {project.status === 'published' && (
                    <Link href={`/projects/${project._id}`} className="cursor-pointer">
                      <Button size="sm" variant="outline" className="text-sm cursor-pointer flex-1">
                        <FileText className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </section>
  );
};

export default Projects;
