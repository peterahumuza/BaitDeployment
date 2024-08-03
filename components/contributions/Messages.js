import React, { useEffect, useRef } from "react";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { MarkdownComponents } from "@/components/contributions/Markdown";
import ReactMarkdown from "react-markdown";
import { UserLogo, MeditronLogo, CopyButton, ThumbsUp, ThumbsDown } from "@/components/contributions/Buttons";
import useAuth from "@/context/AuthContext";



function Message ( {user, message} ) {
    return (
        <div className="flex px-4 py-8 sm:px-6">
            {user === "meditron" ? <MeditronLogo/> : <UserLogo user={user} />}
  
            <VStack display="flex" alignItems="flex-start" justifyContent="flex-start" maxW="3xl" pl="4">
                <div className="flex flex-col">
                    {user === "meditron" ? (
                        <Text fontWeight="bold" color="slate.800">
                            Meditron
                        </Text>
                    ) : (
                        <Text fontWeight="bold" color="slate.800">
                            You
                        </Text>
                        )   
                    }
                    <p>
                    <ReactMarkdown components={MarkdownComponents}>
                      {message}
                    </ReactMarkdown>
                    </p>
                </div>
                {user === "meditron" ? (
                    <HStack display="flex" mt="2" gap="2" color="gray.400">
                        <ThumbsUp />
                        <ThumbsDown/>  
                        <CopyButton/>
                    </HStack>
                ) : null
                }
            </VStack>
        </div>
    );
  }
  
  
  
export default function Messages({ questions, answers }) {
    
    const { currentUser, userData, userRecordsId, setUserData } = useAuth();
    const messagesEndRef = useRef(null); // Create a ref for the end of the messages
  
    // This effect runs every time questions or answers change.
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
      // This will scroll the view to the ref's current element (the bottom of your messages)
    }, [questions, answers]); // Add questions and answers as dependencies
  
    return (
      <Box
        w="100%"
        pl="25%" pr="25%"
        flex="1"
        overflowY="auto"
        text="sm"
        leading="6"
        color="slate.900"
        smText="base"
        smLeading="7"
      >
        {questions.map(function(question, index) {
          return (
            <div key={index}> {/* Added a key for each message pair */}
              <Message user={currentUser} message={question}/>
              <Message user="meditron" message={answers[index]}/>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* This empty div is the scroll target */}
      </Box>
    );
  }
