import { merge } from "lodash";
import React, { useEffect, useState } from "react";

const DividedPhotoCard = ({ src, ppi }: { src: string; ppi: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    setMousePos({
      x: e.offsetX - mousePos.x,
      y: e.offsetY - mousePos.y,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="photo-card-4x3"
      style={{ padding: "4%", overflow: "hidden" }}
    >
      <div
        style={merge<React.CSSProperties, any>(
          {
            position: "relative",
            width: "100%",
            height: 0,
            padding: "100% 0 0",
            overflow: "hidden",
          },
          src
            ? {
                backgroundImage: `url("${src}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : {
                backgroundColor: "var(--disabled)",
              }
        )}
      />
    </div>
  );
};

interface PhotoCardProps {
  images: string[];
  ppi: number;
}

export const PhotoCard = React.forwardRef<HTMLDivElement, PhotoCardProps>(
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
        <DividedPhotoCard src={images[0]} ppi={ppi} />
        <div
          className="photo-card-divider"
          style={{ borderLeft: "1px dashed lightgrey" }}
        />
        <DividedPhotoCard src={images[1]} ppi={ppi} />
      </div>
    );
  }
);
