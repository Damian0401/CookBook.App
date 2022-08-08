import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Recipe, RecipeById, RecipeFormValues } from "../models/recipe";


axios.defaults.baseURL = 'https://localhost:7247';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const showErrors = (data: any) => {
    if (!data.errors) return;
    for (const key in data.errors) {
        console.log(data.errors[key]);
        if (data.errors[key]){
            toast.error(data.errors[key]);
        }
    }
}

axios.interceptors.response.use(response => response, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 0:
            history.push('/');
            toast.error('Network error');
        break;
        case 400:
            showErrors(data);
            break;
        case 404:
            history.push('/recipes/notfound');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Recipes = {
    list: () => requests.get<Recipe[]>('/recipe'),
    details: (id: string) => requests.get<RecipeById>(`/recipe/${id}`),
    create: (recipe: RecipeFormValues) => requests.post<void>('/recipe', recipe),
    update: (id: string, recipe: RecipeFormValues) => requests.put<void>(`/recipe/${id}`, recipe),
    delete: (id: string) => requests.delete<void>(`/recipe/${id}`)
}

const agent = {
    Recipes
}

export default agent;