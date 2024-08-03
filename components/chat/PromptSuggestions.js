import { VStack, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// TODO used for ICRC

const LightBulb = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" class="size-6" opacity="0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
);

const Heart = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6" opacity="0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
);

const Buoy = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6" opacity="0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" />
        </svg>
);

const Search = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6" opacity="0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
);


export default function PromptSuggestions({ handleNewQuestion, messages, setMessages }) {
    // Medical questions. Short are displayed, long are sent to the API
    const suggestions = [
        {
            "short": "Rescue technique for drowning",
            "long": "Give me a step-by-step guide on how to perform CPR on a drowning victim.",
            "icon": Buoy

        },
        {
            "short": "How can Meditron help me?",
            "long": "How can Meditron help me in my clinical practice?",
            "icon": LightBulb
        },
        {
            "short": "Diabetes treatment options",
            "long": "What are the treatment options for diabetes?",
            "icon": Search
        },
        {
            "short": "Common causes of heart attack",
            "long": "What are the commonc causes of a heart attack?",
            "icon": Heart
        },
    ]

    const borderColor = useColorModeValue("gray.100", "gray.500");
    const bg = useColorModeValue("#FAFAFA", "gray.600");
    const color = useColorModeValue("gray.500", "gray.300");
    return (
            <VStack w="fit-content" h="fit-content" justifyContent="flex-start" alignItems="center" pt="5vh">
                <SimpleGrid columns={{base: 2, md: 4}} spacing={4} w="100%" h="fit-content" justifyContent="flex-start" alignItems="flex-start">
                    {suggestions.map((suggestion, index) => {
                        return (
                                <VStack key={index} className="dark:bg-gray-700" border="1px solid" borderColor={borderColor} w="fit-content" justifyContent="space-between"
                                        alignItems="flex-start" p="4" rounded="3xl" cursor="pointer" h="100%" minH="14vh" shadow="md" onClick={() => handleNewQuestion(suggestion.long, messages, setMessages)}
                                        minWidth="120px" maxWidth={{base: "30vw", md: "10vw"}} _hover={{bg: bg}} transition="background-color 0.2s ease-in-out"
                                        overflow="hidden">
                                    {suggestion.icon && <suggestion.icon/>}
                                    <Text fontSize="md" fontWeight="light" textAlign="left" color={color}>
                                        {suggestion.short}
                                    </Text>
                                </VStack>

                        );
                    })}
                </SimpleGrid>
            </VStack>
    );

}