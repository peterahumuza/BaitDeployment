import { Button, HStack, Input, VStack, Text, SimpleGrid, Flex} from "@chakra-ui/react";
import { useState } from 'react';
import Colors from "@/components/contributions/Colors";
import {GridSection, GridElement, GridStyle} from "@/components/content/Grids";
import InfoButton from "@/components/contributions/InfoButton";

export default function Settings() {
  const [temperature, setTemperature] = useState(1);
  const [top_p, setTop_p] = useState(1);
  const [frequency_penalty, setFrequency_penalty] = useState(0);
  const [presence_penalty, setPresence_penalty] = useState(0);

    return (
      <VStack w="100%" h="100%" justifyContent="flex-start" alignItems="center" overflowY="auto" pl="10%" pr="10%" pt="10vh">
        <VStack w="100%" h="fit-content" spacing={"1vw"} alignItems="flex-start" justifyContent="flex-start">
          <Text className="header text-black dark:text-gray-300">
            Settings
          </Text>
          <Text className="text-gray-500 dark:text-gray-400" fontSize="xl" fontWeight="light" mb="2vh">
            Configure your Meditron experience  
          </Text>
        </VStack>

        <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content" minChildWidth="300px">
          <VStack w="100%" h="fit-content" className="bg-box dark:bg-gray-600" textColor={Colors.text} pl="0" pr="0" rounded="3xl" justifyContent="flex-start" alignItems="flex-start" p="5" spacing="4" shadow="md" overflow='visible'>
            <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="0" h="fit-content">
              <Text className="text-blue-700 dark:text-gray-200" fontSize="lg" fontWeight="500" >
                Temperature
              </Text>
              <InfoButton 
                title="Temperature" 
                description="Number between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top p but not both. (Default: 1)"
              />
            </HStack>
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setTemperature(Math.max(0, temperature - 0.1))} disabled={temperature <= 0} fontSize={"xl"} fontWeight="300" color="gray.500">-</Button>
              <Input onChange={(e) => {let val = parseFloat(e.target.value);if (!isNaN(val) && val >= 0 && val <= 2) {setTemperature(val);}}}
                type="number" step="0.1" bg={"white"} max="2" value={Math.round(temperature * 10) / 10} min="0" w="100px" textAlign="center" />
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setTemperature(Math.min(2, temperature + 0.1))} disabled={temperature >= 2}fontSize={"xl"} fontWeight="300" color="gray.500">+</Button>
            </Flex>
          </VStack> 

          <VStack w="100%" h="fit-content" className="bg-box dark:bg-gray-600" textColor={Colors.text} pl="0" pr="0" rounded="3xl" justifyContent="flex-start" alignItems="flex-start" p="5" spacing="4" shadow="md" overflow='visible'>
            <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="0" h="fit-content">
              <Text className="text-blue-700 dark:text-gray-200" fontSize="lg" fontWeight="500" >
                Top p
              </Text>
              <InfoButton
                title="Top p"
                description="Number between 0 and 1. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both. (Default: 1)"
              />
            </HStack>
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setTop_p(Math.max(0, top_p - 0.1))} disabled={top_p <= 0} fontSize={"xl"} fontWeight="300" color="gray.500">-</Button>
              <Input onChange={(e) => {let val = parseFloat(e.target.value);if (!isNaN(val) && val >= 0 && val <= 1) {setTop_p(val);}}}
                type="number" step="0.1" bg={"white"} max="1" value={Math.round(top_p * 10) / 10} min="0" w="100px" textAlign="center" />
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setTop_p(Math.min(1, top_p + 0.1))} disabled={top_p >= 1} fontSize={"xl"} fontWeight="300" color="gray.500">+</Button>
            </Flex>
          </VStack>

          <VStack w="100%" h="fit-content" className="bg-box dark:bg-gray-600" textColor={Colors.text} pl="0" pr="0" rounded="3xl" justifyContent="flex-start" alignItems="flex-start" p="5" spacing="4" shadow="md" overflow='visible'>
            <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="0" h="fit-content">
              <Text className="text-blue-700 dark:text-gray-200" fontSize="lg" fontWeight="500" >
                Frequency penalty
              </Text>
              <InfoButton
                title="Frequency penalty"
                description="Number between -2 and 2. Positive values penalise new tokens based on their existing frequency in the text so far, decreasing the model&apos;s likelihood to repeat the same line verbatim. (Default: 0)"
              />
            </HStack>
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setFrequency_penalty(Math.max(-2, frequency_penalty - 0.1))} disabled={frequency_penalty <= -2} fontSize={"xl"} fontWeight="300" color="gray.500">-</Button>
              <Input onChange={(e) => {let val = parseFloat(e.target.value);if (!isNaN(val) && val >= -2 && val <= 2) {setFrequency_penalty(val);}}}
                type="number" step="0.1" bg={"white"} max="2" value={Math.round(frequency_penalty * 10) / 10} min="-2" w="100px" textAlign="center" />
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setFrequency_penalty(Math.min(2, frequency_penalty + 0.1))} disabled={frequency_penalty >= 2} fontSize={"xl"} fontWeight="300" color="gray.500">+</Button>
            </Flex>
          </VStack>

          <VStack w="100%" h="fit-content" className="bg-box dark:bg-gray-600" textColor={Colors.text} pl="0" pr="0" rounded="3xl" justifyContent="flex-start" alignItems="flex-start" p="5" spacing="4" shadow="md" overflow='visible'>
            <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="0" h="fit-content">
              <Text className="text-blue-700 dark:text-gray-200" fontSize="lg" fontWeight="500" >
                Presence penalty
              </Text>
              <InfoButton
                title="Presence penalty"
                description="Number between -2 and 2. Positive values penalise new tokens based on whether they appear in the text so far, increasing the model&apos;s likelihood to talk about new topics. (Default: 0)"
              />
            </HStack>
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setPresence_penalty(Math.max(-2, presence_penalty - 0.1))} disabled={presence_penalty <= -2} fontSize={"xl"} fontWeight="300" color="gray.500">-</Button>
              <Input onChange={(e) => {let val = parseFloat(e.target.value);if (!isNaN(val) && val >= -2 && val <= 2) {setPresence_penalty(val);}}}
                type="number" step="0.1" bg={"white"} max="2" value={Math.round(presence_penalty * 10) / 10} min="-2" w="100px" textAlign="center" />
              <Button rounded="full" bg={"transparent"} _hover={{ bg: Colors.button_bg }} onClick={() => setPresence_penalty(Math.min(2, presence_penalty + 0.1))} disabled={presence_penalty >= 2} fontSize={"xl"} fontWeight="300" color="gray.500">+</Button>
            </Flex>
          </VStack>
        </SimpleGrid>
      </VStack>
    );
}
