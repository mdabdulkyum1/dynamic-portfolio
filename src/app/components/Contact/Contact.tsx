"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook } from "lucide-react";

const Contact = () => {
  const contactInfo = {
    email: "kyummdabdul@gmail.com",
    phone: "+8801754-462-008",
    location: "Bangladesh",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/mdabdulkyum1",
        icon: <Github className="w-5 h-5" />
      },
      {
        name: "LinkedIn", 
        url: "https://www.linkedin.com/in/md-abdul-kyum",
        icon: <Linkedin className="w-5 h-5" />
      },
      {
        name: "Twitter",
        url: "https://x.com/kyummdabdul",
        icon: <Twitter className="w-5 h-5" />
      },
      {
        name: "Facebook",
        url: "https://web.facebook.com/mdabdulkyum5325/",
        icon: <Facebook className="w-5 h-5" />
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to collaborate? Let&apos;s discuss your next project and bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Email</p>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Phone</p>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Location</p>
                  <p className="text-gray-600 dark:text-gray-300">{contactInfo.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links & CTA */}
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                Follow me on social media and let&apos;s connect! I love discussing technology, sharing insights, and collaborating on exciting projects.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(`mailto:${contactInfo.email}`)}
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open("https://docs.google.com/document/d/16nywkcbciu4U-1KTKAWCSxWDyUU7Ljjv_8DGrniKhaE", "_blank")}
                  >
                    View Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;