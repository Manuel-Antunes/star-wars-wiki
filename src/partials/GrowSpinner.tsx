import clsx from "clsx";
import React from "react";
import { randomImage } from "~/helpers/randomImage";

interface GrowSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

const GrowSpinner: React.FC<GrowSpinnerProps> = ({
  size = "sm",
}) => (
  <img
    src={randomImage()}
    className={clsx("spinner is-grow relative", {
      "h-7 w-7": size === "sm",
      "h-10 w-10": size === "md",
      "h-14 w-14": size === "lg",
      "h-20 w-20": size === "xl",
      "h-28 w-28": size === "2xl",
      "h-36 w-36": size === "3xl",
    })}
  >
  </img>
);

export default GrowSpinner;
