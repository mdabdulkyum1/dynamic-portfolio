"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock, Users, Code, Database, Globe, MessageCircle, ShoppingCart } from "lucide-react";
import Button from "@/components/global/Buttons/Button";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  features: string[];
  technologies: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 1,
    title: "Full-Stack Web Application Development",
    description: "I will create a complete modern web application with React/Next.js frontend and Node.js backend",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    price: "$899",
    originalPrice: "$1299",
    rating: 4.9,
    reviews: 47,
    deliveryTime: "7 days",
    features: [
      "React/Next.js Frontend",
      "Node.js/Express Backend", 
      "Database Integration",
      "User Authentication",
      "Responsive Design",
      "API Development",
      "Deployment Setup"
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    icon: Code,
    category: "Web Development",
    popular: true
  },
  {
    id: 2,
    title: "Real-time Chat & Collaboration System",
    description: "I will build a team collaboration platform with real-time chat, video calls, and project management",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    price: "$1299",
    originalPrice: "$1899",
    rating: 4.8,
    reviews: 32,
    deliveryTime: "10 days",
    features: [
      "Real-time Chat System",
      "Video Conferencing",
      "Task Management",
      "Team Dashboard",
      "File Sharing",
      "WebSocket Integration",
      "Mobile Responsive"
    ],
    technologies: ["Next.js", "WebSocket", "Node.js", "Prisma", "Redux"],
    icon: MessageCircle,
    category: "Collaboration Tools"
  },
  {
    id: 3,
    title: "E-commerce Website Development", 
    description: "I will create a complete online store with payment integration, inventory management, and admin panel",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    price: "$1099",
    originalPrice: "$1599",
    rating: 4.9,
    reviews: 56,
    deliveryTime: "12 days",
    features: [
      "Product Management",
      "Shopping Cart System",
      "Stripe Payment Integration",
      "Order Management",
      "Admin Dashboard",
      "Inventory Tracking",
      "SEO Optimization"
    ],
    technologies: ["React", "Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    icon: ShoppingCart,
    category: "E-commerce"
  },
  {
    id: 4,
    title: "Educational Management System",
    description: "I will develop a complete LMS platform for schools/courses with student tracking and assignments",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop",
    price: "$1499",
    originalPrice: "$2199",
    rating: 4.7,
    reviews: 28,
    deliveryTime: "14 days",
    features: [
      "Course Management",
      "Student Dashboard",
      "Assignment System",
      "Progress Tracking",
      "Payment Integration",
      "Attendance Management",
      "Certificate Generation"
    ],
    technologies: ["React", "Firebase", "Node.js", "Express", "JWT"],
    icon: Users,
    category: "Education",
    popular: true
  },
  {
    id: 5,
    title: "RESTful API Development & Database Design",
    description: "I will create scalable REST APIs with proper database design, authentication, and documentation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    price: "$599",
    originalPrice: "$899",
    rating: 4.8,
    reviews: 73,
    deliveryTime: "5 days",
    features: [
      "RESTful API Design",
      "Database Schema Design",
      "JWT Authentication",
      "API Documentation",
      "Error Handling",
      "Data Validation",
      "Testing Setup"
    ],
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Postman"],
    icon: Database,
    category: "Backend Development"
  },
  {
    id: 6,
    title: "Portfolio Website + Admin Dashboard",
    description: "I will create a professional portfolio website with content management and analytics dashboard",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
    price: "$699",
    originalPrice: "$999",
    rating: 4.9,
    reviews: 89,
    deliveryTime: "7 days",
    features: [
      "Modern Portfolio Design",
      "Admin Dashboard",
      "Content Management",
      "SEO Optimization",
      "Analytics Integration",
      "Contact Forms",
      "Mobile Responsive"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    icon: Globe,
    category: "Portfolio"
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const categories = ["All", "Web Development", "Backend Development", "E-commerce", "Education", "Portfolio", "Collaboration Tools"];

  const filteredServices = selectedCategory === "All" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-20">
      {/* Header Section */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            My Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Professional development services tailored to bring your ideas to life. From concept to deployment, 
            I deliver high-quality solutions that drive results.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.8★</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}

                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-2">
                    <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="p-6">
                  {/* Service Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  {/* Features (shown on hover) */}
                  {hoveredService === service.id && (
                    <div className="mb-4 animate-fadeIn">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What you get:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing and Delivery */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {service.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {service.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4" />
                      {service.deliveryTime}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <Button text="Order Now" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s discuss your requirements and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
              Get Custom Quote
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}