import ProjectAddButton from "./components/ProjectAddButton";


const page = () => {
    return (
        <div>  

            <ProjectAddButton />
            <div className="my-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Projects</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your projects here.</p> 
            </div>
        </div>
    );
};

export default page;