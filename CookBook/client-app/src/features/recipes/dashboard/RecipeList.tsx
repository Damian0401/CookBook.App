import { Text, VStack } from "@chakra-ui/react";
import { Recipe } from "../../../app/models/recipe";
import RecipeListItem from "./RecipeListItem";


interface Props {
    recipes: Recipe[];
}

export default function RecipeList({ recipes }: Props) {
    return (
        <>
            <VStack w="full" h="full" p='1'>
                <Text fontSize='x-large' color='blackAlpha.700' as='kbd' textAlign='left' w='100%' p='1'>
                    Total number: {recipes.length}
                </Text>
                {recipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)}
            </VStack>
        </>
    )
}