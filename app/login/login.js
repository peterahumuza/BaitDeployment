import useAuth from "@/context/AuthContext";
import {useState} from "react";
import useError from "@/context/ErrorContext";
import {useRouter} from "next/navigation";
import {Box, Button, Checkbox, FormControl, FormLabel, Input, Text, useColorModeValue, VStack} from "@chakra-ui/react";

export default function LogIn({setMode}) {
    // HOOKS
    const { currentUser } = useAuth();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { error, setError, setMessages } = useError();
    const messages = [];
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const router = useRouter();

    // FUNCTIONS
    async function handleSubmit(e) {
        e.preventDefault();

        if (!email) {
            messages.push("Email not filled");
        }
        if (!password) {
            messages.push("Password not filled");
            setMessages(messages);
            return setError(true);
        }

        if (!error) {
            try {
                setError(false);
                setLoading(true);
                await login(email, password);
            } catch {
                setMessages(["Failed to login to your account"]);
                return setError(true);
            }
            setError(false)

            setLoading(false);
            router.push("/");
        }
    }

    let borderColor = useColorModeValue("gray.200", "gray.500");
    let borderColor1 = useColorModeValue("gray.300", "gray.400");
    let borderColor2 = useColorModeValue("gray.200", "gray.300");
    let bg = useColorModeValue("black", "white");
    let color = useColorModeValue("white", "black");
    let bg1 = useColorModeValue("gray.800", "gray.200");
    let hover = useColorModeValue({ bg: "gray.100"}, { bg: "gray.700" });
    let color1 = useColorModeValue("gray.600", "gray.300");

    if (!currentUser) {
        return (
                <VStack rounded={"2xl"} className="bg-white dark:bg-black" boxShadow={"lg"} w="30%" minW={"400px"} p={10} spacing={2} maxW="90%">
                    <Text fontWeight={"400"} fontSize={"4xl"} textAlign={"center"} pb={4}>
                        Log in
                    </Text>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input border="1px" placeholder="Your email address" borderRadius="md" borderColor={borderColor} _hover={{ borderColor: borderColor1 }} value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" />
                    </FormControl>
                    <FormControl id="password" pb={2}>
                        <FormLabel>Password</FormLabel>
                        <Input border="1px" borderRadius="md" placeholder="Your password" borderColor={borderColor} _hover={{ borderColor: borderColor1 }} value={password} onChange={(e) => { setPassword(e.target.value); }} type="password" />
                    </FormControl>
                    <Checkbox borderColor={borderColor2} w="100%" pb={4} >
                        Remember me
                    </Checkbox>

                    <Button onClick={(e) => {handleSubmit(e);}} w="100%" rounded="full" bg={bg} color={color} _hover={{ bg: bg1 }} p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }}>
                        <Text fontSize="lg" fontWeight="400" textAlign="center" w="100%">
                            Continue
                        </Text>
                    </Button>

                    <Button w="100%" rounded="full" _hover={hover} _active={{ bg: "gray.100" }} bg="transparent" color="black" p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }} onClick={() => setMode("recovery")}>
                        <Text fontSize="lg" fontWeight="400" color={color1} textAlign="center" w="100%">
                            Forgot your password?
                        </Text>
                    </Button>

                    <Box w="100%" rounded="full" color={bg} border={"2px solid"} borderColor={bg} p={3} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }} onClick={() => setMode("signup")} cursor="pointer" _hover={{ borderColor: "transparent", bg: bg, color: color }}>
                        <Text fontSize="lg" fontWeight="500" textAlign="center" w="100%">
                            Create an account
                        </Text>
                    </Box>

                </VStack>
        );
    } else {
        router.push("/");
    }
}
