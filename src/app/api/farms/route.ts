import { NextResponse } from 'next/server';
import { getAllFarms, getFarmMetrics } from '@/mock/util';

export async function GET() {
  try {
    const farms = getAllFarms();
    const metrics = getFarmMetrics(farms);
    
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
