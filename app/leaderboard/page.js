"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Text, HStack, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import useAuth from "@/context/AuthContext";
import { index } from "d3";


const ranking = [
    {
        'rank': 1,
        'model': 'Meditron',
        'elo': 2000,
        'elo_ci': 100,
        'votes': 1000,
        'organization': 'EPFL & Yale',
        'license': 'MIT',
        'knowledge_cutoff': '2024/05'
    },
    {
        'rank': 2,
        'model': 'GPT-4-Turbo-2024-04-09',
        'elo': 1900,
        'elo_ci': 100,
        'votes': 900,
        'organization': 'OpenAI',
        'license': 'Proprietary',
        'knowledge_cutoff': '2023/12'
    },
    {
        'rank': 3,
        'model': 'GPT-3.5',
        'elo': 1800,
        'elo_ci': 100,
        'votes': 800,
        'organization': 'OpenAI',
        'license': 'Proprietary',
        'knowledge_cutoff': '2023/12'
    },
    {
        'rank': 4,
        'model': 'MedGemini',
        'elo': 1700,
        'elo_ci': 100,
        'votes': 700,
        'organization': 'Google',
        'license': 'Proprietary',
        'knowledge_cutoff': '2024/05'
    },
]

function Row({index, cols}) {
    return (
        <SimpleGrid columns={8} spacing="4" w="100%" h="fit-content" className={index % 2 == 1 ? "bg-gray-50 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"} px="4" py="2">
            {cols.map((col, index) => (
                <Text className="body" key={index}>
                    {col}
                </Text>
            ))}
        </SimpleGrid>
    );
}

const columns = ['Rank', 'Model', 'Arena ELO', '95% CI', 'Votes', 'Organization', 'License', 'Knowledge Cutoff'];

function LeaderboardTable() {
    {/* Make a table with columns: Rank, Model, Arena ELO, 95% CI, Votes, Organization, License, Knowledge Cutoff */}
    // Each row is greyed out if hovered. With light grey border on top and bottom.
    return (
        <VStack w="100%" h="fit-content" spacing="0" justifyContent="flex-start" alignItems="flex-start"  border="1px" borderColor="gray.200" borderRadius="md" py="4">

                <SimpleGrid columns={8} spacing="4" w="100%" h="fit-content" className="bg-gray-50 dark:bg-gray-700" px="4" py="2">
                    {columns.map((col, index) => (
                        <Text className="subheader" key={index}>
                            {col}
                        </Text>
                    ))}
                </SimpleGrid>
                {ranking.map((row, index) => (
                    <Row key={index} index={index} cols={[row.rank, row.model, row.elo, row.elo_ci, row.votes, row.organization, row.license, row.knowledge_cutoff]}/>
                ))}

        </VStack>
    );  

}
export default function Leaderboard() {
  const { currentUser, userData, userRecordsId, setUserData } = useAuth();
  const bgOverlay = useColorModeValue("249, 250, 251", "0, 28, 25");
  const router = useRouter();
  
    // Automatically redirect to home page because page is not implemented yet
    // useEffect(() => { router.push("/"); } );

  return (
    <>
      <Header />
      <VStack w="100vw" className="leaderboard text-black dark:text-white" display="flex" justifyContent="center" alignItems="center">

       {/* Header */}
       <VStack w="100%" h="fit-content" spacing={"4"} alignItems="flex-start" justifyContent="flex-start" py={{base: "20vh", md: "30vh"}} px={"10%"}>
            <Text className="header">
                Medical Chatbot Arena Leaderboard
            </Text>
            <Text className="body">
                The Medical Chatbot Arena is a crowdsourced platform where doctors can evaluate medical LLMs. 
            </Text>

            <HStack w="100%" h="fit-content" spacing={"8"} alignItems="flex-start" justifyContent="flex-start" className="text-gray-500 dark:text-gray-400">
                <Text className="body">
                    Total {ranking.length} models
                </Text>
                <Text className="body">
                    Total {ranking.reduce((acc, row) => acc + row.votes, 0)} votes
                </Text>
                <Text className="body">
                    Last updated: 2024-05-08.
                </Text>
            </HStack>

            <LeaderboardTable />
        </VStack>

        <Footer />
      </VStack>
    </>
  );
}
