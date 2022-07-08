import { clamp, merge } from "lodash";
import { useEffect, useState } from "react";

export const ChildPhotoCard = ({ src }: { src: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fromPos, setFromPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const posX = clamp(
    isDragging ? pos.x + fromPos.x - mousePos.x : pos.x,
    0,
    100
  );
  const posY = clamp(
    isDragging ? pos.y + fromPos.y - mousePos.y : pos.y,
    0,
    100
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="photo-card-4x3"
      style={{
        padding: "4%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={merge<React.CSSProperties, any>(
          {
            position: "relative",
            width: "100%",
            height: 0,
            padding: "100% 0 0",
            overflow: "hidden",
            cursor: "move",
            opacity: isDragging ? "50%" : "100%",
          },
          src
            ? {
                backgroundImage: `url("${src}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: `${posX}% ${posY}%`,
              }
            : {
                backgroundColor: "var(--disabled)",
              }
        )}
        onClick={(e) => {
          if (isDragging) {
            setFromPos({ x: posX, y: posY });
            setPos({ x: posX, y: posY });
          } else {
            setFromPos({ x: e.clientX, y: e.clientY });
          }
          setIsDragging((o) => !o);
        }}
      />
    </div>
  );
};
