import { ArrowUpRight } from 'lucide-react';
import { useStyleConfig, HStack, Text, Link} from "@chakra-ui/react";

export function DynamicLink ({ href, content, color, fontSize, arrowSize}) {
    const styles = useStyleConfig("HStack", {});

    return (
        <Link href={href} zIndex={2} _hover={{ textDecoration: "none" }}>
            <HStack
                align="flex-start"
                justifyContent="flex-start"
                borderBottom="1px"
                borderColor={color}
                borderStyle="solid"
                position="relative"
                as="a" 
                __css={styles}
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                        ".link-text": {
                            paddingRight: "0.5vw",
                        },
                    },
                    width: "fit-content",
                    minWidth: "min-content",
                    whiteSpace: "nowrap",
                }}
            >
                <Text
                    className="link-text"
                    fontSize={fontSize}
                    fontWeight="normal"
                    textAlign="center"
                    color={color}
                    mr={1}
                    transition="padding-right 0.25s ease-in-out"
                >
                    {content}
                </Text>
                <ArrowUpRight size={arrowSize} color={color} />
            </HStack>
        </Link>
    );
}