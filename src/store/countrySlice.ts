import { createSlice } from '@reduxjs/toolkit';

type CountriesState = {
  countries: string[];
};

const initialState: CountriesState = {
  countries: [
    'Russia',
    'Ukraine',
    'Belarus',
    'Kazakhstan',
    'Uzbekistan',
    'Georgia',
    'Azerbaijan',
    'Turkey',
    'Kyrgyzstan',
    'Hungary',
    'Italy',
    'Netherlands',
    'Germany',
    'France',
    'Cyprus',
    'South Korea',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
