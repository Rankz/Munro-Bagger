/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMountains } from '../services/apiService';

export const getMountains = createAsyncThunk('allMountains/getMountains', async ({ UserId, jwtToken }:{ UserId: number, jwtToken: string }) => {
  const { data } = await getAllMountains(UserId, jwtToken);
  return data;
});

interface MountainListState {
  mountainList: MountainInfo[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialMountainState = {
  mountainList: [],
  loading: 'idle',
} as MountainListState;

const allMountainsSlice = createSlice({
  name: 'allMountains',
  initialState: initialMountainState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMountains.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getMountains.fulfilled, (state, action) => {
      state.mountainList = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getMountains.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export default allMountainsSlice.reducer;
