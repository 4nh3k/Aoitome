import React, { useState, useEffect } from "react";

const Shimmer = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData("This is the real data!");
    }, 3000);
  }, []);

  return (
    <div className="w-[400px] h-[200px] bg-white">
      {data !== '' ? (
        <div>{data}</div>
      ) : (
        <div className="shimmer"></div> // Show shimmer effect while loading
      )}
    </div>
  );
};

export default Shimmer;
