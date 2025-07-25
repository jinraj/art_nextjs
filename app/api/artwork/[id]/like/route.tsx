
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/client";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const updated = await prisma.ArtWork.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ likes: updated.likes }, { status: 200 });
  } catch (err) {
    console.error('Failed to increment likes', err);
    return NextResponse.json({ error: 'Failed to like artwork' }, { status: 500 });
  }
}
