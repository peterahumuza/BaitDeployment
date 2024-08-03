import React, { useEffect, useState } from 'react';
import { Box, Image, useColorModeValue } from '@chakra-ui/react';

export default function ScoreAnimation({ points, onComplete }) {
    const [visible, setVisible] = useState(false);
    // find the progress bar (with class progress-bar, put the animation on it: 
    // none, then trigger a reflow, then set the animation back to null)
    const ProgressBar = document.querySelector('.progress-bar');

    ProgressBar.style.animation = 'none';
    ProgressBar.offsetHeight;
    ProgressBar.style.animation = null;

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete();
        }, 2000);
        return () => clearTimeout(timer);
        }
    , [points, onComplete]);

    return (
      <Box position="absolute" bottom="0" left="0" w="100%" h="100%" display="flex" justifyContent="center" alignItems="flex-end" zIndex="2">
        <Image src={'assets/icon/shield.svg'} alt="Shield Icon" animation="hoverOverBar 2s forwards" />
        <style jsx>{`
          @keyframes hoverOverBar {
            0% {
              bottom: 50px;
              opacity: 1;
            }
            50% {
              bottom: 80px;
              opacity: 1;
            }
            100% {
              bottom: 0;
              opacity: 0;
            }
          }
        `}</style>
      </Box>
    );
  }