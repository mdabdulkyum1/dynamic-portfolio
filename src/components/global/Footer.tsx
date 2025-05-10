"use client";

import type { ExtendedSession} from "@/types/next-auth";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import LoginWithGitHub from './LoginWithGitHub';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Buttons/Button";
import Link from "next/link";

const Footer = () => {
  const [showSignOut, setShowSignOut] = useState(false);

  const { data: sessionData } = useSession();
  const session = sessionData as ExtendedSession | null; 

  const router = useRouter();

  const handelSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <footer className="bg-t-blue py-10 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo or Name */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-accent to-dark-accent dark:from-dark-accent dark:to-light-accent">
              Md Abdul Kyum
            </h2>
            <p className="text-steel-gray">Jr. Frontend Developer</p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center items-center md:justify-start gap-6">
            {
              session?.user?.role === "admin" && (
            <li>
              <Link href="/dashboard" className="text-slate-gray hover:text-t-flax transition">
                  My Dashboard
              </Link>
            </li>
              )
            }
            <li>
              <a href="#about" className="text-slate-gray hover:text-t-flax transition">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="text-slate-gray hover:text-t-flax transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className="text-slate-gray hover:text-t-flax transition">
                Contact
              </a>
            </li>
            <li>
              {session ? 
              
              ( <div className="relative">
                <Image
                  src={session.user?.image || ""}
                  width={32}
                  height={32}
                  alt="User"
                  onClick={() => setShowSignOut(!showSignOut)}
                  className="w-8 h-8 rounded-full cursor-pointer border border-slate-500"
                />
          
                {showSignOut && (
                  <div onClick={() => handelSignOut()} className="relative">
                    <div className="absolute w-3xs">
                     <Button text={"Sign Out"}></Button>
                     </div>
                  </div>
                )}
              </div>) 
              
              : 
              
              <LoginWithGitHub />}
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="flex gap-5">
            <a href="https://github.com/mdabdulkyum1" target="_blank" rel="noopener noreferrer" className="hover:text-t-flax transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/md-abdul-kyum" target="_blank" rel="noopener noreferrer" className="hover:text-t-flax transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://x.com/kyummdabdul" target="_blank" rel="noopener noreferrer" className="hover:text-t-flax transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://web.facebook.com/mdabdulkyum5325/" target="_blank" rel="noopener noreferrer" className="hover:text-t-flax transition">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Legal Section */}
        <div className="text-center text-steel-gray text-sm">
          <p>&copy; {new Date().getFullYear()} Md Abdul Kyum. All rights reserved.</p>
          <p>
            <a href="/privacy-policy" className="hover:text-t-flax transition">Privacy Policy</a>{" "}
            |{" "}
            <a href="/terms-of-service" className="hover:text-t-flax transition">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
