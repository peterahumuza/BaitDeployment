"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import useError from "@/context/ErrorContext";
import {ChevronDownIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {updateProfile, sendEmailVerification} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";

import {
    Flex,
    Box,
    Menu,
    MenuButton,
    FormControl,
    MenuItem,
    MenuList,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    VStack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {useState} from "react";
import useAuth from "@/context/AuthContext";
import {db} from "@/firebase";
import {useRouter} from "next/navigation";

export default function SignupICRC({setMode}) {
    // HOOKS
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const {error, setError, setMessages} = useError();
    const [loading, setLoading] = useState(false);
    const [organization, setOrganization] = useState("");
    const [title, setTitle] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    let HUMANITARIAN_MEDITRON_TESTING_GROUP = "Humanitarian Meditron Testing Group";
    const [selectedOrganization, setSelectedOrganization] = useState(HUMANITARIAN_MEDITRON_TESTING_GROUP);
    const [searchTermCountry, setSearchTermCountry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    const Mailto = ({email, subject, body, children}) => {
        return (
                <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
        );
    };

    const organizations = [
        HUMANITARIAN_MEDITRON_TESTING_GROUP,];

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

    const {signup, currentUser, sendEmailVer, anonymizeEmail} = useAuth();
    const router = useRouter();

    // FUNCTIONS
    async function handleSubmit(e) {
        e.preventDefault();
        setMode("waitForSignupDone")

        if (!password) {
            messages.push("Password not filled");
            setMessages(messages);
            return setError(true);
        } else if (password !== confirmPassword) {
            messages.push("Passwords not matching");
            setMessages(messages);
            return setError(true);
        }

        function verifyEmailWithOrg(organization, email) {

            const whitelisted = [
                'thBXH33NwrQkdNngAHbCqw6TK7qKtX8moEdA4LuUd2w=@humanitarianmoove.org',
                '5CKVaBsL1cTncJi9Gy8rxCPFcTyS0gesg7z2Sdl1wVo=@humanitarianmoove.org',
                'dyRqz9b6+YVWyQmxl39ywpd5wOjATq9iA5slzAmLqKs=@humanitarianmoove.org',
                'soFgf5ily1mQ+iCL3mEDju0S1c1p5TcTiwTCAfqjyZg=@humanitarianmoove.org',
                'FOq5fgE7pKe3i9s+L9/ebLi3yHAjfPpaHrG/I/7rsCM=@humanitarianmoove.org',
                'NRC3PYgVrx7VTAqKIxfQYRBg4pdVOgZD8ucWvvpP0IU=@humanitarianmoove.org',
                'raGHMr+WmDEFF2G1pLsMgspW/r2314uoxCcyjsGHzwY=@humanitarianmoove.org',
                'vxytFJxMvtB1GCP/zZGulQquO3b0J25lwHSkORjy8bE=@humanitarianmoove.org',
                'KdkyCe1KbL6mTicXzFAj7/CiniWHfWepAnVK8NVZRW8=@humanitarianmoove.org',
                'XKjpEfLWizs0fmDVXgX4ju/V4KomiApHeTpYgAKJU0E=@humanitarianmoove.org',
                'Fj7nSPBk/is4772DM76jAYD1fCGJHUAEb0Xtgu0A2D0=@humanitarianmoove.org',
                'K72GM7Ijb987n0VJMfJRc7ra6X137i7B3mBVWpUEmKI=@humanitarianmoove.org',
                'q6idBqmFCvRCtck3A4e0DS0OUYaTia9omcScPOuQuLw=@humanitarianmoove.org',
                'rQooyYh4com3+GOmK06Qx9DRGJ6CFA8tRq4FBwZIZEs=@humanitarianmoove.org',
                'Wfu1Rni5GHBJEZ3xFeFXc7elwcOD7SeHgZQPKj7PTho=@humanitarianmoove.org',
                '2I6CNJ/xt/bsspccqMQyAAnPOL1mJ1lZUhw0ExJwC3s=@humanitarianmoove.org',
                'D85FWXXtNB4cE+EOQx5NJepxirbHUUCclRB6wTjothQ=@humanitarianmoove.org',
                '3+cqVb8VQVMTQ+6BbtMuP1HJwffewne++kTZlZWFmRs=@humanitarianmoove.org',
                'hDw06f77HwaOd/EL5zygH07xp8iTdtc7j9g7yZIZ2pI=@humanitarianmoove.org',
                'iqPdy5g36oL0S2R6VMP5AKK2FooBfnSyoohs/Z4BlyY=@humanitarianmoove.org',
                'PlwU7oAWY930ZZV7+79M5qdZFMH+ennypwPAtZQcnP0=@humanitarianmoove.org',
                'KR89NPbBJiXc08xEtVleU0E0LtSjG6wqMHh5VavheNo=@humanitarianmoove.org',
                'a5K0p8CffUOBSkuzKNkWWQFvnTmq6bTyvGaCBGloWv0=@humanitarianmoove.org',
                'KDaGXjTqCF+q4DATgwYvRpBupAdo4k7NhsN7t9J84LE=@humanitarianmoove.org',
                '2I6CNJ/xt/bsspccqMQyAAnPOL1mJ1lZUhw0ExJwC3s=@humanitarianmoove.org',
                'uDYWc9EAPILrLU/oZRkzmlHRkLKPGKnuxxzkOPq4Rqg=@humanitarianmoove.org',
                '8U9E3kP5Rnvkx52rNbIkILeztv6XPAZiH5U4foavY2s=@humanitarianmoove.org',
                'vVZWn9Kz3krz/qSjlQY4YLxk9ean+DqwLOs9LjA7OY4=@humanitarianmoove.org',
                'YWETol34gG8q0HzBD+KYQCev0HMkyVSKV+2mmxjLv4Q=@humanitarianmoove.org',
                'JGn6Il5PtTzeIlMB9ZPi21U1rleclwDa51jjKPDdSTI=@humanitarianmoove.org',
                'qaIXaXho/AAPLD8gXrbG5PH6Lbf6c+33ShvIsjg8wO0=@humanitarianmoove.org',
                'tmAKf0QEaMrV9uvJI+gkqHlKFh6VsDGmuLt9l3d3zPc=@humanitarianmoove.org',
                'Grdj6g//6mw4q5BCV7g/v2fPQ2DR5qj9jzX/o/77pq4=@humanitarianmoove.org',
                'hvE1G5bEuT5iWFkLYaGtBQlb6JuX/6pQwhStkzd+soc=@humanitarianmoove.org',
                'uDYWc9EAPILrLU/oZRkzmlHRkLKPGKnuxxzkOPq4Rqg=@humanitarianmoove.org',
                'jOoBptZ1YmiB0yoFon/eRSjCtiK9BJAY7HNhOdbLtUw=@humanitarianmoove.org',
                'xsfru6IYCrR3/qzs2Dj6iFhgfIHD3GNQgnMJJ9h78p0=@humanitarianmoove.org',
                'lxW2affER0xBdPM08/jgyPoU/+7lzfkf0f9xuyIu1FU=@humanitarianmoove.org',
                'fLcaCX2lTzPah71OdcH0Xq6I8n2Kpl3WDD/floa7iWA=@humanitarianmoove.org',
                'QOp9nhH2Ovul63kT75+WNzKRRhGzQMbkbQWzkH6KBqI=@humanitarianmoove.org',
                'E28j3Xp7frvDZiSUTiygStcmlN1/YdVn0PW20lyzfDk=@humanitarianmoove.org'
            ]
            if (organization === HUMANITARIAN_MEDITRON_TESTING_GROUP) {
                if (whitelisted.includes(anonymizeEmail(email))) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (!verifyEmailWithOrg(selectedOrganization, email)) {
            messages.push("Email does not match the whitelist of the selected organization");
            setMessages(messages);
            return setError(true);
        }
        const updatedCountry = selectedCountry || "EMPTY";
        const updatedTitle = title || "EMPTY";
        const updatedSpeciality = speciality || "EMPTY";

        if (!error) {
            try {
                setError("");
                setLoading(true);
                const newUser = await signup(email, password);
                await updateProfile(newUser.user, {
                    displayName: "Anonymous User",
                    organization: selectedOrganization,
                    speciality: updatedSpeciality,
                    country: updatedCountry,
                    jobTitle: updatedTitle,
                });
                // update user profile in users table too
                await addDoc(collection(db, "users"), {
                    userId: newUser.user.uid,
                    name: "Anonymous User",
                    organization: selectedOrganization,
                    speciality: updatedSpeciality,
                    country: updatedCountry,
                    title: updatedTitle,
                    score: 0,
                    isAdmin: false,
                });
                //await sendEmailVer(newUser.user);
            } catch (e) {
                if (e.code === "auth/email-already-in-use") {
                    setMessages(["Email already in use"]);
                } else {
                    setMessages(["Failed to register"]);
                }

                return setError(true);
            }
            setLoading(false);
            router.push("/");
        }
    }

    let borderColor = useColorModeValue("gray.200", "gray.500");
    let borderColor1 = useColorModeValue("gray.300", "gray.400");
    let bg = useColorModeValue("black", "white");
    let color = useColorModeValue("white", "black");
    let bg1 = useColorModeValue("gray.700", "gray.200");
    let hover = useColorModeValue({bg: "gray.100"}, {bg: "gray.700"});
    let color1 = useColorModeValue("gray.600", "gray.300");
    let color2 = useColorModeValue("gray.500", "gray.300");

    return (
            <VStack rounded={"2xl"} className="bg-white dark:bg-black" boxShadow={"lg"} minW={"400px"} p={10} spacing={4} w={{base: "90%", md: "50%", sm: "80%"}} maxW={"600px"} h="fit-content">
                <Text fontWeight={"400"} fontSize={"4xl"} textAlign={"center"} pb={4}>
                    Sign up
                </Text>

                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                            border="1px"
                            borderRadius="md"
                            placeholder="Your email address at the organization"
                            borderColor={borderColor}
                            _hover={{
                                borderColor: borderColor1,
                            }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Organization</FormLabel>
                    <Menu>
                        {({isOpen}) => (
                                <>
                                    <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon/>}
                                            width="full"
                                            border="1px"
                                            borderRadius="md"
                                            bg={"transparent"}
                                            borderColor={borderColor}
                                            _hover={{
                                                borderColor: borderColor1,
                                            }}
                                            textAlign="left"
                                            fontWeight="normal"
                                    >
                                        {selectedOrganization || "Select organization"}
                                    </MenuButton>
                                    <MenuList width="full" overflowY="auto">
                                        <Box px={4} py={2}>
                                            <Input
                                                    border="1px"
                                                    borderRadius="md"
                                                    borderColor={borderColor}
                                                    _hover={{
                                                        borderColor: borderColor1,
                                                    }}
                                                    placeholder="Search organization..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </Box>
                                        {filteredOrganizations.map((org, index) => (
                                                <MenuItem
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedOrganization(org);
                                                            setSearchTerm("");
                                                        }}
                                                >
                                                    {org}
                                                </MenuItem>
                                        ))}
                                    </MenuList>
                                </>
                        )}
                    </Menu>
                </FormControl>

                <FormControl id="medical_specialty">
                    <FormLabel>Medical specialty</FormLabel>
                    <Input
                            border="1px"
                            borderRadius="md"
                            placeholder="Your medical specialty"
                            borderColor={borderColor}
                            _hover={{
                                borderColor: borderColor1,
                            }}
                            value={speciality}
                            onChange={(e) => {
                                setSpeciality(e.target.value);
                            }}
                            type="text"
                    />
                </FormControl>

                <FormControl id="job_title">
                    <FormLabel>Job Title</FormLabel>
                    <Input
                            border="1px"
                            borderRadius="md"
                            placeholder="Your job title"
                            borderColor={borderColor}
                            _hover={{
                                borderColor: borderColor1,
                            }}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            type="text"
                    />
                </FormControl>


                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                                border="1px"
                                borderRadius="md"
                                borderColor={borderColor}
                                _hover={{
                                    borderColor: borderColor1,
                                }}
                                value={password}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="At least 6 characters long"
                        />
                        <InputRightElement h={"full"}>
                            <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                    }
                            >
                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id="confirmpassword" isRequired pb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                                border="1px"
                                borderRadius="md"
                                borderColor={borderColor}
                                _hover={{
                                    borderColor: borderColor1,
                                }}
                                value={confirmPassword}
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                placeholder="At least 6 characters long"
                        />
                        <InputRightElement h={"full"}>
                            <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                            setShowConfirmPassword(
                                                    (showConfirmPassword) => !showConfirmPassword
                                            )
                                    }
                            >
                                {showConfirmPassword ? <ViewIcon/> : <ViewOffIcon/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Flex onClick={(e) => {
                    handleSubmit(e);
                }} w="100%" rounded="full" bg={bg} color={color} _hover={{bg: bg1}} p={3}
                      transition="all 0.2s ease-in-out" _focus={{boxShadow: "outline"}}>
                    <Text fontSize="lg" fontWeight="400" textAlign="center" w="100%">
                        Continue
                    </Text>
                </Flex>

                <Flex w="100%" rounded="full" _hover={hover} _active={{bg: "gray.100"}} bg="transparent" color="black" p={3}
                      transition="all 0.2s ease-in-out" _focus={{boxShadow: "outline"}} onClick={() => {
                    {
                        setMode("login")
                    }
                }} cursor="pointer">
                    <Text fontSize="lg" fontWeight="400" color={color1} textAlign="center" w="100%">
                        Already a user? {" "}
                        <span fontWeight="500" color={bg}>Log in.</span>
                    </Text>
                </Flex>

                <Text fontSize="md" fontWeight="400" color={color2} textAlign="center" w="100%">
                    This platform is only open to partner organizations, for now.
                    If you are interested in joining, please{" "}
                    <Mailto email={"moove-initiative@gmail.com"} subject="Contact MOOVE" body="Hello MOOVE team,">
                        contact us
                    </Mailto>
                    .
                </Text>
            </VStack>
    );
}
