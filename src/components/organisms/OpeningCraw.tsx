import React, { useEffect, useRef } from "react";
import { randomPosition } from "~/helpers/randomPosition";
import { romanize } from "~/helpers/romanize";
import StarWarsLogo from "../atoms/StarWarsLogo";

export interface OpeningCrawProps {
  episodeId: number;
  title: string;
  content: string;
  numStars?: number;
}

const OpeningCraw: React.FC<OpeningCrawProps> = ({
  content,
  episodeId,
  title,
  numStars = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Sets the number of stars we wish to display
    // For every star we want to display
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "absolute w-px h-px bg-[white]";
      const [x, y] = randomPosition();
      star.style.top = x + "px";
      star.style.left = y + "px";
      containerRef.current.append(star);
    }
  }, [numStars]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col relative w-full leading-[3rem] h-full bg-black overflow-hidden"
    >
      <section className="absolute z-[1] animate-[intro_6s_ease-out_1s] text-[rgb(75,213,238)] font-normal text-[300%] opacity-0 left-[25%] top-[30%]">
        A long time ago, in a galaxy far,
        <br /> far away....
      </section>
      <section className="absolute z-[1] animate-[logo_9s_ease-out_9s] opacity-0 m-auto left-[40%] top-[20%] ">
        <StarWarsLogo />
      </section>
      {/* Change the text to your liking */}
      <div
        style={{
          transform: "perspective(300px) rotateX(25deg)",
          fontFamily: "Century Gothic, CenturyGothic, AppleGothic, sans-serif",
        }}
        className="origin-[50%_100%] text-justify absolute ml-[-9em] font-bold overflow-hidden text-[350%] h-[50em] w-[18em] left-2/4 bottom-0 after:absolute after:content-['_'] after:top-0 after:bottom-[60%] after:inset-x-0"
      >
        <div className="text-[#FFFF82] animate-[scroll_100s_linear_16s] absolute top-full">
          <p id="text-center">Episode {romanize(episodeId)}</p>
          <p id="text-center">{title}</p>
          <br />
          {/* And make it cheesy ! */}
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default OpeningCraw;
