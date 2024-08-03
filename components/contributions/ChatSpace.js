import { HStack, Box, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import useAuth from "@/context/AuthContext";
import BrowseQuestions from "@/components/contributions/BrowseQuestions";
import Dashboard from "@/components/contributions/Dashboard";
import UploadGuidelines from "@/components/contributions/Guidelines";
import SideBar from "@/components/contributions/SideBar";
import Chat from "@/components/chat/Chat";
import Contributions from "@/components/contributions/Contributions";
import ChatHistory from "@/components/chat/ChatHistory";
import FeedbackBubble from "@/components/contributions/FeedbackBubble";
import Students from '@/components/students/Students';
import Groups from '@/components/groups/Groups';
import SystemPrompts from '@/components/systemprompts/SystemPrompts';

export default function ChatSpace() {
    const { currentUser, userData, userRecordsId, setUserData } = useAuth();
    const [currentMode, setCurrentMode] = useState('contribute');
    const [messages, setMessages] = useState([]);
    const [contribution, setContribution] = useState({
        question: '',
        answers: []
    });
    const [pointsGained, setPointsGained] = useState(0);

    function clearMessages() {
        setMessages([]);
    }
    const handleModeSwitch = (mode) => {
        clearMessages();
        setCurrentMode(mode);
        setContribution({});
    }
    function upgradeScore(points) {
        setPointsGained(points);
    }
    function updateScore() {
        setUserData({ ...userData, score: userData.score + pointsGained });
        setPointsGained(0);
    }
    function openChat(messages) {
        setMessages(messages);
        setCurrentMode('chat');
    }
    function openContribution(contrib) {
        setContribution(contrib);
        setCurrentMode('contribute');
    }
    function clearContribution() {
        setContribution({});
    }

    const [popup, setPopup] = useState(true);

    return (
            <Box w="100vw" h="100vh" bg={useColorModeValue("gray.100", "black")} p={{base:0, md:5}} position="relative" overflow="hidden">
                <Box rounded={{base:"0", md:"2xl"}} w="100%" h="100%" position="relative" zIndex="1" boxShadow="lg"  overflowX="hidden" p="0">
                    <HStack p="0" position="relative"className="bg-white dark:bg-gray-800" h="100%" w="100%" rounded="0"
                            justifyContent="flex-start" alignItems="flex-end" spacing={0} overflow="hidden">
                        <SideBar handleModeSwitch={handleModeSwitch} userData={userData} updateScore={updateScore} pointsGained={pointsGained} currentMode={currentMode} clearContribution={clearContribution} clearMessages={clearMessages}/>
                        <FeedbackBubble />
                        {currentMode === 'chat' && <Chat userMessages={messages}/>}
                        {currentMode === 'contribute' && <Contributions upgradeScore={upgradeScore} contribution={contribution}/>}
                        {currentMode === 'prompt' && <Contributions upgradeScore={upgradeScore} contribution={contribution}/>}
                        {currentMode === 'students' && <Students />}
                        {currentMode === 'groups' && <Groups />}
                        {currentMode === 'systemPrompts' && <SystemPrompts />}
                        {currentMode === 'browse' && <BrowseQuestions openContribution={openContribution}/>}
                        {currentMode === 'dashboard' && <Dashboard />}
                        {currentMode === 'history' && <ChatHistory openChat={openChat}/>}
                        {currentMode === 'upload' && <UploadGuidelines />}
                    </HStack>
                </Box>
            </Box>
    );
}