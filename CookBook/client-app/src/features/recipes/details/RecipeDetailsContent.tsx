import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Divider, Flex, HStack, Spacer, Stack, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../../app/api/agent";
import { getTagColor } from "../../../app/common/helpers";
import ModalContainer from "../../../app/common/modals/ModalContainer";
import { RecipeById } from "../../../app/models/recipe";
import IngredientList from "./IngredientList";

interface Props {
    recipe: RecipeById;
}

export default function RecipeDetailsContent({ recipe }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    let navigate = useNavigate();

    const handleDeleteSubmit = () => {
        agent.Recipes.delete(recipe.id).then(() => navigate('/recipes'));
    }

    return (
        <>
            <Stack p='4' h='100%'>
                <Text fontSize='3xl' fontWeight='bold' as='kbd' color='blackAlpha.600'>
                    {recipe.name}
                </Text>
                <Flex>
                    <Spacer />
                    <Box p='1' pl='5'>
                        {recipe && format(new Date(recipe.lastEdit), 'dd MMM yyyy H:mm')}
                    </Box>
                </Flex>
                <HStack>
                    <Divider />
                    <Box p='2'>
                        <Tag variant='outline' colorScheme={getTagColor(recipe.category)} size='lg'>
                            <TagLabel>{recipe.category}</TagLabel>
                        </Tag>
                    </Box>
                    <Divider />
                </HStack>
                <Text color='blackAlpha.800' as='kbd'>
                    {recipe.description}
                </Text>
                <HStack>
                    <IngredientList ingredients={recipe.ingredients} />
                    <Spacer />
                    <Stack h='100%'>
                        <Spacer />
                        <ButtonGroup variant='solid'>
                            <Button
                                colorScheme='blue' as={Link} variant='outline' size='sm'
                                rightIcon={<EditIcon />} to={`/recipes/manage/${recipe.id}`}>
                                Edit
                            </Button>
                            <Button
                                colorScheme='red' variant='outline' size='sm'
                                rightIcon={<DeleteIcon />} onClick={onOpen}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </HStack>
            </Stack>
            <ModalContainer
                header='Delete recipe'
                message="Are you sure? You can't undo this action afterwards."
                submitText='Delete'
                submitColor='red'
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleDeleteSubmit}
            />
        </>
    )
}