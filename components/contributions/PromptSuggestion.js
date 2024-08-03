import { Box, VStack, Text, Image, useColorModeValue } from "@chakra-ui/react";
import React from 'react';
import {isICRC} from "@/firebase";

export default function PromptSuggestion() {
    if (isICRC) {
        return <PromptSuggestionICRC />;
    } else {
        return <PromptSuggestionMoove />;
    }
}

function PromptSuggestionMoove() {
    let bg = useColorModeValue("black", "white");
    let src = useColorModeValue("/assets/logos/ICON_MEDITRON_70B_W.svg", "/assets/logos/ICON_MEDITRON-70B_B.svg");
    let color = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" pt="30vh">
            <Box w="60px" h="60px" borderWidth="1px" borderColor="gray.100" borderStyle="solid" bg={bg} rounded="full" display="flex" justifyContent="center" alignItems="center">
                <Image src={src} alt="Meditron" width="30px" height="30px" objectFit="contain" />
            </Box>
            <Text fontSize="xl" fontWeight="light" color={color} textAlign="center" w="100%">
                Challenge me with a hard question.
            </Text>
        </VStack>
    );
}

function PromptSuggestionICRC() {
    let color = useColorModeValue("gray.500", "gray.400");
    let bg = useColorModeValue("black", "white");
    let src = useColorModeValue("/assets/logos/ICON_MEDITRON_70B_W.svg", "/assets/logos/ICON_MEDITRON-70B_B.svg");
    return (
        <VStack h="fit-content" justifyContent="flex-start" alignItems="center" pt="15vh" color={color} textAlign="left" spacing={4} w={{base:"90%", md:"60%"}} minW="350px" mx="auto">
            <Box w="60px" h="60px" borderWidth="1px" borderColor="gray.100" borderStyle="solid" bg={bg} rounded="full" display="flex" justifyContent="center" alignItems="center">
                <Image src={src} alt="Meditron" width="30px" height="30px" objectFit="contain" />
            </Box>
            <Text fontSize="md" w="100%" textAlign="center" fontWeight="400">
                The Meditron chatbot is in its first testing phase. <br />
                Please follow these guidelines.
            </Text>

            <Text fontSize="md" w="100%" fontWeight="light" textAlign="justify">
                Do not include any sensitive information, and only include
                public or fictitious data (e.g. publicly available data
                on a country/region or fictitious patient cases).
            </Text>

            <Text fontSize="md" fontWeight="light" w="100%" textAlign="justify">
                Please provide feedback
                on the quality of the answers to help identify the model
                strengths and limitations
            </Text>

            <Text fontSize="md" fontWeight="light" w="100%" textAlign="justify">
                Please note that this chatbot is currently tailored for health questions,
                not specifically for humanitarian settings. For best results,
                provide context before your question, such as:
                «I work for a humanitarian organization in low-resource settings, ...»
            </Text>

            <Text fontSize="md" fontWeight="light" w="100%" textAlign="justify">
                Example: I am a nurse in rural Senegal dealing with a cholera outbreak. What are the best practices for treatment and prevention?
            </Text>
        </VStack>
    );
}