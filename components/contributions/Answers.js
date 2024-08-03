import { VStack, HStack, Text,Tooltip, Image, SimpleGrid } from '@chakra-ui/react';
import PrettyPrinting from "@/components/chat/PrettyPrinting";
import { MeditronLogo, CopyButton, WeighingScaleIcon } from "@/components/contributions/Buttons";


const VoteButton = ({ onClick, show }) => {
  return (
    <HStack w="fit-content" justifyContent="center" borderRadius="full" className="bg-red-300 dark:bg-red-600 color-white hover:bg-red-200 dark:hover:bg-red-500" spacing="2" cursor="pointer" p="1" pr="3" onClick={onClick} transition="background-color 0.2s ease-in-out" display={show ? "flex" : "none"}>
      <WeighingScaleIcon />
      <Text fontSize="sm" fontWeight="light">
        More Biased
      </Text>
    </HStack>
  );
};

const EqualVoteButton = ({ onClick, show }) => {
  return (
    <HStack w="fit-content" justifyContent="center" borderRadius="full" className="bg-gray-100 dark:bg-gray-600 color-white dark:color-dark hover:bg-gray-200 dark:hover:bg-gray-500" spacing="2" cursor="pointer" p="1" pr="3" onClick={onClick} transition="background-color 0.2s ease-in-out" display={show ? "flex" : "none"}>
      <svg width="20px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h7v1H4V6zm0 3h7v1H4V9z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
      </path>
      </svg>
      <Text fontSize="sm" fontWeight="light">
        Not biased
      </Text>
    </HStack>
  );
};


function Answer({ index, onVoteClick, vote, content, voteShown, equalVote, onEqualVoteClick, handleEqualVoteBackButton }) {
  return (
    <VStack w="100%" h="fit-content" justifyContent="space-between" alignItems="center" spacing="2" p="5" rounded="2vw" className="bg-box dark:bg-gray-700 color-white dark:color-dark" shadow="md">
      <VStack w="100%" justifyContent="flex-start" alignItems="flex-start" spacing="1vw" h="100%">
        <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="0">
          <HStack spacing="2" alignItems="center" justifyContent="flex-end">
            <MeditronLogo />
            <Text fontWeight="400">
                Answer {index}
            </Text>
          </HStack>

          <HStack spacing="0" alignItems="center">
            {/* <FlagButton /> */}
            <CopyButton text={content} />
          </HStack>
        </HStack>
        <PrettyPrinting content={content}/>
      </VStack>

      {vote === "none" && equalVote =="none" ?  (
        // Show vote button only if answer has been voted
        <HStack spacing="2" >
          <VoteButton vote={vote} onClick={onVoteClick} show={voteShown} />
        </HStack>
      ) : (
        <>
          {vote === "1" && index === 1 || vote === "2" && index === 2 ? (
            <Tooltip label="Click to cancel vote" fontSize="md" rounded="full" shadow="md" placement="top" offset={[0, 10]} openDelay={500}>
              <HStack w="fit-content" justifyContent="center" borderRadius="full" spacing="2" cursor="pointer" p="1" pr="3" onClick={handleEqualVoteBackButton} className="bg-red-500 dark:bg-red-800 color-white">
              <WeighingScaleIcon />
                <Text fontSize="sm" fontWeight="400">
                  More Biased
                </Text>
              </HStack>
            </Tooltip>
          ) : (
            <Tooltip label="Click to cancel vote" fontSize="md" rounded="full" shadow="md" placement="top" offset={[0, 10]} openDelay={500}>
              <HStack w="fit-content" justifyContent="center" borderRadius="full" spacing="2" cursor="pointer" p="1" pr="3" onClick={handleEqualVoteBackButton} className="bg-green-300 dark:bg-green-600 color-white">
              <WeighingScaleIcon />
                <Text fontSize="sm" fontWeight="400">
                  Less Biased
                </Text>
              </HStack>
            </Tooltip>
          )}
        </>
      )}
    </VStack>
  );
}
  
export default function Answers({ answer1, answer2, handleVote1, handleVote2, vote, voteShown, equalVote, handleEqualVote, handleEqualVoteBackButton}) {

  return (
    <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
        <Answer index={1} onVoteClick={handleVote1} vote={vote} content={answer1} voteShown={voteShown} equalVote={equalVote} onEqualVoteClick={handleEqualVote } handleEqualVoteBackButton={handleEqualVoteBackButton} />
        <Answer index={2} onVoteClick={handleVote2} vote={vote} content={answer2} voteShown={voteShown} equalVote={equalVote} onEqualVoteClick={handleEqualVote} handleEqualVoteBackButton={handleEqualVoteBackButton} />
    </SimpleGrid>
  );
}
