import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FormLabel, HStack, Icon, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface Props {
    ingredientAdd: (ingredient: string) => boolean;
    ingredientRemove: (ingredient: string) => void;
    ingredients: string[];
}

export default function IngredientPicker({ ingredientAdd, ingredientRemove, ingredients }: Props) {
    const [ingredientInput, setIngredientInput] = useState<string>('');

    const handleIngredientChange = (e: ChangeEvent<HTMLInputElement>) => setIngredientInput(e.target.value);

    const handleIngredientAdd = () => {
        let isAdded = ingredientAdd(ingredientInput);

        if (isAdded) setIngredientInput('');
    }

    return (
        <>
            <FormLabel>Ingredients</FormLabel>
            <HStack>
                <Input value={ingredientInput} onChange={handleIngredientChange} />
                <AddIcon style={{ cursor: 'pointer' }} onClick={handleIngredientAdd} />
            </HStack>
            {ingredients.map((ingredient, index) => (
                <HStack key={index}>
                    <Text w='100%' bg='whiteAlpha.300' p='1' mt='2' borderRadius='md'>{ingredient}</Text>
                    <Icon as={MinusIcon} onClick={() => ingredientRemove(ingredient)} style={{ cursor: 'pointer' }} />
                </HStack>
            ))}
        </>
    )
}