import React, { useState, useEffect } from 'react';
import { Text, Image, Button, ButtonGroup, Tooltip, IconButton } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { HStack, VStack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { SearchIcon, AddIcon, DeleteIcon, EditIcon, ViewIcon, LockIcon } from '@chakra-ui/icons'
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

import ModifyStudent from './ModifyStudent';
import StudentProfile from './StudentProfile';
import WarningModal from '@/components/systemmessages/WarningModal';
import { getStudents } from '@/helpers/dbStudentOperations';

export default function Students() {
    const [students, setStudents] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        isOpen: isAddStudentOpen,
        onOpen: onAddStudentOpen,
        onClose: onAddStudentClose,
    } = useDisclosure();

    const {
        isOpen: isEditStudentOpen,
        onOpen: onEditStudentOpen,
        onClose: onEditStudentClose,
    } = useDisclosure();

    const {
        isOpen: isStudentProfileOpen,
        onOpen: onStudentProfileOpen,
        onClose: onStudentProfileClose,
    } = useDisclosure();

    const {
        isOpen: isLockWarningOpen,
        onOpen: onLockWarningOpen,
        onClose: onLockWarningClose,
    } = useDisclosure();

    const {
        isOpen: isDeleteWarningOpen,
        onOpen: onDeleteWarningOpen,
        onClose: onDeleteWarningClose,
    } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (err) {
                setError(err);
            } finally {
                // setLoading(false);
            }
        };

        fetchStudents();
    }, []); 

    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return '';
    };

    const handleAddStudentClose = (newStudent) => {
        if (newStudent) {
            setStudents(prevStudents => [...prevStudents, newStudent]);
        }
        onAddStudentClose();
    };

    return (
        <>
            <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" spacing="4" pb="10vh">
                <Text className="header text-black dark:text-gray-300" fontSize={{ base: "3xl", md: "5xl" }}>
                    Students
                </Text>

                <HStack w="100%" justifyContent="space-between" alignItems="center">
                    <Tooltip label='Add student'>
                        <IconButton colorScheme='teal' onClick={onAddStudentOpen} icon={<AddIcon />}></IconButton>
                    </Tooltip>

                    <Tooltip label='Search student'>
                        <InputGroup>
                            <InputLeftElement><SearchIcon />
                            </InputLeftElement>
                            <Input placeholder='Search' />
                            <InputRightElement><Button colorScheme='blue'>Go</Button></InputRightElement>
                        </InputGroup>
                    </Tooltip>

                </HStack>
                <Divider />
                <TableContainer w="100%" maxHeight="60vh" overflowY="auto">
                    <Table variant='striped' colorScheme='gray' size='md'>
                        <TableCaption>Bait Students</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Photo</Th>
                                <Th>Name</Th>
                                <Th >Progress</Th>
                                <Th >Number of groups</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {students.map(student => (
                                <Tr key={student.id}>
                                    <Td><Image
                                        borderRadius='full'
                                        boxSize='50px'
                                        src='https://bit.ly/dan-abramov'
                                        alt='Dan Abramov'
                                    />
                                    </Td>
                                    <Td>{student.FirstName} {student.LastName}</Td>
                                    <Td >25.4%</Td>
                                    <Td>2</Td>
                                    <Td>{formatTimestamp(student.createdAt)}</Td>
                                    <Td>
                                        <ButtonGroup >
                                            <Tooltip label='View student'>
                                                <IconButton size='sm' aria-label='view' onClick={onStudentProfileOpen} colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                            </Tooltip>
                                            <Tooltip label='Edit student'>
                                                <IconButton size='sm' aria-label='edit' onClick={onEditStudentOpen} colorScheme='blue' icon={<EditIcon />}></IconButton>
                                            </Tooltip>
                                            <Tooltip label='Lock student account'>
                                                <IconButton size='sm' aria-label='lock student account' onClick={onLockWarningOpen} colorScheme='orange' icon={<LockIcon />}></IconButton>
                                            </Tooltip>
                                            <Tooltip label='Delete student'>
                                                <IconButton size='sm' aria-label='deactivate' onClick={onDeleteWarningOpen} colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Photo</Th>
                                <Th>Name</Th>
                                <Th >Progress</Th>
                                <Th >Number of groups</Th>
                                <Th >Created At</Th>
                                <Th ></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </VStack>

            <ModifyStudent
                isOpen={isAddStudentOpen}
                onClose={handleAddStudentClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Add Student"
            />

            <ModifyStudent
                isOpen={isEditStudentOpen}
                onClose={onEditStudentClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title="Edit Student"
            />

            <StudentProfile
                isOpen={isStudentProfileOpen}
                onClose={onStudentProfileClose}
                title="Student Profile"
            />

            <WarningModal
                isOpen={isLockWarningOpen}
                onClose={onLockWarningClose}
                action="Lock"
                message="Are you sure you want to lock this student account?"
                buttonColor="orange"
            />

            <WarningModal
                isOpen={isDeleteWarningOpen}
                onClose={onDeleteWarningClose}
                action="Delete"
                message="Are you sure you want to delete this student account?"
                buttonColor="red"
            />
        </>
    )
}
