"use server";

import Projects from "../../../models/Projects";
import connectDB from "../db";

// Track project view
export async function trackProjectView(projectId: string): Promise<boolean> {
  try {
    await connectDB();
    
    await Projects.findByIdAndUpdate(
      projectId,
      {
        $inc: { "analytics.views": 1 },
        $set: { "analytics.lastViewed": new Date() }
      }
    );
    
    return true;
  } catch (error) {
    console.error("Error tracking view:", error);
    return false;
  }
}

// Track project click
export async function trackProjectClick(projectId: string): Promise<boolean> {
  try {
    await connectDB();
    
    await Projects.findByIdAndUpdate(
      projectId,
      {
        $inc: { "analytics.clicks": 1 }
      }
    );
    
    return true;
  } catch (error) {
    console.error("Error tracking click:", error);
    return false;
  }
}

// Get analytics data for dashboard
export async function getProjectAnalytics(): Promise<{
  totalProjects: number;
  totalViews: number;
  totalClicks: number;
  statusBreakdown: { status: string; count: number }[];
  categoryBreakdown: { category: string; count: number; views: number }[];
  topViewedProjects: { title: string; views: number; clicks: number }[];
  recentActivity: { title: string; action: string; date: Date }[];
}> {
  try {
    await connectDB();
    
    // Get all projects for analysis
    const projects = await Projects.find({}).lean();
    
    const totalProjects = projects.length;
    const totalViews = projects.reduce((sum, p) => sum + (p.analytics?.views || 0), 0);
    const totalClicks = projects.reduce((sum, p) => sum + (p.analytics?.clicks || 0), 0);
    
    // Status breakdown
    const statusMap = new Map<string, number>();
    projects.forEach(project => {
      const status = project.status || 'draft';
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });
    const statusBreakdown = Array.from(statusMap, ([status, count]) => ({ status, count }));
    
    // Category breakdown
    const categoryMap = new Map<string, { count: number; views: number }>();
    projects.forEach(project => {
      const category = project.category;
      const existing = categoryMap.get(category) || { count: 0, views: 0 };
      categoryMap.set(category, {
        count: existing.count + 1,
        views: existing.views + (project.analytics?.views || 0)
      });
    });
    const categoryBreakdown = Array.from(categoryMap, ([category, data]) => ({
      category,
      count: data.count,
      views: data.views
    }));
    
    // Top viewed projects
    const topViewedProjects = projects
      .sort((a, b) => (b.analytics?.views || 0) - (a.analytics?.views || 0))
      .slice(0, 5)
      .map(project => ({
        title: project.title,
        views: project.analytics?.views || 0,
        clicks: project.analytics?.clicks || 0
      }));
    
    // Recent activity (based on last viewed)
    const recentActivity = projects
      .filter(project => project.analytics?.lastViewed)
      .sort((a, b) => new Date(b.analytics!.lastViewed!).getTime() - new Date(a.analytics!.lastViewed!).getTime())
      .slice(0, 10)
      .map(project => ({
        title: project.title,
        action: 'viewed',
        date: new Date(project.analytics!.lastViewed!)
      }));
    
    return {
      totalProjects,
      totalViews,
      totalClicks,
      statusBreakdown,
      categoryBreakdown,
      topViewedProjects,
      recentActivity
    };
  } catch (error) {
    console.error("Error getting analytics:", error);
    return {
      totalProjects: 0,
      totalViews: 0,
      totalClicks: 0,
      statusBreakdown: [],
      categoryBreakdown: [],
      topViewedProjects: [],
      recentActivity: []
    };
  }
}

// Get individual project analytics
export async function getProjectAnalyticsById(projectId: string): Promise<{
  views: number;
  clicks: number;
  lastViewed?: Date;
  clickThroughRate: number;
} | null> {
  try {
    await connectDB();
    
    const project = await Projects.findById(projectId).lean();
    
    if (!project) {
      return null;
    }
    
    const views = project.analytics?.views || 0;
    const clicks = project.analytics?.clicks || 0;
    const clickThroughRate = views > 0 ? (clicks / views) * 100 : 0;
    
    return {
      views,
      clicks,
      lastViewed: project.analytics?.lastViewed,
      clickThroughRate: Math.round(clickThroughRate * 100) / 100
    };
  } catch (error) {
    console.error("Error getting project analytics:", error);
    return null;
  }
}