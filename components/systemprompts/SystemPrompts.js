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

export default function SystemPrompts() {

    return (
        <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" spacing="4" pb="10vh">
            <Text className="header text-black dark:text-gray-300" fontSize={{ base: "3xl", md: "5xl" }}>
                System Prompts
            </Text>

            <HStack w="100%" justifyContent="space-between" alignItems="center">
                <Tooltip label='Add prompt'>
                    <IconButton colorScheme='teal' icon={<AddIcon />}>Add</IconButton>
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
                        <Tr>
                            <Td>Prompt 1</Td>
                            <Td>Prompt 1 description</Td>
                            <Td >2</Td>
                            <Td>July, 31 2024</Td>
                            <Td>
                                <ButtonGroup >
                                    <Tooltip label='View Prompt'>
                                        <IconButton size='sm' aria-label='deactivate' colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                    </Tooltip>
                                    <Tooltip label='Edit Prompt'>
                                        <IconButton size='sm' aria-label='edit' colorScheme='blue' icon={<EditIcon />}></IconButton>
                                    </Tooltip>
                                    <Tooltip label='Delete Prompt'>
                                        <IconButton size='sm' aria-label='deactivate' colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                    </Tooltip>
                                </ButtonGroup>
                            </Td>

                        </Tr>
                        <Tr>

                            <Td>Prompt 2</Td>
                            <Td>Prompt 2 description</Td>
                            <Td >1</Td>
                            <Td>July, 31 2024</Td>
                            <Td>
                                <ButtonGroup >
                                    <Tooltip label='View Prompt'>
                                        <IconButton size='sm' aria-label='deactivate' colorScheme='cyan' icon={<ViewIcon />}></IconButton>
                                    </Tooltip>
                                    <Tooltip label='Edit Prompt'>
                                        <IconButton size='sm' aria-label='edit' colorScheme='blue' icon={<EditIcon />}></IconButton>
                                    </Tooltip>
                                    <Tooltip label='Delete Prompt'>
                                        <IconButton size='sm' aria-label='deactivate' colorScheme='red' icon={<DeleteIcon />}></IconButton>
                                    </Tooltip>
                                </ButtonGroup>
                            </Td>

                        </Tr>

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
    )
}