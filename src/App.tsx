import { chunk, padStart, round } from "lodash";
import { observer } from "mobx-react";
import React, { ChangeEvent, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import "./App.css";
import { resolution, ResolutionMode } from "./store/resolution";

const DividedPhotoCard = ({ src }: { src: string }) => {
  return (
    <div
      className="photo-card-4x3"
      style={{ padding: "4%", overflow: "hidden" }}
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
  ppi: number;
}
const PhotoCard = React.forwardRef<HTMLDivElement, PhotoCardProps>(
  ({ images, ppi }, ref) => {
    return (
      <div
        ref={ref}
        className="photo-card-4x6"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr min-content 1fr",
          width: 6 * ppi,
          height: 4 * ppi,
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

const App = observer(() => {
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
    resolution.set(ResolutionMode.EXPORT);
    setTimeout(() => {
      const prefix = "photo-card";
      const numCards = round(images.length / 2);

      for (let i = 0; i < numCards; i++) {
        componentRef.current = componentsRef.current[i]!;
        exportComponentAsJPEG(componentRef as any, {
          fileName: `${prefix}-${padStart(`${i + 1}`, 3, "0")}`,
        });
      }

      resolution.set(ResolutionMode.DISPLAY);
    });
  };

  return (
    <div
      className="wrapper"
      style={{
        display: "grid",
        gap: "2rem",
        margin: "2rem 2rem",
      }}
    >
      <ImageUpload onChange={handleImagesChanged} />
      <div
        className="photo-cards-layout"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          gap: "2rem",
        }}
      >
        {chunk(images, 2).map((images, i) => (
          <PhotoCard
            ppi={resolution.ppi}
            key={i}
            ref={(el) => {
              if (el) componentsRef.current[i] = el;
            }}
            images={images}
          />
        ))}
      </div>
      <button onClick={handleDownload} style={{ width: 300 }}>
        Download
      </button>
    </div>
  );
});

export default App;
