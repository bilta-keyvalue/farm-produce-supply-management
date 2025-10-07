'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function refreshData() {
  try {
    // Revalidate the dashboard page
    revalidatePath('/');
    
    // Revalidate all farm detail pages
    revalidatePath('/farms/[id]', 'page');
    
    // Revalidate fetch cache for API endpoints
    revalidateTag('farms');
    revalidateTag('farm-details');
    
    return {
      success: true,
      message: 'Data refreshed successfully',
      timestamp: new Date().toISOString(),
      revalidated: ['dashboard', 'farm-details', 'api-cache']
    };
  } catch (error) {
    console.error('Failed to refresh data:', error);
    return {
      success: false,
      message: 'Failed to refresh data',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
