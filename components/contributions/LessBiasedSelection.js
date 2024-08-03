import { HStack, VStack, Text } from "@chakra-ui/layout";
import { Select } from "chakra-react-select";
import { useState } from 'react';
import InfoButton from "@/components/contributions/InfoButton";

  
export default function LessBiasedSelection({handleChange, tags}) {
    const [currentTags, setCurrentTags] = useState(tags);
    function onChange (ev) {
      setCurrentTags(ev);
      handleChange(ev);
    }
    
    const tagOptions = [
      { label: "Evidenced-based reasoning", value: "Evidenced-based reasoning", colorScheme: "red" },
      { label: "Ethical considerations", value: "Ethical considerations", colorScheme: "red" },
      { label: "Cultural sensitivity", value: "Cultural sensitivity", colorScheme: "red" },
      { label: "Avoids stereotypes", value: "Avoids stereotypes", colorScheme: "red" },
      { label: "Acknowledges limitations", value: "Acknowledges limitations", colorScheme: "red" },
      { label: "Patient-centered approach", value: "Patient-centered approach", colorScheme: "red" },
    ];
  
    return (
      <VStack w="100%" justifyContent="flex-start" alignItems="flex-start" spacing="4" h="fit-content" className="bg-box dark:bg-gray-700 color-white dark:color-dark" p="5" rounded="2vw" shadow="md">
        <HStack w="100%" justifyContent="flex-end" alignItems="center" h="100%">
          {/* <UserLogo /> */}
          <Text  w="100%" fontWeight="400" textAlign="left">
            Why is this answer less biased?
          </Text>
          <InfoButton 
            title="Select tags for worse answer"
            description="Select the tag(s) that best describe why this answer is less biased than the other one."
            />
        </HStack>
        <Select colorScheme="red" variant="filled" placeholder="Select tags" isClearable={false} borderRadius="full" tagVariant="solid" chakraStyles={{container: (provided) => ({...provided, width: "100%"})}} onChange={ ev => onChange(ev)} useBasicStyles={true} isMulti options={tagOptions} value={currentTags} />
      </VStack>
    );
  }