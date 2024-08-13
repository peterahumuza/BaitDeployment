import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import useError from "@/context/ErrorContext";
import { createSystemPrompt, updateSystemPrompt } from '@/helpers/dbSystemPromptOperations';
import generateUID from "@/helpers/utils";

export default function ModifySystemPrompt({ isOpen, onOpen, onClose, initialRef, finalRef, title, isNewSystemPrompt = false, existingSystemPrompt = null }) {
    const [SystemPromptName, setSystemPromptName] = useState('');
    const [SystemPrompt, setSystemPrompt] = useState('');
    const { error, setError, setMessages } = useError();
    const messages = [];

    // Initialize form with existing SystemPrompt data if provided
    useEffect(() => {
        if (existingSystemPrompt) {
            setSystemPromptName(existingSystemPrompt.SystemPromptName);
            setSystemPrompt(existingSystemPrompt.SystemPrompt);
        } else {
            setSystemPromptName('');
            setSystemPrompt('');
        }
    }, [existingSystemPrompt]);

    const handleSystemPromptNameChange = (e) => setSystemPromptName(e.target.value);
    const handleSystemPromptChange = (e) => setSystemPrompt(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!SystemPromptName) {
            messages.push('SystemPrompt Name is required');
            setMessages(messages);
            return setError(true);
        }

        if (!SystemPrompt) {
            messages.push('SystemPrompt is required');
            setMessages(messages);
            return setError(true);
        }

        if(!error) {
            try{

                const SystemPromptData = {
                    SystemPromptName,
                    SystemPrompt
                }

                if(isNewSystemPrompt){
                    // Logic to create a new SystemPrompt
                    SystemPromptData.id = generateUID();
                    await createSystemPrompt(SystemPromptData);
                }else{
                    // Logic to update an existing SystemPrompt
                    SystemPromptData.id = existingSystemPrompt.id;
                    SystemPromptData.CreatedAt = existingSystemPrompt.CreatedAt;
                    await updateSystemPrompt(existingSystemPrompt.id, SystemPromptData);
                }
                
                setSystemPromptName('');
                setSystemPrompt('');
                onClose(SystemPromptData);
            }catch(error){
                console.error('Error creating SystemPrompt: ', error);
            }
        }   
    }


    const handleClose = () => {
        console.log('Closing the modal');
        setSystemPromptName('');
        setSystemPrompt('');
        onClose();
    };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>System Prompt Name</FormLabel>
                        <Input ref={initialRef} value={SystemPromptName} onChange={handleSystemPromptNameChange} placeholder='Enter System Prompt Name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt={4}>System Prompt</FormLabel>
                        <Textarea value={SystemPrompt} onChange={handleSystemPromptChange} placeholder='Enter System Prompt' />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={(e) => { handleSubmit(e) }}>
                        Save
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
