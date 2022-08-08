import { AttachmentIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Stack } from "@chakra-ui/react";


interface Props {
    ingredients: string[];
}

export default function IngredientList({ ingredients }: Props) {

    return (
        <>
            <Stack>
                {ingredients.map((ingredient, index) => (
                    <Box key={index}>
                        <AttachmentIcon /> {ingredient}
                    </Box>
                ))}
            </Stack>
        </>
    )
}