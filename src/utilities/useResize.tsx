import { max } from "lodash";
import { useEffect, useState } from "react";

export const useResize = (defaultSize = 100) => {
  const [size, setSize] = useState<number>(defaultSize);
  const [sizeRate, setSizeRate] = useState<number>(0);

  useEffect(() => {
    const sizeInterval = setInterval(() => {
      setSize((size) => max([defaultSize, size + sizeRate * 5])!);
    }, 50);

    return () => {
      clearInterval(sizeInterval);
    };
  }, [defaultSize, sizeRate]);

  return {
    size,
    onResizeIncreasing: () => setSizeRate(1),
    onResizeDecreasing: () => setSizeRate(-1),
    onResizeCancelled: () => setSizeRate(0),
  };
};
