import Link from "next/link";
import {GridStyle} from "@/components/content/Grids";
import {Box, Text, Image, VStack, HStack, SimpleGrid} from "@chakra-ui/react";

const mooveEmail = "moove-initiative@gmail.com";

export default function Footer( ) {
    const Mailto = ({ email, subject, body, children }) => {
      return (
        <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
      );
    };

    return (
      <VStack bg="black" textColor="white" pb="10vh" pt={{base: 16, md:"20vh"}} w="100%" h="100vh" zIndex={10000} px={GridStyle.pageMargin} spacing="4" justifyContent="flex-start" alignItems="flex-start">
        
        {/* Logo and motto */}
        <HStack w="100%" h="fit-content" spacing={{base:8, md:16}} justifyContent="flex-start" alignItems="flex-start" p={0} pb={"10vh"}>
          <Image src="/assets/logos/ICON_MOOVE_W.svg" alt="Moove Logo" width="20vw" height="100px" />
          <VStack w="fit-content" h="fit-content" spacing={{base:2, md:4}} justifyContent="flex-start" alignItems="flex-start">
            <Image src="/assets/logos/MOOVE_W.svg" alt="Moove Logo" width="40vw" height="100px" />
            <Text className="intro" mt="2vh" fontWeight="light">
              Health for all, with AI. 
            </Text>
          </VStack>
        </HStack>

        <SimpleGrid columns={[2, null, 4]} spacing="8" w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start" p={0} pb={16}>
          <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
            <Text className="subheader">
              Platform
            </Text>
            <Link href="/contribute" passHref>
              <Text className="body">
                Contribute
              </Text>
            </Link>
            <Mailto email={mooveEmail} subject="Enroll my organization" body="
              Hello MOOVE team," >
              <Text className="body">
                Enroll your organization
              </Text>
            </Mailto>
          </VStack>

          <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
            <Text className="subheader">
              Meditron
            </Text>
            <Link href="https://huggingface.co/epfl-llm">
              <Text className="body">
                Download models
              </Text>
            </Link>
            <Link href="https://www.researchgate.net/publication/379556481_MEDITRON_Open_Medical_Foundation_Models_Adapted_for_Clinical_Practice">
              <Text className="body">
                Pre-print
              </Text>
            </Link>
            <Link href="https://arxiv.org/abs/2311.16079">
              <Text className="body">
                Technical report
              </Text>
            </Link>
          </VStack>

          <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
            <Text className="subheader">
              About
            </Text>
            <Link href="/news" passHref>
              <Text className="body">
                News
              </Text>
            </Link>
            {/* 
            <Link href="/privacy" passHref>
              <Text className="body">
                Privacy policy
              </Text>
            </Link>
            <Link href="/terms" passHref>
              <Text className="body">
                Terms of use
              </Text>
            </Link>
          */}
          </VStack>

          <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
            <Text className="subheader">
              Contact
            </Text>
            <Mailto email={mooveEmail} subject="Contact MOOVE" body="Hello MOOVE team," >
              <Text className="body">
                Email us
              </Text>
            </Mailto>
          </VStack>
        </SimpleGrid>

      <Box w="100%" h="1px" bgColor="white"/>

      <Text w="100%" h="fit-content" fontSize="md" fontWeight="normal" textAlign={{base: "left", md: "right"}}>
        © MOOVE 2024
      </Text>
    </VStack>
    );
  }
  