import { createSlice } from '@reduxjs/toolkit';

type TFilterInitialState = {
  main: string;
  gender: string;
  subcategories: string[];
  cities: string[];
  text: string;
  is_filtred: boolean;
};

const initialState: TFilterInitialState = {
  main: 'all',
  gender: 'not_specified',
  subcategories: [],
  cities: [],
  text: '',
  is_filtred: false,
};

// Вспомогательная функция для вычисления состояния фильтрации
function calculateIsFiltered(state: TFilterInitialState): boolean {
  return (
    state.main !== 'all' ||
    state.gender !== 'not_specified' ||
    state.subcategories.length > 0 ||
    state.cities.length > 0 ||
    state.text !== ''
  );
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMain(state, action) {
      const newState = {
        ...state,
        main: action.payload,
      };
      return {
        ...newState,
        main: action.payload,
        is_filtred: calculateIsFiltered(newState),
      };
    },
    setGender(state, action) {
      const newState = {
        ...state,
        gender: action.payload,
      };
      return {
        ...newState,
        is_filtred: calculateIsFiltered(newState),
      };
    },
    toggleSubcategory(state, action) {
      const subcategoryText = action.payload;
      const newSubcategories = new Set<string>(state.subcategories);
      if (newSubcategories.has(subcategoryText)) {
        newSubcategories.delete(subcategoryText);
      } else {
        newSubcategories.add(subcategoryText);
      }

      const newState = {
        ...state,
        subcategories: Array.from(newSubcategories),
      };

      return {
        ...newState,
        is_filtred: calculateIsFiltered(newState),
      };
    },
    toggleCity(state, action) {
      const cityText = action.payload;
      const newCities = new Set<string>(state.cities);
      if (newCities.has(cityText)) {
        newCities.delete(cityText);
      } else {
        newCities.add(cityText);
      }

      const newState = {
        ...state,
        cities: Array.from(newCities),
      };

      return {
        ...newState,
        is_filtred: calculateIsFiltered(newState),
      };
    },
    setText(state, action) {
      const newState = {
        ...state,
        text: action.payload,
      };
      return {
        ...newState,
        is_filtred: calculateIsFiltered(newState),
      };
    },
    resetFilter() {
      return initialState;
    },
  },
});

export default filterSlice.reducer;
export const {
  setMain,
  setGender,
  toggleSubcategory,
  toggleCity,
  resetFilter,
  setText,
} = filterSlice.actions;
