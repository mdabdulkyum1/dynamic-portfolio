"use client";

import { useActionState, useState, useEffect } from "react";
import { SubmitButton } from "./SubmitButton";
import Image from "next/image";
import { addProject } from "@/lib/actions/add-project";

interface Project {
  _id?: string;
  title: string;
  link: string;
  image: string;
  category: string;
  description?: string;
  techUsed?: string;
  gitClient?: string;
  gitServer?: string;
  images?: string[];
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  liveDemo?: string;
  documentation?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  duration?: string;
  teamSize?: number;
  priority?: number;
  tags?: string[];
}

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

const IMGBB_API_KEY = "f870e4fdb469d5f50b09a7932196d6b2";

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const [state, formAction] = useActionState(addProject, null);
  const [mainImage, setMainImage] = useState<string>(project?.image || "");
  const [imageUrls, setImageUrls] = useState<string[]>(project?.images || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0); // To reset form
  const [title, setTitle] = useState<string>(project?.title || "");
  const [link, setLink] = useState<string>(project?.link || "");
  const [category, setCategory] = useState<string>(project?.category || "");

  // Compute isSubmitDisabled dynamically
  const isSubmitDisabled = !mainImage || uploading || !title.trim() || !link.trim() || !category.trim();

  // Reset form on successful submission (create mode only)
  useEffect(() => {
    if (state?.success && !isEdit) {
      setSuccessMessage("Project added successfully!");
      setMainImage("");
      setImageUrls([]);
      setUploadError(null);
      setTitle("");
      setLink("");
      setCategory("");
      setFormKey((prev) => prev + 1);
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
    }
  }, [state?.success, isEdit]);

  // Upload single image to ImgBB
  async function uploadImage(file: File): Promise<string> {
    const MAX_FILE_SIZE = 15 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be less than 15MB.");
    }
    const base64 = await toBase64(file);
    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64.replace(/^data:image\/\w+;base64,/, ""));

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!data.success) {
      throw new Error("Upload failed");
    }
    return data.data.url;
  }

  // Handle main image upload
  async function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      const url = await uploadImage(e.target.files[0]);
      setMainImage(url);
    } catch (error) {
      console.error("Main image upload error:", error);
      const err = error as Error;
      setUploadError(err.message || "Failed to upload main image. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // Handle multiple images upload
  async function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploading(true);
    setUploadError(null);
    try {
      const urls: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const url = await uploadImage(e.target.files[i]);
        // Prevent duplicate URLs and main image overlap
        if (!imageUrls.includes(url) && url !== mainImage) {
          urls.push(url);
        }
      }
      if (urls.length === 0) {
        setUploadError("No new unique images were uploaded.");
      } else {
        setImageUrls((prev) => [...prev, ...urls]);
      }
    } catch (error) {
      console.error("Images upload error:", error);
      const err = error as Error;
      setUploadError(err.message || "Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // Convert file to base64
  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // Remove main image
  const clearMainImage = () => {
    if (window.confirm("Are you sure you want to remove the main image?")) {
      setMainImage("");
    }
  };

  // Remove additional image
  const removeImage = (index: number) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) {
      setUploadError("Please fill in all required fields and upload a main image.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };

  return (
    <div className="bg-white shadow-md p-8 rounded-md">
      {successMessage && (
        <p className="text-green-600 mb-4 text-center">{successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        key={formKey}
      >
        {isEdit && project?._id && (
          <input type="hidden" name="_id" value={project._id} />
        )}
        <input type="hidden" name="image" value={mainImage} />
        <input type="hidden" name="images" value={imageUrls.join(",")} />

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="block text-sm font-semibold mb-1">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. My Awesome Portfolio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.title}</p>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="block text-sm font-semibold mb-1">
            Category
          </label>
          <input
            list="category-options"
            type="text"
            name="category"
            id="category"
            placeholder="e.g. Portfolio"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <datalist id="category-options">
            <option value="Portfolio" />
            <option value="E-commerce" />
            <option value="Landing Page" />
            <option value="Blog" />
            <option value="Dashboard" />
          </datalist>
          <p className="text-red-500 text-sm">{state?.Error?.category}</p>
        </div>

        {/* Live Link */}
        <div className="flex flex-col">
          <label htmlFor="link" className="block text-sm font-semibold mb-1">
            Live Link
          </label>
          <input
            type="url"
            name="link"
            id="link"
            placeholder="https://yourwebsite.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.link}</p>
        </div>

        {/* Git Client Repo */}
        <div className="flex flex-col">
          <label htmlFor="gitClient" className="block text-sm font-semibold mb-1">
            GitHub Client Repo
          </label>
          <input
            type="url"
            name="gitClient"
            id="gitClient"
            placeholder="https://github.com/username/client-repo"
            defaultValue={project?.gitClient || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.gitClient}</p>
        </div>

        {/* Git Server Repo */}
        <div className="flex flex-col">
          <label htmlFor="gitServer" className="block text-sm font-semibold mb-1">
            GitHub Server Repo
          </label>
          <input
            type="url"
            name="gitServer"
            id="gitServer"
            placeholder="https://github.com/username/server-repo"
            defaultValue={project?.gitServer || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.gitServer}</p>
        </div>

        {/* Tech Used */}
        <div className="flex flex-col">
          <label htmlFor="techUsed" className="block text-sm font-semibold mb-1">
            Technologies Used
          </label>
          <input
            type="text"
            name="techUsed"
            id="techUsed"
            placeholder="e.g. React, Tailwind CSS, Firebase"
            defaultValue={project?.techUsed || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.techUsed}</p>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="block text-sm font-semibold mb-1">
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={project?.status || "draft"}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <p className="text-red-500 text-sm">{state?.Error?.status}</p>
        </div>

        {/* Live Demo */}
        <div className="flex flex-col">
          <label htmlFor="liveDemo" className="block text-sm font-semibold mb-1">
            Live Demo URL
          </label>
          <input
            type="url"
            name="liveDemo"
            id="liveDemo"
            placeholder="https://yourdemo.com"
            defaultValue={project?.liveDemo || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.liveDemo}</p>
        </div>

        {/* Documentation */}
        <div className="flex flex-col">
          <label htmlFor="documentation" className="block text-sm font-semibold mb-1">
            Documentation URL
          </label>
          <input
            type="url"
            name="documentation"
            id="documentation"
            placeholder="https://yourdocs.com"
            defaultValue={project?.documentation || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.documentation}</p>
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="block text-sm font-semibold mb-1">
            Project Duration
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            placeholder="e.g. 3 months, 2 weeks"
            defaultValue={project?.duration || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.duration}</p>
        </div>

        {/* Team Size */}
        <div className="flex flex-col">
          <label htmlFor="teamSize" className="block text-sm font-semibold mb-1">
            Team Size
          </label>
          <input
            type="number"
            name="teamSize"
            id="teamSize"
            min="1"
            max="100"
            placeholder="1"
            defaultValue={project?.teamSize || 1}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.teamSize}</p>
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="block text-sm font-semibold mb-1">
            Priority (0-10)
          </label>
          <input
            type="number"
            name="priority"
            id="priority"
            min="0"
            max="10"
            placeholder="0"
            defaultValue={project?.priority || 0}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.priority}</p>
        </div>

        {/* Featured Toggle */}
        <div className="flex flex-col md:col-span-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured || false}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-semibold">Featured Project</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">Featured projects will be highlighted on your portfolio</p>
        </div>

        {/* Features */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="features" className="block text-sm font-semibold mb-1">
            Key Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            id="features"
            placeholder="e.g. User Authentication, Real-time Chat, Payment Integration"
            defaultValue={project?.features?.join(", ") || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.features}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="tags" className="block text-sm font-semibold mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="e.g. react, typescript, tailwind, api"
            defaultValue={project?.tags?.join(", ") || ""}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <p className="text-red-500 text-sm">{state?.Error?.tags}</p>
        </div>

        {/* Challenges */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="challenges" className="block text-sm font-semibold mb-1">
            Challenges Faced
          </label>
          <textarea
            name="challenges"
            id="challenges"
            rows={3}
            placeholder="Describe any technical challenges you faced during development..."
            defaultValue={project?.challenges || ""}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          />
          <p className="text-red-500 text-sm">{state?.Error?.challenges}</p>
        </div>

        {/* Learnings */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="learnings" className="block text-sm font-semibold mb-1">
            Key Learnings
          </label>
          <textarea
            name="learnings"
            id="learnings"
            rows={3}
            placeholder="What did you learn from this project?..."
            defaultValue={project?.learnings || ""}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          />
          <p className="text-red-500 text-sm">{state?.Error?.learnings}</p>
        </div>

        {/* Main Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="mainImage" className="block text-sm font-semibold mb-1">
            Main Image
          </label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleMainImageChange}
            className="border border-gray-300 rounded p-2"
            disabled={uploading}
            required={!isEdit}
          />
          {mainImage && (
            <div className="relative mt-2">
              <Image
                src={mainImage}
                alt="Main Image Preview"
                width={150}
                height={150}
                className="w-20 h-20 object-cover rounded border border-gray-200"
              />
              <button
                type="button"
                onClick={clearMainImage}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
          <p className="text-red-500 text-sm">{state?.Error?.image}</p>
        </div>

        {/* Multiple Images Upload */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="images" className="block text-sm font-semibold mb-1">
            Additional Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="border border-gray-300 rounded p-2"
            disabled={uploading}
          />
          {uploading && <p className="text-blue-600 mt-2">Uploading images...</p>}
          {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

          {/* Preview Thumbnails */}
          <div className="flex flex-wrap mt-4 gap-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <Image
                  src={url}
                  alt={`uploaded-${index}`}
                  width={150}
                  height={150}
                  className="w-20 h-20 object-cover rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description (Full width) */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Write a brief description of the project..."
            defaultValue={project?.description || ""}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          />
          <p className="text-red-500 text-sm">{state?.Error?.description}</p>
        </div>

        {/* Submit Button (Full width) */}
        <div className="md:col-span-2">
          <SubmitButton
            disabled={isSubmitDisabled}
            label={isEdit ? "Update Project" : "Add Project"}
          />
        </div>
      </form>
    </div>
  );
}