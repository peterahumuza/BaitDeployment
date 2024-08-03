import {GridSection, GridElement, GridStyle} from "@/components/content/Grids";
import Colors from "@/components/Colors";
import {Text, VStack, Box, Flex} from "@chakra-ui/react";
import ScoringSystem from "@/components/contributions/ScoringSystem";

const lineStyle = {
    borderWidth : "3px",
    borderColor: "black",
    borderStyle: "solid",
  };

  
const Explanation = () => {

    // Width and height of the bubbles: 60px for large, 40px for small. Make it responsive with md and base
    const bubbleSize = {base: "40px", md: "60px"};

    return (
      <Box bgColor="black" w="100%" h="fit-content" position="relative" zIndex={2}>
        <Box w="100%" h="fit-content" position="relative" maxWidth="1400px" mx="auto" zIndex={2}>
        
        {/* Header for large screens */}
        <GridSection position="sticky" top="0" textColor={"gray.50"} spacing={0}  gap={0} columnGap={GridStyle.gutter} pb="0vh" pt={{base:"0vh", md:"20vh"}} mb="0" justifyContent="flex-end" alignItems="flex-end" zIndex="3" px={{base: "50px", md: GridStyle.pageMargin}}>
            <GridElement cols={4} p={0} colStart={9} rowStart={8} justifyContent="flex-end" display={{base: "none", md: "flex"}} pt="0vh" pb="10vh">
              <VStack h="fit-content" w="100%" spacing={"2vh"} alignItems="flex-start"  justifyContent="flex-start" pb="10vh">
                <Text className="label">
                  Contributions
                </Text>
                <Text className="intro">
                Interact with AI to <span style={{color: Colors.highlight}}>earn points</span>.
                </Text>
              </VStack>
            </GridElement>
          </GridSection>

        {/* Contributions explanations */}
        <GridSection pl={{base:"40px", md:GridStyle.pageMargin}} px={{base: "0", md: GridStyle.pageMargin}} textColor={"gray.50"} spacing={0} gap={0} columnGap={GridStyle.gutter} pb="0" pt="0vh" mb="0" justifyContent="flex-end" alignItems="flex-end" position="relative" mt={{base: "20vh", md:"-30vh"}}>
          
          <GridElement id="block1" w="100%" h="90%" minHeight="30vh" p={0} rowStart={1} colStart={2} colEnd={{base:10, md:8}} borderRight={lineStyle.borderWidth} borderBottom={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0 0 2vw 0" alignItems="flex-end">
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box bgColor={Colors.line} borderRadius="50%" position="absolute" top = "0" right = "0" transform="translate(50%, 0%)" bgImage="url('/assets/icons/blackcircle.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%" w={bubbleSize} h={bubbleSize}/>
            </Flex>
          </GridElement>

          {/* Header for small screens */}
          <GridElement id="block1b" h="90%" minHeight="30vh" cols={{base:7, md:5}} p={0} rowStart={1}  colStart={2} alignItems="flex-end">
            <VStack h="fit-content" w="100%" spacing={"2vh"} alignItems="flex-start" justifyContent="flex-start" display={{base: "flex", md: "none"}}>
              <Text className="label" >
                Contributions
              </Text>
              <Text className="intro">
                Interact with AI to <span style={{color: Colors.highlight}}>earn points</span>.
              </Text>
            </VStack>
          </GridElement>

          <GridElement h="20vh" cols={3} p={0} rowStart={2} colStart={1} borderLeft={lineStyle.borderWidth} borderTop={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="2vw 0 0 0"marginTop={`-${lineStyle.borderWidth}`}/>
          
          <GridElement h="50vh" bgColor="transparent" cols={2} p={0} rowStart={4} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0">
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/challenge.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%" w={bubbleSize} h={bubbleSize}/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={4} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Challenge AI with tough questions.
              </Text>
              <Text className="body w-full">
                To ensure Meditron&apos;s robustness, draw on your expertise 
                to probe the model with challenging questions relevant to your specialty.
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                  + {ScoringSystem.pointsPerQuestion} points
                </Text>
              </Box>
            </VStack>
          </GridElement>


          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={5} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`}>
          <Flex w="100%" h="full" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "15px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/evaluate.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={5} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="fit-content" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Rank Meditron&apos;s answers.
              </Text>
              <Text className="body w-full">
                Compare the quality of two Meditron answers to your questions. 
                Identify red flags, mistakes, ethical issues, potential harm, bias and poor contextual alignment. 
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                  + {ScoringSystem.pointsPerEval} points
                </Text>
              </Box>
            </VStack>
          </GridElement>

          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={6} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`}>
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "15px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/align.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={6} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="fit-content" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Align answers to your standards.
              </Text>
              <Text className="body w-full">
                Improve and rewrite an AI-generated answer to align it to your standards and context.
              </Text>

              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                  + {ScoringSystem.pointsPerAnswer} points
                </Text>
              </Box>
            </VStack>
          </GridElement>


          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={7} colStart={1} borderLeft={lineStyle.borderWidth} borderBottom={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`} borderRadius="0 0 0 2vw">
          <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, 0%)" bgImage="url('/assets/icons/aim.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={7} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Share your clinical practice guidelines.
              </Text>
              <Text className="body w-full">
              Meditron is already aware of open clinical guidelines, but vast amounts of guidelines remain inaccessible.
              Share your own guidelines so that we can build them into Meditron.
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full" py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                  + {ScoringSystem.pointsPerPage} point / page
                </Text>
              </Box>
            </VStack>
          </GridElement>
          <GridElement h="50vh" bgColor="transparent" p={0} rowStart={8} colStart={2} colEnd={{base:10, md:8}} borderTop={lineStyle.borderWidth} borderRight={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0 2vw 0 0" marginTop={`-${lineStyle.borderWidth}`} position="relative">

          </GridElement>

        </GridSection>
        </Box>

        <Box w="100%" h="fit-content" position="relative" maxWidth="1400px" mx="auto" zIndex={2}>

        {/* Second header for large screens */}
        <GridSection pl={{base:"40px", md:GridStyle.pageMargin}} px={{base: "0", md: GridStyle.pageMargin}} position="sticky" top="20vh" textColor={"gray.50"} spacing={0}  gap={0} columnGap={GridStyle.gutter} pb="0" pt="0vh" mb="0" justifyContent="flex-end" alignItems="flex-end" zIndex="3">
          <GridElement cols={4} p={0} colStart={9} rowStart={8} justifyContent="flex-start" pt="0vh" pb="10vh" display={{base: "none", md: "flex"}}>
            <VStack h="fit-content" w="100%" spacing={"2vh"} alignItems="flex-start"  justifyContent="flex-start">
              <Text className="label">
                Rewards
              </Text>
              <Text className="intro">
                Obtain <span style={{color: Colors.highlight}}>rewards</span> as you engage.
              </Text>
            </VStack>
          </GridElement>
        </GridSection>

        <GridSection pl={{base:"40px", md:GridStyle.pageMargin}} px={{base: "0", md: GridStyle.pageMargin}} textColor={"gray.50"} spacing={0} gap={0} columnGap={GridStyle.gutter} pb="0" pt="0vh" mb="0" justifyContent="flex-end" alignItems="flex-end" position="relative" mt="-60vh">

          <GridElement h="60vh" bgColor="transparent" p={0} rowStart={9} colStart={{base:3, md:2}} colEnd={{base:10, md:8}} borderBottom={lineStyle.borderWidth} borderRight={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0 0 2vw 0" marginTop={`-${lineStyle.borderWidth}`} mt="-10vh">
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "30%" right = "0" transform="translate(50%, 8%)" bgImage="url('/assets/icons/blackcircle.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="60vh" bgColor="transparent" p={0} rowStart={9} colStart={{base:2, md:2}} colEnd={{base:10, md:8}} borderBottom={lineStyle.borderWidth} borderRight={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0 0 2vw 0" marginTop={`-${lineStyle.borderWidth}`} mt="20vh">
            <VStack h="fit-content" w="100%" spacing={"2vh"} alignItems="flex-start"  justifyContent="flex-start" display={{base: "flex", md: "none"}} pt="12vh" pr="10">
              <Text className="label">
                Rewards
              </Text>
              <Text className="intro">
                Obtain <span style={{color: Colors.highlight}}>rewards</span> as you engage.
              </Text>
            </VStack>
          </GridElement>

          
          <GridElement h="20vh" cols={3} p={0} rowStart={10} colStart={1} borderLeft={lineStyle.borderWidth} borderTop={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="2vw 0 0 0"marginTop={`-${lineStyle.borderWidth}`}/>
      
          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={12} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0">
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/research.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>


          <GridElement h="100%" p={0} rowStart={12} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Gather research insights
              </Text>
              <Text className="body w-full">
                Receive detailed reports on your evaluation results. 
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                    {ScoringSystem.reportGoal} points
                </Text>
              </Box>
            </VStack>
          </GridElement>

          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={13} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`}>
          <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/coauthor.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={13} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Become a co-author
              </Text>
              <Text className="body w-full">
                Once your individual contribution reaches 1000 points, 
                you will be included as part of a clinical author group for all subsequent Meditron publications.
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                    1,000 points
                </Text>
              </Box>
            </VStack>
          </GridElement>
          
          <GridElement h="100%" bgColor="transparent" cols={2} p={0} rowStart={14} colStart={1} borderLeft={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`}>
          <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/meditron.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={14} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between" spacing={4} pb={16}>
              <Text className="subheader w-full">
                Get a customized Meditron model
              </Text>
              <Text className="body w-full">
                Recruit doctors from your institution to help you! 
                Once your organization’s collective contribution reaches 10,000 points, 
                we will fine-tune a Meditron model tailored to your organization, for free. 
              </Text>
              <Box w="fit-content" h="fit-content" bgColor={Colors.bg} textColor={Colors.highlight} rounded="full"  py={2} px={4} justifyContent="center" alignItems="center">
                <Text className="tablebold w-full">
                    10,000 points
                </Text>
              </Box>
            </VStack>
          </GridElement>

          <GridElement h="50vh" bgColor="transparent" cols={2} p={0} rowStart={15} colStart={1} borderLeft={lineStyle.borderWidth} borderBottom={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid"  marginTop={`-${lineStyle.borderWidth}`} borderRadius="0 0 0 2vw">
            <Flex w="100%" h="100%" position="relative" bgColor="transparent">
              <Box w={bubbleSize} h={bubbleSize} bgColor={Colors.line} borderRadius="50%" position="absolute" top = "12px" left = "-2px" transform="translate(-50%, -25%)" bgImage="url('/assets/icons/medicine.svg')" bgSize="60%" bgRepeat="no-repeat" bgPosition="50% 50%"/>
            </Flex>
          </GridElement>

          <GridElement h="100%" p={0} rowStart={15} colStart={{base:3, md:2}} colEnd={{base:12, md:8}} justifyContent="flex-start" alignItems="flex-start">
            <VStack h="100%" w="100%" justifyContent = "flex-start" alignItems="space-between"  spacing={4} pb={16}>
              <Text className="subheader w-full">
                Advance medicine for the benefit of all
              </Text>
              <Text className="body w-full">
                Help bring AI one step closer to real-world deployment. 
                Low-resource countries are those that might benefit most from automated clinical support.
              </Text>
            </VStack>
          </GridElement>


          <GridElement h="20vh" bgColor="transparent" cols={5} p={0} rowStart={16} colEnd={7}  borderTop={lineStyle.borderWidth} borderRight={lineStyle.borderWidth} borderColor={Colors.line} borderStyle="solid" borderRadius="0 2vw 0 0" marginTop={`-${lineStyle.borderWidth}`}/>

          </GridSection>
        </Box>
      </Box>
    );
  }


export default Explanation;
