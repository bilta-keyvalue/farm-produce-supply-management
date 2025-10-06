import { NextResponse } from 'next/server';
import { getAllFarms, calculateOverallMetrics } from '@/lib/data';

export async function GET() {
  try {
    const farms = getAllFarms();
    const metrics = calculateOverallMetrics(farms);
    
    return NextResponse.json({
      farms,
      metrics
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch farms data' },
      { status: 500 }
    );
  }
}
