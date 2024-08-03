import React, { useState, useEffect } from "react";
import { VStack, HStack, Text, Button, Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Image } from "@chakra-ui/react";
import { LikertDot, CopyButton, ThumbsUp, ThumbsDown } from "@/components/contributions/Buttons";
import InfoButton from "@/components/contributions/InfoButton";

const LikertCriteria = [
    { label: "Algorithimic bias", value: "algorithimic bias", description: "Algorithimic bias" },
    { label: "Evaluation bias", value: "evaluation bias", description: "Evaluation bias" },
    { label: "Confirmation bias", value: "comfirmation bias", description: "Confirmation bias" },
    { label: "Confounding bias", value: "confounding bias", description: "Confounding bias" },
    { label: "Stereotyping bias", value: "stereotyping bias", description: "Stereotyping bias" },
];

function Likert({ likert, updateLikert, header ="Evaluate potential biases in the answer" }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    const scoreDescription = {
        "Yes": "Yes",
        "No": "No",
    };

    return (
        <VStack w="100%" h="fit-content" justifyContent="flex-end" alignItems="flex-end" spacing="2" className="bg-box dark:bg-gray-700 color-white dark:color-dark no-scroll" p="5" pr="2" rounded="2vw" shadow="md">
        <HStack w="100%" justifyContent="flex-end" alignItems="space-between" spacing="1vw" h="fit-content" pr="5">
            <Text  w="100%" fontWeight="400" textAlign="left">
            {header}
            </Text>
            <InfoButton title="Likert scale evaluation" description="TBD" />
        </HStack>
        {/* maxHeight="35vh" */}
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-end" spacing="2" h="fit-content" overflowY="auto" overflowX="hidden" scrollbar-width="none" pr="5">
            <HStack w="40%" justifyContent="space-between" alignItems="left" spacing="0" h="fit-content">
            {Object.keys(scoreDescription).map((score,i) => (
            <Tooltip label={scoreDescription[score]} bg="gray.200" color="gray.800" fontSize="sm" rounded="md" shadow="md" placement="top" offset={[0, 10]} key={i}>
                <Button rounded="full" size="sm" focus="outline-none" bg="transparent" className="color-dark dark:color-white">
                    <Text fontSize="xs" fontWeight="light">
                        {score}
                    </Text>
                </Button>
            </Tooltip>
            ))}
            </HStack>
            {LikertCriteria.map((criterion, index) => (
            <HStack key={index} w="100%" justifyContent="flex-end" alignItems="center" h="fit-content" className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-transparent dark:bg-gray-600"} rounded="full">
                <Tooltip label={criterion.description} bg="gray.200" color="gray.800" fontSize="sm" rounded="md" shadow="md" placement="right" offset={[0, 10]} p="2">
                <Text fontSize="sm" fontWeight="light" color="slate.800" textAlign="right" w="50%">
                    {criterion.label}
                </Text>
                </Tooltip>
                <HStack w="40%" justifyContent="space-between" alignItems="center" h="fit-content" spacing="0" rounded="full">
                    {["Yes", "No"].map((score) => (
                    <LikertDot
                        key={score}
                        selected={likert[index] === score}
                        level={score}
                        onClick={() => {
                        const updatedCriteria = [...likert];
                        updatedCriteria[index] = score;
                        updateLikert(updatedCriteria);
                        }}
                    />
                    ))}
                </HStack>
            </HStack>
            ))}
        </VStack>
        </VStack>
    );
}

export {Likert, LikertCriteria};