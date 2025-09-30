"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";

export interface BulkActionResult {
  success: boolean;
  message: string;
  affected?: number;
}

// Bulk delete projects
export async function bulkDeleteProjects(projectIds: string[]): Promise<BulkActionResult> {
  try {
    if (!projectIds || projectIds.length === 0) {
      return {
        success: false,
        message: "No projects selected for deletion"
      };
    }

    await connectDB();
    
    const result = await Projects.deleteMany({
      _id: { $in: projectIds }
    });

    return {
      success: true,
      message: `Successfully deleted ${result.deletedCount} project(s)`,
      affected: result.deletedCount
    };
  } catch (error) {
    console.error("Error in bulk delete:", error);
    return {
      success: false,
      message: "Failed to delete selected projects"
    };
  }
}

// Bulk status change
export async function bulkUpdateProjectStatus(
  projectIds: string[], 
  status: 'draft' | 'published' | 'archived'
): Promise<BulkActionResult> {
  try {
    if (!projectIds || projectIds.length === 0) {
      return {
        success: false,
        message: "No projects selected for status update"
      };
    }

    await connectDB();
    
    const result = await Projects.updateMany(
      { _id: { $in: projectIds } },
      { $set: { status } }
    );

    return {
      success: true,
      message: `Successfully updated ${result.modifiedCount} project(s) to ${status}`,
      affected: result.modifiedCount
    };
  } catch (error) {
    console.error("Error in bulk status update:", error);
    return {
      success: false,
      message: "Failed to update project status"
    };
  }
}

// Bulk featured toggle
export async function bulkToggleFeatured(
  projectIds: string[], 
  featured: boolean
): Promise<BulkActionResult> {
  try {
    if (!projectIds || projectIds.length === 0) {
      return {
        success: false,
        message: "No projects selected"
      };
    }

    await connectDB();
    
    const result = await Projects.updateMany(
      { _id: { $in: projectIds } },
      { $set: { featured } }
    );

    return {
      success: true,
      message: `Successfully ${featured ? 'featured' : 'unfeatured'} ${result.modifiedCount} project(s)`,
      affected: result.modifiedCount
    };
  } catch (error) {
    console.error("Error in bulk featured toggle:", error);
    return {
      success: false,
      message: "Failed to update featured status"
    };
  }
}

// Export projects data
export async function exportProjects(
  format: 'json' | 'csv' = 'json',
  filters?: {
    status?: string;
    category?: string;
    featured?: boolean;
  }
): Promise<{ success: boolean; data?: any; message: string }> {
  try {
    await connectDB();
    
    let query: any = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.category) query.category = filters.category;
    if (filters?.featured !== undefined) query.featured = filters.featured;
    
    const projects = await Projects.find(query).lean();
    
    if (format === 'json') {
      return {
        success: true,
        data: projects,
        message: `Exported ${projects.length} projects as JSON`
      };
    } else {
      // Convert to CSV format
      const csvHeaders = [
        'ID', 'Title', 'Category', 'Status', 'Featured', 'Views', 'Clicks', 
        'Created Date', 'Live Demo', 'Tech Used'
      ];
      
      const csvRows = projects.map(project => [
        project._id,
        project.title,
        project.category,
        project.status,
        project.featured ? 'Yes' : 'No',
        project.analytics?.views || 0,
        project.analytics?.clicks || 0,
        new Date(project.createdAt).toLocaleDateString(),
        project.liveDemo || '',
        project.techUsed || ''
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      return {
        success: true,
        data: csvContent,
        message: `Exported ${projects.length} projects as CSV`
      };
    }
  } catch (error) {
    console.error("Error exporting projects:", error);
    return {
      success: false,
      message: "Failed to export projects"
    };
  }
}