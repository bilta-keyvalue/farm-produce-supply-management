import { NextResponse } from 'next/server';
import { getFarmById, getFarmMetrics } from '@/mock/util';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farm = getFarmById(params.id);
    
    if (!farm) {
      return NextResponse.json(
        { error: 'Farm not found' },
        { status: 404 }
      );
    }

    const metrics = getFarmMetrics(farm);
    
    return NextResponse.json({
      farm,
      metrics
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch farm data' },
      { status: 500 }
    );
  }
}
