// src/features/auth/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'react-native-firebaseui-auth';
import { DeviceDataType, deviceType, FetchedDataType, serverLoginInputType, locationSavedType, appDimensionType,  Region, MAP_TYPE, oauth_config } from '../constants/types';

interface AuthState {
  user: User | null;
  activeTab: string;
  mapType: number;
  fetchedWData: DeviceDataType[];
  tabHistory: number[];
  isWifiModalVisible: boolean;
  isMapSettingsModalVisible: boolean;
  loading: boolean;
  defaultMapZoomLevel: number;
  wifiOn: boolean;
  cellularOn: boolean;
  appDimension: appDimensionType;
  locationSaved: locationSavedType;
  seeAllDevices: boolean;
  seeDistanceLines: boolean;
  serverLoginInput: serverLoginInputType;
}

const initialState: AuthState = {
  user: null,
  activeTab: 'Map',
  mapType: 0,
  fetchedWData: [],
  tabHistory: [1],
  isWifiModalVisible: false,
  isMapSettingsModalVisible: false,
  loading: false,
  defaultMapZoomLevel: 13,
  wifiOn: false,
  cellularOn: false,
  appDimension: {
    appWidth: 0,
    appHeight: 0,
    componentHeight: 0,
    tabHeight: 65
  },
  locationSaved: {
    latitude: 37.3588,
    longitude: 127.1047,
    mapZoomLevel: 13
  },
  seeAllDevices: false,
  seeDistanceLines: false,
  serverLoginInput: {
    ip: '192.168.0.1',
    port: 12345,
    password: '123'
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {  // sync
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setMapType: (state, action: PayloadAction<number>) => {
      state.mapType = action.payload;
    },
    setFetchedWData: (state, action: PayloadAction<DeviceDataType[]>) => {
      state.fetchedWData = action.payload;
    },
    setTabHistory: (state, action: PayloadAction<number[]>) => {
      state.tabHistory = action.payload;
    },
    setWifiModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isWifiModalVisible = action.payload;
    },
    setMapSettingsModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isMapSettingsModalVisible = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDefaultMapZoomLevel: (state, action: PayloadAction<number>) => {
      state.defaultMapZoomLevel = action.payload;
    },
    setWifiOn: (state, action: PayloadAction<boolean>) => {
      state.wifiOn = action.payload;
    },
    setCellularOn: (state, action: PayloadAction<boolean>) => {
      state.cellularOn = action.payload;
    },
    setAppDimension: (state, action: PayloadAction<appDimensionType>) => {
      state.appDimension = action.payload;
    },
    setLocationSaved: (state, action: PayloadAction<locationSavedType>) => {
      state.locationSaved = action.payload;
    },
    setSeeAllDevices: (state, action: PayloadAction<boolean>) => {
      state.seeAllDevices = action.payload;
    },
    setSeeDistanceLines: (state, action: PayloadAction<boolean>) => {
      state.seeDistanceLines = action.payload;
    },
    setServerLoginInput: (state, action: PayloadAction<serverLoginInputType>) => {
      state.serverLoginInput = action.payload;
    }
  },
//   extraReducers: (builder) => { // async
//     builder
//       .addCase(signIn.fulfilled, (state, action) => {
//         state.user = action.payload; // Set user on sign-in
//       })
//       .addCase(signOut.fulfilled, (state) => {
//         state.user = null; // Clear user on sign-out
//       })
//       // Handle pending and rejected states if necessary
//       .addCase(signIn.rejected, (state, action) => {
//         // Handle error
//       })
//       .addCase(signOut.rejected, (state, action) => {
//         // Handle error
//       });
//   }
});

export const {
  setUser, setActiveTab, setMapType, setFetchedWData, setTabHistory,
  setWifiModalVisible, setMapSettingsModalVisible, setLoading, setDefaultMapZoomLevel,
  setWifiOn, setCellularOn, setAppDimension, setLocationSaved, setSeeAllDevices,
  setSeeDistanceLines, setServerLoginInput
} = authSlice.actions;

export default authSlice.reducer;


  