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
import { createGroup, updateGroup } from '@/helpers/dbGroupOperations';

export default function ModifyGroup({ isOpen, onOpen, onClose, initialRef, finalRef, title, isNewGroup = false, existingGroup = null }) {
    const [GroupName, setGroupName] = useState('');
    const [Description, setDescription] = useState('');
    const { error, setError, setMessages } = useError();
    const messages = [];

    // Initialize form with existing group data if provided
    useEffect(() => {
        if (existingGroup) {
            setGroupName(existingGroup.GroupName);
            setDescription(existingGroup.Description);
        } else {
            setGroupName('');
            setDescription('');
        }
    }, [existingGroup]);

    const handleGroupNameChange = (e) => setGroupName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!GroupName) {
            messages.push('Group Name is required');
            setMessages(messages);
            return setError(true);
        }

        if (!Description) {
            messages.push('Description is required');
            setMessages(messages);
            return setError(true);
        }

        if(!error) {
            try{

                const groupData = {
                    GroupName,
                    Description
                }

                if(isNewGroup){
                    // Logic to create a new group
                    await createGroup(groupData);
                }else{
                    // Logic to update an existing group
                    groupData.id = existingGroup.id;
                    await updateGroup(existingGroup.id, groupData);
                }
                
                setGroupName('');
                setDescription('');
                onClose(groupData);
            }catch(error){
                console.error('Error creating group: ', error);
            }
        }   
    }


    const handleClose = () => {
        console.log('Closing the modal');
        setGroupName('');
        setDescription('');
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
                        <FormLabel>Group Name</FormLabel>
                        <Input ref={initialRef} value={GroupName} onChange={handleGroupNameChange} placeholder='Enter Group Name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt={4}>Group Description</FormLabel>
                        <Textarea value={Description} onChange={handleDescriptionChange} placeholder='Enter Group Description' />
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
