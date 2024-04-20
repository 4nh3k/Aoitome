import { useState } from "react";
import { GlassMagnifier } from "react-image-magnifiers-v2";

const images = [
  {
    id: 1,
    src: "https://cdn.pnj.io/images/detailed/201/sp-gbztxmx000008-bong-tai-vang-14k-dinh-da-sythetic-disney-pnj-beauty-the-beast-1.png",
    alt: "Image 1",
    thumbnailSrc:
      "https://cdn.pnj.io/images/detailed/201/sp-gbztxmx000008-bong-tai-vang-14k-dinh-da-sythetic-disney-pnj-beauty-the-beast-1.png",
  },
  {
    id: 2,
    src: "https://cdn.pnj.io/images/detailed/201/on-gbztxmx000008-bong-tai-vang-14k-dinh-da-sythetic-disney-pnj-beauty-the-beast-1.jpg",
    alt: "Image 2",
    thumbnailSrc:
      "https://cdn.pnj.io/images/detailed/201/on-gbztxmx000008-bong-tai-vang-14k-dinh-da-sythetic-disney-pnj-beauty-the-beast-1.jpg",
  },
  // Add more images as needed
];

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-fit">
      <div className="w-20 mr-4 overflow-y-auto lg:flex-col lg:space-y-4 flex">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.thumbnailSrc}
            alt={image.alt}
            className={`w-20 h-20 border-1 border-gray-300 rounded-md shadow-sm object-cover cursor-pointer hover:opacity-75 ${
              index === selectedImageIndex ? "opacity-75" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      <div className="w-96 h-[28rem] relative">
        <div className="absolute inset-0 flex justify-center items-center">
          {/* <img
            src={images[selectedImageIndex].src}
            alt={images[selectedImageIndex].alt}
            className="w-full h-full"
          /> */}
          <GlassMagnifier
            className="w-full h-full input-position border-1 rounded-lg"
            imageSrc={images[selectedImageIndex].src}
            largeImageSrc={
              "https://cdn.pnj.io/images/detailed/201/on-gbztxmx000008-bong-tai-vang-14k-dinh-da-sythetic-disney-pnj-beauty-the-beast-3.jpg"
            }
            imageAlt={images[selectedImageIndex].alt}
            allowOverflow={false}
            magnifierSize={"30%"}
            magnifierBorderSize={2}
            magnifierBorderColor={"rgba(255, 255, 255, .5)"}
            square={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
