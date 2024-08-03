import React from 'react';
import { Text, Link, Image, OrderedList, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";

const skipstyle = {
  overflowWrap: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
};


export const MarkdownComponents = {
  h1: ({ children }) => <Text fontSize="xl" fontWeight="bold" pt="5" mb="5" {...skipstyle}>{children}</Text>,
  h2: ({ children }) => <Text fontSize="lg" fontWeight="bold" pt="4" mb="4" {...skipstyle}>{children}</Text>,
  h3: ({ children }) => <Text fontSize="md" fontWeight="bold" pt="3" mb="3" {...skipstyle}>{children}</Text>,
  h4: ({ children }) => <Text fontSize="md" fontWeight="bold" pt="2" mb="2" {...skipstyle}>{children}</Text>,
  p: ({ children }) => <Text fontSize="md" {...skipstyle}>{children}</Text>,
  a: ({ children, href }) => <Link href={href} color="blue.500" isExternal>{children}</Link>,
  ul: ({ children }) => <UnorderedList spacing="2" stylePosition="inside">{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList spacing="2" stylePosition="inside">{children}</OrderedList>,
  li: ({ children }) => <ListItem ml="4">{children}</ListItem>,
  img: ({ src, alt }) => <Image src={src} alt={alt} w="100%" h="auto" p="2" border="1px solid" borderColor="gray.200" rounded="md" />,
  blockquote: ({ children }) => <Box borderLeft="4px" borderColor="gray.200" pl="4" mb="4"><Text fontStyle="italic">{children}</Text></Box>,
  code: ({ children, className }) => {
      if (!className) {
          return <Code>{children}</Code>;
      }
      const language = className.replace('language-', '');
      return <Code p="4" w="full" overflowX="auto" display="block" whiteSpace="pre">{children}</Code>;
  },
};
