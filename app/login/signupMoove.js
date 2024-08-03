import {useState} from "react";
import useError from "@/context/ErrorContext";
import useAuth from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";
import {Box, Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import { ChevronDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { updateProfile, sendEmailVerification } from "firebase/auth";

export default function Signup({setMode}) {
    // HOOKS
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const { error, setError, setMessages } = useError();
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermCountry, setSearchTermCountry] = useState("");

    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");


    const Mailto = ({ email, subject, body, children }) => {
        return (
                <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>
                    {children}
                </a>
        );
    };

    const organizations = [
        "CHUV (Centre Hospitalier Universitaire Vaudois)",
        "ICRC (International Committee of the Red Cross)",
        "Kenyatta National Hospital",
        "PERN (Pediatric Emergency Research Network)",
        "WHO (World Health Organization)",
        "HUG (Hôpitaux Universitaires de Genève)",
        "UNIFR (Université de Fribourg)",
    ];

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
        "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
        "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
        "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway",
        "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
    ];




    const filteredOrganizations = searchTerm
            ? organizations.filter((org) =>
                    org.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : organizations;

    const filteredCountry = searchTermCountry
            ? countries.filter((country) =>
                    country.toLowerCase().includes(searchTermCountry.toLowerCase())
            )
            : countries;

    const messages = [];

    const { signup, currentUser } = useAuth();
    const router = useRouter();


    // FUNCTIONS
    async function handleSubmit(e) {
        e.preventDefault();
        setMode("waitForSignupDone")

        if (!firstName) {
            messages.push("First Name not filled");
        }
        if (!lastName) {
            messages.push("Last Name not filled");
        }


        if (!password) {
            messages.push("Password not filled");
            setMessages(messages);
            return setError(true);
        } else if (password !== confirmPassword) {
            messages.push("Passwords not matching");
            setMessages(messages);
            return setError(true);
        }



        function verifyEmailWithOrg(organization,email) {
            if (organization === "CHUV (Centre Hospitalier Universitaire Vaudois)" && email.includes("chuv")) {
                return true;
            } else if (organization === "ICRC (International Committee of the Red Cross)" && email.includes("icrc")) {
                return true;
            } else if (organization === "Kenyatta National Hospital" && email.includes("kenyatta")) {
                return true;
            } else if (organization === "PERN (Pediatric Emergency Research Network)" && email.includes("pern")) {
                return true;
            } else if (organization === "WHO (World Health Organization)" && email.includes("who.int")) {
                return true;
            } else if (email.includes("walid") || email.includes("sallinen") || email.includes("bonnet") || email.includes("hartley")){
                return true;
            }
            else {
                return true;
            }
        }


        if (!verifyEmailWithOrg(selectedOrganization,email)) {
            messages.push("Email does not match the organization");
            setMessages(messages);
            return setError(true);
        }


        if (!error) {
            try {
                setError("");
                setLoading(true);
                const newUser = await signup(email, password);
                await updateProfile(newUser.user, {
                    displayName: firstName + " " + lastName,
                    organization: selectedOrganization,
                    speciality: speciality,
                    country: selectedCountry,
                });

                await addDoc(collection(db, "users"), {
                    userId: newUser.user.uid,
                    name: firstName + " " + lastName,
                    organization: selectedOrganization,
                    speciality: speciality,
                    country: selectedCountry,
                    score: 0,
                    isAdmin: false,
                });
                //await sendEmailVerification(newUser.user);
            } catch (e) {
                if(e.code === "auth/email-already-in-use") {
                    setMessages(["Email already in use"]);
                } else {
                    setMessages(["Failed to register"]);
                }

                return setError(true);
            }
            setLoading(false);
            setMode("signup");
            router.push("/");
        }
    }

    let borderColor = useColorModeValue("gray.200", "gray.500");
    let borderColor2 = useColorModeValue("gray.300", "gray.400");
    let bg = useColorModeValue("black", "white");
    let color = useColorModeValue("white", "black");
    let bg2 = useColorModeValue("gray.700", "gray.200");
    let hover = useColorModeValue({ bg: "gray.100" }, { bg: "gray.700" });
    let color1 = useColorModeValue("gray.600", "gray.300");
    let color2 = useColorModeValue("gray.500", "gray.300");
    return (
            <VStack rounded={"2xl"} className="bg-white dark:bg-black" boxShadow={"lg"} minW={"400px"} p={10} spacing={4} w={{base: "90%", md: "50%", sm:"80%"}} maxW={"600px"} h="fit-content">
                <Text fontWeight={"400"} fontSize={"4xl"} textAlign={"center"} pb={4}>
                    Sign up
                </Text>

                <HStack spacing={{base: 4, md: 8}} w="100%" justifyContent="space-between" alignItems="flex-start">
                    <Box w="50%">
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input border="1px" borderRadius="md" placeholder="Your first name" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={firstName} onChange={(e) => { setFirstName(e.target.value); }} type="text" />
                        </FormControl>
                    </Box>
                    <Box w="50%">
                        <FormControl id="lastName" isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input border="1px" borderRadius="md" placeholder="Your last name" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={lastName} onChange={(e) => { setLastName(e.target.value); }} type="text" />
                        </FormControl>
                    </Box>
                </HStack>

                <FormControl isRequired>
                    <FormLabel>Organization</FormLabel>
                    <Menu >
                        {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} pr={3} width="full" border="1px" borderRadius="md" bg={"transparent"} borderColor={borderColor} _hover={{ borderColor: borderColor2 }} textAlign="left" fontWeight="normal" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                        {selectedOrganization || "Select organization"}
                                    </MenuButton>
                                    <MenuList width="full" overflowY="auto">
                                        <Box px={4} py={2}>
                                            <Input border="1px" borderRadius="md" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} placeholder="Search organization..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                        </Box>
                                        {filteredOrganizations.map((org, index) => (
                                                <MenuItem key={index} onClick={() => { setSelectedOrganization(org); setSearchTerm(""); }}>
                                                    {org}
                                                </MenuItem>
                                        ))}
                                    </MenuList>
                                </>
                        )}
                    </Menu>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Country of practice</FormLabel>
                    <Menu >
                        {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} pr={3} width="full" border="1px" borderRadius="md" bg={"transparent"} borderColor={borderColor} _hover={{ borderColor: borderColor2 }} textAlign="left" fontWeight="normal" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                        {selectedCountry || "Select a country"}
                                    </MenuButton>
                                    <MenuList width="full" overflowY="auto">
                                        <Box px={4} py={2}>
                                            <Input border="1px" borderRadius="md" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} placeholder="Search country..." value={searchTermCountry} onChange={(e) => setSearchTermCountry(e.target.value)} />
                                        </Box>
                                        {filteredCountry.map((country, index) => (
                                                <MenuItem key={index} onClick={() => { setSelectedCountry(country); setSearchTermCountry(""); }}>
                                                    {country}
                                                </MenuItem>
                                        ))}
                                    </MenuList>
                                </>
                        )}
                    </Menu>
                </FormControl>




                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input border="1px" borderRadius="md" placeholder="Your email address at the organization" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" />
                </FormControl>

                <FormControl id="medical_specialty" isRequired>
                    <FormLabel>Medical specialty</FormLabel>
                    <Input border="1px" borderRadius="md" placeholder="Your medical specialty" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={speciality} onChange={(e) => { setSpeciality(e.target.value); }} type="text" />
                </FormControl>

                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input border="1px" borderRadius="md" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={password} type={showPassword ? "text" : "password"} onChange={(e) => { setPassword(e.target.value); }} placeholder="At least 6 characters long" />
                        <InputRightElement h={"full"}>
                            <Button variant={"ghost"} onClick={() => { setShowPassword((showPassword) => !showPassword); }}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id="confirmpassword" isRequired pb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input border="1px" borderRadius="md" borderColor={borderColor} _hover={{ borderColor: borderColor2 }} value={confirmPassword} type={showConfirmPassword ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value); }} placeholder="At least 6 characters long" />
                        <InputRightElement h={"full"}>
                            <Button variant={"ghost"} onClick={() => { setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword); }}>
                                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button onClick={(e) => {handleSubmit(e);}} w="100%" rounded="full" bg={bg} color={color} _hover={{ bg: bg2 }} p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }}>
                    <Text fontSize="lg" fontWeight="400" textAlign="center" w="100%">
                        Continue
                    </Text>
                </Button>

                <Button w="100%" rounded="full" _hover={hover} _active={{ bg: "gray.100" }} bg="transparent" color="black" p={6} transition="all 0.2s ease-in-out" _focus={{ boxShadow: "outline" }} onClick={() => setMode("login")}>
                    <Text fontSize="lg" fontWeight="400" color={color1} textAlign="center" w="100%">
                        Already a user? {" "}
                        <span fontWeight="500" color={bg}>Log in.</span>
                    </Text>
                </Button>

                <Text fontSize="md" fontWeight="400" color={color2} textAlign="center" w="100%">
                    This platform is only open to partner organizations, for now.
                    If you are interested in joining, please{" "}
                    <Mailto email={"moove-initiative@gmail.com"} subject="Contact MOOVE" body="Hello MOOVE team," >
                        contact us
                    </Mailto>
                    .
                </Text>
            </VStack>
    );
}
