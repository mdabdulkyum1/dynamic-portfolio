import ProjectAddButton from "./components/ProjectAddButton";
import ProjectsList from "./components/ProjectsList";
import { getProjects } from "@/lib/actions/get-projects";

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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const page = async() => {
    const projects: Project[] = (await getProjects()) || [];

    return (
        <div>  

            <ProjectAddButton />
            <div className="my-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Projects</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your projects here.</p> 
                <ProjectsList initialProjects={projects} />
            </div>
        </div>
    );
};

export default page;