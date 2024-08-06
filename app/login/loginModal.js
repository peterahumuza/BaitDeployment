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
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export default function LoginModal({ isOpen, onOpen, onClose, initialRef, finalRef, title }) {
  const { login } = useAuth();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, setError, setMessages } = useError();
  const [show, setShow] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    // Implement your upload logic here
    console.log(Email, Password);
    try {
      setError(false);
      setLoading(true);
      await login(Email, Password);
    } catch (err) {
      console.log(err);
      setMessages(["Failed to login to your account"]);
      return setError(true);
    }
    setError(false)

    setLoading(false);
    router.push("/chat");
  };


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowClick = () => setShow(!show);

  const handleClose = () => {
    console.log('Closing the modal');
    setEmail('');
    setPassword('');
    setShow(!show);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Enter Email</FormLabel>
            <Input ref={initialRef} value={Email} onChange={handleEmailChange} placeholder='Enter Email' />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Password</FormLabel>
            <InputGroup size='md'>
              <Input
                value={Password}
                onChange={handlePasswordChange}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>
            Login
          </Button>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
