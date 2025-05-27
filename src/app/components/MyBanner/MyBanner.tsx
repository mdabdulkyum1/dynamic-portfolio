
"use client";

import Button from "@/components/global/Buttons/Button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import useTypewriter from "react-typewriter-hook";
import "./MyBanner.css";

const MyBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typewriterText = useTypewriter("MERN Stack Developer | Backend Developer | Problem Solver");

  // Download function using the working SweetAlert2 approach
  const handleDownload = () => {
    
    try {
      console.log("Starting download...");
      window.open(
        "https://docs.google.com/document/d/16nywkcbciu4U-1KTKAWCSxWDyUU7Ljjv_8DGrniKhaE/export?format=pdf",
        "_blank"
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download the resume. Please try viewing it instead or check the link.");
      setIsModalOpen(false);
    }
  };

  const handleView = () => {
    window.open(
      "https://docs.google.com/document/d/16nywkcbciu4U-1KTKAWCSxWDyUU7Ljjv_8DGrniKhaE",
      "_blank"
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-12 transition-all duration-500">
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6 animate-fadeIn">
        <h2 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
          Hi, I{"'"}m Abdul Kyum
        </h2>
        <h3 className="text-2xl lg:text-4xl font-semibold text-gray-800 dark:text-slate-200 min-h-[40px]">
          {typewriterText}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 text-lg">
          Passionate MERN Stack Developer dedicated to crafting seamless, user-friendly digital experiences. Explore my projects and connect with me!
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
          <span className="font-medium">Email:</span> kyummdabdul@gmail.com | <span className="font-medium">Phone:</span> +8801754-462-008
        </p>

        {/* Social Links */}
        <div className="flex justify-center lg:justify-start gap-6 mt-8">
          <a
            href="https://github.com/mdabdulkyum1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/md-abdul-kyum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://x.com/kyummdabdul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://web.facebook.com/mdabdulkyum5325/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <Facebook size={28} />
          </a>
        </div>

        {/* Resume Button with Modal */}
        <div className="mt-8">
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger asChild>
              <div>
                 <Button text="Get My Resume" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-800 dark:text-white">Download Resume</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                  What would you like to do with my resume?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleView}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View
                </AlertDialogAction>
                <AlertDialogAction 
                  onClick={handleDownload}
                  className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Download
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
        <div className="relative">
          <div className="w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            {/* Placeholder for profile image */}
            <img
              src="/path/to/your-profile-image.jpg"
              alt="Profile"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full opacity-50 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MyBanner;
