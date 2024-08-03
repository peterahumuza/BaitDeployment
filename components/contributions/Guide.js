import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react";

export default function Guide({handleModeSwitch, user}) {
    return (
      <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="center" pl="10%" pr="10%" overflowY="auto" pt="15vh">
        
        {/* Make a grid of 4 boxes stacked horizontally */}
        <Text width="100%" alignItems="center" fontSize="5xl" color="gray.400" fontWeight="400" mb="2vh">
          Hi {user.displayName}
        </Text>
        <Text width="100%" alignItems="center" fontSize="3xl" mb="5vh" fontWeight="light" color="gray.500">
          Here&#39;s how you can help.
        </Text>
        <HStack position="relative" w="100%" align="center" textColor="black" justify="flex-start" spacing={"2vw"}>
          <Box w="25%" h="12vw" textAlign="center" cursor="pointer" transition="transform 0.3s ease-in-out" _hover={{transform: "scale(1.1)", bg: "none"}} display="flex" flexDirection="column" alignItems="center" bgColor="white" borderColor="grey.400" borderStyle="solid" borderWidth="1px" borderRadius="2vw" p="4" onClick={() => handleModeSwitch('upload')}  justifyContent="center">
            <Image alt="" src="/assets/img/share_icon.png" width={"30px"} height={"30px"} justify="center"/>
            <Text mt={2} fontSize="lg" fontWeight="light" textAlign="center" w="70%">
              Upload data
            </Text>
          </Box>
            <Box w="25%" h="12vw" textAlign="center" cursor="pointer" transition="transform 0.3s ease-in-out" _hover={{transform: "scale(1.1)", bg: "none"}} display="flex" flexDirection="column" alignItems="center" bgColor="white" borderColor="grey.400" borderStyle="solid" borderWidth="1px" borderRadius="2vw" p="4" onClick={() => handleModeSwitch('contribute')}  justifyContent="center">
              <Image alt="" src="/assets/img/question_icon.png" width={"30px"} height={"30px"} justify="center"/>
              <Text mt={2} fontSize="lg" fontWeight="light" textAlign="center" w="80%">
                Ask questions
              </Text>
            </Box>
            {/* Make height same as w */}
            <Box w="25%" h="12vw" textAlign="center" cursor="pointer" transition="transform 0.3s ease-in-out" _hover={{transform: "scale(1.1)", bg: "none"}} display="flex" flexDirection="column" alignItems="center" bgColor="white" borderColor="grey.400" borderStyle="solid" borderWidth="1px" borderRadius="2vw" p="4" onClick={() => handleModeSwitch('contribute')} justifyContent="center">
              <Image alt="" src="/assets/img/bar_icon.png" width={"30px"} height={"30px"} justify="center"/>
              <Text mt={2} fontSize="lg" fontWeight="light" textAlign="center" w="80%">
                Rank answers
              </Text>
            </Box>
            <Box w="25%" h="12vw" textAlign="center" cursor="pointer" transition="transform 0.3s ease-in-out" _hover={{transform: "scale(1.1)", bg: "none"}} display="flex" flexDirection="column" alignItems="center" bgColor="white" borderColor="grey.400" borderStyle="solid" borderWidth="1px" borderRadius="2vw" p="4" onClick={() => handleModeSwitch('contribute')}  justifyContent="center">
              <Image alt="" src="/assets/img/task_icon.png" width={"30px"} height={"30px"} justify="center"/>
              <Text mt={2} fontSize="lg" fontWeight="light" textAlign="center" w="70%">
                Improve answers
              </Text>
            </Box>
          </HStack>
      </VStack>
    );
  }