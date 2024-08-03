"use client";

import ChatSpace from "../../components/contributions/ChatSpace";
import {Flex, Box, Image, useColorModeValue} from "@chakra-ui/react";
import useAuth from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from 'react';

export default function MeditronChat() {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) { 
    router.push("/login");
  }
/*
  if (currentUser && currentUser.emailVerified === false) {
    router.push("/verify-email");
  }*/

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [fadeImage, setFadeImage] = useState(false);
  const [removeLoadingScreen, setRemoveLoadingScreen] = useState(false);
  const screenColor = useColorModeValue("white", "black");
  const iconSrc = useColorModeValue("/assets/logos/ICON_MOOVE_B.svg", "/assets/logos/ICON_MOOVE_W.svg");
  // useEffect(() => {
  //   let fadeImageTimeout = setTimeout(() => {
  //     setFadeImage(true);
  //     let removeLoadingScreenTimeout = setTimeout(() => {
  //       setRemoveLoadingScreen(true);
  //     }, 1000);
  //     return () => clearTimeout(removeLoadingScreenTimeout);
  //   }, 1000); 
  //   return () => clearTimeout(fadeImageTimeout);
  // }, []);

  return (
    <>
      {/* {showLoadingScreen && !removeLoadingScreen && (
        <Box w="100%" h="100%" bg={screenColor} position="fixed" zIndex="1000" opacity={removeLoadingScreen ? "0" : "1"} transition="opacity 1s ease-in-out">
          <Flex spacing={0} justifyContent="center" h="100vh" display="flex" alignItems="center" opacity={fadeImage ? "0" : "1"} transition="opacity 1s ease-in-out">
            <Image src={iconSrc} alt="Meditron" width={100} height={100} />
          </Flex>
        </Box>
      )} */}

      <ChatSpace />
    </>
  );
}
