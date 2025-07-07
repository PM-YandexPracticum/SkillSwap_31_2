import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TFilterInitialState = {
    main: string,
    gender: string,
    skills: string[],
    cities: string[],
}

const initialState: TFilterInitialState = {
    main: 'all',
    gender: 'not_specified',
    skills: [],
    cities: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setMain(state: TFilterInitialState, action: PayloadAction<string>) {
            state.main = action.payload;
        },
        setGender(state: TFilterInitialState, action: PayloadAction<string>) {
            state.gender = action.payload;
        },
        toggleCategory(state: TFilterInitialState, action: PayloadAction<string>) {
            const categoryText = action.payload;
            const newSkills = new Set<string>(state.skills);
            if (newSkills.has(categoryText)) {
                newSkills.delete(categoryText);
            } else {
                newSkills.add(categoryText);
            }
            state.skills = Array.from(newSkills);
        },
        toggleCity(state: TFilterInitialState, action: PayloadAction<string>) {
            const cityText = action.payload;
            const newSkills = new Set<string>(state.cities);
            if (newSkills.has(cityText)) {
                newSkills.delete(cityText);
            } else {
                newSkills.add(cityText);
            }
            state.cities = Array.from(newSkills);
        },
        resetFilter(state: TFilterInitialState) {
            state = initialState;
        }
    }
})

export default filterSlice.reducer;
export const { setMain, setGender, toggleCategory, toggleCity, resetFilter } = filterSlice.actions;