/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMountainById } from '../services/apiService';

export const getOneMountain = createAsyncThunk('oneMountain/getOneMountain', async ({ id, UserId, jwtToken }:{ id: number, UserId: number, jwtToken: string }) => {
  const { data } = await getMountainById(id, UserId, jwtToken);
  return data;
});

interface MountainState {
  mountain: MountainInfo
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialMountainState = {
  mountain: {},
  loading: 'idle',
} as MountainState;

const oneMountainSlice = createSlice({
  name: 'oneMountain',
  initialState: initialMountainState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneMountain.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOneMountain.fulfilled, (state, action) => {
      state.mountain = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getOneMountain.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export default oneMountainSlice.reducer;
