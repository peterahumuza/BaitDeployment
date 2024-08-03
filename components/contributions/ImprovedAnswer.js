import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Textarea } from '@chakra-ui/react';
import { UserLogo } from "@/components/contributions/Buttons";
import ReactMarkdown from 'react-markdown';
import { MarkdownComponents } from "@/components/contributions/Markdown";
import ResizeTextarea from 'react-textarea-autosize';
import InfoButton from "@/components/contributions/InfoButton";

export default function ImprovedAnswer({ onSubmit, improvedAnswer }) {
    const [improvedAnswerText, setImprovedAnswerText] = useState(improvedAnswer);
    const [submitted, setSubmitted] = useState(false);
    console.log("improvedAnswerText in component : ", improvedAnswerText)


    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); 
        handleSubmit();
      }
    };
  
    const handleSubmit = () => {
      if (improvedAnswerText.trim() !== '') {
        onSubmit(improvedAnswerText);
        setSubmitted(true); 
      }
    };
  
    return (
      <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start" className="bg-box dark:bg-gray-700 color-white dark:color-dark" p="5" rounded="2vw" shadow="md">
        <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="1vw">
          <Text fontWeight="400">
            Write your ideal answer
          </Text>
          <InfoButton
            title="Improved answer"
            description="Write an improved version of the answer that you believe would be more helpful to the user. You can copy and paste the better answer and edit it to improve it. You can also write a completely new answer."
          />

          
        </HStack>
        {submitted ? (
          <ReactMarkdown components={MarkdownComponents}>
          {improvedAnswerText}
          </ReactMarkdown>
          ) : ( 
            <Textarea
            value={improvedAnswerText}
            h="fit-content"
            as={ResizeTextarea}
            onChange={(e) => setImprovedAnswerText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            minRows={3} 
            maxRows={20} 
            style={{ resize: 'none', height: 'auto' }}
          />
          )}
      </VStack>
    );
  }