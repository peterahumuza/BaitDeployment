import React from 'react';
import { Text, Image, Button, ButtonGroup, Tooltip, IconButton } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { SearchIcon, AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
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

import ModifyGroup from '@/components/groups/ModifyGroup';
import GroupProfile from '@/components/groups/GroupProfile';
import WarningModal from '@/components/systemmessages/WarningModal';

export default function Groups() {
    const {
        isOpen: isAddGroupOpen,
        onOpen: onAddGroupOpen,
        onClose: onAddGroupClose,
    } = useDisclosure();

    const {
        isOpen: isEditGroupOpen,
        onOpen: onEditGroupOpen,
        onClose: onEditGroupClose,
    } = useDisclosure();

    const {
        isOpen: isGroupProfileOpen,
        onOpen: onGroupProfileOpen,
        onClose: onGroupProfileClose,
    } = useDisclosure();

    const {
        isOpen: isDeleteWarningOpen,
        onOpen: onDeleteWarningOpen,
        onClose: onDeleteWarningClose,
    } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>

            <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" spacing="4" pb="10vh">
                <Text className="header text-gray dark:text-gray-300" fontSize={{ base: "3xl", md: "5xl" }}>
                    Groups
                </Text>

                <HStack w="100%" justifyContent="space-between" alignItems="center">

                    <Tooltip label='Add group'>
                        <IconButton colorScheme='teal' onClick={onAddGroupOpen} icon={<AddIcon />}>Add</IconButton>
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
                                <Th >Description</Th>
                                <Th >Number of students</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Group 1</Td>
                                <Td >Group 1 description</Td>
                                <Td >1</Td>
                                <Td>July, 31 2024</Td>
                                <Td>
                                    <ButtonGroup >
                                        <Tooltip label='View group'>
                                            <IconButton size='sm' aria-label='view' onClick={onGroupProfileOpen} colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                        </Tooltip>
                                        <Tooltip label='Edit group'>
                                            <IconButton size='sm' aria-label='edit' onClick={onEditGroupOpen} colorScheme='blue' icon={<EditIcon />}></IconButton>
                                        </Tooltip>
                                        <Tooltip label='Delete group'>
                                            <IconButton size='sm' aria-label='delete' onClick={onDeleteWarningOpen} colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                        </Tooltip>
                                    </ButtonGroup>
                                </Td>

                            </Tr>
                            <Tr>
                                <Td>Group 2</Td>
                                <Td >Group 2 description</Td>
                                <Td >2</Td>
                                <Td>July, 31 2024</Td>
                                <Td>
                                    <ButtonGroup >
                                        <Tooltip label='View group'>
                                            <IconButton size='sm' aria-label='view' onClick={onGroupProfileOpen} colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                        </Tooltip>
                                        <Tooltip label='Edit group'>
                                            <IconButton size='sm' aria-label='edit' onClick={onEditGroupOpen} colorScheme='blue' icon={<EditIcon />}></IconButton>
                                        </Tooltip>
                                        <Tooltip label='Delete group'>
                                            <IconButton size='sm' aria-label='delete' onClick={onDeleteWarningOpen} colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                        </Tooltip>
                                    </ButtonGroup>
                                </Td>

                            </Tr>

                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Name</Th>
                                <Th >Description</Th>
                                <Th >Number of students</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </VStack>

            <ModifyGroup
                isOpen={isAddGroupOpen}
                onClose={onAddGroupClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Add Group"
            />

            <ModifyGroup
                isOpen={isEditGroupOpen}
                onClose={onEditGroupClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Edit Group"
            />

            <GroupProfile
                isOpen={isGroupProfileOpen}
                onClose={onGroupProfileClose}
                title="Group Profile"
            />

            <WarningModal
                isOpen={isDeleteWarningOpen}
                onClose={onDeleteWarningClose}
                action="Delete"
                message="Are you sure you want to delete this Group?"
                buttonColor="red"
            />
        </>
    )
}