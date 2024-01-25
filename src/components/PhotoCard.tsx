import React from "react";
import { ChildPhotoCard } from "./ChildPhotoCard";

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
          // gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr min-content 1fr",
          width: 4 * ppi,
          height: 6 * ppi,
          background: "white",
          border: "1px solid black",
        }}
      >
        <ChildPhotoCard src={images[0]} position="left" ppi={ppi} />
        <div style={{ borderTop: "1px solid black" }} />
        <ChildPhotoCard src={images[1]} position="right" ppi={ppi} />
      </div>
    );
  }
);
