import { Box, SimpleGrid, Text, VStack, Image, Input, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "@/context/AuthContext";
import { uploadFile, getFiles } from "@/helpers/dbOperations";
import useError from "@/context/ErrorContext";


export default function UploadGuidelines() {
    const { currentUser, userData, userRecordsId, setUserData } = useAuth();
    const [progressPercent, setProgressPercent] = useState(0);
    const [dragging, setDragging] = useState(false); // State to manage drag style
    const [email, setEmail] = useState("");
    const { error, setError, setMessages } = useError();
    const messages = [];
    const [pageCount, setPageCount] = useState(0);
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log(currentUser, userData, userRecordsId)
    function handleUpload(eventOrFiles) {
      let files;
      if (eventOrFiles.dataTransfer) {
        eventOrFiles.preventDefault();
        files = eventOrFiles.dataTransfer.files;
      } else if (eventOrFiles.target) {
        eventOrFiles.preventDefault();
        files = eventOrFiles.target.files;
      } else {
        files = eventOrFiles;
      }
      if (!files.length) return;
      const file = files[0];
      uploadFile(
        file,
        currentUser,
        setProgressPercent,
        setError,
        setMessages,
        userRecordsId,
        userData.score,
        setUserData,
        userData
      );
    }
    function handleDragOver(e) {
      e.preventDefault();
      if (!dragging) setDragging(true);
    }
    function handleDragLeave(e) {
      e.preventDefault();
      setDragging(false);
    }
    function handleDrop(e) {
      e.preventDefault();
      setDragging(false);
      handleUpload(e.dataTransfer.files);
    }
    const dropZoneStyle = dragging ? {
      borderColor: 'blue.500',
      bg: 'blue.50'
    } : {};
    const [files, setFiles] = useState([]);
    useEffect(() => {
      async function fetchFiles() {
        if (currentUser) {
          const fetchedFiles = await getFiles(currentUser);
          setFiles(fetchedFiles);
        }
      }
      fetchFiles();
    }, [currentUser]);
    if (!currentUser) {
      return <Box>Loading...</Box>;
    }
    return (
      <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="flex-start" pl="10%" pr="10%" overflowY="auto" pt="10vh" pb="10vh">
        <Text className="header text-black dark:text-gray-300" fontSize={{base: "3xl", md: "5xl"}}>
          Upload guidelines
        </Text>
        <Text className="text-gray-500 dark:text-gray-400" fontWeight="light" mb="2vh" fontSize={{base: "lg", md: "2xl"}}>
          Share your clinical guidelines to expand Meditron&apos;s knowledge
        </Text>
  
        <VStack className="bg-box dark:bg-gray-700" w="100%" h="fit-content" justifyContent="flex-start" alignItems="center" rounded="3xl" shadow="md" p={{base: 4, md: 8}} >
      
          <VStack w="100%" h="fit-content" justifyContent="flex-start" alignItems="center">
        
            <Input type="file" id="fileInput" style={{ display: 'none' }} accept=".pdf,.docx" onChange={handleUpload} />
            <Box
              as="label"
              htmlFor="fileInput"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              w="100%"
              cursor="pointer"
              borderRadius="3xl"
              borderWidth="1px"
              className="bg-box dark:bg-gray-700 hover:bg-slate-100 hover:border-blue-300 dark:hover:bg-gray-500 dark:hover:border-blue-300"
              py={16}
              textColor="slate.500"
              transition="all 0.3s"
              style={dropZoneStyle}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
            <div className="flex flex-col items-center justify-center color-black dark:color-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="48px" height="48px">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>

              <Text fontSize="lg" fontWeight="500" className="text-blue-500 dark:text-blue-300" mb="2">
                Click to browse or drag & drop
              </Text>
              <Text fontSize="xs" className="text-gray-500 dark:text-gray-400">
                PDF only. Max size: 25 MB
              </Text>
            </div>
            <input id="file-input" type="file" className="hidden" />
          </Box>
          <SimpleGrid columns={3} spacing={4} w="100%" minChildWidth="200px" justifyContent="center" pt={files.length > 0 ? "5vh" : "0vh"} h="fit-content">
            {files.length > 0 ? (
              files.map((file, index) => (
                <Box key={index} className="bg-white dark:bg-gray-600 hover:bg-buttons dark:hover:bg-gray-500 text-slate-500 dark:text-gray-300" padding={4} shadow="md" borderWidth="1px" borderRadius="xl" cursor="pointer" transition="background-color 0.2s ease-in-out">
                  <Text fontWeight="bold" className="text-blue-500 dark:text-blue-300">
                    {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                  </Text>
                  <Text fontSize="sm">
                    Size: {file.size}
                  </Text>
                  <Text fontSize="sm">
                    Uploaded: {new Date(file.timestamp).toLocaleDateString("en-US", dateOptions)}
                  </Text>
                </Box>
              ))
            ) : (
              <></>
            )}
          </SimpleGrid>
        </VStack>
      </VStack>
    </VStack>
      
    );
  }