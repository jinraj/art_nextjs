import { PrismaClient } from '@prisma/client';
import artworks from '../app/constants/artworksData';

const prisma = new PrismaClient();

async function main() {
  await prisma.ArtWork.createMany({
    data: artworks
  });

  console.log('Artworks inserted');
}

// To run the main function to insert artworks into the mongodb, 
// run the following command in your terminal - npx tsx prisma/seed.ts
main()
  .catch(e => {
    console.error('Error inserting artworks:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
