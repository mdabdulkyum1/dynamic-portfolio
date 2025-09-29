"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, CheckCircle, MapPin } from "lucide-react";

const Experience = () => {
  const experience = {
    company: "SM Technology",
    position: "Back End Developer",
    location: "Bangladesh · On-site",
    type: "Full-time",
    duration: "Jun 2025 – Aug 2025 (3 months)",
    achievements: [
      "Designed and optimized back-end operations, ensuring scalability, security, and high performance",
      "Implemented real-time features, including push notifications and WebSocket-based communication",
      "Integrated AI solutions and secure payment systems"
    ],
    projects: [
      {
        name: "Xynexa–Team Collaboration",
        type: "Team Project",
        links: {
          live: "xynexa",
          client: "xynexa-client",
          server: "xynexa-server"
        },
        features: [
          "Task and project management for any team with a dashboard to track progress and team updates",
          "Integrated chat and video conferencing system (like Google Meet)",
          "Built real-time chat and video meetings; resolved deployment issues and teammate code conflicts"
        ],
        technologies: ["Next.js", "Redux", "Tailwind CSS", "Clerk", "Prisma", "Node.js", "Nest.js", "websockets"]
      },
      {
        name: "Education Management - EduProSphere",
        type: "Individual Project",
        links: {
          live: "EduProSphere",
          github: "EduProSphere",
          server: "EduProSphere"
        },
        features: [
          "Seamless Class Management: Manage schedules, track attendance, and share resources",
          "Enhanced Student Experience: Offering for accessing courses and assignments",
          "Secure Payment Integration: Powered by Stripe for secure and reliable transactions"
        ],
        technologies: ["React.js", "Tailwind CSS", "React Router", "Firebase", "MongoDB", "Node.js", "Express.js", "JWT"]
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Professional Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Building scalable solutions and leading development projects with modern technologies.
          </p>
        </div>

        {/* Main Experience Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{experience.position}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{experience.company}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {experience.location} | {experience.type}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {experience.projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;