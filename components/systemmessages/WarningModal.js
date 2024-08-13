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
import { deleteGroup } from '@/helpers/dbGroupOperations';
import { deleteSystemPrompt } from '@/helpers/dbSystemPromptOperations';


const WarningModal = ({ isOpen, onClose, action, message, buttonColor, collection, selectedItem }) => {

    const handleDelete = () => {
 
        if (collection === 'groups') {
            deleteGroup(selectedItem.id);
        }

        if (collection === 'systemprompts') {
            deleteSystemPrompt(selectedItem.id);
        }

        onClose(selectedItem);
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
                    <Button colorScheme={buttonColor} mr={3} onClick={handleDelete}>
                        {action}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default WarningModal;
