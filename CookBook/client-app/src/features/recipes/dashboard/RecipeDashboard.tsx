import { Grid, GridItem } from "@chakra-ui/react"
import { format } from "date-fns";
import {  useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import { Recipe } from "../../../app/models/recipe"
import RecipeFilters from "./RecipeFilters"
import RecipeList from "./RecipeList"


export default function RecipeDashboard() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        agent.Recipes.list().then(response => {
            setRecipes(response);
        });
    }, []);

    const sortRecipesByName = () => {
        let sortedRecipes = [...recipes].sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        setRecipes(sortedRecipes);
    }

    const sortRecipesByNewest = () => {
        let sortedRecipes = [...recipes].sort((a, b) => new Date(b.lastEdit).getTime() - new Date(a.lastEdit).getTime());
        setRecipes(sortedRecipes);
    }
    
    const sortRecipesByOldest = () => {
        let sortedRecipes = [...recipes].sort((a, b) => new Date(a.lastEdit).getTime() - new Date(b.lastEdit).getTime());
        setRecipes(sortedRecipes);
    }


    return (
        <>
            <Grid templateColumns='repeat(4, 1fr)' gap={6} m='10'>
                <RecipeFilters 
                    sortByName={sortRecipesByName}
                    sortByNewest={sortRecipesByNewest}
                    sortByOldest={sortRecipesByOldest} 
                />
                <GridItem w='100%' colSpan={2} rowSpan={2}>
                    <RecipeList recipes={recipes} />
                </GridItem>
            </Grid>
        </>
    )
}