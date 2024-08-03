import { Button, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import React from "react";

export default function InfoButton({ title, description }) {

    return (

        <Popover closeOnBlur={false} placement="top">
            <PopoverTrigger>
                <Button bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }} _focus={{ boxShadow: "none", bg: "transparent", borderColor: "transparent"}} p="0" m="0" h="25px" w="25px" >
                    <Image src="/assets/icons/help.svg" alt="Help" h="25px" w="25px" />
                </Button>
            </PopoverTrigger>
            <PopoverContent bg="white" color="gray.800" fontSize="sm" rounded="2xl" shadow="xl" p="4">
                <PopoverArrow />
                <PopoverCloseButton 
                    p="5"
                    rounded="full"
                    m="0"
                    _hover={{ bg: "transparent" }}
                    position="absolute"
                    right="0"
                    top="0"
                />
                <PopoverHeader fontWeight="500" color="slate.800" border='0'>
                    {title}
                </PopoverHeader>
                <PopoverBody fontWeight="light" color="slate.800">
                    {description}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}