import React, { useState, useRef } from 'react';
import useAuth from "../../context/AuthContext";
import useError from "../../context/ErrorContext";
import { useRouter } from "next/navigation";
// import Link from 'next/link';
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  useColorModeValue,
  InputLeftElement,
  useDisclosure,
  Checkbox,
  Link
} from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone } from 'react-icons/fa';
import createStudent from '@/helpers/dbStudentOperations';

export default function SignUpModal({ isOpen, onOpen, onClose, initialRef, finalRef, title }) {
  const { signup, login } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, setError, setMessages } = useError();
  const [show, setShow] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  async function handleSignUp(e) {
    e.preventDefault();
    if (!agreedToTerms) {
      setMessages(["You must agree to the Terms of Use to sign up."]);
      setError(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessages(["Passwords do not match"]);
      setError(true);
      return;
    }
    try {
      setError(false);
      setLoading(true);
      const newUser = await signup(email, password);
      const student = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        IsStudent: true,
        userId: newUser.user.uid
      };
      await createStudent(student);
      setLoading(false);
      router.push("/chat");
    } catch (err) {
      console.log(err);
      setMessages(["Failed to create account"]);
      setError(true);
      setLoading(false);
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      await login(email, password);
      setLoading(false);
      router.push("/chat");
    } catch (err) {
      console.log(err);
      setMessages(["Failed to login to your account"]);
      setError(true);
      setLoading(false);
    }
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleShowClick = () => setShow(!show);
  const handleAgreeToTerms = (e) => setAgreedToTerms(e.target.checked);

  const handleSwitchToLogin = () => {
    onClose();
    onLoginOpen();
  };

  const handleSwitchToSignUp = () => {
    onLoginClose();
    onOpen();
  };


  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg={bgColor} borderRadius="xl" boxShadow="xl">
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color={textColor}>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Image src="\assets\logos\bait.png" alt="MOOVE4BAIT Logo" className="w-auto h-auto max-w-[150px] max-h-[150px] mx-auto"
  style={{ objectFit: 'contain' }} />
              <FormControl>
                <FormLabel color={textColor}>First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaUser color="gray.300" />} />
                  <Input
                    ref={initialRef}
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder='Enter your first name'
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaUser color="gray.300" />} />
                  <Input
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder='Enter your last name'
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                  <Input
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Enter your email'
                    type="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Phone</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaPhone color="gray.300" />} />
                  <Input
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder='Enter your phone number'
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                  <Input
                    value={password}
                    onChange={handlePasswordChange}
                    type={show ? 'text' : 'password'}
                    placeholder='Enter your password'
                  />
                  <InputRightElement width="3rem">
                    <Button h="1.5rem" size="sm" onClick={handleShowClick} variant="ghost">
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                  <Input
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    type={show ? 'text' : 'password'}
                    placeholder='Confirm your password'
                  />
                </InputGroup>
              </FormControl>
              <Checkbox isChecked={agreedToTerms} onChange={handleAgreeToTerms}>
                I agree to the {' '}
                <Link href="/TermsOfUse" 
                isExternal
                  color="blue.500"
                  textDecoration="underline">
                  {/* <Text as="span" color="blue.500" textDecoration="underline" cursor="pointer"> */}
                    Terms of Use
                  {/* </Text> */}
                </Link>
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter flexDirection="column" alignItems="stretch">
            <Button
              colorScheme="blue"
              onClick={handleSignUp}
              isLoading={loading}
              loadingText="Signing up..."
              width="100%"
              mb={3}
              isDisabled={!agreedToTerms}
            >
              Sign Up
            </Button>
            <Text fontSize="sm" textAlign="center" color={textColor}>
              Already have an account?{' '}
              <Button variant="link" colorScheme="blue" onClick={handleSwitchToLogin}>
                Log in
              </Button>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        size="md"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg={bgColor} borderRadius="xl" boxShadow="xl">
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color={textColor}>
            Log In
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Image src="\assets\logos\bait.png" alt="MOOVE4BAIT Logo" className="w-auto h-auto max-w-[150px] max-h-[150px] mx-auto"
  style={{ objectFit: 'contain' }} />
              <FormControl>
                <FormLabel color={textColor}>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                  <Input
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Enter your email'
                    type="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                  <Input
                    value={password}
                    onChange={handlePasswordChange}
                    type={show ? 'text' : 'password'}
                    placeholder='Enter your password'
                  />
                  <InputRightElement width="3rem">
                    <Button h="1.5rem" size="sm" onClick={handleShowClick} variant="ghost">
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter flexDirection="column" alignItems="stretch">
            <Button
              colorScheme="blue"
              onClick={handleLogin}
              isLoading={loading}
              loadingText="Logging in..."
              width="100%"
              mb={3}
            >
              Log In
            </Button>
            <Text fontSize="sm" textAlign="center" color={textColor}>
              Don't have an account?{' '}
              <Button variant="link" colorScheme="blue" onClick={handleSwitchToSignUp}>
                Sign up
              </Button>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Terms of Use Modal */}
      {/* <Modal isOpen={isTermsOpen} onClose={onTermsClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms of Use</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              By using MOOVE4BAIT, you agree to abide by our terms and conditions. These include:

              1. Respecting intellectual property rights
              2. Maintaining the confidentiality of your account
              3. Using the platform responsibly and ethically
              4. Not engaging in any activities that may disrupt or interfere with the service
              5. Complying with all applicable laws and regulations

              We reserve the right to terminate accounts that violate these terms. For the full Terms of Use, please visit our website.

              By checking the box, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onTermsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
}