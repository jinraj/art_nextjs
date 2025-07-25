
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/client";
import { authenticateRequest } from '@/app/auth/auth';

type Context = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, context: Context) {
  try {
    console.log("Updating artwork likes...");
    const authError = authenticateRequest(request);
    if (authError) return authError;

    const { id } = context.params;
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
