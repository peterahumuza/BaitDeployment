"use client";

import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import useAuth from "@/context/AuthContext";
import { GridStyle} from "@/components/content/Grids";
import { ChevronRight } from 'lucide-react';
import Link from "next/link";
import { Flex, Box, HStack, VStack, Text, useColorModeValue, SimpleGrid, Image} from "@chakra-ui/react";
const darkColor = "#211c4a";

function GAPReplay() {
    return (
        <VStack w="100%" h="fit-content" display="flex" justifyContent="center" fontSize="2xl" alignItems="center" spacing={4}>
            <HStack w="100%" h="25vh" spacing={4} alignItems="flex-start" justifyContent="flex-start">
                <VStack w="60%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4}  p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            5M
                        </Text>
                        <Image alt="" src="/assets/icons/dataset.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        PubMed papers
                    </Text>
                </VStack>

                <VStack w="40%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4} p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            16M
                        </Text>
                        <Image alt="" src="/assets/icons/dataset.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        PubMed abstracts
                    </Text>
                </VStack>

            </HStack>

            <HStack w="100%" h="25vh" spacing={4} alignItems="flex-start" justifyContent="flex-start">
                <VStack w="40%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4}  p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            48K
                        </Text>
                        <Image alt="" src="/assets/icons/dataset.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Clinical practice guidelines
                    </Text>
                </VStack>

                <VStack w="60%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4}  p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            400M tokens
                        </Text>
                        <Image alt="" src="/assets/icons/dataset.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Replay data
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    )
}

function AdversarialQA() {
    return (
        <VStack w="100%" h="100%" display="flex" justifyContent="center" fontSize="2xl" alignItems="flex-start" spacing={"2vh"} pr="4vw">
            <HStack w="100%" h="25vh" spacing={4} alignItems="flex-start" justifyContent="flex-start">
                
                <VStack w="50%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4} p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            71
                        </Text>
                        <Image alt="" src="/assets/img/stethoscope_white.png" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Medical scope
                    </Text>
                </VStack>

                <VStack w="50%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4}  p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%">
                            31
                        </Text>
                        <Image alt="" src="/assets/icons/context.svg" width={"40px"} height={"40px"} />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Contextualization
                    </Text>
                </VStack>

            </HStack>

            <HStack w="100%" h="25vh" spacing={4} alignItems="flex-start" justifyContent="flex-start">
                <VStack w="33%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4} p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            32
                        </Text>
                        <Image alt="" src="/assets/icons/warning.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Situational Complexity
                    </Text>
                </VStack>
                <VStack w="33%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4} p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            63
                        </Text>
                        <Image alt="" src="/assets/icons/shield_white.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Safety
                    </Text>
                </VStack>

                <VStack w="34%" h="100%" alignItems="flex-start" borderRadius="3xl" bg={darkColor} justifyContent="space-between" spacing={4} p={8} color="white" style={{overflow: "hidden"}}>
                    <HStack w="100%" alignItems="flex-start" justifyContent="space-between">
                        <Text w="100%" >
                            47
                        </Text>
                        <Image alt="" src="/assets/icons/scale.svg" width="40px" height="40px" />
                    </HStack>
                    <Text w="100%" className="box-text">
                        Bias
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    )
}

function MeditronText() {
    return (
        <svg class="fill-current" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751 133.04" width="100%" height="100%">
            <g id="Calque_1" data-name="Calque 1">
                <path class="cls-1" d="M0,35.42h19.18v16.59c5.01-10.02,17.62-19.18,32.48-19.18,16.07,0,27.12,8.81,29.72,20.9,4.15-10.19,17.62-20.9,34.73-20.9,21.94,0,34.03,12.1,34.03,35.24v62.37h-19.52v-59.78c0-15.2-6.22-21.43-17.97-21.43-10.71,0-22.11,8.3-27.82,22.29v58.91h-19.52v-59.78c0-15.2-6.22-21.43-17.97-21.43-10.71,0-22.11,8.3-27.82,22.29v58.91H0V35.4v.02Z"/>
                <path class="cls-1" d="M166.54,82.42c0-29.72,19.18-49.59,48.2-49.59s45.61,18.66,45.61,48.55c0,1.39,0,2.25-.17,5.01h-73.77c1.21,18.83,12.61,30.75,29.37,30.75,12.61,0,22.46-6.91,24.19-16.76h19.52c-3.46,19.69-20.39,32.65-43.71,32.65-29.2,0-49.24-20.21-49.24-50.62h0ZM241.35,72.05c-1.73-14.86-11.75-23.84-26.61-23.84s-26.78,9.85-28.33,23.84h54.94Z"/>
                <path class="cls-1" d="M274.17,82.93c0-31.1,19-50.1,43.36-50.1,13.65,0,24.19,5.01,30.41,14.34h.35V0h19.52v130.44h-19.18v-12.62h-.34c-6.05,10.02-16.76,15.21-30.75,15.21-24.19,0-43.36-19.18-43.36-50.11h-.01ZM321.34,117.14c14.34,0,27.3-12.78,27.3-34.38s-12.78-34.04-27.3-34.04-27.12,12.61-27.12,34.2,12.61,34.21,27.12,34.21h0Z"/>
                <path class="cls-1" d="M388.54,0h19.52v19.87h-19.52V0ZM388.71,35.42h19.52v95.02h-19.52V35.42Z"/>
                <path class="cls-1" d="M435.53,105.39v-54.77h-14.34v-15.2h14.34V12.09h19.52v23.33h21.77v15.2h-21.77v51.83c0,9.68,3.97,13.65,13.3,13.65,2.76,0,6.05-.18,9.5-.52v15.72c-4.84.87-10.36,1.04-13.82,1.04-19.35,0-28.51-9.15-28.51-26.95h.01Z"/>
                <path class="cls-1" d="M492.55,35.42h19.18v16.06h.52c6.39-11.05,17.62-17.96,31.1-17.96,1.9,0,5.18.17,7.77.69v18.31c-2.42-.35-5.53-.51-7.77-.51-15.21,0-26.61,7.6-31.27,20.56v57.88h-19.52V35.43h0Z"/>
                <path class="cls-1" d="M553.53,82.93c0-30.23,19.87-50.1,47.85-50.1s47.86,19.87,47.86,50.1-19.87,50.11-47.86,50.11-47.85-19.87-47.85-50.11ZM601.38,117.14c15.03,0,27.82-12.78,27.82-34.21s-12.78-34.2-27.82-34.2-27.81,12.78-27.81,34.2,12.78,34.21,27.81,34.21Z"/>
                <path class="cls-1" d="M666.17,35.42h19.18v16.93c5.01-10.2,17.62-19.53,32.48-19.53,21.08,0,33.17,12.1,33.17,35.24v62.37h-19.52v-59.78c0-15.2-6.22-21.43-17.97-21.43-10.71,0-22.11,8.3-27.82,22.29v58.91h-19.52V35.4v.02Z"/>
            </g>
        </svg>
    );
}   
function MeditronLogo() {
    return (
      <svg className="fill-current" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445.24 445.04" width="80px" height="80px">
        <path className="cls-1" d="M109.32,335.72c-11.59-11.63-27.62-18.84-45.33-18.84-35.34,0-63.99,28.65-63.99,63.99,0,17.72,7.2,33.75,18.84,45.33,11.59,11.63,27.62,18.84,45.33,18.84,35.34,0,63.99-28.65,63.99-63.99,0-17.72-7.2-33.75-18.84-45.33Z"/>
        <path className="cls-1" d="M424.12,335.72c-11.59-11.63-27.62-18.84-45.33-18.84-35.34,0-63.99,28.65-63.99,63.99,0,17.72,7.2,33.75,18.84,45.33,11.59,11.63,27.62,18.84,45.33,18.84,35.34,0,63.99-28.65,63.99-63.99,0-17.72-7.2-33.75-18.84-45.33Z"/>
        <path className="cls-1" d="M64.17,127.97s.03,0,.05,0h0c52.21-.04,94.57,42.25,94.6,94.46h0c.03,35.32,28.66,63.94,63.98,63.94s63.96-28.62,63.99-63.94h0c.04-52.1,42.31-94.3,94.4-94.26h0s.03,0,.05,0c35.34,0,63.99-28.65,63.99-63.99S416.59.2,381.25.2s-63.96,28.62-63.98,63.94h0c-.04,52.1-42.31,94.3-94.4,94.26h0s-.03,0-.05,0-.03,0-.05,0h0c-52.21.04-94.57-42.25-94.6-94.46h0c-.03-35.32-28.66-63.94-63.98-63.94S.18,28.65.18,63.99s28.65,63.99,63.99,63.99Z"/>
        <path className="cls-1" d="M381.25,158.4c-35.34,0-63.99,28.65-63.99,63.99,0,.02,0,.03,0,.04h0c.03,52.21-42.26,94.57-94.48,94.62-52.26,0-94.62-42.37-94.63-94.63h0c0-35.34-28.65-63.98-63.99-63.98S.18,187.09.18,222.43s28.65,63.99,63.99,63.99c0,0,0,0,0,0h0c52.27,0,94.64,42.36,94.65,94.63h0c0,35.34,28.65,63.98,63.99,63.98s63.99-28.65,63.99-63.99c0-.02,0-.03,0-.04h0c-.03-52.22,42.27-94.58,94.49-94.62h0c35.32-.02,63.95-28.66,63.95-63.99s-28.65-63.99-63.99-63.99Z"/>
      </svg>
    );
  }


export default function Meditron() {
    const { currentUser } = useAuth();
    const bgOverlay = useColorModeValue("249, 250, 251", "15, 0, 46");

    let borderColor = useColorModeValue("transparent", "white");
    return (
    <>
    <Header />
    <VStack w="100vw" className="text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">
        <Box position="relative" w="100%" h={{base: "84vh", md: "100vh"}}>

            {/* DNA Background */}
            <Box 
                w="100%" 
                h="100%" 
                direction="column" 
                textColor="black" 
                bgImage="url('/assets/bg/meditron.webp')"
                bgSize="cover"
                bgRepeat="no-repeat" 
                bgPosition="center"
                // className="bg-backpurple dark:bg-backpurpledark bg-blend-color-burn dark:bg-blend-multiply" 
                // bgImage="url('/assets/img/dna.svg')" 
                // bgSize="320%" 
                // bgPosition="15% 70%" 
                p={GridStyle.pageMargin} 
                justifyContent="flex-start" 
                alignItems="flex-start" 
                pt="30vh">
            
                {/* Blur overlay */}
                <Box position="absolute" top="0" left="0" right="0" bottom="0" w="100%" h="100%" backdropFilter="blur(12px)" bgGradient={`linear(to-b, rgba(${bgOverlay},1) 0%, rgba(${bgOverlay},1) 25%, rgba(${bgOverlay},0.8) 50%, rgba(${bgOverlay},0.4) 70%, rgba(${bgOverlay},0.2) 80%, rgba(${bgOverlay},0) 100%)`} zIndex="1"/>
                
                <VStack spacing={{base:8, md:16}} w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" position="absolute" left="0" bottom="0"  pl={GridStyle.pageMargin} py={{base: 8, md: 16}} zIndex={2}>
                    {/* <Flex w="fit-content" maxWidth="90%" h="fit-content" justifyContent="center" alignItems="center" color={useColorModeValue("black", "white")}>
                        <MeditronText />
                    </Flex> */}
                    <Text className="title text-black dark:text-white">
                        Next-gen medical AI, 
                        <br></br>
                        now in your hands. 
                    </Text>

                    <Link href={currentUser ? "/chat" : "/login"}>
                        <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                            <Text className="button-text" textAlign="center">
                                Chat with Meditron
                            </Text>
                            <ChevronRight size={30}/>
                        </HStack>
                    </Link>
                </VStack>
            </Box>
        </Box>


        <SimpleGrid columns={[1, null, 2]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" px={GridStyle.pageMargin} pt={"10vh"}>
            <Flex width="100%" justifyContent="flex-start" alignItems="center" display={{base: "none", md: "flex"}}>
                <MeditronLogo />
            </Flex>
            <VStack w="fit-content" h="fit-content" justifyContent="flex-start" alignItems="flex-start" spacing={"4vh"}>
                <Text className="intro">
                    Meditron is a suite of open-source medical AI models.
                    We need your help to align them for clinical practice. 
                </Text>
            </VStack>
        </SimpleGrid>

        <VStack w="100%" justifyContent="center" pt={{base: "16", md: "30vh"}}  px={GridStyle.pageMargin} textAlign="center" pb={{base: "8", md: "10vh"}}>
            <Text className="intro" w="100%">
                Model suite
            </Text>
            <Text className="subheader" w="100%" >
            Our state-of-the-art models come in three variants.
            </Text>
        </VStack>

        <SimpleGrid columns={[1, null, 3]} spacing="16" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "8", md: "30vh"}} alignItems="flex-end">
            <VStack w="100%" h="fit-content" display="flex" justifyContent="flex-end" fontSize="2xl" alignItems="center" spacing={"8"} textAlign="center">
                <Box w="240px" h="240px" display="flex" justifyContent="center" alignItems="center" borderRadius="full" bg={"black"} borderColor={borderColor} borderWidth={2}>
                    <Image src="/assets/logos/LOGO_MEDITRON_70B_W.svg" alt="Meditron 70sB" width={180} height={180} />
                </Box>
                <Text className="body" textAlign="center" w={{base: "60%", md: "100%"}}>
                    Our largest language model with strong reasoning capabilities.
                </Text>
            </VStack>

            <VStack w="100%" h="fit-content" display="flex" justifyContent="flex-end" fontSize="2xl" alignItems="center" spacing={"5vh"} textAlign="center">
                <Box w="180px" h="180px" display="flex" justifyContent="center" alignItems="center" borderRadius="20%" bg={"black"} borderColor={borderColor} borderWidth={2}>
                    <Image src="/assets/logos/LOGO_MEDITRON_7B_W.svg" alt="Meditron 7B" width={180} height={180} />
                </Box>
                <Text className="body" textAlign="center" w={{base: "60%", md: "100%"}}>
                    A lightweight language model, optimized for low-resource settings. 
                </Text>
            </VStack>

            <VStack w="100%" h="fit-content" display="flex" justifyContent="flex-end" fontSize="2xl" alignItems="center" spacing={"7vh"} textAlign="center">
                <Box transform="rotate(45deg)" w="180px" h="180px" display="flex" justifyContent="center" alignItems="center" bg={"black"} borderRadius="20%" borderColor={borderColor} borderWidth={2}>
                    <Box transform="rotate(-45deg)">
                        <Image src="/assets/logos/LOGO_MEDITRON_7BV_W.svg" alt="Meditron V" width={180} height={180} />
                    </Box>
                </Box>
                <Text className="body" textAlign="center" w={{base: "60%", md: "80%"}}>
                    A multimodal model adapted for visual diagnosis.
                </Text>
            </VStack>

        </SimpleGrid>
        
        {/* Training: PubMed, clinical guidelines, dialogue */}
        <SimpleGrid columns={[1, null, 2]} spacing="16" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "8", md: "30vh"}} pt={{base: "16", md: "0"}}>
            <VStack w="100%" h="fit-content" justifyContent="flex-end" alignItems="flex-start" spacing={"4"} pr="4vw">
                <Text className="header">
                    Medical pre-training
                </Text>
                <Text className="body">
                    Meditron is trained from Meta’s Llama 2 through continued pretraining 
                    on a high-quality medical corpus. 
                </Text>
                <Text className="body">
                    It has absorbed vast knowledge across the entire biomedical literature,
                    and is aware of international clinical practice guidelines.
                </Text>
                <Text className="body">
                    Its extensive training enables its use for a wide range of medical tasks,
                    including clinical decision support, medical reasoning, and patient care.
                </Text>

                <Link href="https://arxiv.org/abs/2311.16079" isExternal>
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <Text className="button-text-small" textAlign="center">
                            See the technical report
                        </Text>
                        <ChevronRight size={30}/>
                    </HStack>
                </Link>
            </VStack>

            <GAPReplay />
            
        
        </SimpleGrid>

        <SimpleGrid columns={[1, null, 2]} spacing="8" w="100%" h="fit-content" px={GridStyle.pageMargin}  py={{base: "16", md: "0"}}>
            <Box rounded="3xl" overflow="hidden" w="100%" h="fit-content" position="relative" justifyContent="center" alignItems="center">
                <Image 
                    src="/assets/img/meditron-2.png"
                    width="full" height="auto" alt="Llama-3-8B-Meditron-table" />
            </Box>

            <VStack w="100%" h="fit-content" justifyContent="center" alignItems="flex-start" spacing={"4"}>
                <Text className="header">
                    Smaller & smarter
                </Text>
                <Text className="body">
                    Meditron possesses the highest medical reasoning abilities among open LLMs based on its performance on medical benchmarks.
                </Text>
                <Text className="body">
                    Compared to larger proprietary models like OpenAI&apos;s GPT-4 and Google&apos;s Med-PaLM 2, our model offers a competitive alternative, achieving comparable performance while remaining open-source and cost-efficient.
                </Text>
                <Link href="https://huggingface.co/epfl-llm" isExternal>
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <Text className="button-text-small" textAlign="center">
                            Download the models
                        </Text>
                        <ChevronRight size={30}/>
                    </HStack>
                </Link>
            </VStack>
        </SimpleGrid>

        <VStack w="100%" justifyContent="center" pt={{base: "16", md: "40vh"}} pb={{base: "8", md: "10vh"}} px={GridStyle.pageMargin} textAlign="center">
            <Text className="intro" w="100%">
                Introducing Meditron-V
            </Text>
            <Text className="subheader" w="100%">
                A large multimodal model for visual medical diagnosis.
            </Text>
        </VStack>

        <SimpleGrid columns={[1, null, 2]} spacing="16" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "16", md: "20vh"}}>
            <VStack w="100%" h="fit-content" display="flex" justifyContent="center" fontSize="2xl" alignItems="center" p={{base: "0", md: "10"}}>
                <Box w="100%" h="fit-content" position="relative" overflow={"hidden"} borderRadius={"3vw"}>
                    <Image src="/assets/img/multimodality.pdf" alt="Multimodality" width="100%" height="auto"/>
                </Box>
            </VStack>
            
            <VStack w="100%" h="100%" justifyContent="center" alignItems="flex-start" spacing={"4"}>
                <Text className="header" >
                    Grafting eyes on a LLM
                </Text>
                <Text className="body">
                    Meditron-V (7B) is empowered with image understanding through 
                    the integration of a vision transformer (ViT) enabling the model 
                    to analyze and interpret medical images.
                </Text>
                <Text className="body">
                    Its augmented capabilities unlock a wide range of applications, 
                    from radiology and pathology image analysis for clinical decision support, 
                    to real-time diagnostic for telemedicine.
                </Text>
            </VStack>
        </SimpleGrid>

        <SimpleGrid columns={[1, null, 2]} spacing="8" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "16", md: "20vh"}}>
            <VStack w="100%" h="100%" justifyContent="center" alignItems="flex-start" spacing={"4"} pr={"10"} pt={"10"}>
                <Text className="header" >
                    State-of-the-art visual diagnosis   
                </Text>
                <Text className="body">
                    Enhanced with sight, MEDITRON-V (7B) 
                    outperforms open-access models as well as the best commercial model, 
                    Google&apos;s Med-PaLM M (562B),
                    on three visual diagnosis benchmarks, despite being 80x smaller. 
                </Text>
                <Text className="body">
                    Its augmented capabilities unlock a wide range of applications, 
                    from radiology and pathology image analysis for clinical decision support, 
                    to real-time diagnostic for telemedicine.
                </Text>
                <Link href="https://www.researchgate.net/publication/379556481_MEDITRON_Open_Medical_Foundation_Models_Adapted_for_Clinical_Practice" isExternal>
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <Text className="button-text-small" textAlign="center">
                            Read the pre-print
                        </Text>
                        <ChevronRight size={30}/>
                    </HStack>
                </Link>
            </VStack>

            <Box rounded="3xl" overflow="hidden" w="100%" h="fit-content" position="relative" justifyContent="center" alignItems="center">
                <Image src="/assets/img/meditron-v.png" width="100%" height="auto"  alt="meditron-2" />
            </Box>
        </SimpleGrid>

        {/* Evaluation: Benchmarks & Clinicians*/}
        {/* across biomedical imaging modalities */}
        {/* Criteria: Alignment with clinical guideliens, factual basis for rationale, low possibility of harm, absence of harmful bias, low extent of harm, logical reasoning, coherence, clarity, tone, trust, helpfulness, completeness, relevance, contextual awareness, question comprehension, appropriate confidence, patient-centered communication */}
        <Flex bg="#211c4a" textColor="white" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" py={{base: "16", md: "20vh"}} px={GridStyle.pageMargin}>
            <VStack w="90%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" spacing={"8"} pl={{base: "0", md: "50%"}}>
                <Text className="header">
                    Meditron is an open project.
                </Text>
                <Text className="body">
                    Meditron represents a leap forward in closing the technological 
                    gap between closed- and open-source medical foundation models.
                </Text>
                <Text className="body">
                    By releasing its source code as well as a ready-to-deploy version, 
                    we empower everyone with cutting-edge medical AI.
                </Text>
                <Text className="body">
                    It is free, open-access, open-source, and will remain so forever.
                </Text>
                <Text className="body">
                    We need your help to make it safe.
                </Text>
                <Link href={currentUser ? "/chat" : "/login"}>
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" borderColor="white" bgColor="white" textColor="#211c4a" _hover={{ backgroundColor: "transparent", color: "white" }} display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <Text className="button-text" textAlign="center">
                            Contribute now
                        </Text>
                        <ChevronRight size={30}/>
                        
                    </HStack>
                </Link>
            </VStack>
        </Flex>

        <VStack w="100%" justifyContent="center" pt={{base: "16", md: "20vh"}} pb={{base: "8", md: "20vh"}} px={GridStyle.pageMargin} textAlign="center">
            <Text className="intro" w="100%">
                Doctor evaluation
            </Text>
            <Text className="subheader" w={{base:"100%", md:"60%"}}>
                Meditron has been rigorously evaluated by clinicians 
                to ensure its alignment with real-world medical practice.
            </Text>
        </VStack>

        <SimpleGrid columns={[1, null, 2]} spacing="16" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "8", md: "30vh"}} pt={{base: "16", md: "0"}}>
            <VStack w="100%" h="fit-content" justifyContent="flex-end" alignItems="flex-start" spacing={"4"} pr="10">
                <Text className="header" >
                    Real-world alignment
                </Text>
                <Text className="body">
                    Beyond Q&A benchmarks, we evaluate Meditron-70B 
                    with a panel of 16 certified doctors with medical practice 
                    across 9 specialties in 17 countries. 
                </Text>
                <Text className="body">
                    This panel created a novel dataset of adversarial questions 
                    probing the model&#39;s alignment with clinical standards 
                    across key dimensions such as safety, ethics and fairness.
                </Text>
                <Text className="body">
                    We release our question set, methodolody and results 
                    to foster transparency
                    and collaboration in the community.
                </Text>
                <Link href="https://huggingface.co/epfl-llm" isExternal>
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-end" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pl={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <Text className="button-text-small" textAlign="center">
                            Download the dataset
                        </Text>
                        <ChevronRight size={30}/>
                    </HStack>
                </Link>

            </VStack>
            
            <AdversarialQA />
        </SimpleGrid>

        <SimpleGrid columns={[1, null, 2]} spacing="8" w="100%" h="fit-content" px={GridStyle.pageMargin} pb={{base: "16", md: "20vh"}}>
            <Box w="100%" h="fit-content" bgColor="white" display="flex" justifyContent="center" fontSize="2xl" alignItems="center" rounded="2xl" overflow="hidden" py={"4"}>
                <Image src="/assets/img/doctor_eval.png" alt="Doctor evaluation" width={"90%"} height={"auto"}/>
            </Box>

            <VStack w="100%" h="fit-content" justifyContent="flex-end" alignItems="flex-start" spacing={"4"} pr="10" pt="10">
                <Text className="header" >
                    Clinician-level expertise
                </Text>
                <Text className="body">
                    Meditron 70B exhibits a high level of alignment across critical dimensions, 
                    including medical reasoning, safety, fairness, communication, and interpretation.
                </Text>
                <Text className="body">
                    Meditron achieves high scores on all metrics, and 
                    physicians conclude that its level of expertise is 
                    equivalent to or higher than that of a medical resident 
                    with between 1 and 5 years of experience, demonstrating 
                    its potential for real-world clinical support. 
                </Text>
            </VStack>
        </SimpleGrid>

    </VStack>
    <Footer />
    </>
);
}