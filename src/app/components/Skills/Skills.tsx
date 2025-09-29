"use client";

// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Settings, Wrench } from "lucide-react";

const Skills = () => {
const skillsData = {
    languages: {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5" />,
      skills: ["JavaScript (ES6)", "TypeScript"]
    },
    frontend: {
      title: "Frontend Technologies", 
      icon: <Database className="w-5 h-5" />,
      skills: ["React.js", "Next.js", "Tailwind CSS", "Redux"]
    },
    backend: {
      title: "Backend Technologies",
      icon: <Settings className="w-5 h-5" />,
      skills: ["Node.js", "Express.js", "Nest.js", "JWT", "WebSocket.io"]
    },
    database: {
      title: "Databases",
      icon: <Database className="w-4 h-4" />,
      skills: ["MongoDB", "PostgreSQL", "Prisma"]
    },
    tools: {
      title: "Development Tools",
      icon: <Wrench className="w-5 h-5" />,
      skills: ["Git", "GitHub", "VS Code", "Postman", "Docker"]
    },
    deployment: {
      title: "Cloud & Deployment",
      icon: <Settings className="w-4 h-4" />,
      skills: ["Vercel", "Netlify"]
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Expertise in modern web development technologies and frameworks
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([key, category]) => (
            <Card key={key} className="group hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="flex items-center py-1 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;