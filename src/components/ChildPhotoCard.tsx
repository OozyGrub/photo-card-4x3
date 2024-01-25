import { merge } from "lodash";
import { cmToInches } from "../utilities/conversion";
import { useMouseDragMove } from "../utilities/useMouseDragMove";
import { useResize } from "../utilities/useResize";

export const ChildPhotoCard = ({
  src,
  position,
  ppi,
}: {
  src: string;
  position: "left" | "right";
  ppi: number;
}) => {
  const { onMove, onMoveCancelled, posX, posY, isDragging } =
    useMouseDragMove();
  const { size, onResizeIncreasing, onResizeDecreasing, onResizeCancelled } =
    useResize(100);

  const borderStyle = {
    borderTop: position === "left" ? "1px solid black" : undefined,
    borderBottom: position === "left" ? undefined : "1px solid black",
  };

  return (
    <div style={{ display: "grid" }}>
      <div
        className="photo-card-4x3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: position === "left" ? "end" : "start",
          flexDirection: "column",
        }}
      >
        <div
          style={merge<React.CSSProperties, any>(
            {
              position: "relative",
              width: cmToInches(8.9) * ppi,
              padding: `${cmToInches(6.4) * ppi}px 0 0`,
              overflow: "hidden",
              cursor: "move",
              opacity: isDragging ? "50%" : "100%",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              ...borderStyle,
              // filter: "brightness(1.1)",
            },
            src
              ? {
                  backgroundImage: `url("${src}")`,
                  backgroundSize: `${size}%`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${posX}% ${posY}%`,
                }
              : {
                  backgroundColor: "var(--disabled)",
                }
          )}
          onMouseDown={onMove}
          onMouseUp={onMoveCancelled}
          onMouseOut={onMoveCancelled}
        ></div>
        <div
          style={{
            position: "relative",
            bottom: "50%",
            width: "100%",
            height: 0,
            right: -10,
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{ width: 0, height: 0 }}
            className="size-button"
            onMouseDown={onResizeIncreasing}
            onMouseUp={onResizeCancelled}
            onMouseOut={onResizeCancelled}
          >
            ➕
          </div>
          <div
            style={{ width: 0, height: 0 }}
            className="size-button"
            onMouseDown={onResizeDecreasing}
            onMouseUp={onResizeCancelled}
            onMouseOut={onResizeCancelled}
          >
            ➖
          </div>
        </div>
      </div>
    </div>
  );
};
