import { Image, Text, HStack, Avatar, Button, Flex, SimpleGrid, VStack, useColorModeValue } from "@chakra-ui/react";
import React from 'react';
import useAuth from "@/context/AuthContext";
import Colors from "@/components/contributions/Colors";
import {GridSection, GridElement} from "@/components/content/Grids";

function PastChat ({title, messages, userName, date, openChat}) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [isHovered, setIsHovered] = React.useState(false);
  const hoverFilter = useColorModeValue("brightness(95%)", "brightness(130%)");

  const userMessage = messages.find(message => message.role === 'user');
  if (!userMessage) {
    return null;
  }
  const question = userMessage.content;
  function onClick() {
    openChat(messages);
  }
  return (
    <VStack className="bg-box dark:bg-gray-700" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" spacing="4" p="5" rounded="3xl" position="relative" shadow="md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick} cursor="pointer" _hover={{ filter: hoverFilter }} transition="filter 0.2s ease-in-out">
      {/* <Text fontWeight="600" color="slate.800" fontSize="md">
          {title}
      </Text> */}
      <Text fontSize="md" fontWeight="light" color="slate.800" w="100%" noOfLines="1" overflow="hidden" textOverflow="ellipsis">
          {question}
      </Text>
      <HStack w="100%" justifyContent="flex-start" alignItems="center" spacing="1vw">
          <Avatar size="sm" src={"https://api.dicebear.com/7.x/initials/svg?seed=" + userName.split(" ")[0].charAt(0) + userName.split(" ")[1].charAt(0)}/>
          <Text fontSize="sm" fontWeight="light" color="slate.800">
            {new Date(date).toLocaleDateString("en-US", dateOptions)}
          </Text>
      </HStack>
      <Flex rounded="full" p="2" fontSize="md" focus="outline-none" position="absolute" bottom="5" right="5" alignSelf="flex-end" bgColor="white" opacity={isHovered ? 1 : 0} transition="opacity 0.2s ease-in-out">
        <Image src="/assets/icons/arrow_up_right.svg" alt="arrow" width={"20px"} height={"20px"} />
      </Flex>
    </VStack>
  );
}

export default function ChatHistory({ openChat }) {

  // TO BE IMPLEMENTED
  const { currentUser, userData, userRecordsId, setUserData } = useAuth();
  // const userName = currentUser.displayName;
  const userName = "John Doe";
  const pastChats = [
    {
      'title': 'Diabetes',
      'date': '2021-10-01',
      'messages': [
        {"role": "user", "content": "What is diabetes and how can it be treated?"},
        {"role": "assistant", "content": "Diabetes is a chronic condition that affects the way the body processes blood sugar. It can be managed through a combination of diet, exercise, and medication. Would you like more information on this?"},
      ]
    },
    {
      'title': 'Asthma',
      'date': '2021-10-02',
      'messages': [
        {"role": "user", "content": "How can I manage my asthma symptoms?"},
        {"role": "assistant", "content": "Asthma can be managed through a combination of medication and lifestyle changes. Would you like more information on this?"},
      ]
    },
    {
      'title': 'Anxiety',
      'date': '2021-10-03',
      'messages': [
        {"role": "user", "content": "I've been feeling anxious lately. What can I do to feel better?"},
        {"role": "assistant", "content": "Anxiety can be managed through a combination of therapy, medication, and lifestyle changes. Would you like more information on this?"},
      ]
    },
  ];
  pastChats.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="center" overflowY="auto" pl="10%" pr="10%" pt="10vh">
        
        <VStack w="100%" h="fit-content" spacing={"1vw"} alignItems="flex-start" justifyContent="flex-start">
          <Text className="header text-black dark:text-gray-300" fontSize={{base: "3xl", md: "5xl"}}>
            Chat history
          </Text>
          <Text className="text-gray-500 dark:text-gray-400" fontWeight="light" mb="2vh" fontSize={{base: "lg", md: "2xl"}}>
          Browse your past interactions with Meditron 
          </Text>
        </VStack>

        <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
            {pastChats.map((chat, index) => (
              <PastChat key={index} title={chat.title} messages={chat.messages} userName={userName} date={chat.date} openChat={openChat}/>
            ))}
        </SimpleGrid>
    </VStack>


  );
}
