import {createSlice} from '@reduxjs/toolkit';

const ratingsNames = ['плохо','удоволетворительно','неплохо','хорошо','отлично']

const initialState = {
    ratingsNames

};
const place = createSlice({
    name: 'place',
    initialState,
    reducers: {

    },
});

export const {} = place.actions;
export default place.reducer;
