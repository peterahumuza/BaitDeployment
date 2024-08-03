"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import { Flex, Image, VStack, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import useAuth from "@/context/AuthContext";
import { isICRC} from "@/firebase";
import LogIn from "./login.js";
import Recovery from "./recovery.js";
import SignupMoove from "./signupMoove.js";
import SignupICRC from "./signupICRC.js";


export default function SignIn() {
    // HOOKS
    const [mode, setMode] = useState("login");
    const { currentUser } = useAuth();
    const router = useRouter();

    if (!currentUser || mode === "waitForSignupDone") {
        return (
                <>
                    {" "}
                    <Flex id="header" w="100vw" h="100vh" direction="column" textColor="black" bgImage="url('/assets/bg/login.webp')" bgSize="cover" bgRepeat="no-repeat" bgPosition="center" position="fixed" overflow="hidden" zIndex="0" />
                    <VStack w="100vw" h="fit-content" backdropFilter="blur(12px)" zIndex="1" justifyContent="center" alignItems="center" position="absolute" top="0" left="0" right="0" bottom="0">
                        <VStack h="fit-content" minH="100vh" py="7.5vh" w="100%" justifyContent="center" alignItems="center" overflow="hidden" zIndex="1">
                            <Link href="/">
                                <HStack h="fit-content" w="fit-content" minWidth="100px" justify="center" align="center" spacing={4} pb={8}>
                                    <Image src={"/assets/logos/ICON_MOOVE_W.svg"} alt="Moove Logo" cursor="pointer" width="auto" height="40px" />
                                    <Image src={"/assets/logos/MOOVE_W.svg"} alt="Moove Logo" cursor="pointer" width="auto" height="30px" />
                                </HStack>
                            </Link>
                            {(mode === "signup" || mode === "waitForSignupDone") && (isICRC ? <SignupICRC setMode={setMode} /> : <SignupMoove setMode={setMode} />)}
                            {mode === "login" && <LogIn setMode={setMode} />}
                            {mode === "recovery" && <Recovery setMode={setMode} />}
                        </VStack>
                    </VStack>
                </>
        );
    } else {
        router.push("/");
    }
}
