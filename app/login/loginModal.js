import React, { useState } from 'react';
import useAuth from "../../context/AuthContext";
import useError from "../../context/ErrorContext";
import { useRouter } from "next/navigation";
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
} from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import SignUpModal from '@/app/login/moove4bait-signup';
import MOOVELandingPage from "@/app/landingpage/MOOVELandingPage";

export default function LoginModal({ isOpen, onSignUpOpen, onClose, initialRef, finalRef, title }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setError, setMessages } = useError();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  async function handleSubmit(e) {
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

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowClick = () => setShow(!show);
  
  const handleSwitchToSignUp = () => {
    onClose();  
    onSignUpOpen();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onSignUpOpen={onSignUpOpen}
      onClose={onClose}
      // onOpen={onSignUpOpen}
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
            <Image src="/assets/logos/bait.png" alt="MOOVE4BAIT Logo" className="w-auto h-auto max-w-[150px] max-h-[150px] mx-auto"
  style={{ objectFit: 'contain' }} />
            <FormControl>
              <FormLabel color={textColor}>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                <Input
                  ref={initialRef}
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
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Logging in..."
            width="100%"
            mb={3}
          >
            Login
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
  );
}
