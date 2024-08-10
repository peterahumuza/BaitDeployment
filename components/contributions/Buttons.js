import { Box, Button, Avatar, Image, Text, HStack, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "@/context/AuthContext";

function NewQuestionButton({onClick, pointsGained}) {
  return (
    <Button onClick={onClick} bg="gray.100" rounded="full" p="2" fontSize="md" _hover={{bg: "gray.300"}} focus="outline-none" transition="background-color 0.2s ease-in-out" mt="2vh">
      <HStack spacing="2" px="2" color="gray.600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
        <Text fontSize="md" fontWeight="light">
          Collect {pointsGained} points
        </Text>
      </HStack>
    </Button>
  );
}

const VoteButton = ({ onClick }) => {
  return (
    <HStack w="fit-content" justifyContent="center" borderRadius="full" className="bg-gray-100 dark:bg-gray-600 color-white dark:color-dark hover:bg-gray-200 dark:hover:bg-gray-500" spacing="2" cursor="pointer" p="1" pr="3" onClick={onClick} transition="background-color 0.2s ease-in-out">
      <svg width="20px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
      </path>
      </svg>
      <Text fontSize="sm" fontWeight="light">
        Vote
      </Text>
    </HStack>
  );
};

const UserLogo = () => {
  const { currentUser, userData, userRecordsId, setUserData } = useAuth();
    
    return (
      <> </>
      // <Box display="flex" justifyContent="center">
      //   <Avatar size={"sm"} src={"https://api.dicebear.com/7.x/initials/svg?seed=" + currentUser?.displayName.split(" ")[0].charAt(0) + currentUser?.displayName.split(" ")[1].charAt(0)}/>
      // </Box>
    );
  };
  
  const MeditronLogo = () => {
    return (
      <Image src="/assets/logos/MeditronBall.svg" alt="Meditron" width="30px" height="30px" />
    );
  };
  
  const FlagButton = () => {
    return (
      <Button h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" transition="color 0.2s ease-in-out" _hover={{color: "blue.600"}}>
        <Tooltip label="Red flag" bg="gray.200" color="gray.800" fontSize="sm" rounded="full" shadow="md" placement="top" offset={[0, 10]}>
          <Image src="/assets/icons/flag.svg" alt="copy" width={"20px"} height={"20px"}/>
        </Tooltip>
      </Button>
  
    );
  };


function LikertDot({ selected, onClick, level }) {
    const colors = {
      "Yes": "green.400",
      "No": "red.400",
      1: "red.400",
      2: "orange.200",
      3: "yellow.200",
      4: "green.200",
      5: "green.400",
    }
    return (
      <Button 
        onClick={onClick} 
        rounded="full" 
        size="sm" 
        bg={selected ? colors[level] : "transparent"}
        color={selected ? "white" : "black"} 
        _hover={{ bg: selected ? colors[level] : "gray.200" }}
        focus="outline-none" 
        transition="background-color 0.2s ease-in-out">
        <Box w="10px" h="10px" bg={selected ? "white" : "gray.300"} rounded="full" p="0" />
      </Button>
    );
  }

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = () => {
      navigator.clipboard.writeText(text)
        .then(() => setCopied(true))
        .catch(err => console.error('Failed to copy text: ', err));
    };
  
    return (
      <Button h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" transition="color 0.2s ease-in-out" _hover={{color: "blue.600"}} onClick={handleCopy}>
        <Tooltip label={"Copy"} bg="gray.200" color="gray.800" fontSize="sm" rounded="full" shadow="md" placement="top" offset={[0, 10]}>
          <Image src="/assets/icons/copy.svg" alt="copy" width={"20px"} height={"20px"}/>
        </Tooltip>
      </Button>
    );
  };

  const ThumbsUp = ({ text }) => {
    const [upvote, setUpvote] = useState(false);
  
    const handleUpvote = () => {
      // TO BE IMPLEMENTED
    };
  
    return (
      <Button h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" transition="color 0.2s ease-in-out" _hover={{color: "blue.600"}} onClick={handleUpvote}>
        <Tooltip label={upvote ? "Upvoted" : "Upvote"} bg="gray.200" color="gray.800" fontSize="sm" rounded="full" shadow="md" placement="top" offset={[0, 10]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
                d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
            ></path>
            </svg>
        </Tooltip>
      </Button>
    );
  };

  const ThumbsDown = ({ text }) => {
    const [downvote, setDownvote] = useState(false);
  
    const handleDownvote = () => {
      // TO BE IMPLEMENTED
    };
  
    return (
      <Button h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" transition="color 0.2s ease-in-out" _hover={{color: "blue.600"}} onClick={handleDownvote}>
        <Tooltip label={downvote ? "Downvoted" : "Downvote"} bg="gray.200" color="gray.800" fontSize="sm" rounded="full" shadow="md" placement="top" offset={[0, 10]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
                d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
            ></path>
            </svg>
        </Tooltip>
      </Button>
    );
  };


const WeighingScaleIcon = () => {
    return (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/>
    <path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
    )
}

export { VoteButton, UserLogo, MeditronLogo, FlagButton, LikertDot, CopyButton, ThumbsUp, ThumbsDown, NewQuestionButton, WeighingScaleIcon };
