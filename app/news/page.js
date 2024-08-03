"use client";

import React, { useState } from 'react';
import { Button, Box, Text, HStack, Flex, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import { ChevronRight } from 'lucide-react';
import {GridStyle} from "@/components/content/Grids";
import useAuth from "@/context/AuthContext";
import 'swiper/css';
import {useRouter} from "next/navigation";
import {isICRC} from "@/firebase";


function NewsBox({title, subtitle, image, link, ...props}) {
    return (
            <Link href={link} textDecoration="none" _hover={{textDecoration: "none"}}>
                <Flex bg="transparent" w="100%" h="100%" position="relative" justifyContent="center" alignItems="center" _hover={{filter: "brightness(0.9)"}} transition="filter 0.3s ease-in-out">
                    <VStack className="bg-white dark:bg-gray-800" p={8} rounded="3xl" w="100%" h="100%" position="relative" justifyContent="flex-start" alignItems="flex-start" spacing={"4"}>
                        <Flex w="100%" h="25vh" position="relative" rounded="xl" bgColor="white" justifyContent="center" alignItems="center" bgImage={`url('${image}')`} bgRepeat="no-repeat" bgSize="100%" bgPosition="50% 50%" zIndex={1} mb="4" {...props}/>
                        <Text className="label text-gray-500 dark:text-white" >
                            {subtitle}
                        </Text>
                        <Text h="10vh" fontWeight="500" className="text-dark dark:text-white" textAlign="left" fontSize="lg">
                            {title}
                        </Text>
                    </VStack>
                </Flex>
            </Link>
    );
}

function NewsButton({text, active, onClick}) {
    const activeBg = useColorModeValue("black", "white");
    const inactiveBg = useColorModeValue("transparent", "transparent");
    const activeColor = useColorModeValue("white", "black");
    const inactiveColor = useColorModeValue("black", "white");
    return (
            <Button className={active ? "bg-black text-white dark:bg-white dark:text-black dark:border-black" : "bg-transparent text-black dark:text-white dark:border-white"} bg={active ? activeBg : inactiveBg} color={active ? activeColor : inactiveColor} rounded="full" py={5} px={6} border="2px solid" borderColor="transparent" _hover={{borderColor:"black"}} onClick={onClick} transition="all 0.3s ease-in-out">
                <Text fontWeight="400" fontSize="xl" textAlign="center">
                    {text}
                </Text>
            </Button>
    );
}

const NewsMeta = () => {
    return (
            <NewsBox
                    title="Meditron: An LLM suite especially suited for low-resource medical settings leveraging Meta Llama"
                    subtitle="A Llama story"
                    image="/assets/img/MetaLlama3.png"
                    link="https://ai.meta.com/blog/llama-2-3-meditron-yale-medicine-epfl-open-source-llm/"
            />
    );
};

const NewsLlama3 = () => {
    return (
            <NewsBox
                    title="State-of-the-art in 24h: newest Llama-3-8B v1.0 Meditron model released"
                    subtitle="New model"
                    image="/assets/img/llama-3-8b.png"
                    link="/news/llama-3-8b-meditron"
            />
    );
};

const NewsStanford = () => {
    return (
            <NewsBox
                    title="Meditron as Highlighted Research in Stanford University's 2024 AI Index Report"
                    subtitle="AI Index"
                    image="/assets/img/stanfordAIindex.jpg"
                    link="https://aiindex.stanford.edu/report/"
                    bgSize="cover"
            />
    );
};

const NewsEPFL = () => {
    return (
            <NewsBox
                    title="EPFL's new Large Language Model for Medical Knowledge"
                    subtitle="Article"
                    image="/assets/icons/epfl_ai_center.svg"
                    link="https://actu.epfl.ch/news/epfl-s-new-large-language-model-for-medical-knowle/"
                    bgSize="90%"
            />
    );
}

const PaperMeditron = () => {
    return (
            <NewsBox
                    title="MEDITRON-70B: Scaling Medical Pretraining for Large Language Models"
                    subtitle="Meditron 1"
                    image="/assets/img/meditron_original.png"
                    link="https://arxiv.org/abs/2311.16079"
            />
    );
}

const PaperNature = () => {
    return (
            <NewsBox
                    title="MEDITRON: Open Medical Foundation Models Adapted for Clinical Practice"
                    subtitle="Meditron 2"
                    image="/assets/img/meditron-nature.png"
                    link="https://www.researchsquare.com/article/rs-4139743/v1"
            />
    );
}



export default function News() {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('latest');
    const bgOverlay = useColorModeValue("249, 250, 251", "0, 25, 48");
    function handleTabChange(tab) {
        setActiveTab(tab);
    }

    // route /news page is only for Moove
    let router = useRouter();
    if (isICRC) {
        router.push("/404");
        return null;
    }

    return (
            <>
                <Header />

                <VStack w="100vw" className="text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">

                    <Box position="relative" w="100%" h={{base: "84vh", md: "100vh"}}>
                        <Box
                                w="100%"
                                h="100%"
                                direction="column"
                                textColor="black"
                                bgImage="url('/assets/bg/news.webp')"
                                bgSize="cover"
                                bgRepeat="no-repeat"
                                bgPosition="center"
                                // bgImage="url('/assets/img/dna.svg')"
                                // className="bg-backblue dark:bg-backbluedark bg-blend-color-burn dark:bg-blend-multiply"
                                // bgSize="300%"
                                // bgPosition="50% 50%"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing="8"
                                pl={GridStyle.pageMargin} py={{base: "8", md: "16"}}
                        >
                            <VStack spacing={{base:8, md:16}} w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" zIndex="2" position="absolute" left="0" bottom="0"  pl={GridStyle.pageMargin} py={{base: 8, md: 16}}>
                                <Text className="title text-black dark:text-white" textAlign="left" zIndex="2">
                                    AI moves fast. So do we.<br/>Stay updated.
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

                        </Box>

                        <Box position="absolute" top="0" left="0" right="0" bottom="0" w="100%" h="100%" backdropFilter="blur(12px)" bgGradient={`linear(to-b, rgba(${bgOverlay},1) 0%, rgba(${bgOverlay},1) 25%, rgba(${bgOverlay},0.8) 50%, rgba(${bgOverlay},0.4) 70%, rgba(${bgOverlay},0.2) 80%, rgba(${bgOverlay},0) 100%)`} zIndex="1"/>
                    </Box>

                    <HStack w="100%" spacing={{base: 4, md: 8}} justifyContent="center" alignItems="center" mt="4" fontSize="md" fontWeight="light" py="8">
                        <NewsButton text="Latest" active={activeTab === 'latest'} onClick={() => handleTabChange('latest')} />
                        <NewsButton text="Articles" active={activeTab === 'articles'} onClick={() => handleTabChange('articles')} />
                        <NewsButton text="Papers" active={activeTab === 'papers'} onClick={() => handleTabChange('papers')} />
                        {/* <NewsButton text="Featured" active={activeTab === 'featured'} onClick={() => handleTabChange('featured')} /> */}
                    </HStack>



                    {/* <Section id="section1"> */}
                    <VStack w="100%" h="fit-content" minHeight="80vh" pt={8} spacing={{base:8, md:16}} justifyContent="center" alignItems="center" direction="column" pb={{base: "10vh", md: "20vh"}}>
                        { activeTab === 'latest' &&
                                <SimpleGrid columns={[1, null, 3]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" px={GridStyle.pageMargin}>
                                    <NewsMeta />
                                    <PaperNature />
                                    <NewsLlama3 />
                                    <NewsStanford />
                                    <NewsEPFL />
                                    <PaperMeditron />
                                </SimpleGrid>
                        }

                        { activeTab === 'articles' &&
                                <SimpleGrid columns={[1, null, 3]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" px={GridStyle.pageMargin}>
                                    <NewsMeta />
                                    <NewsStanford />
                                    <NewsEPFL />
                                </SimpleGrid>
                        }

                        { activeTab === 'papers' &&
                                <SimpleGrid columns={[1, null, 3]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" px={GridStyle.pageMargin}>
                                    <PaperNature />
                                    <PaperMeditron />
                                </SimpleGrid>
                        }

                        {/* { activeTab === 'featured' &&
                <SimpleGrid columns={[1, null, 3]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" px={GridStyle.pageMargin}>
                  <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7190785104544206848"
                    height="500px"
                    width="100%"
                    maxWidth="30vh"
                    frameborder="2"
                    allowfullscreen=""
                    title="Embedded post"
                  />

                  <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7189374533596860417"
                    height="500px"
                    width="100%"
                    frameborder="2"
                    border-radius="100%"
                    allowfullscreen=""
                    title="Embedded post"
                    />

                    <iframe
                      src="https://www.linkedin.com/embed/feed/update/urn:li:share:7135408163662483456"
                      height="500px"
                      width="100%"
                      frameborder="2"
                      allowfullscreen=""
                      title="Embedded post"
                      />
                </SimpleGrid> */}


                    </VStack>
                    {/* </Section> */}
                </VStack>
                <Footer />
            </>
    );
}
