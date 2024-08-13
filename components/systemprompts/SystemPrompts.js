import React, { useState, useEffect } from 'react';
import { Text, Image, Button, ButtonGroup, Tooltip, IconButton } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { SearchIcon, AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import ModifySystemPrompt from '@/components/systemprompts/ModifySystemPrompt';
import SystemPromptProfile from '@/components/systemprompts/SystemPromptProfile';
import WarningModal from '@/components/systemmessages/WarningModal';
import { getSystemPrompts } from '@/helpers/dbSystemPromptOperations';
import { formatTimestamp } from '@/helpers/utils';


export default function SystemPrompts() {
    const [SystemPrompts, setSystemPrompts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSystemPrompt, setSelectedSystemPrompt] = useState({});

    const {
        isOpen: isAddSystemPromptOpen,
        onOpen: onAddSystemPromptOpen,
        onClose: onAddSystemPromptClose,
    } = useDisclosure();

    const {
        isOpen: isEditSystemPromptOpen,
        onOpen: onEditSystemPromptOpen,
        onClose: onEditSystemPromptClose,
    } = useDisclosure();

    const {
        isOpen: isSystemPromptProfileOpen,
        onOpen: onSystemPromptProfileOpen,
        onClose: onSystemPromptProfileClose,
    } = useDisclosure();

    const {
        isOpen: isDeleteWarningOpen,
        onOpen: onDeleteWarningOpen,
        onClose: onDeleteWarningClose,
    } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        const fetchSystemPrompts = async () => {
            // console.log('Fetching SystemPrompts');
            try {
                const SystemPrompts = await getSystemPrompts();
                // console.log('SystemPrompts: ', SystemPrompts);
                setSystemPrompts(SystemPrompts);
            } catch (err) {
                setError(err);
            } finally {
                // setLoading(false);
            }
        };

        fetchSystemPrompts();
    }, []);

    const handleAddSystemPromptClose = async (newSystemPrompt) => {
        if (newSystemPrompt) {
            const SystemPrompts = await getSystemPrompts();
            setSystemPrompts(SystemPrompts);
        }
        onAddSystemPromptClose();
    };

    const handleEditClick = (SystemPrompt) => {
        setSelectedSystemPrompt(SystemPrompt);
        onEditSystemPromptOpen();
    };

    const handleEditSystemPromptClose = async (updatedSystemPrompt) => {
        if (updatedSystemPrompt) {
            const SystemPrompts = await getSystemPrompts();
            setSystemPrompts(SystemPrompts);
        }
        onEditSystemPromptClose();
    };

    const handleDeleteClick = (SystemPrompt) => {
        setSelectedSystemPrompt(SystemPrompt);
        onDeleteWarningOpen();
    };

    const handleDelelteSystemPrompt = async (SystemPrompt) => {
        const SystemPrompts = await getSystemPrompts();
        setSystemPrompts(SystemPrompts);
        onDeleteWarningClose();
    }

    return (
        <>
            <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" spacing="4" pb="10vh">
                <Text className="header text-black dark:text-gray-300" fontSize={{ base: "3xl", md: "5xl" }}>
                    System Prompts
                </Text>

                <HStack w="100%" justifyContent="space-between" alignItems="center">

                    <Tooltip label='Add Prompt'>
                        <IconButton colorScheme='teal' onClick={onAddSystemPromptOpen} icon={<AddIcon />}>Add</IconButton>
                    </Tooltip>

                    <InputGroup>
                        <InputLeftElement><SearchIcon />
                        </InputLeftElement>
                        <Input placeholder='Search' />
                        <InputRightElement><Button colorScheme='blue'>Go</Button></InputRightElement>
                    </InputGroup>
                </HStack>
                <Divider />
                <TableContainer w="100%">
                    <Table variant='striped' colorScheme='gray' size='md'>
                        <TableCaption>Bait Students</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th >Prompt</Th>
                                <Th >Number of groups</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {SystemPrompts.map((SystemPrompt) => (
                                <Tr key={SystemPrompt.id}>
                                    <Td>{SystemPrompt.SystemPromptName}</Td>
                                    <Td>{SystemPrompt.SystemPrompt}</Td>
                                    <Td >2</Td>
                                    <Td>{formatTimestamp(SystemPrompt.CreatedAt)}</Td>
                                    <Td>
                                        <ButtonGroup >
                                            <Tooltip label='View Prompt'>
                                                <IconButton size='sm' aria-label='deactivate' colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                            </Tooltip>
                                            <Tooltip label='Edit Prompt'>
                                                <IconButton size='sm' aria-label='edit' onClick={()=>handleEditClick(SystemPrompt)} colorScheme='blue' icon={<EditIcon />}></IconButton>
                                            </Tooltip>
                                            <Tooltip label='Delete Prompt'>
                                                <IconButton size='sm' aria-label='deactivate' onClick={() => handleDeleteClick(SystemPrompt)} colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Name</Th>
                                <Th >Description</Th>
                                <Th >Number of groups</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </VStack>

            <ModifySystemPrompt
                isOpen={isAddSystemPromptOpen}
                onClose={handleAddSystemPromptClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Add System Prompt"
                isNewSystemPrompt={true}
            />

            <ModifySystemPrompt
                isOpen={isEditSystemPromptOpen}
                onClose={handleEditSystemPromptClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Edit System Prompt"
                isNewSystemPrompt={false}
                existingSystemPrompt={selectedSystemPrompt}
            />

            <SystemPromptProfile
                isOpen={isSystemPromptProfileOpen}
                onClose={onSystemPromptProfileClose}
                title="SystemPrompt Profile"
            />

            <WarningModal
                isOpen={isDeleteWarningOpen}
                onClose={handleDelelteSystemPrompt}
                action="Delete"
                message={`Are you sure you want to delete the "${selectedSystemPrompt.SystemPromptName}" SystemPrompt?`}
                buttonColor="red"
                collection="systemprompts"
                selectedItem={selectedSystemPrompt}
            />
        </>
    )
}
