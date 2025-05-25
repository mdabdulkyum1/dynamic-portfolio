"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProjects } from "@/lib/actions/get-projects";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectSlider from "./ProjectSlider";

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
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const fetched = await getProjects(selectedCategory === "All" ? undefined : selectedCategory);
      setProjects(fetched || []);
      setLoading(false);
    };
    fetchProjects();
  }, [selectedCategory]);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Latest Projects</h2>

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
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.category}</p>
                <p className="text-sm line-clamp-2">{project.techUsed}</p>
                <div className="pt-2">
                  <Link href={project.link} target="_blank" className="cursor-pointer">
                    <Button size="sm" className="text-sm cursor-pointer">Live Preview</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
