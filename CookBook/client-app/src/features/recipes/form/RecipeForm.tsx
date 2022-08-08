import { Box, Button, Container, FormControl, FormLabel, Input, Textarea, ButtonGroup, Flex, Spacer, FormErrorMessage, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeFormValues } from "../../../app/models/recipe";
import ResizeTextarea from "react-textarea-autosize";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import IngredientPicker from "./IngredientPicker";
import agent from "../../../app/api/agent";

interface Errors {
    name?: string;
    description?: string;
    category?: string;
    isInvalid: boolean;
}

export default function RecipeForm() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<RecipeFormValues>({
        name: '',
        description: '',
        category: '',
        ingredients: []
    });

    const [errors, setErros] = useState<Errors>({
        isInvalid: true
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    const handleCancel = () => {
        if (id) navigate(`/recipes/details/${id}`);

        if (!id) navigate('/recipes');
    }

    const handleSubmit = () => {
        let newErrors: Errors = {
            isInvalid: false
        }
        if (recipe.name === '') {
            newErrors.name = 'Name is required.';
            newErrors.isInvalid = true;
        }
        if (recipe.description === '') {
            newErrors.description = 'Description is required.';
            newErrors.isInvalid = true;
        }
        if (recipe.category === '') {
            newErrors.category = 'Category is required.';
            newErrors.isInvalid = true;
        }

        setErros(newErrors);
    }

    const handleIngrendientAdd = (ingredient: string) => {
        if (ingredient === '' || recipe.ingredients.includes(ingredient))
            return false;

        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
        return true;
    }

    const handleIngredientRemove = (ingredient: string) => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients.filter(x => x !== ingredient)] })
    }

    useEffect(() => {
        if (id) {
            agent.Recipes.details(id!).then((response) => {

                setRecipe(response);
            }).catch(() => navigate('/recipes/notfound'));
        } else {
            setRecipe({
                name: '',
                description: '',
                category: '',
                ingredients: []
            });
        }
    }, [id, navigate])

    useEffect(() => {
        if (errors.isInvalid) return;

        if (id) agent.Recipes.update(id, recipe).then(() => navigate('/recipes'));

        if (!id) agent.Recipes.create(recipe).then(() => navigate('/recipes'));

    }, [errors, id, recipe, navigate])


    return (
        <>
            <Container p='0' maxW='lg' bg='whiteAlpha.400' mt='4' borderRadius='lg' color='blackAlpha.700'>
                <Flex>
                    <Spacer />
                    <Button variant='ghost' colorScheme='red' size='xs' onClick={handleCancel}>
                        <CloseIcon />
                    </Button>
                </Flex>
                <Box p='6' pt='2'>
                    <FormControl isRequired isInvalid>
                        <FormLabel>Name</FormLabel>
                        <Input name='name' isInvalid={!!errors.name} onChange={handleInput} value={recipe.name} autoComplete='off' />
                        {errors.name && <FormErrorMessage>Name is required.</FormErrorMessage>}
                        <FormLabel>Description</FormLabel>
                        <Textarea name='description' isInvalid={!!errors.description} onChange={handleInput} value={recipe.description} resize='none' as={ResizeTextarea} />
                        {errors.description && <FormErrorMessage>Description is required.</FormErrorMessage>}
                        <FormLabel>Category</FormLabel>
                        <Input name='category' isInvalid={!!errors.category} onChange={handleInput} value={recipe.category} autoComplete='off' />
                        {errors.category && <FormErrorMessage>Category is required.</FormErrorMessage>}
                    </FormControl>
                    <IngredientPicker ingredientAdd={handleIngrendientAdd} ingredientRemove={handleIngredientRemove} ingredients={recipe.ingredients} />
                    <ButtonGroup variant='outline' size='sm' pt='2' w='100%' justifyContent='end'>
                        <Button rightIcon={<CheckIcon />} colorScheme='blue' onClick={handleSubmit}>Submit</Button>
                        <Button colorScheme='red' onClick={handleCancel}>Cancel</Button>
                    </ButtonGroup>
                </Box>
            </Container>
        </>
    )
}