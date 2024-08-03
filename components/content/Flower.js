import { Box, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Petal = () => {
  return (
    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 98" width="100%" height="100%" className="stroke-current fill-transparent object-cover">
      <g id="Layer_1-2" data-name="Layer 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path className="cls-1" d="M17,1c8.84,0,16,7.16,16,16,0,8.84,7.16,16,16,16,8.84,0,16,7.16,16,16,0,8.84-7.16,16-16,16s-16,7.16-16,16c0,8.84-7.16,16-16,16S1,89.84,1,81c0-8.84,7.16-16,16-16,8.84,0,16-7.16,16-16s-7.16-16-16-16c-8.84,0-16-7.16-16-16S8.16,1,17,1Z"/>
      </g>
    </svg>
  );
};
export default function Flower() {
  const numPetals = 7;
  const angle = 360 / numPetals;
  const [radius, setRadius] = useState(90);
  const petalColor = useColorModeValue("black", "white");

  const handleScroll = () => {
    requestAnimationFrame(() => {
      const flowerSection = document.getElementById("flower-section");
      // Start shrinking the flower when the user has the flower section 200px from the bottom of the screen, stop at radius 0

      if (flowerSection) {
        const flowerSectionTop = flowerSection.getBoundingClientRect().top;

        if (flowerSectionTop < window.innerHeight - 200) {
          const newRadius = Math.max(0, 90 - (window.innerHeight - flowerSectionTop - 200) / 10);
          setRadius(newRadius);
        }
      }
    }
    );
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 


  return (
    <Box rounded="full" w="100%" h="200px" position="relative" bgColor="transparent" display="flex" justifyContent="center" alignItems="center">
      {Array.from({ length: numPetals }, (_, i) => (
        <Box 
          key={i}
          w="100px"
          h="100px"
          position="absolute"
          top="50%" 
          left="50%" 
          transform={`rotate(${angle * i+radius/2}deg) translateX(${radius}px) rotate(${180}deg)`}
          style={{ transformOrigin: `center` }}
          color={petalColor}
        >
          <Petal />
        </Box>
      ))}
    </Box>
  );
}