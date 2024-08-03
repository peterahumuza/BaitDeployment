import React, { useState, useRef } from 'react';
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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import createStudent from '@/helpers/dbStudentOperations';


export default function ModifyStudent({ isOpen, onOpen, onClose, initialRef, finalRef, title }) {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading:', selectedFile);
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleShowClick = () => setShow(!show);

  const handleModifyStudent = async () => {
    // console.log('Modify student');
    const student = {
      FirstName,
      LastName,
      Email,
      Phone,
      Password,
      isStudent: true,
    };
    await createStudent(student);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setPreview(null);
    setShow(!show);
    onClose(student);
  }

  const handleClose = () => {
    console.log('Closing the modal');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setPreview(null);
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
      <ModalContent maxW="50%">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input type="file" accept="image/*" onChange={handleFileChange} display="none" ref={fileInputRef} />
          </FormControl>
          {preview && (
            <Box mb={4} textAlign="center">
              <Image src={preview} alt="Image Preview" borderRadius='full' boxSize="150px" objectFit="cover" />
            </Box>
          )}
          <Button colorScheme="blue" size='sm' mb={4} onClick={() => fileInputRef.current.click()}>
            Select Photo
          </Button>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input ref={initialRef} value={FirstName} onChange={handleFirstNameChange} placeholder='First name' />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input value={LastName} onChange={handleLastNameChange} placeholder='Last name' />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={Email} onChange={handleEmailChange} placeholder='Email' />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input value={Phone} onChange={handlePhoneChange} placeholder='Phone' />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
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
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Re-enter Password</FormLabel>
                <Input
                  value={ConfirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type={show ? 'text' : 'password'}
                  placeholder='Confirm password'
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleModifyStudent}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
