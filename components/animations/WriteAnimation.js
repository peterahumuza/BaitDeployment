import React, { useState, useEffect } from "react";
import { HStack, Text, Box} from "@chakra-ui/react";

const WriteAnimation = ({ words }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [isWriting, setIsWriting] = useState(true);
    const [isErasing, setIsErasing] = useState(false);
    const TYPING_SPEED = 100;
    const ERASING_SPEED = 50;
    const WAIT_TO_THINK = 2000;
    const WAIT_TO_CONTEMPLATE = 3000;

    useEffect(() => {
    
      const type = () => {
        if (isWriting) {
          // If we have written the entire word, wait 1.5s before erasing
          if (currentWord === words[currentWordIndex]) {
            setIsWriting(false);
            setTimeout(() => setIsErasing(true), WAIT_TO_CONTEMPLATE);
          }
          // If we are still writing, keep adding characters
          else {
            setTimeout(() => {
              setCurrentWord((prev) => words[currentWordIndex].slice(0, prev.length + 1));
            }, TYPING_SPEED);
          }
        } else if (isErasing) {
          // If we have erased the entire word, wait 1.5s before writing the next word
          if (currentWord === "") {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setIsErasing(false);
            setTimeout(() => setIsWriting(true), WAIT_TO_THINK);
          }
          // If we are still erasing, keep removing characters
          else {
            setTimeout(() => {
              setCurrentWord((prev) => prev.slice(0, prev.length - 1));
            }
            , ERASING_SPEED);
          }
        }
      }
      type();
    }
    , [currentWord, currentWordIndex, isWriting, isErasing, words]);

  
    return (
      <HStack spacing="0" justifyContent="flex-start" alignItems="center">
        <Text className="title text-black dark:text-white" textAlign="left" style={{whiteSpace: "nowrap"}}>
          Help us make it&nbsp;{currentWord}
        </Text>
        <Box 
          w="2px" 
          className="bg-black dark:bg-gray-200" 
          animation={isErasing || isWriting ? "" : "blinkingCursor 1s step-end infinite"}
          height={{base: "3.0rem", md: "5.0rem"}}
        />
      </HStack>
    );
  };

export default WriteAnimation;
