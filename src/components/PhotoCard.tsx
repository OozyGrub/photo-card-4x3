import React from "react";

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
