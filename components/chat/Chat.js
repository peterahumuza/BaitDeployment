
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { HStack, VStack, Flex, SimpleGrid, Box, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { UserLogo, MeditronLogo } from "@/components/contributions/Buttons";
import useAuth from "@/context/AuthContext";
import APICall from "@/components/chat/APICall";
import { MarkdownComponents } from "@/components/contributions/Markdown";
import ReactMarkdown from 'react-markdown';
import ChatBubble from "@/components/chat/ChatBubble";
import PrettyPrinting from "@/components/chat/PrettyPrinting";
import PromptSuggestions from "@/components/chat/PromptSuggestions";

function Question({user, content}) {
    return (
        <Flex w="fit-content" maxWidth="75%" justifyContent="flex-start" alignItems="flex-start" className="bg-box dark:bg-gray-700" rounded="3xl">
            {/* <UserLogo user={user} /> */}
            <VStack display="flex" alignItems="flex-start" justifyContent="flex-start" maxW="3xl" px="5" w="100%" py="2">
                <ReactMarkdown components={MarkdownComponents}>
                    {content}
                </ReactMarkdown>
            </VStack>
        </Flex>
    );
}

function Answer({ content, messagesEndRef, pretty }) {
    return (
            <Flex w="100%" py={{base: "2", md: "4"}} justifyContent="flex-start" alignItems="flex-start">
                <MeditronLogo />
                <VStack display="flex" alignItems="flex-start" justifyContent="flex-start" maxW="3xl" pl="4" w="100%">
                    <VStack w="100%" display="flex" alignItems="flex-start" justifyContent="flex-start" whiteSpace="pre-wrap">
                        {pretty ?
                            <PrettyPrinting content={content} messagesEndRef={messagesEndRef} />
                            :
                            <ReactMarkdown components={MarkdownComponents}>
                                { content }
                            </ReactMarkdown>
                        }
                    </VStack>
                </VStack>
            </Flex>
    );
}


function Messages({ messages, pretty }) {
    const { currentUser } = useAuth();
    const messagesEndRef = useRef(null);

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <VStack className="chatspace" w="100%" h="100%" display="flex" overflowY="auto">
            <VStack w={{base:"82vw" , md:"48vw"}}  text="sm" leading="6" color="slate.900" smText="base" smLeading="7" position="relative" justifyContent="flex-start" alignItems="flex-end" pt={16} pb={8} spacing={5} minWidth="300px" >
                {messages.map((message, index) => (
                    message.role === 'user' ?
                        <Question
                                key={index}
                                user={currentUser}
                                content={message.content}
                        />
                        :
                        <Answer
                                key={index}
                                content={message.content}
                                messagesEndRef={messagesEndRef}
                                pretty={pretty}
                        />
                ))}
            </VStack>
            <div ref={messagesEndRef} />
        </VStack>
    );
}





function ChatSuggestion({ handleNewQuestion, messages, setMessages }) {
    let color = useColorModeValue("gray.600", "gray.300");
    return (
            <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" pt="20vh">
                <Box w="60px" h="60px" borderWidth="1px" borderColor="gray.100" borderStyle="solid" bg="black" rounded="full" display="flex" justifyContent="center" alignItems="center">
                    <Image src="/assets/logos/ICON_MEDITRON_70B_W.svg" alt="Meditron" width="30px" height="30px" objectFit="contain" />
                </Box>
                <Text fontSize="xl" fontWeight="light" textAlign="center" w="100%" color={color}>
                    Chat freely with Meditron.
                </Text>
                <PromptSuggestions handleNewQuestion={handleNewQuestion} messages={messages} setMessages={setMessages} />
            </VStack>
    );
}


async function handleNewQuestion(question, messages, setMessages) {
    const newQuestion = { role: 'user', content: question };
    const newAnswer = { role: 'assistant', content: '' };
    const currentMessages = [...messages, newQuestion];
    const newMessages = [...messages, newQuestion, newAnswer];
    setMessages(newMessages);

    const answer = await APICall(currentMessages); // MULTI_TURN CONVERSATION
    // const answer = await APICall([newQuestion]); // SINGLE TURN CONVERSATION
    newAnswer.content = answer;

    const updatedMessages = [...messages, newQuestion, newAnswer];
    setMessages(updatedMessages);

}

export default function Chat({ userMessages = []}) {
    const [messages, setMessages] = useState(userMessages);
    const pretty = userMessages.length === 0;

    useEffect(() => {
        setMessages(userMessages);
    }, [userMessages]);

    return (
            <VStack id="chat" w="100%" h="100%" spacing="1vw" justifyContent="flex-start" alignItems="center" overflowY="auto" pb="10vh">
                { messages.length === 0 ?
                        <ChatSuggestion handleNewQuestion={handleNewQuestion} messages={messages} setMessages={setMessages} />
                        :
                        <Messages messages={messages} pretty={pretty} />
                }
                <ChatBubble
                        onSubmit={(question) => handleNewQuestion(question, messages, setMessages)}
                        placeholder="Ask Meditron"
                />
            </VStack>
    );
}