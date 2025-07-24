
export const artType = {
  Paintings: 'Paintings',
  Photography: 'Photography',
  Decors: 'Decors',
  Artifacts: 'Artifacts',
}
export const artTypes = [artType.Paintings, artType.Photography, artType.Decors, artType.Artifacts];

export const artworkFormInit = {
  artType: '',
  title: '',
  description: '',
  dimension: '',
  medium: '',
  price: '',
  artistName: 'Jinraj K R',
  isHidden: false,
  isSold: false,
};

export const categories = [
  {
    id: 1,
    title: artType.Paintings,
    images: ['/resources/images/paintings/image4_1.jpg'],
  },
  {
    id: 2,
    title: artType.Photography,
    images: ['/resources/images/photography/photo10_1.jpg'],
  },
  {
    id: 3,
    title: artType.Decors,
    images: ['/resources/images/decors/photo5_1.jpg'],
  },
  {
    id: 4,
    title: artType.Artifacts,
    images: ['/resources/images/decors/home8.jpeg'],
  }
];