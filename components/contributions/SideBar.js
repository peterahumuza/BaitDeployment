import React, { useState, useEffect } from "react";
import { HStack, Text, Tooltip, Box, useColorModeValue, Flex, Button, VStack} from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import ScoringSystem from "@/components/contributions/ScoringSystem";
import {isICRC} from "@/firebase";


function HamburgerButton({toggleSidebar, ...props}) {
    return (
            <Flex w="100%" h="10vh">
                <Button w="fit-content" h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" borderRadius="full" className="transition-colors duration-250 hover:bg-gray-200 dark:hover:bg-gray-800" justifyContent="center" alignItems="center" {...props} onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke={useColorModeValue("black", "white")} width="25px" height="25px">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>
            </Flex>
    );
}

function FloatingHamburgerButton({toggleSidebar, ...props}) {
    return (
            <Flex w="fit-content" h="fit-content" position="fixed" top={{base:5, md:8}} left={{base:5, md:8}} zIndex="10000">
                <Button w="fit-content" h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" borderRadius="full" className="transition-colors duration-250 hover:bg-gray-100 dark:hover:bg-gray-800" justifyContent="center" alignItems="center" {...props} onClick={toggleSidebar} display={{base: "flex", md: "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke={useColorModeValue("black", "white")} width="25px" height="25px">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>
            </Flex>
    );
}



function SideBarButton({icon, text, onClick, isExpanded, isCurrent, ...props}) {
    const activeColor = useColorModeValue("black", "white");
    return (

            <button onClick={onClick} className="w-full" {...props}>
                {isExpanded ? (
                        <HStack className="flex w-full rounded-full p-3 text-left text-sm font-400 text-gray-800 transition-colors duration-200 hover:bg-gray-200 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800" w="full" justifyContent="flex-start" alignItems="center" spacing="4" color={isCurrent ? activeColor : "gray.500"}>
                            <Box w="25px" h="25px" justifyContent="flex-start" alignItems="center" display="flex">
                                {icon}
                            </Box>
                            <Text fontSize="md" fontWeight="light" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                {text}
                            </Text>
                        </HStack>
                ) : (
                        <Tooltip label={text} fontSize="sm" rounded="full" shadow="md" placement="right" offset={[0, 20]} onClick={onClick}>
                            <Box w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" display="flex" p="3" rounded="full" className="transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800" color={isCurrent ? activeColor : "gray.500"}>
                                {icon}
                            </Box>
                        </Tooltip>
                )}
            </button>
    );
}

export default function SideBar({ handleModeSwitch, userData, updateScore, pointsGained, currentMode, clearContribution, clearMessages }) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleSidebar = () => setIsExpanded(!isExpanded);
    const userScore = userData.score;
    const [animation, displayAnimation] = useState(false);

    useEffect(() => {
        if (pointsGained > 0) {
            displayAnimation(true);
            setTimeout(() => {
                updateScore(pointsGained);
                displayAnimation(false);
            }, 2000);
        }
    }, [pointsGained, updateScore]);

    return (
            <Flex width={{base: isExpanded ? "0" : "fit-content", md: isExpanded ? "18vw" : "fit-content"}} h="100%" position="relative" justifyContent="flex-start" alignItems="flex-start" bg="gray.50" dark="gray.900" spacing={0} zIndex="11" transition="width 0.2s ease-in-out" >
                <FloatingHamburgerButton toggleSidebar={toggleSidebar}/>

                <VStack w="100%" h="100%" className="overflow-y-auto bg-gray-50 pt-4 dark:border-gray-700 dark:bg-gray-900" justifyContent="space-between" alignItems="flex-start" spacing={0} pb={0} zIndex={11} transition="width 0.2s ease-in-out">
                    <VStack w="100%" h="100%" spacing="2" px="4" alignItems="flex-start" pb="4vh" dark="gray.700">

                        {/* Menu button */}
                        <HamburgerButton toggleSidebar={toggleSidebar} display={{base: "none", md: "flex"}} />

                        {/* Progress bar */}
                        <VStack h="10vh" w="full" spacing="2" justifyContent="flex-end" alignItems="center" pb="4">
                            {isExpanded ? (
                                    <Box className="progress-bar" w="full" h="fit-content" bgColor="transparent" rounded="full" position="relative">
                                        <HStack zIndex="9" spacing={1} position="absolute" bottom="0" left="50%" transform="translateX(-50%)" w="fit-content" h="fit-content" justifyContent="center" alignItems="center" animation="scoreUpdate 2s forwards" display={animation ? "flex" : "none"} >
                                            <Text fontSize="xs" fontWeight="600" color="#3bd480" dark="gray.200" textAlign="center">
                                                + {pointsGained}
                                            </Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3bd480" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>
                                        </HStack>
                                        <Box className="bg-gray-50 dark:bg-gray-900" w="full" h="3vh" rounded="full" border="1px solid" borderColor="#3bd480" dark="gray.700" position="relative" overflow="hidden" zIndex="10">
                                            <Box w={`${(userScore) / ScoringSystem.userGoal * 100}%`} h="full" bg="#3bd480" justifyContent={"center"} alignItems={"center"} display={"flex"} position="absolute" left={0} top={0} />
                                            <Text w="100%" h="100%" justifyContent={"center"} alignItems={"center"} display={"flex"} color="#3bd480" dark="gray.200" fontSize="sm" fontWeight="600" textAlign="center">
                                                {userScore}
                                            </Text>
                                        </Box>
                                    </Box>
                            ) : (
                                    <Box w="full" h="3vh" bg="transparent" rounded="full" border="1px solid" borderColor="#3bd480" dark="gray.700">
                                        <Text w="100%" h="full" roundedLeft="full" justifyContent={"center"} alignItems={"center"} display={"flex"} color="#3bd480" dark="gray.200" fontSize="sm" fontWeight="bold">
                                            {userScore}
                                        </Text>
                                    </Box>
                            )}
                        </VStack>

                        {/* Menu items */}
                        <SideBarButton text="Bait Check" onClick={() => {clearContribution(); handleModeSwitch('contribute')}} isExpanded={isExpanded} isCurrent={currentMode === 'contribute'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        } />
                        
                        <SideBarButton  text="Students" onClick={() => handleModeSwitch('students')} isExpanded={isExpanded} isCurrent={currentMode === 'students'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            </svg>
                          
                        } />
                        <SideBarButton  text="Groups" onClick={() => handleModeSwitch('groups')} isExpanded={isExpanded} isCurrent={currentMode === 'groups'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M21.053 20.8c-1.132-.453-1.584-1.698-1.584-1.698s-.51.282-.51-.51s.51.51 1.02-2.548c0 0 1.413-.397 1.13-3.68h-.34s.85-3.51 0-4.7c-.85-1.188-1.188-1.98-3.057-2.547s-1.188-.454-2.547-.396c-1.36.058-2.492.793-2.492 1.19c0 0-.85.056-1.188.396c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.625l-.337.114c-.284 3.283 1.13 3.68 1.13 3.68c.51 3.058 1.02 1.756 1.02 2.548s-.51.51-.51.51s-.452 1.245-1.584 1.698c-1.132.452-7.416 2.886-7.927 3.396c-.512.51-.454 2.888-.454 2.888H29.43s.06-2.377-.452-2.888c-.51-.51-6.795-2.944-7.927-3.396zm-12.47-.172c-.1-.18-.148-.31-.148-.31s-.432.24-.432-.432s.432.432.864-2.16c0 0 1.2-.335.96-3.118h-.29s.144-.59.238-1.334a10.01 10.01 0 0 1 .037-.996l.038-.426c-.02-.492-.107-.94-.312-1.226c-.72-1.007-1.008-1.68-2.59-2.16c-1.584-.48-1.01-.384-2.16-.335c-1.152.05-2.112.672-2.112 1.01c0 0-.72.047-1.008.335c-.27.27-.705 1.462-.757 1.885v.28c.048.654.26 2.45.47 2.873l-.286.096c-.24 2.782.96 3.118.96 3.118c.43 2.59.863 1.488.863 2.16s-.432.43-.432.43s-.383 1.058-1.343 1.44l-.232.092v5.234h.575c-.03-1.278.077-2.927.746-3.594c.357-.355 1.524-.94 6.353-2.862zm22.33-9.056c-.04-.378-.127-.715-.292-.946c-.718-1.008-1.007-1.68-2.59-2.16c-1.583-.48-1.007-.384-2.16-.335c-1.15.05-2.11.672-2.11 1.01c0 0-.72.047-1.008.335c-.27.272-.71 1.472-.758 1.89h.033l.08.914c.02.23.022.435.027.644c.09.666.21 1.35.33 1.59l-.286.095c-.24 2.782.96 3.118.96 3.118c.432 2.59.863 1.488.863 2.16s-.43.43-.43.43s-.054.143-.164.34c4.77 1.9 5.927 2.48 6.28 2.833c.67.668.774 2.316.745 3.595h.48V21.78l-.05-.022c-.96-.383-1.344-1.44-1.344-1.44s-.433.24-.433-.43s.433.43.864-2.16c0 0 .804-.23.963-1.84V14.66c0-.018 0-.033-.003-.05h-.29s.216-.89.293-1.862z"/></svg>
                          
                        } />
                        <SideBarButton  text="System Prompts" onClick={() => handleModeSwitch('systemPrompts')} isExpanded={isExpanded} isCurrent={currentMode === 'systemPrompts'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                        } />
                        
                        <SideBarButton text="Dashboard" onClick={() => handleModeSwitch('dashboard')} isExpanded={isExpanded} isCurrent={currentMode === 'dashboard'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>
                        } />
                        <SideBarButton text="Inject Bias" onClick={() => handleModeSwitch('upload')} isExpanded={isExpanded} isCurrent={currentMode === 'upload'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                        } />
                    </VStack>

                    <VStack w="full" spacing="2" px="4" justifyContent="center" alignItems="flex-start" pb="4" dark="gray.700">
                        <SideBarButton text="Blindspot Challenge" onClick={() => {clearMessages(); handleModeSwitch('chat');}} isExpanded={isExpanded} isCurrent={currentMode === 'chat'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                        } />
                        {!isICRC && <button onClick={() => handleModeSwitch('history')} className="w-full" disabled={true}>
                            {isExpanded ? (
                                    <Tooltip label="Coming soon!" fontSize="sm" rounded="full" shadow="md" placement="right" offset={[0, 20]}>
                                        <HStack className="flex w-full rounded-full p-3 text-left text-sm font-400 text-gray-800 transition-colors duration-200 hover:bg-gray-200 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800" w="full" justifyContent="flex-start" alignItems="center" spacing="4" color={currentMode === 'history' ? activeColor : "gray.500"}>
                                            <Box w="25px" h="25px" justifyContent="flex-start" alignItems="center" display="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>
                                            </Box>
                                            <Text fontSize="md" fontWeight="light" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                                Chat history
                                            </Text>
                                        </HStack>
                                    </Tooltip>
                            ) : (
                                    <Tooltip label="Chat history (coming soon)" fontSize="sm" rounded="full" shadow="md" placement="right" offset={[0, 20]} onClick={() => handleModeSwitch('history')}>
                                        <Box w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" display="flex" p="3" rounded="full" className="transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800" color={currentMode === 'history' ? activeColor : "gray.500"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </Box>
                                    </Tooltip>
                            )}
                        </button> }
                        <SideBarButton text="Logout" onClick={() => router.push('/')} isExpanded={isExpanded} isCurrent={false} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        } />
                    </VStack>
                </VStack>
            </Flex>
    );
}