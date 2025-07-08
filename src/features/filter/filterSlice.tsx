import { createSlice } from '@reduxjs/toolkit';

type TFilterInitialState = {
  main: string;
  gender: string;
  skills: string[];
  cities: string[];
};

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
    setMain(state, action) {
      return { ...state, main: action.payload };
    },
    setGender(state, action) {
      return { ...state, gender: action.payload };
    },
    toggleCategory(state, action) {
      const categoryText = action.payload;
      const newSkills = new Set<string>(state.skills);
      if (newSkills.has(categoryText)) {
        newSkills.delete(categoryText);
      } else {
        newSkills.add(categoryText);
      }
      return { ...state, skills: Array.from(newSkills) };
    },
    toggleCity(state, action) {
      const cityText = action.payload;
      const newCities = new Set<string>(state.cities);
      if (newCities.has(cityText)) {
        newCities.delete(cityText);
      } else {
        newCities.add(cityText);
      }
      return { ...state, cities: Array.from(newCities) };
    },
    resetFilter() {
      return initialState;
    },
  },
});

export default filterSlice.reducer;
export const { setMain, setGender, toggleCategory, toggleCity, resetFilter } =
  filterSlice.actions;
