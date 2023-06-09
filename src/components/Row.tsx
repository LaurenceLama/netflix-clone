import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Movie } from "../../typings";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";
import { DocumentData } from "firebase/firestore";

interface Props {
  title: string;
  // for firebase
  movies: Movie | DocumentData[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth //techincally clientWidth is the width of the row of every thumbnail pics
          : scrollLeft + clientWidth; //when no movement on any thumbnails, scrollLeft value is at 0, since there is nothing more on left side. THEN 0 + 1672(the value of clientWidth, depends on screen size of page) is added when pressing right arrow, meaning the value is more than 0 of scrollLeft, then moves to the right by how much is clientWidth added with scrollLeft. Future me, I know u will not get this but, yeh gl nt.
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute opacity-0 top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll  md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute opacity-0 top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
