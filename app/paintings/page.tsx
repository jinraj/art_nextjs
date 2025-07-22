import React from 'react'
import TitleLayout from '../components/TitleLayout'
import ImageCard from '../components/ImageCard'


const paintings = [
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: [
            '/resources/images/paintings/image1_1.jpg',
            '/resources/images/paintings/image2_1.jpg',
            '/resources/images/paintings/image6_1.jpg',
            '/resources/images/paintings/image4_1.jpg'
        ],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image2_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image3_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image4_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image5_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image7_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image3_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image4_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image5_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image6_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image7_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "painting",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/paintings/image8_1.jpg', '/resources/images/paintings/image3_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo1_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo2_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo3_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo4_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo5_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo4_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo5_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo6_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo7_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo8_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo9_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    },
    {
        id: 1,
        type: "photography",
        label: 'Image 1',
        desc: 'Image description',
        images: ['/resources/images/photography/photo10_1.jpg', '/resources/images/photography/photo6_1.jpg'],
        medium: "Acrylic on canvas",
        size: "24*32",
        createdDt: "",
        modifiedDt: "",
        tags: ["portrait", "girl", "smile"]
    }
];

const Paintings = () => {
  return (
    <div>
      <TitleLayout
        title="Paintings"
        quote="Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks."
      />
      <div className="flex flex-col items-center py-5">
        <ImageCard listOfArtworks={paintings.filter(item => item.type === "painting")} />
      </div>
    </div>
  )
}

export default Paintings
