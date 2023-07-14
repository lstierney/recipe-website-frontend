import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getAuthToken} from "../utils/auth";
import {toastUtils} from "../utils/toast-utils";

const toast = toastUtils();

async function handleLifeCycle(queryFulfilled, loadingMsg, errorMsg) {
    toast.loading(loadingMsg);
    try {
        await queryFulfilled;
        toast.dismiss();
    } catch (err) {
        toast.error("Failed to ");
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
                await handleLifeCycle(queryFulfilled, "Loading Recipes for Tag: " + tagName, "get Recipes for Tag: " + tagName);
            }
        }),
        getRecipe: builder.query({
            query: id => `recipes/${id}`,
            providesTags: (result, error, id) => [{type: 'Recipes', id}],

            async onQueryStarted(id, {queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Loading Recipe: " + id, "get Recipe: " + id);
            }

        }),
        getLatestRecipes: builder.query({
            query: () => '/recipes/latest',
            providesTags: [{type: 'Recipes', id: 'LATEST'}],

            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Loading Latest Recipes", "get Latest Recipes");
            }
        }),

        getRecipeTitlesAndIds: builder.query({
            query: () => '/recipes/list',
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Loading Recipes List", "get Recipes List");
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

            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Adding Recipe", "add Recipe");
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

            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Updating Recipe", "update Recipe");
            }
        }),
        getUnits: builder.query({
            query: () => '/units',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({id}) => ({type: 'Units', id})), 'Units']
                    : ['Units'],
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Loading Units", "load Units");
            }
        }),
        getTags: builder.query({
            query: () => '/tags',
            providesTags: [{type: 'Tags', id: 'LIST'}],
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Loading Tags", "load Tags");
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
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Deleting Tag", "delete Tag");
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
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Add Tag", "add Tag");
            }
        }),

        deleteTag: builder.mutation({
            query: id => ({
                url: '/tags/' + id,
                method: 'DELETE',
                headers: {Authorization: 'Bearer ' + getAuthToken()}
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Tags', id: arg}],
            async onQueryStarted({queryFulfilled}) {
                await handleLifeCycle(queryFulfilled, "Deleting Tag", "delete Tag");
            }
        })

    }),
});

export const {
    useGetRecipeQuery,
    useAddRecipeMutation,
    useGetLatestRecipesQuery,
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



