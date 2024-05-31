import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth, { AuthEventEmitter, AuthEvents, User } from 'react-native-firebaseui-auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { DeviceDataType, deviceType, FetchedDataType, serverLoginInputType, locationSavedType, appDimensionType,  Region, MAP_TYPE, oauth_config, default_user } from '../constants/types';
import { setLocationSaved,setDefaultMapZoomLevel,setUser,setActiveTab } from '../redux/stateSlice';
import { AppDispatch } from '../redux/store';

export const updateFirebaseStorage = async (userData:User, dispatch:AppDispatch) => {
    // Firestore에서 사용자 확인
    const userDocRef = firestore().collection('users').doc(userData.uid);
  
    const userDoc = await userDocRef.get();

    // 사용자가 데이터베이스에 없으면 추가, 있으면 타임스탬프, Map Zoom 갱신
    if (!userDoc.exists) {
      await userDocRef.set({
        about: '', // 기본값으로 빈 문자열 사용
        devices: [], // 기본값으로 빈 배열 사용
        name: userData.displayName || '',
        email: userData.email,
        lastSignInTimestamp: userData.lastSignInTimestamp,
        lastLocation: {latitude: 37.35882350130591, longitude: 127.10469231924353, mapZoomLevel: 13}
      });
    }else {
      await userDocRef.update({
        lastSignInTimestamp: userData.lastSignInTimestamp,
      });
    }
    dispatch(setLocationSaved(userDoc.data()?.lastLocation))
    dispatch(setDefaultMapZoomLevel(userDoc.data()?.lastLocation.mapZoomLevel))
  }
export const handleSignIn = async (dispatch:AppDispatch) => {
    try {
      const signedInUser = await Auth.signIn(oauth_config);
      dispatch(setUser(signedInUser));

      // 로그인 성공 후 토큰 저장
      await AsyncStorage.setItem('user', JSON.stringify(signedInUser));
      await updateFirebaseStorage(signedInUser, dispatch);
    } catch (err) {
      console.log(err);
    }
};  
export const handleSignOut = async (dispatch:AppDispatch) => {
    try {
      await Auth.signOut();
      dispatch(setUser(default_user)); // After signing out, set the user to an empty string
      dispatch(setActiveTab('Map'));
      // 로그아웃 시 토큰 제거
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
};
  export const handleGetCurrentUser = async () => {
    try {
      const currentUser = await Auth.getCurrentUser();
      console.log(currentUser);
    } catch (error) {
      console.error(error);
    }
};

  export const handleDeleteUser = async () => {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
};
export const getUserInfo = async () => {
    try {
      const signedInUser = await Auth.signIn(oauth_config);
      setUser(signedInUser);
  
      // Firestore에서 사용자 확인
      const userDocRef = firestore().collection('users').doc(signedInUser.uid);
  
      const userDoc = await userDocRef.get();
      console.log(userDoc.data())
  
    } catch (err) {
      console.log(err);
    }
};
export const getUser = async(user:User) => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
        if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        }
    })
}
export const setMapLocationSettingsFirebase = async (user:User,locationSaved:locationSavedType) => {
    try {
      // Firestore에서 사용자 확인
      const userDocRef = firestore().collection('users').doc(user.uid);
  
      const userDoc = await userDocRef.get();
      // Map Zoom 갱신
      if (userDoc.exists) {
        await userDocRef.update({
          lastLocation: locationSaved,
        });
      }
  
    } catch (err) {
      console.log(err);
    }
};

  // not for use
export const fetchDevices = async (user:User) => {
    try {
      const list: deviceType[] = [];

      await firestore()
        .collection('devices')
        .where('userId', '==', user.uid)
        .orderBy('regTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Devices: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              device,
              deviceImg,
              regTime,
              userName,
            } = doc.data();
            list.push({
              userId,
              userName: 'Test Name',
              regTime: regTime,
              device,
              deviceImg,
              online: false
            });
          });
        });
      console.log(list)

    } catch (e) {
      console.log(e);
    }
};