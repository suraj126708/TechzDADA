import React from "react";

const YoutubePart = ({ videoId }) => {
  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubePart;
