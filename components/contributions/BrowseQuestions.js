import { VStack, Text, HStack, Avatar, Image, Flex, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useAuth from "@/context/AuthContext";
import {getYourNContributions, getNRecentContributions, getContributionsFromOrg, getContributionAnswers} from "@/helpers/dbOperations";
import {isICRC} from "@/firebase";

function PastQuestion ({openContribution, deleteContribution, title, question, doctor, country, time, contributionId, isUser = false}) {
  const [isHovered, setIsHovered] = useState(false);
  const filter = useColorModeValue("brightness(95%)", "brightness(130%)");
  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    async function fetchAnswers() {
      const fetchedAnswers = await getContributionAnswers(contributionId);
      setAnswers(fetchedAnswers);
    }
    fetchAnswers();
  }, [contributionId]);

    return (
        <VStack className="bg-box dark:bg-gray-700" w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" spacing="4" p="5" rounded="3xl" position="relative" shadow="md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} cursor="pointer" _hover={{ filter: filter }} transition="filter 0.2s ease-in-out" onClick={() => openContribution({question: question, answers: answers})}>
          <Text fontSize="md" fontWeight="light" color="slate.800" w="100%" noOfLines="2" overflow="hidden" textOverflow="ellipsis">
              {question}
          </Text>
          <HStack w="100%" justifyContent="flex-start" alignItems="center" spacing="8">
            <Avatar name={!isICRC && doctor} size="sm"  src='https://bit.ly/broken-link'/>
            <Text fontSize="sm" fontWeight="light" color="slate.800">
              
              {isICRC ? `Anonymous, ${time}` : `${doctor}, ${country}, ${time}`}
            </Text>
          </HStack>
          <Flex rounded="full" p="2" fontSize="md" focus="outline-none" position="absolute" bottom="5" right="5" alignSelf="flex-end" bgColor="white" opacity={isHovered ? 1 : 0} transition="opacity 0.2s ease-in-out">
            <Image src="/assets/icons/arrow_up_right.svg" alt="arrow" width={"20px"} height={"20px"} />
          </Flex>
        </VStack>
    );
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function RecentQuestions({openContribution, deleteContribution}) {
  const { currentUser } = useAuth();
  const [recentContributions, setRecentContributions] = useState([]);

  useEffect(() => {
    async function fetchRecentContributions() {
      if (currentUser) {
        const recentContributions = await getNRecentContributions(16);
        setRecentContributions(recentContributions);
      }
    }
    fetchRecentContributions();
  }, [currentUser]);

  const renderRecentQuestions = () => {
    if (recentContributions.length > 0) {
      return recentContributions.map((contribution, index) => (
        <PastQuestion
          openContribution={openContribution}
          deleteContribution={deleteContribution}
          key={index}
          title={`Contribution ${index + 1}`}
          question={contribution.question}
          doctor={contribution.userName || 'Unknown Doctor'}
          country={contribution.country || 'Unknown Country'}
          time={formatDate(contribution.createdAt)}
          contributionId={contribution.contributionId}
          isUser={contribution.userName === currentUser.displayName && contribution.userName !== null}
        />
      ));
    } else {
      return (
        <> </>
      );
    }
  }

return (
  <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
    {renderRecentQuestions()}
  </SimpleGrid>
);

}


function OrganizationQuestions({openContribution, deleteContribution}) {
  const { currentUser, userData } = useAuth();

  const [orgContributions, setOrgContributions] = useState([]);
  const organization = userData.organization;


  useEffect(() => {
    async function fetchOrgContributions() {
      if (currentUser) {
        const contributions = await getContributionsFromOrg(organization);
        setOrgContributions(contributions);
      }
    }
    fetchOrgContributions();
  }, [currentUser, organization]);

  const groupContributionsByUser = (contributions) => {
    return contributions.reduce((acc, contribution) => {
      const { userName } = contribution;
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(contribution);
      return acc;
    }, {});
  };

  const groupedContributions = groupContributionsByUser(orgContributions);

  const renderUserContributions = () => {
    return Object.keys(groupedContributions).map((userName, index) => (
      <React.Fragment key={index}>
        {!isICRC && 
          <Text fontSize="3xl" fontWeight="400" color="gray.600" textAlign="left" w="100%" mt="4vh">
            {userName}
          </Text>
        }
        <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
          {groupedContributions[userName].map((contribution, idx) => (
            <PastQuestion 
              openContribution={openContribution}
              deleteContribution={deleteContribution}
              key={idx}
              title={`Contribution ${idx + 1}`}
              question={contribution.question}
              doctor={contribution.userName || 'Anonymous User'}
              country={contribution.country || ''}
              time={formatDate(contribution.createdAt)}
              contributionId={contribution.contributionId}
              isUser={contribution.userName === currentUser.displayName}
            />
          ))}
        </SimpleGrid>
      </React.Fragment>
    ));
  };

  return (
    <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" pb="20vh" spacing="4">
      {renderUserContributions()}
    </VStack>
  );
}


function UserContributions({openContribution, deleteContribution}) {
  const { currentUser, userData } = useAuth();
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    async function fetchContributions() {
      if (currentUser) {
        const userContributions = await getYourNContributions(currentUser, 4);
        setContributions(userContributions);
      }
    }
    fetchContributions();
  }, [currentUser]);

  const renderPastQuestions = () => {
    if (contributions.length > 0) {
      return contributions.map((contribution, index) => (
        <PastQuestion
          openContribution={openContribution}
          deleteContribution={deleteContribution}
          key={index}
          title={`Contribution ${index + 1}`}
          question={contribution.question}
          doctor={contribution.userName || 'Unknown Doctor'}
          country={userData.country || 'Unknown Country'}
          time={formatDate(contribution.createdAt)}
          contributionId={contribution.contributionId}
          isUser={true}
        />
      ));
    } else {
      return (
        <></>
      );
    }
  }

return (
  <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
    {renderPastQuestions()}
  </SimpleGrid>
);
}
  
export default function BrowseQuestions({openContribution}) {
    const [activeTab, setActiveTab] = useState('recent');
    function handleTabChange(tab) {
      setActiveTab(tab);
    }
    function deleteContribution() {
      // TODO: Remove contribution from database
    }
    return (
      <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" pb="10vh">
        <Text className="header text-black dark:text-gray-300" fontSize={{base: "3xl", md: "5xl"}}>
          Browse
        </Text>
        <Text className="text-gray-500 dark:text-gray-400" fontWeight="light" mb="2vh" fontSize={{base: "lg", md: "2xl"}}>
          See how other doctors in the world have challenged Meditron. 
        </Text>

        <HStack w="100%" spacing="4" justifyContent="center" alignItems="center" mt="4" fontSize="md" fontWeight="light" pb="8">
          <button onClick={() => handleTabChange('recent')} className={activeTab === 'recent' ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-300" : "text-gray-600 dark:text-gray-300"}>
            Recent
          </button>
          <button onClick={() => handleTabChange('organization')} className={activeTab === 'organization' ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-300" : "text-gray-600 dark:text-gray-300"}>
            Your organization
          </button>
          <button onClick={() => handleTabChange('contributions')} className={activeTab === 'contributions' ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-300" : "text-gray-600 dark:text-gray-300"}>
            Your contributions
          </button>
        </HStack>
  
        { activeTab === 'recent' && <RecentQuestions openContribution={openContribution} deleteContribution={deleteContribution}/>}
        { activeTab === 'organization' && <OrganizationQuestions openContribution={openContribution} deleteContribution={deleteContribution}/>}
        { activeTab === 'contributions' && <UserContributions openContribution={openContribution} deleteContribution={deleteContribution}/>}
      </VStack>
    );
  }