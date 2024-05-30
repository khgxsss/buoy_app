// src/deviceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  deviceData: { [macAddr: string]: any }; // 각 macAddr별로 데이터를 저장하는 객체
}

const initialState: DeviceState = {
  deviceData: {},
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceData: (state, action: PayloadAction<{ macAddr: string; data: any }>) => {
      const { macAddr, data } = action.payload;
      // 각 macAddr별로 데이터를 업데이트
      state.deviceData[macAddr] = data;
    },
  },
});

export const { setDeviceData } = deviceSlice.actions;

export default deviceSlice.reducer;
