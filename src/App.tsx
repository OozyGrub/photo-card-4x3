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
    "indian-pond-heron.jpg",
    "mountain-imperial-pigeon.jpg",
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
