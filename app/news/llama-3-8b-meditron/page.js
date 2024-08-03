"use client";

import Link from "next/link";
import React from "react";
// import { MeditronTable} from "@/components/ChartsMeditron";
import { Box, Text, VStack, Image, HStack} from "@chakra-ui/react";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import {GridSection, GridElement} from "@/components/content/Grids";
import {ChevronLeft} from 'lucide-react';

export default function People() {
  return (
    <>
      <Header />

      <main w="100vw" display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{overflowX: "hidden"}}>

        <GridSection pt="30vh">
            <GridElement cols={2} p={0} colStart={1} rowStart={1}>
                <Link href="/news">
                    <HStack className="bg-transparent text-black hover:bg-black hover:text-white dark:bg-white dark:border-white dark:bg-white dark:text-black dark:hover:text-white rounded-full border-black border-2 border-solid" display="flex" justifyContent="flex-start" alignItems="center" textAlign="center" w="fit-content" h="fit-content" borderRadius="full" p={3} pr={8} spacing={"1vw"} transition="all ease-in-out 0.5s" style={{whiteSpace: "nowrap"}}>
                        <ChevronLeft size={30}/>
                        <Text className="button-text-small" textAlign="center">
                            Back to news
                        </Text>
                    </HStack>
                </Link>
            </GridElement>
            <GridElement cols={8} p={0} colStart={4} rowStart={1} pb={10}>
                <VStack  w="100%" h="fit-content" position="relative"  borderRadius="2vw" justifyContent="flex-start" alignItems="flex-start" spacing={"4"} pr={"10vw"}>
                    <Text className="label text-gray-700 dark:text-gray-200" w="100%">
                        New model
                    </Text>
                    <Text className="header text-gray-700 dark:text-gray-200" w="100%">
                        State-of-the-art in 24 hours
                    </Text>
                    <Text className="body text-gray-700 dark:text-gray-200" w="100%">
                    We are introducing 
                    <span className="text-blue-500 dark:text-white" >
                    {" "}Llama-3-8B-Meditron v1.0
                    </span>,
                    a new medical Large Language Model (LLM) with 8 billion parameters,
                    fine-tuned within 24-hours of the release of Meta&apos;s Llama-3. 
                    This new model outperforms all state-of-the-art open models within its 
                    parameter class on standard benchmarks such as MedQA and MedMCQA. 
                    It also outperforms Llama-2-70B and is within 10% of the current leading open model 
                    for medicine in the 70B range: Llama-2-70B-Meditron. 
                    </Text>
                    <Text className="body text-gray-700 dark:text-gray-200" w="100%">
                    This work shows the innovative 
                    potential of open foundation models with widely available weights and is part of a 
                    larger initiative to ensure equitable participatory access to this technology in low-resource settings.
                    </Text>

                    <Text className="body text-gray-700 dark:text-gray-200" w="100%">
                        Using the 
                        <Link href="https://github.com/eleutherai/lm-evaluation-harness"  >
                            <span className="text-blue-500 dark:text-white" >
                            {" "}LM-Evaluation Harness
                            </span>
                        </Link> benchmarking tool, we compared Llama-3-8B (base) vs. Meditron-7B vs. 
                        Llama-3-8B-Meditron v1.0 on 3 standard medical question-answering benchmarks (MedQA, PubMedQA, MedMCQA).
                    </Text>
                    <Text className="body text-gray-700 dark:text-gray-200" w="100%">
                        We thank Meta AI for their open release of Llama-3, which enables
                        open-source research and development in the medical domain.
                    </Text>

                    <Text className="body text-gray-700 dark:text-gray-200" w="100%">
                        Stay tuned for more fine-tuning!
                    </Text>

                </VStack>
                </GridElement>

                <GridElement cols={8} p={0} colStart={3} rowStart={2}>
                    {/* <MeditronTable/> */}
                    <Box rounded="2vw" overflow="hidden" w="100%" h="fit-content" position="relative" justifyContent="center" alignItems="center">
                        <Image src="/assets/img/meditron-2.png" width="100%" height="auto"  alt="Llama-3-8B-Meditron-table" />
                    </Box>
                </GridElement>

        </GridSection>
    </main>
    <Footer />
    </>
  );
}
