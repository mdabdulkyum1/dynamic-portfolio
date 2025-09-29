"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Languages, Globe } from "lucide-react";

const About = () => {
  const educationData = {
    degree: "Bachelor of Science (BSc)",
    year: "2022",
    type: "Degree pass course"
  };

  const languagesData = [
    {
      language: "Bengali",
      level: "Native",
      proficiency: 100
    },
    {
      language: "English",
      level: "Proficient in reading and understanding",
      proficiency: 85
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Professional background, education, and communication skills.
          </p>
        </div>

        {/* About Me Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I&apos;m <span className="font-semibold text-gray-900 dark:text-white">MD ABDUL KYUM</span>, 
                  a dedicated Full-stack Developer with expertise in modern web technologies. 
                  Based in Bangladesh, I specialize in building scalable, secure, and user-friendly applications.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  My experience spans both front-end and back-end development, with a focus on real-time applications, 
                  system integration, and creating efficient solutions that address real-world challenges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Education Card */}
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <GraduationCap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {educationData.degree}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Graduated in {educationData.year}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {educationData.type}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <Languages className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {languagesData.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {lang.language}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.level === "Native" ? "Native" : "Proficient"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${lang.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Professional Attributes */}
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                Attributes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Problem Solver", 
                  "Team Collaboration", 
                  "Continuous Learning", 
                  "Innovation Focused"
                ].map((attribute, index) => (
                  <div key={index} className="flex items-center py-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{attribute}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;