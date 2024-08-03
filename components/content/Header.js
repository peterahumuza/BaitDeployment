"use client";

import { Flex, Text, Button, HStack, VStack, useColorModeValue, useDisclosure, Menu, MenuItem, MenuButton, Avatar, MenuList } from "@chakra-ui/react";
import { GridStyle} from "@/components/content/Grids";
import { getOrganizationScore } from "@/helpers/dbOperations";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { throttle } from 'lodash';
import {isICRC} from "@/firebase";


function HeaderButton({href, label, ...props}) {
  return (
    <Link href={href}>
      <Button variant="link" className="bg-transparent hover:border-black dark:hover:bg-transparent hover:text-black dark:hover:text-white dark:hover:border-white" borderWidth="2px" h="fit-content" borderColor="transparent"  _hover={{ cursor: "pointer" }} rounded="3xl" transition="all 0.5s ease-in-out" px={4} py={2} justifyContent="center" alignItems={"center"} {...props}>
        <Text className="text-black dark:text-white" fontWeight="light" fontSize="xl" >
          {label}
        </Text>
      </Button>
    </Link>
  );
}

function HamburgerButton({onClick, ...props}) {
  const color = useColorModeValue("black", "white");
  return (
    <Button variant="link" onClick={onClick} h="fit-content" _hover={{ cursor: "pointer" }} rounded="full" transition="all 0.5s ease-in-out" p={2} {...props} display={{base: "flex", md: "none"}} color={color}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="30px" height="30px">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </Button>
  );
}

function CloseButton({onClick, ...props}) {
  return (
    <Button variant="link" onClick={onClick} h="fit-content" _hover={{ cursor: "pointer" }} rounded="full" transition="all 0.5s ease-in-out" p={2} {...props} display={{base: "flex", md: "none"}} color="white">
      <svg width="30px" height="30px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
      </svg>
    </Button>
  );
}




function DarkButton({href, label, ...props}) {
  const textColor = useColorModeValue("white", "black");
  const bgColor = useColorModeValue("black", "white");
  return (
    <Link href={href}>
      <Button fontSize="xl" textColor={textColor} bgColor={bgColor} fontWeight={"light"} rounded="full" _hover={{ transform: "scale(1.05)", cursor: "pointer" }} transition="all 0.2s ease-in-out" width="fit-content" px={4} py={6} justifyContent="center" alignItems={"center"} {...props}>
        {label}
      </Button>
    </Link>
  );
}

function MooveLogo({isOpen}) {
  const logoColor = useColorModeValue("black", "white");
  return (
    <Link href="/">
      <HStack h="100%" w="fit-content" justify="flex-start" align="center" spacing={2} cursor="pointer" color={isOpen ? "white" : logoColor} transition="all 0.5s ease-in-out">
        <svg id="Calque_1" className="fill-current" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762.1 286.37" width="80px" height="100%">
          <path className="cls-1" d="M698.12,158.4s-.03,0-.05,0h0c-52.21.04-94.57-42.25-94.6-94.46h0c-.03-35.32-28.66-63.94-63.99-63.94s-63.96,28.62-63.98,63.94h0c-.04,52.1-42.31,94.3-94.4,94.26h0s-.03,0-.05,0c-.69,0-1.35.08-2.03.1-51.27-1.05-92.55-42.83-92.59-94.36h0c-.03-35.32-28.66-63.94-63.99-63.94s-63.96,28.62-63.98,63.94h0c-.04,52.1-42.31,94.3-94.4,94.26h0s-.03,0-.05,0c-35.34,0-63.99,28.65-63.99,63.99s28.65,63.99,63.99,63.99,63.96-28.62,63.99-63.94h0c.04-52.1,42.31-94.3,94.4-94.26h0s.03,0,.05,0,.03,0,.05,0h0c52.06-.04,94.31,42.02,94.58,94.03,0,.06,0,.12,0,.18,0,4.43.45,8.76,1.31,12.94,5.91,29.23,31.73,51.25,62.71,51.25,35.34,0,63.99-28.65,63.99-63.99,0-.13-.02-.26-.02-.39.17-51.99,42.37-94.07,94.39-94.03h0s.03,0,.05,0,.03,0,.05,0h0c52.21-.04,94.57,42.25,94.6,94.46h0c.03,35.32,28.66,63.94,63.98,63.94s63.99-28.65,63.99-63.99-28.65-63.99-63.99-63.99Z"/>
        </svg>

        {!isICRC && 
        <Flex display={{base: "none", md: "block"}} alignItems="center" justifyContent="center">
          <svg className="fill-current" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 565.46 100.21" height="100%" width="120px">
            <g id="Calque_1-2" data-name="Calque 1">
              <path className="cls-1" d="M0,2.59h19.18v16.59C24.19,9.16,36.8,0,51.66,0,67.73,0,78.78,8.81,81.38,20.9,85.53,10.71,99,0,116.11,0,138.05,0,150.14,12.1,150.14,35.24v62.37h-19.52v-59.78c0-15.2-6.22-21.43-17.97-21.43-10.71,0-22.11,8.3-27.82,22.29v58.91h-19.52v-59.78c0-15.2-6.22-21.43-17.97-21.43-10.71,0-22.11,8.3-27.82,22.29v58.91H0V2.57v.02Z"/>
              <path className="cls-1" d="M166.55,50.1C166.55,19.87,186.42,0,214.4,0s47.86,19.87,47.86,50.1-19.87,50.11-47.86,50.11-47.85-19.87-47.85-50.11ZM214.4,84.31c15.03,0,27.82-12.78,27.82-34.21s-12.78-34.2-27.82-34.2-27.81,12.78-27.81,34.2,12.78,34.21,27.81,34.21Z"/>
              <path className="cls-1" d="M276.08,50.1C276.08,19.87,295.95,0,323.93,0s47.86,19.87,47.86,50.1-19.87,50.11-47.86,50.11-47.85-19.87-47.85-50.11h0ZM323.93,84.31c15.03,0,27.82-12.78,27.82-34.21s-12.78-34.2-27.82-34.2-27.81,12.78-27.81,34.2,12.78,34.21,27.81,34.21Z"/>
              <path className="cls-1" d="M375.24,2.59h21.25l25.05,76.36h.35L446.94,2.59h21.25l-35.07,95.02h-22.8L375.25,2.59h0Z"/>
              <path className="cls-1" d="M471.65,49.59c0-29.72,19.18-49.59,48.2-49.59s45.61,18.66,45.61,48.55c0,1.39,0,2.25-.17,5.01h-73.77c1.21,18.83,12.61,30.75,29.37,30.75,12.61,0,22.46-6.91,24.19-16.76h19.52c-3.46,19.69-20.39,32.65-43.71,32.65-29.2,0-49.24-20.21-49.24-50.62h0ZM546.45,39.22c-1.73-14.86-11.75-23.84-26.61-23.84s-26.78,9.85-28.33,23.84h54.94Z"/>
            </g>
        </svg>
        </Flex>
      }
      </HStack>
    </Link>
  );
}


function UserMenu() {
  const { currentUser, userData, logout } = useAuth();
  const router = useRouter();
  const [orgScore, setOrgScore] = useState(0);
  const [orgName, setOrgName] = useState("No organization");
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    if (userData && userData.organization) {
      setOrgName(userData.organization);
      getOrganizationScore(userData.organization)
        .then(fetchedOrgScore => {
          setOrgScore(fetchedOrgScore);
        })
        .catch(error => {
          console.error('Failed to fetch organization score:', error);
        });
    }
  }, [userData]);

  let initials = "";
  if (currentUser?.displayName) {
    if (currentUser?.displayName.split(" ").length > 1) {
      initials = currentUser?.displayName.split(" ")[0].charAt(0) + currentUser?.displayName.split(" ")[1].charAt(0)}
    else {
      initials = currentUser?.displayName.split.charAt(0);
    }
  }

  let bgColor = useColorModeValue("gray.100", "gray.500");
  return (
    <Menu >
      <MenuButton as={Button} rounded={"full"} variant={"link"} border={"2"} borderColor={"black"} cursor={"pointer"} height={"100%"} width="fit-content" justifyContent={"flex-end"} alignItems={"center"} ml="1vw">
        <Avatar size={"md"} src={"https://api.dicebear.com/7.x/initials/svg?seed=" + initials}/>
      </MenuButton>
      

      <MenuList alignItems={"center"} textColor={textColor} rounded="3xl" overflow="hidden" px={4}>
        <Text fontSize="xl" fontWeight="light" color={textColor} ml={2} w="100%" textAlign="left" pb={2}>
          {currentUser?.displayName}
        </Text>
        {/* <MenuItem onClick={() => { router.push("/chat"); }} fontWeight="light" fontSize="xl" rounded="3xl" px={4} _hover={{ bgColor: useColorModeValue("gray.100", "gray.500") }}>
          Dashboard
        </MenuItem> */}
        <MenuItem onClick={() => { logout(); router.refresh(); }} fontWeight="light" fontSize="xl" rounded="3xl" px={4} _hover={{ bgColor: bgColor }}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShrink, setIsShrink] = useState(false);
  const bgColor = useColorModeValue("gray.50", "black");
  const { currentUser, userData, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 100) {
        setIsShrink(true);
      } else {
        setIsShrink(false);
      }
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }
  , []);

  return (
    <>
      <Flex
        as="header"
        h={isShrink & !isOpen ? "80px" : "120px"}
        bgColor={isShrink & !isOpen ? bgColor : "transparent"}
        w="100%"
        position="fixed"
        px={GridStyle.pageMargin}
        align="center"
        justifyContent="space-between"
        transition="all 0.5s ease-in-out"
        zIndex={100}
      >
        <MooveLogo isOpen={isOpen} />
        <HStack display={{ base: 'none', md: 'flex' }} alignItems="center" spacing={4}>
          { currentUser && ( <UserMenu /> ) }
          { !isICRC && <HeaderButton href="/meditron" label="Meditron"/> }
          { !isICRC && <HeaderButton href="/news" label="News"/> }
          { isICRC && <HeaderButton href="/about" label="About"/> }
          { currentUser && ( <DarkButton href="/chat" label="Contribute"/> ) }
          { !currentUser && ( <DarkButton href="/login" label="Sign in"/> ) }

        </HStack>
        { isOpen ?
          <CloseButton onClick={isOpen ? onClose : onOpen} />
          :
          <HamburgerButton onClick={isOpen ? onClose : onOpen} />
        }
      </Flex>

      <VStack w="100%" h={isOpen ? "100vh" : "0"} bgColor="black" position="fixed" top="0" left="0" zIndex={99} transition="all 0.5s ease-in-out" overflow="hidden">
        <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" pt="20vh" px={GridStyle.pageMargin} spacing={0}>
          
          <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} onClick={() => { router.push("/"); }} borderBottom="1px solid" borderColor="white" _hover={{ cursor: "pointer", pb: 8 }} transition="all 0.5s ease-in-out">
            <Text className="text-white" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
              Home
            </Text>
          </Flex>
          
          { !isICRC && (
          <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} onClick={() => { router.push("/meditron"); }} borderBottom="1px solid" borderColor="white" _hover={{ cursor: "pointer", pb: 8 }} transition="all 0.5s ease-in-out">
            <Text className="text-white" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
              Meditron
            </Text>
          </Flex>
          )}

          { !isICRC && (
            <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} onClick={() => { router.push("/news"); }} _hover={{ cursor: "pointer", pb: 8 }} transition="all 0.5s ease-in-out">
              <Text className="text-white" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
                News
              </Text>
            </Flex>
          )}

          { isICRC && (
            <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} onClick={() => { router.push("/about"); }} borderBottom={currentUser ? "1px solid": "0px"} borderColor="white" _hover={{ cursor: "pointer", pb: 8 }} transition="all 0.5s ease-in-out">
              <Text className="text-white" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
                About
              </Text>
            </Flex>
          )}

          { currentUser && currentUser.displayName && (
            <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} onClick={() => { logout(); router.refresh(); onClose()}} _hover={{ cursor: "pointer", pb: 8 }} transition="all 0.5s ease-in-out">
              <Text className="text-white" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
                Log out
              </Text>
            </Flex>
          )}

          { currentUser && (
            <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} mt={8} onClick={() => { router.push("/chat"); }} bgColor="white" rounded="full" color="black" _hover={{ cursor: "pointer", bgColor:"gray.100" }} transition="all 0.5s ease-in-out">
              <Text className="text-black" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
                Contribute
              </Text>
            </Flex>
          )}

          { !currentUser && (
            <Flex w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" p={4} mt={8} onClick={() => { router.push("/login"); }} bgColor="white" rounded="full" color="black" _hover={{ cursor: "pointer", bgColor:"gray.100" }} transition="all 0.5s ease-in-out">
              <Text className="text-black" fontWeight="light" fontSize="2xl" textAlign="center" w="100%">
                Sign in
              </Text>
            </Flex>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default Header;