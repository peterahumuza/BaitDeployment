import React from 'react';
import { VStack, HStack, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { MarkdownComponents } from "@/components/contributions/Markdown";
import { UserLogo } from "@/components/contributions/Buttons";

export default function Question({question}) {
    return (
      <VStack w="70%" h="fit-content" spacing="1vw" justifyContent="flex-start" alignItems="flex-start" mt="4vh" className="bg-box dark:bg-gray-700 color-white dark:color-dark" p="5" rounded="2vw" shadow="md">
        <HStack w="100%" justifyContent="flex-start" alignItems="flex-start" spacing="1vw">
          <UserLogo user="user" />
          <Text fontWeight="400">
            Question
          </Text>
        </HStack>
        <ReactMarkdown components={MarkdownComponents}>
          {question}
        </ReactMarkdown>
      </VStack>
    );
}
