
import { Box, Text, VStack, GridItem, Grid, useColorModeValue} from '@chakra-ui/react';
import { useState } from 'react';
import Link from "next/link";
import {GridSection, GridElement, GridStyle} from "@/components/content/Grids";
import Colors from "@/components/Colors";


const GooeyBanner = ({currentUser}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GridSection textColor={Colors.banner_text} py={{base: "10vh", md: "20vh"}} >
      <GridItem colSpan={12} colStart={0} p={0} justifyContent="center" alignItems="flex-start" h="fit-content">
        <Link href={currentUser ? "/chat" : "/login"}>
        <Box
          w="100%"
          h={{base: "40vh", md: "50vh"}}
          direction="column"
          textColor={Colors.banner_text}
          justifyContent="center"
          alignItems="center"
          position="relative"
          rounded="3xl"
          shadow="md"
          overflow="hidden"
          border={useColorModeValue("none", "1px solid")}
          cursor="pointer"
          bgColor={Colors.banner_bg}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            position = "absolute"
            top="0"
            right="0"
            w="100%"
            h="100%"
            bgImage="url('/assets/icons/gooey_banner.svg')"
            bgRepeat="no-repeat"
            justifyContent="center"
            alignItems="center"
            rounded="3xl"
            bgPosition={isHovered ? "10% 60%" : "25% 60%"}
            pl="4vw"
            bgSize={isHovered ? "220% 100%" : "200% 100%"}
            transition="all 0.5s"
            bgBlendMode="multiply"
            textColor={Colors.banner_bg}
            zIndex="0"
            >
          </Box>
          <VStack zIndex="2" position="relative" w="100%" h="100%" justifyContent="center" alignItems="flex-start" p="4vw">
            <Text className="body" w="100%">
                Ready to make a difference?
            </Text>
            <Text className="subheader" w="100%" >
                Contribute now.
            </Text>
            </VStack>
        </Box>
        </Link>
      </GridItem>
    </GridSection>
  );
};

export default GooeyBanner;