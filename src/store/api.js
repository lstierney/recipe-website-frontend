import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getAuthToken} from "../utils/auth";
import {toastUtils} from "../utils/toast-utils";

async function handleQueryLifeCycle(queryFulfilled, loadingMsg, errorMsg) {
    const toast = toastUtils();
    toast.loading(loadingMsg);
    try {
        await queryFulfilled;
        toast.dismiss();
    } catch (err) {
        toast.error("Failed to " + errorMsg);
    }
}

async function handleMutationLifeCycle(queryFulfilled, initialMsg, successMsg, errorMsg) {
    const toast = toastUtils();
    toast.loading(initialMsg);
    try {
        await queryFulfilled;
        toast.success(successMsg);
    } catch (err) {
        toast.error("Failed to " + errorMsg);
    }
}

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getAuthToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },

    }),

    tagTypes: ['Tags', 'Units', 'Recipes', 'Crockery'],

    endpoints: (builder) => ({
        getRecipesByTag: builder.query({
            query: tagNames => '/recipes?tagNames=' + tagNames.join(','),
            async onQueryStarted(tagNames, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Recipes for Tag: " + tagNames, "get Recipes for Tag: " + tagNames);
            }
        }),
        getRecipe: builder.query({
            query: name => `recipes/${name}`,
            providesTags: (result, error, name) => [{type: 'Recipes', id: name}],

            async onQueryStarted(name, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Recipe: " + name, "get Recipe: " + name);
            },

        }),
        getLatestRecipes: builder.query({
            query: () => '/recipes/latest',
            providesTags: [{type: 'Recipes', id: 'LATEST'}],

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Latest Recipes", "get Latest Recipes");
            }
        }),
        getRandomDinners: builder.query({
            query: () => '/recipes/randomDinners',

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Random Dinners", "get Random Dinners");
            }
        }),

        getRandomDinner: builder.query({
            query: () => '/recipes/randomDinner',

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Random Dinner", "get Random Dinner");
            }
        }),

        getRecipeTitlesAndIds: builder.query({
            query: () => '/recipes/list',
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Recipes List", "get Recipes List");
            }

        }),
        addRecipe: builder.mutation({
            query: (recipe) => {
                const formData = new FormData();
                formData.append('recipe', JSON.stringify(recipe));
                formData.append('imageFile', recipe.image);

                return {
                    url: '/recipes',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{type: 'Recipes', id: 'LATEST'}],


            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Adding Recipe", "Added Recipe", "add recipe");
            }
        }),
        markRecipeAsCooked: builder.mutation({
            query: recipe => ({
                url: '/recipes/markascooked/' + recipe.id,
                method: 'POST',
                headers: {Authorization: 'Bearer ' + getAuthToken()}
            }),
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Marking Recipe as cooked", "Marked Recipe as cooked", "mark Recipe as cooked");
            },
            invalidatesTags: (result, error, recipe) =>
                [{type: 'Recipes', id: recipe.name.replaceAll(' ', '-').toLowerCase()}]
        }),
        updateRecipe: builder.mutation({
            query: (recipe) => {
                const formData = new FormData();
                formData.append('recipe', JSON.stringify(recipe));
                formData.append('imageFile', recipe.image);

                return {
                    url: '/recipes',
                    method: 'PUT',
                    body: formData,
                };
            },
            //  invalidatesTags: (result, error, arg) => [{type: 'Tags', id: arg.id}],
            invalidatesTags: (result, error, recipe) =>
                [{type: 'Recipes', id: 'LATEST'}, {
                    type: 'Recipes',
                    id: recipe.name.replaceAll(' ', '-').toLowerCase()
                }],

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Updating Recipe", "Updated Recipe", "update recipe");
            }
        }),
        getUnits: builder.query({
            query: () => '/units',
            providesTags: [{type: 'Units', id: 'LIST'}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Units", "load Units");
            }
        }),
        getCrockery: builder.query({
            query: () => '/crockery',
            providesTags: [{type: 'Crockery', id: 'LIST'}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Crockery", "load Crockery");
            }
        }),
        getTags: builder.query({
            query: () => '/tags',
            providesTags: [{type: 'Tags', id: 'LIST'}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Tags", "load Tags");
            }

        }),
        updateTag: builder.mutation({
            query: tag => ({
                url: '/tags/' + tag.id,
                method: 'PUT',
                body: tag,
                headers: {Authorization: 'Bearer ' + getAuthToken()}
            }),
            invalidatesTags: (result, error, tag) => [{type: 'Tags', id: 'LIST'}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Updating Tag", "Updated Tag", "update Tag");
            }
        }),

        addTag: builder.mutation({
            query: (tag) => ({
                url: '/tags',
                method: 'POST',
                body: tag,
                headers: {Authorization: 'Bearer ' + getAuthToken()}
            }),
            invalidatesTags: [{type: 'Tags', id: 'LIST'}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Adding Tag", "Added Tag", "add Tag");
            }
        }),

        deleteTag: builder.mutation({
            query: id => ({
                url: '/tags/' + id,
                method: 'DELETE',
                headers: {Authorization: 'Bearer ' + getAuthToken()}
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Tags', id: arg}],
            async onQueryStarted(arg, {queryFulfilled}) {
                await handleMutationLifeCycle(queryFulfilled, "Deleting Tag", "Deleting Tag", "delete Tag");
            }
        })

    }),
});

export const {
    useGetRecipeQuery,
    useAddRecipeMutation,
    useGetLatestRecipesQuery,
    useGetRandomDinnersQuery,
    useGetRandomDinnerQuery,
    useGetUnitsQuery,
    useGetCrockeryQuery,
    useGetTagsQuery,
    useAddTagMutation,
    useUpdateTagMutation,
    useUpdateRecipeMutation,
    useMarkRecipeAsCookedMutation,
    useDeleteTagMutation,
    useGetRecipesByTagQuery,
    useGetRecipeTitlesAndIdsQuery
} = api;

export default api;



