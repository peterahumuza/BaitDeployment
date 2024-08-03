"use client";

import React from "react";
import { Box, Text, Image, HStack, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/content/Header";
import { ChevronRight } from 'lucide-react';
import {GridStyle} from "@/components/content/Grids";
import useAuth from "@/context/AuthContext";
import 'swiper/css';
import {useRouter} from "next/navigation";
import {isICRC} from "@/firebase";

export default function About() {
    const { currentUser } = useAuth();
    const bgImage = useColorModeValue("url('/assets/bg/light/news.webp')", "url('/assets/bg/dark/news.webp')");
    const bg = useColorModeValue("transparent", "white");

    let router = useRouter();
    if (!isICRC) {
        router.push("/404");
        return null;
    }

    return (
            <>
                <Header />
                <VStack w="100vw" h="100vh" className="text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">
                    <Box w="100%" h="100%" direction="column" textColor="black" bgImage={bgImage} bgSize="cover" bgRepeat="no-repeat" bgPosition="center" justifyContent="flex-start" alignItems="flex-start" spacing="8" pl={GridStyle.pageMargin} py={{base: "8", md: "16"}}>
                        <SimpleGrid w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" zIndex="2" px={GridStyle.pageMargin} columns={{base: 1, md: 2}} spacing="8" pt="20vh">
                            <HStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" spacing="8" bg={bg} borderRadius="3xl" zIndex="2">
                                <Image src="/assets/icons/ICRC.svg" alt="ICRC" w="150px" h="150px"/>
                                <Image src="/assets/img/epfl.png" alt="EPFL" w="130px" h="auto"/>
                                <Image src="/assets/img/yale.png" alt="Yale" w="100px" h="auto"/>
                            </HStack>

                            <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" spacing="8" >
                                <Text className="subheader text-black dark:text-white" textAlign="left" zIndex="2">
                                    Humanitarian Health Meditron is a collaborative initiative by the International Committee of the Red Cross (ICRC) and the Swiss Federal Institute of Technology in Lausanne (EPFL) aimed at leveraging artificial intelligence (AI) to enhance humanitarian health efforts.
                                </Text>
                                <Link href={currentUser ? "/chat" : "/login"}>
                                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                                        <Text className="button-text" textAlign="center">
                                            Join us
                                        </Text>
                                        <ChevronRight size={30}/>
                                    </HStack>
                                </Link>
                            </VStack>
                        </SimpleGrid>
                    </Box>
                </VStack>
            </>
    );
}
