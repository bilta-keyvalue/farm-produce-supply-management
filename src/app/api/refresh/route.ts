import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    revalidatePath('/');
    
    revalidatePath('/farms/[id]', 'page');
    
    return NextResponse.json({ 
      message: 'Data refreshed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to refresh data' },
      { status: 500 }
    );
  }
}
