import { HStack, Spacer, Stack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../../app/models/recipe";
import { format } from 'date-fns';
import { getTagColor } from "../../../app/common/helpers";


interface Props {
    recipe: Recipe;
}

export default function RecipeListItem({ recipe }: Props) {

    const [isHovering, setHovering] = useState<boolean>(false)

    const handleMouseEnter = () => setHovering(true)

    const handleMouseLeave = () => setHovering(false)

    const style = {
        transition: 'all .2s ease-in-out',
        transform: isHovering ? 'scale(1.01)' : 'scale(1)'
    }

    return (
        <>
            <Stack
                as={Link} to={`/recipes/details/${recipe.id}`}
                p='5' w="100%" bg='whiteAlpha.400' borderRadius='lg'
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                style={style}>
                <Text fontSize='large' as='kbd' fontWeight='bold' color='blackAlpha.700'>
                    "{recipe.name.slice(0, 50)}{recipe.name.length > 50 ? "..." : ""}"
                </Text>
                <HStack spacing='2' justifyContent='end'>
                    <Tag variant='outline' colorScheme='gray' size='lg'>
                        <TagLabel>{format(new Date(recipe.lastEdit), 'dd MMM yyyy H:mm')}</TagLabel>
                    </Tag>
                    <Tag variant='outline' colorScheme={getTagColor(recipe.category)} size='lg'>
                        <TagLabel>{recipe.category}</TagLabel>
                    </Tag>
                </HStack>
            </Stack>
        </>
    )
}