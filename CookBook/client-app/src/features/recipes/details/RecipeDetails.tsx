import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import agent from "../../../app/api/agent";
import { RecipeById } from "../../../app/models/recipe";
import RecipeDetailsContent from "./RecipeDetailsContent";


export default function RecipeDetails() {

    const [recipe, setRecipe] = useState<RecipeById>();
    
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        agent.Recipes.details(id!).then((response) => {

            setRecipe(response);
        });
    }, [id, navigate])


    return (
        <>
            <Grid templateColumns='repeat(4, 1fr)' m='10'>
                <GridItem w='100%' colStart={2} colEnd={4} borderRadius='lg' bg='whiteAlpha.400'>
                    <Flex>
                        <Spacer />
                        <Button variant='ghost' colorScheme='red' size='xs' as={Link} to='/recipes'>
                            <CloseIcon />
                        </Button>
                    </Flex>
                    {recipe && <RecipeDetailsContent recipe={recipe} />}
                </GridItem>
            </Grid>
        </>
    )
}