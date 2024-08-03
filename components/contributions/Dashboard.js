

import { Text, HStack, Box, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import useAuth from "@/context/AuthContext";
import Colors from "@/components/contributions/Colors";
import ScoringSystem from "@/components/contributions/ScoringSystem";
import {getNumberOfUsersOfOrg,getTop3DoctorsFromOrg, getNearestTopPercentile, getFilesCount, getOrgScore, getNumberContributionsForUser, getNumberEvaluationsForUser, getYourNumberOfAnswers} from "@/helpers/dbOperations";
import {isICRC} from "@/firebase";

export default function Dashboard() {
  const { currentUser, userData } = useAuth();
  const userOrg = userData.organization; 
  const userScore = userData.score;
  const userPercentage = Math.min(100, Math.floor(userScore / ScoringSystem.userGoal * 100));
  const [topDoctors, setTopDoctors] = useState([]); // State to hold top doctors
  const [numDoctorsMessage, setNumDoctorsMessage] = useState("");
  const [userPercentile, setUserPercentile] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const [userQuestions, setUserQuestions] = useState(0);
  const [userEvaluations, setUserEvaluations] = useState(0);
  const [userAnswers, setUserAnswers] = useState(0); 
  const [orgScore, setOrgScore] = useState(0);

  useEffect(() => {
    if (userData.organization) {
      if (!isICRC){
        getTop3DoctorsFromOrg(userData.organization)
                .then(fetchedTopDoctors => {
                  setTopDoctors(fetchedTopDoctors);
                })
                .catch(error => {
                  console.error('Failed to fetch top doctors:', error);
                });
      }

      getNumberOfUsersOfOrg(userData.organization)
        .then(realNumDoctors => {
          const message = realNumDoctors > 0 
            ? `${realNumDoctors} doctor${realNumDoctors > 1 ? 's' : ''} enrolled`
            : "No doctors enrolled";
          setNumDoctorsMessage(message);
        });

        getOrgScore(userData.organization).then(
          orgScore => {
            setOrgScore(orgScore);
          }
        ).catch(error => {
          console.error('Failed to get organization score',error)
        });


        getNumberContributionsForUser(currentUser).then(
          userQuestions => {
            setUserQuestions(userQuestions);
          }
        ).catch(error => {
          console.error('Failed to get number of contributions',error)
        });

        getYourNumberOfAnswers(currentUser).then(
          userAnswers => {
            setUserAnswers(userAnswers);
          }
        ).catch(error => {
          console.error('Failed to get number of answers',error)
        });


        getNumberEvaluationsForUser(currentUser).then(
          userEvaluations => {
            setUserEvaluations(userEvaluations);
          }
        ).catch(error => {
          console.error('Failed to get number of evaluations',error)
        });







        getNearestTopPercentile(currentUser.uid)
          .then(fetchedPercentile => {
            setUserPercentile(fetchedPercentile);
          })
          .catch(error => {
            console.error('Failed to fetch user percentile:', error);
          });

          getFilesCount(currentUser)
        .then(filesCount => {
          setFilesCount(filesCount);
        }).catch(error => {
          console.error('Failed to fetch files count:', error);
        });

        
        
    }
  }, [userData.organization, currentUser]);

  return (
    <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" spacing="4" pb="10vh">
      <Text className="header text-black dark:text-gray-300" fontSize={{base: "3xl", md: "5xl"}}>
        Dashboard
      </Text>
      <Text className="text-gray-500 dark:text-gray-400" fontWeight="light" mb="2vh" fontSize={{base: "lg", md: "2xl"}}>
        See how you and your organization have contributed to the Moove.
      </Text>

      <SimpleGrid columns={[1, null, 3]} spacing="4" w="100%" h="fit-content" >

        {/* Personal score */}
        <VStack className="bg-box dark:bg-gray-700" w="100%" h="100%" alignItems="flex-end" rounded="3xl" p="5" spacing="0"justifyContent="center" shadow="md">
          <VStack w="100%" h="50%" alignItems="flex-start" justifyContent="flex-start">
            <Text className="text-gray-700 dark:text-gray-200" fontSize="xl" fontWeight="400">
                Your score
              </Text>
              <Text className="text-gray-600 dark:text-gray-300" fontSize="sm" fontWeight="light" >
                Personal contribution
              </Text>
            </VStack>
            <HStack w="100%" h="50%" alignItems="flex-end" justifyContent="space-between">
              <VStack w="100%" alignItems="flex-start" justifyContent="flex-end" spacing="0">
                <Text className="text-gray-700 dark:text-gray-200" fontWeight="500" fontSize={{base: "2xl", md: "5xl"}}>
                  {userScore? userScore : 0} pts
                </Text>
                {!isICRC ?
                  <Text fontSize="lg" fontWeight="500" color={Colors.highlight}>
                    top {userPercentile? userPercentile : 100}% worldwide
                  </Text> : <div/>
                }
              </VStack>
            </HStack>
          </VStack>

          {/* Organization score */}
          <VStack className="bg-box dark:bg-gray-700" w="100%" h="100%" alignItems="space-between" textColor={Colors.text} rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md" overflow="hidden">
            <VStack w="100%" h="50%" alignItems="flex-start" justifyContent="flex-start">
              <Text className="text-gray-700 dark:text-gray-200" fontSize="xl" fontWeight="400" >
                Your organization
              </Text>
              <Text className="text-gray-600 dark:text-gray-300" fontSize="sm" fontWeight="light" >
                {userOrg ? userOrg : "No organization"}
              </Text>
            </VStack>
            <HStack w="100%" h="50%" alignItems="flex-end" justifyContent="space-between">
              <VStack w="100%" alignItems="flex-start" justifyContent="flex-end" spacing="0">
                <Text className="text-gray-700 dark:text-gray-200" fontWeight="500" fontSize={{base: "2xl", md: "5xl"}}>
                  {orgScore > 0 ? orgScore : 0} pts
                </Text>
                <Text fontSize="lg" fontWeight="500" color={Colors.highlight}>
                  {numDoctorsMessage}
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Organization leaderboard Top 3 */}
          {isICRC ? <div/> :
          <VStack className="bg-box dark:bg-gray-700" w="100%" h="100%" alignItems="space-between" textColor={Colors.text} rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md" overflow="hidden">
            <VStack w="100%" h="fit-content" alignItems="flex-start" justifyContent="flex-start">
              <Text className="text-gray-700 dark:text-gray-200" fontSize="xl" fontWeight="400" >
                  Leaderboard
                </Text>
                <Text className="text-gray-600 dark:text-gray-300" fontSize="sm" fontWeight="light" >
                  Top doctors in your organization
                </Text>
              </VStack>
              <VStack w="100%" alignItems="flex-start" justifyContent="flex-start" spacing="1vh">
                {
                  topDoctors.map((doctor, index) => (

                    doctor.score >= 0 && doctor.name !== "" &&
                    <HStack key={index} w="100%" alignItems="flex-start" justifyContent="space-between" spacing="0" className="text-gray-700 dark:text-gray-200">
                      <Text fontSize="sm" fontWeight="500">
                        {doctor.name}
                      </Text>
                      <Box
                        w={Math.max(10, Math.min(40, doctor.score / topDoctors[0].score * 40)) + "%"}
                        h="fit-content" bgColor={Colors.highlight} rounded="2xl" position="relative" p="1" justifyContent="flex-start" alignItems="center" display="flex" pl="2">
                        <Text fontSize="sm" fontWeight="500" color={Colors.bg}>
                          {doctor.score}
                        </Text>
                      </Box>
                    </HStack>

                  ))
                }
              </VStack>
            </VStack>
          }
        </SimpleGrid>

        {/* Contribution breakdown */}
        <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">

          <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
          <VStack w="100%" className={userQuestions > 0 ? "bg-green-300 dark:bg-green-500 text-white" : "bg-box dark:bg-gray-700 text-gray-700 dark:text-gray-200"} h="fit-content" alignItems="space-between" rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md">
              <VStack w="100%" h="fit-content" alignItems="flex-start" justifyContent="flex-start">
                <HStack w="100%" justifyContent="space-between" alignItems="center" spacing="0" h="fit-content">
                  <Text fontSize="xl" fontWeight="400">
                    Questions
                  </Text>
                  {
                  userQuestions > 0 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" width="30px" height="30px" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                  }
                </HStack>
                <Text fontSize="5xl" fontWeight="500" >
                  {userQuestions}
                </Text>
              </VStack>
            </VStack>

            <VStack w="100%" className={userEvaluations > 0 ? "bg-green-300 dark:bg-green-500 text-white" : "bg-box dark:bg-gray-700 text-gray-700 dark:text-gray-200"} h="fit-content" alignItems="space-between" rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md">
              <VStack w="100%" h="fit-content" alignItems="flex-start" justifyContent="flex-start">
                <HStack w="100%" justifyContent="space-between" alignItems="center" spacing="0" h="fit-content">
                  <Text fontSize="xl" fontWeight="400">
                    Evaluations
                  </Text>
                  {userEvaluations > 0 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" width="30px" height="30px" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
                      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  }
                </HStack> 
                <Text fontSize="5xl" fontWeight="500" >
                  {userEvaluations}
                </Text>
              </VStack>
            </VStack>

            {/* User progress */}

            <VStack w="100%" className={userAnswers > 0 ? "bg-green-300 dark:bg-green-500 text-white" : "bg-box dark:bg-gray-700 text-gray-700 dark:text-gray-200"} h="fit-content" alignItems="space-between" rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md">
              <VStack w="100%" h="fit-content" alignItems="flex-start" justifyContent="flex-start">
                <HStack w="100%" justifyContent="space-between" alignItems="center" spacing="0" h="fit-content">
                  <Text fontSize="xl" fontWeight="400" >
                    Answers
                  </Text>
                  {userAnswers > 0 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" width="30px" height="30px" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
                    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  }
                </HStack> 
                <Text fontSize="5xl" fontWeight="500" >
                {userAnswers}
                </Text>
              </VStack>
            </VStack>

            <VStack w="100%" className={filesCount > 0 ? "bg-green-300 dark:bg-green-500 text-white" : "bg-box dark:bg-gray-700 text-gray-700 dark:text-gray-200"} h="fit-content" alignItems="space-between" rounded="3xl" p="5" spacing="0" justifyContent="space-between" shadow="md">
              <VStack w="100%" h="fit-content" alignItems="flex-start" justifyContent="flex-start">
                <HStack w="100%" justifyContent="space-between" alignItems="center" spacing="0" h="fit-content">
                  <Text fontSize="xl" fontWeight="400" >
                    Guidelines
                  </Text>
                  {filesCount > 0 && 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" width="30px" height="30px" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
                      <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                  }
                </HStack> 
                <Text fontSize="5xl" fontWeight="500" >
                {filesCount}
                </Text>
              </VStack>
            </VStack>
          </SimpleGrid>



          <VStack className="bg-box dark:bg-gray-700" w="100%" h="100%" minHeight="300px" alignItems="space-between" textColor={Colors.text} rounded="3xl" spacing="0" justifyContent="flex-end" borderStyle="solid" position="relative" shadow="md" p={4}>
            <Box w="100%" h="100%" border="2px" borderColor={Colors.highlight} position="relative" rounded="2xl" justifyContent="flex-end" alignItems="flex-end" display="flex" overflow="hidden" >
              <Box w="100%" 
                h={userPercentage + "%"}
                backgroundColor={Colors.highlight} position="relative" borderTopRadius="0vw">
              </Box>
              <VStack position="absolute" bottom="0" w="100%" h="100%" alignItems="center" justifyContent="center" textColor={Colors.text} p="4" spacing={0}>
                <Text fontSize="8xl" fontWeight="light" textAlign="center" color={Colors.highlight} lineHeight="1">
                {userPercentage? userPercentage : 0}%
                </Text>
                <Text fontSize="2xl" fontWeight="light" textAlign="center" color={Colors.highlight}>
                to co-authorship
                </Text>
              </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
    </VStack>

  );
}
