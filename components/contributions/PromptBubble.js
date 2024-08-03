import { useState } from 'react';
import { Flex, Textarea, Button, useColorModeValue } from "@chakra-ui/react";
import ResizeTextarea from 'react-textarea-autosize';
import { ArrowRight } from 'lucide-react';


export default function PromptBubble({onSubmit, placeholder}) {
    const [userQuestion, setUserQuestion] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (userQuestion.trim() !== '') {
            onSubmit(userQuestion);
            setSubmitted(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInputChange = (e) => {
        setUserQuestion(e.target.value);
        setIsTyping(e.target.value.trim() !== '');
    };
    const notTypingBg = useColorModeValue("gray.200", "gray.500");
    const typingBg = useColorModeValue("black", "white");
    const arrowColor = useColorModeValue("white", "black");
    return (
        <>
            {!submitted && (
                <Flex className="bg-white dark:bg-gray-800" w="80%" justifyContent="center" align="center" pb="4vh" position="absolute" bottom="0" zIndex="10" cursor="pointer">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <label htmlFor="chat-input" className="sr-only">Ask Meditron...</label>
                        <Flex className="bg-box dark:bg-gray-700" filter={isTyping ? "brightness(0.98)": "none"} borderRadius="3xl" position="relative" direction="column" w={{base:"84vw" , md:"50vw"}}>
                            <Textarea minH="unset" overflow="hidden" cursor="text" id="chat-input" resize="none" borderRadius="3xl" as={ResizeTextarea} w="full" border="none" p="4" pr="16" text="lg" color="slate.900" _focusVisible={{ outline: "none" }} className="bg-box dark:bg-gray-600" placeholder={placeholder} rows="1" overflowY="auto" onChange={handleInputChange} value={userQuestion} required shadow="none" onKeyPress={handleKeyPress} />
                            <Button bg={isTyping ? typingBg : notTypingBg} type="submit" position="absolute" bottom="2" right="2" rounded="full" p="2" _hover={{cursor: isTyping ? "pointer" : "default"}} transition="background-color 0.2s ease-in-out" zIndex={2} disabled={!isTyping} w="10" h="10">
                                <ArrowRight size={25} color={isTyping ? arrowColor : "white"} />
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            )}
        </>
    );
}
