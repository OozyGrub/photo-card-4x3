import { chunk, padStart, round } from "lodash";
import React, { ChangeEvent, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import "./App.css";

const PPI = 300;

const DividedPhotoCard = ({ src }: { src: string }) => {
  return (
    <div
      className="photo-card-4x3"
      style={{ padding: 0.1 * PPI, overflow: "hidden" }}
    >
      {src && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 0,
            padding: "100% 0 0",
            overflow: "hidden",
            backgroundImage: `url("${src}")`,
            backgroundSize: "cover",
          }}
        />
      )}
    </div>
  );
};

interface PhotoCardProps {
  images: string[];
}
const PhotoCard = React.forwardRef<HTMLDivElement, PhotoCardProps>(
  ({ images }, ref) => {
    return (
      <div
        ref={ref}
        className="photo-card-4x6"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr min-content 1fr",
          width: 6 * PPI,
          height: 4 * PPI,
          background: "white",
          border: "1px solid lightgrey",
        }}
      >
        <DividedPhotoCard src={images[0]} />
        <div
          className="photo-card-divider"
          style={{ borderLeft: "1px dashed lightgrey" }}
        />
        <DividedPhotoCard src={images[1]} />
      </div>
    );
  }
);

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
  const componentsRef = React.useRef<HTMLDivElement[]>([]);
  const componentRef = React.useRef<HTMLDivElement>();

  const [images, setImages] = useState<string[]>([
    "indian-pond-heron.JPG",
    "indian-pond-heron.JPG",
  ]);

  const handleImagesChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(urls);
    }
  };

  const handleDownload = () => {
    const prefix = "photo-card";
    const numCards = round(images.length / 2);

    for (let i = 0; i < numCards; i++) {
      componentRef.current = componentsRef.current[i]!;
      exportComponentAsJPEG(componentRef as any, {
        fileName: `${prefix}-${padStart(`${i + 1}`, 3, "0")}`,
      });
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
        {chunk(images, 2).map((images, i) => (
          <PhotoCard
            key={i}
            ref={(el) => {
              if (el) componentsRef.current[i] = el;
            }}
            images={images}
          />
        ))}
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default App;
