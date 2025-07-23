import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";


export async function GET(request: NextRequest) {
  try {
    // Fetch all artworks
    const artworks = await prisma.ArtWork.findMany();
    if (!artworks || artworks.length === 0) {
      return NextResponse.json({ message: "No artworks found" }, { status: 404 });
    }
    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Validate required fields
    if (!data.title || !data.description || !data.images || !data.artType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create new artwork
    const newArtwork = await prisma.ArtWork.create({
      data: {
        title: data.title,
        description: data.description,
        images: data.images,
        artType: data.artType,
        dimensions: data.dimensions || null,
        price: data.price || 0,
      },
    });

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error("Error creating artwork:", error);
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 });
    }

    // Delete artwork by ID
    const deletedArtwork = await prisma.ArtWork.delete({
      where: { id },
    });

    return NextResponse.json(deletedArtwork, { status: 200 });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 });
    }

    // Update artwork by ID
    const updatedArtwork = await prisma.ArtWork.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedArtwork, { status: 200 });
  } catch (error) {
    console.error("Error updating artwork:", error);
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 });
  }
}