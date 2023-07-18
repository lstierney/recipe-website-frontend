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

    tagTypes: ['Tags', 'Units', 'Recipes'],

    endpoints: (builder) => ({
        getRecipesByTag: builder.query({
            query: tagName => '/recipes?' + new URLSearchParams({tagName}),
            async onQueryStarted(tagName, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Recipes for Tag: " + tagName, "get Recipes for Tag: " + tagName);
            }
        }),
        getRecipe: builder.query({
            query: id => `recipes/${id}`,
            providesTags: (result, error, id) => [{type: 'Recipes', id}],

            async onQueryStarted(id, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Recipe: " + id, "get Recipe: " + id);
            },

        }),
        getLatestRecipes: builder.query({
            query: () => '/recipes/latest',
            providesTags: [{type: 'Recipes', id: 'LATEST'}],

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Latest Recipes", "get Latest Recipes");
            }
        }),
        getRandomRecipes: builder.query({
            query: () => '/recipes/random',

            async onQueryStarted(arg, {queryFulfilled}) {
                await handleQueryLifeCycle(queryFulfilled, "Loading Random Recipe", "get Random Recipe");
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
            invalidatesTags: (result, error, recipe) => [{type: 'Recipes', id: 'LATEST'}, {
                type: 'Recipes',
                id: recipe.id
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
    useGetRandomRecipesQuery,
    useGetUnitsQuery,
    useGetTagsQuery,
    useAddTagMutation,
    useUpdateTagMutation,
    useUpdateRecipeMutation,
    useDeleteTagMutation,
    useGetRecipesByTagQuery,
    useGetRecipeTitlesAndIdsQuery
} = api;

export default api;



