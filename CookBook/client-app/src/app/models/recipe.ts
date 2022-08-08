

export interface Recipe {
    id: string;
    name: string;
    lastEdit: Date;
    category: string;
}

export interface RecipeById {
    id: string;
    name: string;
    description: string;
    lastEdit: Date;
    category: string;
    ingredients: string[];
}

export interface RecipeFormValues {
    name: string;
    description: string;
    category: string;
    ingredients: string[];
}