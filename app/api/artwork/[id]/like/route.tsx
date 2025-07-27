
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/client";
import { authenticateRequest } from '@/app/auth/auth';

type Context = {
  params: {
    id: string;
  };
};

// Basic in-memory rate limiter
const ipLikeMap = new Map<string, Set<string>>();
const requestLog: Map<string, number[]> = new Map();

const RATE_LIMIT = 5;
const WINDOW_MS = 10_000; // 10 seconds

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Updating artwork likes...");
    // const authError = authenticateRequest(request);
    // if (authError) return authError;

    const { id } = params;
    if (!id || typeof id !== 'string' || id.length === 0) {
      console.warn(`Invalid artwork ID received: ${id}`);
      return NextResponse.json({ message: 'Invalid artwork ID' }, { status: 400 });
    }

    // **Rate Limiting**
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'anonymous';
    const ipKey = `${ip}-${id}`;
    const now = Date.now();
    const timestamps = requestLog.get(ipKey) || [];
    console.log("ip", ip, ipKey);

    // Filter out old requests
    const recent = timestamps.filter(ts => now - ts < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      console.warn(`Rate limit exceeded for artwork ID: ${id}, IP: ${ip}`);
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    recent.push(now);
    requestLog.set(ipKey, recent);
    console.log("likes requestLog -", requestLog);
    const existing = await prisma.artWork.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    // Like Toggle Logic
    // Track liked artworks per IP
    const likedArtworks = ipLikeMap.get(ip) || new Set<string>();
    const likeAction = likedArtworks.has(id) ? { decrement: 1 } : { increment: 1 }

    const updated = await prisma.artWork.update({
      where: { id },
      data: {
        likes: likeAction
      },
      select: { likes: true }, // Only return the updated likes count
    });

    if (likedArtworks.has(id)) {
      likedArtworks.delete(id);
    } else {
      likedArtworks.add(id);
    }

    ipLikeMap.set(ip, likedArtworks);
    console.log("updated likes", updated.likes);
    return NextResponse.json({ likes: updated.likes }, { status: 200 });
  } catch (err) {
    console.error('Failed to increment likes', err);
    return NextResponse.json({ error: 'Failed to like artwork' }, { status: 500 });
  }
}
