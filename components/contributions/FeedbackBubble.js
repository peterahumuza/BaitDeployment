
import React, { useState } from 'react';
import { Flex, VStack, HStack, Button, Text, Textarea, Image, useColorModeValue, Tooltip } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { ArrowUp } from 'lucide-react';
import useAuth from "@/context/AuthContext";
import useError from "@/context/ErrorContext";
import { storeFeedbackInDatabase } from "@/helpers/dbOperations";


export default function FeedbackBubble() {
    const { currentUser, userData } = useAuth(); 
    const { error, setError, setMessages } = useError();
    const messages = [];  

    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const isTyping = feedback.trim() !== '';

    function toggleFeedback() {
        setIsOpen(!isOpen);
    }
    function handleChange(e) {
        setFeedback(e.target.value);
    }
    async function handleSubmit() {
        try {
            await storeFeedbackInDatabase(currentUser, userData, feedback, setMessages, setError);
        } catch (error) {
            console.error("Error submitting feedback: ", error);
        }
        setFeedback('');
        setIsOpen(false);
        setMessages(["Feedback sent"]);
        setError(false)
    }

    const notTypingBg = useColorModeValue("gray.200", "gray.500");
    const typingBg = useColorModeValue("black", "white");
    const arrowColor = useColorModeValue("white", "black");
    const feedbackColor = useColorModeValue("black", "white");

    return (
        <VStack className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text:black dark:text-white" transition="background-color 0.2s ease-in-out" position="fixed" right="8" top="8" w="fit-content" h="fit-content" boxShadow="md" zIndex="1000" rounded={isOpen ? "2xl" : "full"} justifyContent="flex-start" alignItems="flex-start" spacing="4" p={isOpen ? 6 : 2}>
            <HStack w="100%" h="fit-content" spacing="2" justifyContent="space-between" alignItems="center">
                {isOpen &&
                    <Text fontSize="xl" fontWeight="normal" textAlign="left">
                        How can we improve?
                    </Text>
                }
                <Tooltip label="Feedback" bg="gray.200" color="gray.800" fontSize="sm" rounded="md" shadow="md" placement="top" offset={[0, 20]}>
                    <Button rounded="full" w="fit-content" h="fit-content" p={2} focus="outline-none" bg="transparent" _hover={{color: feedbackColor}} onClick={toggleFeedback}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                    </Button>
                </Tooltip>
            </HStack>

            {isOpen &&
                <Text fontSize="md" fontWeight="light" textAlign="left" w="100%" maxWidth="400px" pr={4} color="slate.800">
                    This platform is co-designed by clinicians. 
                    Please notify us with your recommendations, issues, or bugs you might encounter. 
                    Your feedback is encouraged, valued, and, (whenever possible) implemented.
                </Text>
            }
            
            {isOpen &&
                <Flex className="bg-white dark:bg-gray-800" borderRadius="3xl" position="relative" direction="column" w="full" maxWidth="400px" >
                    <Textarea className="w-full" rounded="3xl" minH="unset" overflow="hidden" cursor="text" id="chat-input" resize="none" as={ResizeTextarea} border="none" p="4" text="lg" color="slate.900" shadow="md" focus="outline-none" placeholder="Enter your feedback here" rows="1" overflowY="auto" onChange={handleChange} value={feedback} />
                    <Button bg={isTyping ? typingBg : notTypingBg} onClick={handleSubmit} type="submit" position="absolute" bottom="2" right="2" rounded="full" p="2" _hover={{cursor: isTyping ? "pointer" : "default"}} transition="background-color 0.2s ease-in-out" zIndex={2} disabled={!isTyping} w="10" h="10">
                        <ArrowUp size={25} color={isTyping ? arrowColor : "white"} />
                    </Button>
                </Flex>
            }
        </VStack>
    );
}