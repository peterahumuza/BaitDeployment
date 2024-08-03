import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const fadingTime = 300;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setLoaded(true);
      }, fadingTime);
    }, 10);
  }
  , []);
  
  return (
    <Box
      id="loading-screen"
      w="100%"
      h="100%"
      bg="white"
      zIndex={1000}
      position="fixed"
      opacity={loading ? "1" : "0"}
      transition={`opacity ${fadingTime}ms ease-in-out`}
      pointerEvents={loading ? "all" : "none"}
      display={loaded ? "none" : "block"}
    />
  );
};

export default LoadingPage;
