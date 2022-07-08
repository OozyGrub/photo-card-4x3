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
          gridTemplateColumns: "1fr min-content 1fr",
          width: 6 * ppi,
          height: 4 * ppi,
          background: "white",
          border: "1px solid lightgrey",
        }}
      >
        <ChildPhotoCard src={images[0]} />
        <div style={{ borderLeft: "1px dashed lightgrey" }} />
        <ChildPhotoCard src={images[1]} />
      </div>
    );
  }
);
