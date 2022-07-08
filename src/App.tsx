import { chunk, padStart, round } from "lodash";
import { observer } from "mobx-react";
import React, { ChangeEvent, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import { ImageUpload } from "./components/ImageUpload";
import { PhotoCard } from "./components/PhotoCard";
import { resolution, ResolutionMode } from "./store/resolution";

const App = observer(() => {
  const componentsRef = React.useRef<HTMLDivElement[]>([]);
  const componentRef = React.useRef<HTMLDivElement>();

  const [images, setImages] = useState<string[]>([
    "default-1.jpeg",
    "default-2.jpeg",
    "default-3.jpeg",
    "default-4.jpeg",
    "default-5.jpeg",
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
      <div
        className="photo-cards-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "min-content",
          placeContent: "center",
          gap: "2rem",
        }}
      >
        <h1 style={{ color: "var(--primary)" }}>Photo Card 4x3</h1>
        <ImageUpload onChange={handleImagesChanged} />
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
        <button onClick={handleDownload} style={{ placeSelf: "end" }}>
          Download
        </button>
      </div>
    </div>
  );
});

export default App;
