"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Box, Text, Flex, HStack, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import WriteAnimation from "@/components/animations/WriteAnimation";
import LogoSlider from "@/components/content/LogoSlider";
import Explanation from "@/components/content/Explanation";
import GooeyBanner from "@/components/content/GooeyBanner";
import Flower from "@/components/content/Flower";
import {GridSection, GridElement, GridStyle} from "@/components/content/Grids";
import { ChevronRight } from 'lucide-react';
import useAuth from "@/context/AuthContext";
import {isICRC} from "@/firebase";


export default function Home() {
    const { currentUser } = useAuth();
    let bgImage = useColorModeValue("url('/assets/bg/light/meditron.webp')", "url('/assets/bg/dark/meditron.webp')");
    if (isICRC) {
        return (
            <>
                <Header />
                <VStack w="100vw" className="text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">
                    <Box position="relative" w="100%" h="100vh">
                        <Flex w="100%" h="100%" direction="column" textColor="black" bgImage={bgImage} bgSize="cover" bgRepeat="no-repeat" bgPosition="center" p={GridStyle.pageMargin} justifyContent="flex-start" alignItems="flex-start">
                            <VStack spacing={{base:8, md:16}} zIndex="2" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" position="absolute" bottom="0" left="0" pl={GridStyle.pageMargin} py={{base: 8, md: 16}} overflow-x="hidden">
                                <VStack w="100%" h="fit-content" spacing={"4"} alignItems="flex-start" justifyContent="flex-start">
                                    <Text className="title text-black dark:text-white">
                                        AI for the benefit<br/>of humanitarian health.
                                    </Text>
                                </VStack>
                                <Link href={currentUser ? "/chat" : "/login"}>
                                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                                        <Text className="button-text" textAlign="center">
                                            Test humanitarian Meditron
                                        </Text>
                                        <ChevronRight size={30}/>
                                    </HStack>
                                </Link>
                            </VStack>
                        </Flex>
                    </Box>
                </VStack>
            </>
        ) 
    } 
    return (
            <>
                <Header />
                <VStack w="100vw" className="text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">

                    <Box position="relative" w="100%" h={{base: "84vh", md: "100vh"}}>
                        <Flex w="100%" h="100%" direction="column" textColor="black" bgImage="url('/assets/bg/home.webp')" bgSize="cover" bgRepeat="no-repeat" bgPosition="center" p={GridStyle.pageMargin} justifyContent="flex-start" alignItems="flex-start">
                            <VStack spacing={{base:8, md:16}} zIndex="2" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" position="absolute" bottom="0" left="0" pl={GridStyle.pageMargin} py={{base: 8, md: 16}} overflow-x="hidden">
                                <VStack w="100%" h="fit-content" spacing={"4"} alignItems="flex-start" justifyContent="flex-start">
                                    <Text className="title text-black dark:text-white">
                                        AI will democratize healthcare.
                                    </Text>
                                    <WriteAnimation words={["safe", "helpful", "fair", "transparent", "coherent", "complete", "concise", "aligned", "empathetic", "relevant", "responsible", "ethical"]} />
                                </VStack>
                                <Link href={currentUser ? "/chat" : "/login"}>
                                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                                        <Text className="button-text" textAlign="center">
                                            Contribute now
                                        </Text>
                                        <ChevronRight size={30}/>
                                    </HStack>
                                </Link>
                            </VStack>
                        </Flex>
                    </Box>


                    {/* Introduction to MOOVE */}
                    <div id="flower-section">
                        <GridSection className="text-dark dark:text-white" pb={{base: "20vh", md: "30vh"}}>
                            <GridElement display={{base: "none", md: "flex"}} cols={3} rowStart={1} colStart={1} h="fit-content" p={0} pr={10} justifyContent="center" alignItems="center">
                                <Flower />
                            </GridElement>
                            <GridElement p={0} rowStart={1} h="fit-content"  colStart={{base: 1, md: 7}} cols={{base: 12, md: 6}} >
                                <VStack w="fit-content" h="fit-content" justifyContent="flex-start" alignItems="flex-start" spacing={"4vh"}>
                                    <Text className="label" >
                                        Massive Open Online Validation & Evaluation
                                    </Text>
                                    <Text className="intro text-black dark:text-white">
                                        A collaborative platform
                                        where doctors can share their expertise to align AI
                                        with real-world medical standards.
                                    </Text>
                                </VStack>
                            </GridElement>
                        </GridSection>
                    </div>


                    {/* Partners */}
                    <VStack w="100%" pb={{base: "16", md: "20vh"}} justifyContent="center" alignItems="center" spacing={{base: "8", md: "10vh"}}>
                        <Text className="subheader text-dark dark:text-white" textAlign="center" w={{base:"80%", md:"50%"}} minWidth="400px" h="fit-content" position="relative" justifyContent="center" alignItems="center">
                            We are partnering with global institutions for transparent AI validation.
                        </Text>
                        <LogoSlider/>
                    </VStack>

                    <SimpleGrid columns={[1, null, 2]} spacing={{base:16, md:8}} w="100%" h="fit-content" px={GridStyle.pageMargin} py={{base: "8", md: "10vh"}} justifyContent="center" alignItems="flex-end">
                        <Flex w="100%" h="fit-content" justifyContent="center" alignItems="flex-start" pr={{base:0, md:8}}>
                            <Flex w="100%" h="fit-content" position="relative" rounded="3xl" bgColor="white" justifyContent="center" alignItems="center">
                                <Flex w="100%" h="50vh" m={10} position="relative">
                                    <Image src="/assets/icons/diagram3.svg" alt="Moove" layout="fill" objectFit="contain"/>
                                </Flex>
                            </Flex>
                        </Flex>

                        <VStack w="90%" h="fit-content" justifyContent="center" alignItems="flex-start" spacing={"8"}>
                            <Text className="header" >
                                Lifting the veil
                            </Text>
                            <Text className="body">
                                Large language models (LLMs) will revolutionize access to healthcare.
                                While leading-edge models like OpenAI&apos;s ChatGPT and Google&apos;s MedPaLM
                                hold great promise, their opacity stalls
                                safe integration into clinical practice.
                                The Moove platform enables transparent, public oversight
                                and expert validation of medical AI models at an unprecedented scale.
                            </Text>
                            <Link href="/login">
                                <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                                    <Text className="button-text" textAlign="center">
                                        Join the Moove
                                    </Text>
                                    <ChevronRight size={30}/>
                                </HStack>
                            </Link>
                        </VStack>
                    </SimpleGrid>

                    <SimpleGrid columns={[1, null, 2]} spacing={{base:16, md:8}}  w="100%" h="fit-content" px={GridStyle.pageMargin} pt={{base: "8", md: "10vh"}} pb={{base: "8", md: "20vh"}} justifyContent="center" alignItems="flex-end">

                        <VStack w={{base: "100%", md: "80%"}} h="fit-content" justifyContent="center" alignItems="flex-start" spacing={"8"}>
                            <Text className="header" w="100%">
                                Meet Meditron
                            </Text>
                            <Text className="body" w="100%">
                                Meditron is a suite of state-of-the-art open LLMs for the medical domain.
                                They have absorbed vast medical knowledge from biomedical literature and clinical guidelines.
                                Meditron is designed to be a transparent and competitive alternative to closed-source medical LLMs.
                                With your expertise, we will adapt Meditron to clinical practice.
                            </Text>
                            <Link href="/meditron">
                                <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                                    <Text className="button-text" textAlign="center">
                                        Learn more
                                    </Text>
                                    <ChevronRight size={30}/>
                                </HStack>
                            </Link>
                        </VStack>

                        <Flex w="100%" h="fit-content"  position="relative" rounded="3xl" justifyContent="flex-end" alignItems="center">
                            <Flex w="100%" h="70vh" position="relative" bgColor="black" bgImage="url('/assets/icons/banner4.svg')" bgRepeat="no-repeat" bgSize="180% 180%" bgPosition="50% 50%" borderRadius="2vw"/>
                        </Flex>
                    </SimpleGrid>

                    <Explanation/>
                    <GooeyBanner currentUser={currentUser}/>
                    <Footer/>
                </VStack>
            </>
    );
}
