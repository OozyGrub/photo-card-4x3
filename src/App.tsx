import { chunk } from "lodash";
import React, { ChangeEvent, useState } from "react";
import "./App.css";

const DividedPhotoCard = ({ src }: { src: string }) => {
  return (
    <div
      className="photo-card-4x3"
      style={{ padding: "10px", overflow: "hidden" }}
    >
      {src && (
        <img
          src={src}
          alt="indian-pond-heron"
          style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

const PhotoCard = ({ images }: { images: string[] }) => {
  return (
    <div
      className="photo-card-4x6"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr min-content 1fr",
        width: "6in",
        height: "4in",
        background: "white",
        border: "1px solid lightgrey",
      }}
    >
      <DividedPhotoCard src={images[0]} />
      <div
        className="photo-card-divider"
        style={{ borderLeft: "1px dashed lightgrey" }}
      ></div>
      <DividedPhotoCard src={images[1]} />
    </div>
  );
};

const ImageUpload = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <form>
      <input type="file" accept="image/*" multiple onChange={onChange} />
    </form>
  );
};

function App() {
  const [images, setImages] = useState<string[]>([]);

  const handleImagesChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(urls);
    }
  };
  return (
    <div
      className="wrapper"
      style={{
        display: "grid",
        gap: "2rem",
        margin: "5rem 5rem",
      }}
    >
      <ImageUpload onChange={handleImagesChanged} />
      <div
        className="photo-cards-layout"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {chunk(images, 2).map((images, idx) => (
          <PhotoCard key={idx} images={images} />
        ))}
      </div>
    </div>
  );
}

export default App;
