// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import authReducer from './stateSlice'

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    auth: authReducer,
  },
});

// RootState 타입을 정의합니다.
export type RootState = ReturnType<typeof store.getState>;

// 추가적으로, 스토어의 디스패치 타입을 추출하여 사용할 수 있습니다.
export type AppDispatch = typeof store.dispatch;