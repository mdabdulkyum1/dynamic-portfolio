"use client";

import { CirclePlus } from "lucide-react";
import { useState } from "react";
import ProjectCreateModal from "./ProjectCreateModal";

const ProjectAddButton = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
          <button onClick={() => setIsModalOpen(true)} className="cursor-pointer mt-4 w-full bg-blue-400 text-white py-1 rounded-md flex items-center justify-center">
            <CirclePlus size={28} className="text-white" />
          </button>
          <ProjectCreateModal isOpen={isModalOpen}
           closeModal={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ProjectAddButton;