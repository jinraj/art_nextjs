
export const artType = {
  Home: {
    name: 'Meaningful',
    quotes: [
      'Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks.',
      'Step into a world where imagination comes alive, and let the artworks guide you on extraordinary journeys',
      'Art enables us to find ourselves and lose ourselves at the same time. It is a journey of self-discovery and expression.',
    ],
  },
  Paintings: {
    name: 'Paintings',
    quotes: [
      'Paintings are the windows to the soul, capturing emotions and stories in vibrant colors and intricate brushstrokes.',
      'Each painting is a unique expression of creativity, inviting you to explore the depths of imagination and inspiration.',
      'Artworks evoke a sense of joy and inspiration, Make it bring a smile to your soul. Feel the life in the meaningful artworks.'
    ],
  },
  Photography: {
    name: 'Photography',
    quotes: [
      'Discover a world of positivity and warmth. Experience the enchantment and emotional depth of the artistic creations.',
      'Discover the interplay of light and shadow in the sculptures, capturing moments frozen in time, waiting to be explored'
    ],
  },
  Decors: {
    name: 'Decors',
    quotes: [
      'Decor pieces are like silent poets, adorning your space with verses of beauty and grace.',
      'Transform your space into a haven of creativity and inspiration with the captivating decor pieces.'
    ],
  },
  Artifacts: {
    name: 'Artifacts',
    quotes: [
      'Artifacts are the storytellers of history, whispering tales of cultures and civilizations long gone.',
      'Each artifact is a testament to human creativity, a bridge connecting us to our ancestors and their legacies.',
      'Experience the enchantment and emotional depth of the artistic creations'
    ]
  },
}

export const artTypes = [artType.Paintings.name, artType.Photography.name, artType.Decors.name, artType.Artifacts.name];

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
    id: '1',
    title: artType.Paintings.name,
    images: ['/resources/images/paintings/image2_1.jpg'],
  },
  {
    id: '2',
    title: artType.Photography.name,
    images: ['/resources/images/photography/photo1_1.jpg'],
  },
  {
    id: '3',
    title: artType.Decors.name,
    images: ['/resources/images/decors/photo5_1.jpg'],
  }
];