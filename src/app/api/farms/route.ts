import { NextResponse } from 'next/server';
import { getAllFarms, getOverallMetrics } from '@/mock/util';

export async function GET() {
  try {
    console.log('API: Starting to fetch farms...');
    const farms = getAllFarms();
    console.log('API: Got farms, count:', farms.length);
    
    console.log('API: Calculating metrics...');
    const metrics = getOverallMetrics(farms);
    console.log('API: Got metrics:', metrics);
    
    return NextResponse.json({
      farms,
      metrics
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch farms data', details: error as string },
      { status: 500 }
    );
  }
}
