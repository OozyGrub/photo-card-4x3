import { clamp } from "lodash";
import { useState } from "react";
import { useMousePosition } from "./useMousePosition";

export const useMouseDragMove = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fromPos, setFromPos] = useState({ x: 0, y: 0 });
  const mousePos = useMousePosition();

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

  const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setFromPos({ x: posX, y: posY });
      setPos({ x: posX, y: posY });
    } else {
      setFromPos({ x: e.clientX, y: e.clientY });
    }
    setIsDragging(true);
  };

  const onMoveCancelled = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setFromPos({ x: posX, y: posY });
      setPos({ x: posX, y: posY });
    } else {
      setFromPos({ x: e.clientX, y: e.clientY });
    }
    setIsDragging(false);
  };

  return { onMove, onMoveCancelled, posX, posY, isDragging };
};
