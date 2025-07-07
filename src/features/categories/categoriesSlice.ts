import { CategoryWithSubcategories, getCategoriesWithSubcategories } from "@app/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategoriesWithSubcategoriesThunk = createAsyncThunk(
    'get/categories',
    () => getCategoriesWithSubcategories()
);

type TCategoriesState = {
    isLoading: boolean;
    categories: CategoryWithSubcategories[];
    error: null | string | undefined;
}

const initialState: TCategoriesState = {
    isLoading: false,
    categories: [],
    error: null,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesWithSubcategoriesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategoriesWithSubcategoriesThunk.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.error.message;
            })
            .addCase(getCategoriesWithSubcategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload;
            })
    }
});

export default categoriesSlice.reducer;