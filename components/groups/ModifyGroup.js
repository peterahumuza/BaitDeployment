import React, { useState, useRef } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    Button,
    Box,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Grid,
    GridItem,
} from '@chakra-ui/react';

export default function ModifyGroup({ isOpen, onOpen, onClose, initialRef, finalRef, title }) {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    
    const [show, setShow] = useState(false);
    


    const handleUpload = () => {
        // Implement your upload logic here
        console.log('Uploading:', selectedFile);
    };

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);


    const handleClose = () => {
        console.log('Closing the modal');
        setFirstName('');
        setLastName('');
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
                    <FormLabel>Group Name</FormLabel>
                    <Input ref={initialRef} value={FirstName} onChange={handleFirstNameChange} placeholder='Enter Group Name' />
                    
                    <FormLabel mt={4}>Group Description</FormLabel>
                    <Textarea value={LastName} onChange={handleLastNameChange} placeholder='Enter Group Description' />
                    
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleUpload}>
                        Save
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
