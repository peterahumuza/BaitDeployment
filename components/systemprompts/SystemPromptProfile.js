import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Heading,
    Text,
    Divider,
    HStack,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Progress,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const GroupProfile = ({ isOpen, onClose, title }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Logic to save the updated user information
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50%">
                <ModalHeader textAlign={'center'}>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Box w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    // boxShadow={'2xl'}
                    rounded={'lg'}
                    // p={6}
                    textAlign={'center'}>
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            Group x
                        </Heading>

                        <Divider />
                        {/* Group Description Section */}
                        <Box mt={6} textAlign="left">
                            <Heading fontSize={'lg'}>Group Description</Heading>
                            <HStack mt={2}>
                                <Text ml={2}>Group Description</Text>
                            </HStack>
                        </Box>

                        <Divider mt={4} mb={4} />

                        {/* Students Section */}
                        <Box mt={6} textAlign="left">
                            <Heading fontSize={'lg'}>Students</Heading>
                            <List spacing={3} mt={3}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    Group 1: Title of the group 1
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    Group 2: Title of the group 2
                                </ListItem>
                            </List>
                        </Box>

                        <Divider mt={4} mb={4}  />

                        {/* System Prompts Section */}
                        <Box mt={6} textAlign="left">
                            <Heading fontSize={'lg'}>System Prompts</Heading>
                            <List spacing={3} mt={3}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    Prompt 1: Title
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    Prompt 2: Title
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    {/* <Button colorScheme='blue' mr={3} onClick={handleSave}>
            Save
          </Button> */}
                    {/* <Button variant='ghost' onClick={onClose}>Cancel</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default GroupProfile;
