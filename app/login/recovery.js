import useAuth from "@/context/AuthContext";
import {useState} from "react";
import useError from "@/context/ErrorContext";
import {useRouter} from "next/navigation";
import {Button, FormControl, FormLabel, Input, Text, useColorModeValue, VStack} from "@chakra-ui/react";

export default function Recovery({setMode}) {
    const { currentUser } = useAuth();
    const [email, setEmail] = useState("");
    const { error, setError, setMessages } = useError();
    const messages = [];
    const router = useRouter();

    let ForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
                .then(() => { setMessages(["Password recovery email sent!"]); })
                .catch((error) => { alert(error.message) });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email) {
            messages.push("Email not filled");
        }
        if (!error) {
            try {
                setError(false);
                ForgotPassword();
            } catch {
                setMessages(["This email is not registered. Please try again."]);
                return setError(true);
            }
            setError(false)
        }
    }

    let bg = useColorModeValue("black", "white");
    let color = useColorModeValue("white", "black");
    let bg1 = useColorModeValue("gray.800", "gray.200");
    let hover = useColorModeValue({ bg: "gray.100"}, { bg: "gray.700" });
    let color1 = useColorModeValue("gray.600", "gray.300");
    if (!currentUser) {
        return (
                <VStack rounded={"2xl"} className="bg-white dark:bg-black" boxShadow={"lg"} w="30%" minW={"400px"} p={10} spacing={2} maxW="90%">
                    <Text fontWeight={"400"} fontSize={"3xl"} textAlign={"center"} pb={4}>
                        Forgot your password?
                    </Text>

                    <Text align={"center"} fontWeight={"light"}>
                        Please enter your email to receive a password reset link.
                    </Text>

                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                        />
                    </FormControl>

                    <Button onClick={(e) => {handleSubmit(e);}} w="100%" rounded="full" bg={bg} color={color} _hover={{ bg: bg1 }} p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }} mt={6}>
                        <Text fontSize="lg" fontWeight="400" textAlign="center" w="100%">
                            Continue
                        </Text>
                    </Button>

                    <Button w="100%" rounded="full" _hover={hover} _active={{ bg: "gray.100" }} bg="transparent" color="black" p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }} onClick={() => setMode("login")}>
                        <Text fontSize="lg" fontWeight="400" color={color1} textAlign="center" w="100%">
                            Cancel
                        </Text>
                    </Button>
                </VStack>
        );
    }
    else {
        router.push("/contribute");
    }
}
