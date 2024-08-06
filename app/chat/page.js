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
    router.push("/");
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

  return (
    <>
      <ChatSpace />
    </>
  );
}
