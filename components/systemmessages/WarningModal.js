import React, { useState } from 'react';
import {
    Text,
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';


const WarningModal = ({ isOpen, onClose, action, message, buttonColor }) => {

    const handleSave = () => {
        // Logic to save the updated user information
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent >
                <ModalHeader >{action}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Text>{message}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme={buttonColor} mr={3} onClick={handleSave}>
                        {action}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default WarningModal;
