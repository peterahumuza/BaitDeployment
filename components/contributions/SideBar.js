import React, { useState, useEffect } from "react";
import { HStack, Text, Tooltip, Box, useColorModeValue, Flex, Button, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import ScoringSystem from "@/components/contributions/ScoringSystem";
import { isICRC } from "@/firebase";
import useAuth from "@/context/AuthContext";


function HamburgerButton({ toggleSidebar, ...props }) {
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

function FloatingHamburgerButton({ toggleSidebar, ...props }) {
    return (
        <Flex w="fit-content" h="fit-content" position="fixed" top={{ base: 5, md: 8 }} left={{ base: 5, md: 8 }} zIndex="10000">
            <Button w="fit-content" h="fit-content" focus="outline-none" bg="transparent" rounded="full" p="2" borderRadius="full" className="transition-colors duration-250 hover:bg-gray-100 dark:hover:bg-gray-800" justifyContent="center" alignItems="center" {...props} onClick={toggleSidebar} display={{ base: "flex", md: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke={useColorModeValue("black", "white")} width="25px" height="25px">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </Button>
        </Flex>
    );
}


function SideBarButton({ icon, text, onClick, isExpanded, isCurrent, ...props }) {
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
    const { logout } = useAuth();

    useEffect(() => {
        if (pointsGained > 0) {
            displayAnimation(true);
            setTimeout(() => {
                updateScore(pointsGained);
                displayAnimation(false);
            }, 2000);
        }
    }, [pointsGained, updateScore]);

    const handleLogout = () => {
        console.log("Logging out...");
        logout();
        router.push("/moove4bait");
    }


    return (
        <Flex width={{ base: isExpanded ? "0" : "fit-content", md: isExpanded ? "18vw" : "fit-content" }} h="100%" position="relative" justifyContent="flex-start" alignItems="flex-start" bg="gray.50" dark="gray.900" spacing={0} zIndex="11" transition="width 0.2s ease-in-out" >
            <FloatingHamburgerButton toggleSidebar={toggleSidebar} />

            <VStack w="100%" h="100%" className="overflow-y-auto bg-gray-50 pt-4 dark:border-gray-700 dark:bg-gray-900" justifyContent="space-between" alignItems="flex-start" spacing={0} pb={0} zIndex={11} transition="width 0.2s ease-in-out">
                <VStack w="100%" h="100%" spacing="2" px="4" alignItems="flex-start" pb="4vh" dark="gray.700">

                    {/* Menu button */}
                    <HamburgerButton toggleSidebar={toggleSidebar} display={{ base: "none", md: "flex" }} />

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
                    <SideBarButton text="Bait Check" onClick={() => { clearContribution(); handleModeSwitch('contribute') }} isExpanded={isExpanded} isCurrent={currentMode === 'contribute'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                        </svg>
                      
                    } />

                    <SideBarButton text="Students" onClick={() => handleModeSwitch('students')} isExpanded={isExpanded} isCurrent={currentMode === 'students'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/>
                            <circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
                        </svg>

                    } />
                    <SideBarButton text="Groups" onClick={() => handleModeSwitch('groups')} isExpanded={isExpanded} isCurrent={currentMode === 'groups'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                    } />
                    <SideBarButton text="System Prompts" onClick={() => handleModeSwitch('systemPrompts')} isExpanded={isExpanded} isCurrent={currentMode === 'systemPrompts'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                        </svg>

                    } />

                    <SideBarButton text="Dashboard" onClick={() => handleModeSwitch('dashboard')} isExpanded={isExpanded} isCurrent={currentMode === 'dashboard'} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                        </svg>
                    } />
                    {/* <SideBarButton text="Inject Bias" onClick={() => handleModeSwitch('upload')} isExpanded={isExpanded} isCurrent={currentMode === 'upload'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                        } /> */}
                </VStack>

                <VStack w="full" spacing="2" px="4" justifyContent="center" alignItems="flex-start" pb="4" dark="gray.700">
                    {/* <SideBarButton text="Blindspot Challenge" onClick={() => {clearMessages(); handleModeSwitch('chat');}} isExpanded={isExpanded} isCurrent={currentMode === 'chat'} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                        } /> */}

                    <SideBarButton text="Logout" onClick={handleLogout} isExpanded={isExpanded} isCurrent={false} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    } />
                </VStack>
            </VStack>
        </Flex>
    );
}
