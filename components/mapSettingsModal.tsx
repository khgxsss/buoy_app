import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View, Modal, TouchableOpacity, TextInput, Text, Button} from 'react-native';
import { FontAwesome,Ionicons,MaterialCommunityIcons } from './IconSets';
import ReactNativeSettingsPage, { CheckRow, NavigateRow, SectionRow, SliderRow, SwitchRow, TextRow } from 'react-native-settings-page-fork1'
import Theme from '../constants/Theme';
import { setLocationSaved, setMapSettingsModalVisible, setSeeAllDevices, setSeeDistanceLines, setServerLoginInput } from '../redux/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setMapLocationSettingsFirebase } from '../firebase/functions';

const MapSettingsModalComponent: React.FC = () => {

    // Redux
    const isMapSettingsModalVisible = useSelector((state:RootState)=>state.auth.isMapSettingsModalVisible);
    const seeAllDevices = useSelector((state:RootState) => state.auth.seeAllDevices);
    const seeDistanceLines = useSelector((state:RootState) => state.auth.seeDistanceLines);
    const locationSaved = useSelector((state:RootState) => state.auth.locationSaved);
    const serverLoginInput = useSelector((state:RootState) => state.auth.serverLoginInput);
    const user = useSelector((state:RootState) => state.auth.user);

    const dispatch = useDispatch();
    
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isMapSettingsModalVisible}
            onRequestClose={() => {
                dispatch(setMapSettingsModalVisible(!isMapSettingsModalVisible));
            }}
            >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}>
                <TouchableOpacity 
                    onPress={()=>dispatch(setMapSettingsModalVisible(false))} style={styles.closeButton}
                ><MaterialCommunityIcons name="close-box" color={Theme.COLORS.PRIMARY} size={50}/></TouchableOpacity>
                <View style={styles.modalView}>
                    <ReactNativeSettingsPage>
                        <SectionRow text='Map Settings'>
                            <SwitchRow 
                                text='See all device ids' 
                                iconName='eye'
                                _value={seeAllDevices}
                                _onValueChange={() => {dispatch(setSeeAllDevices(!seeAllDevices))}} />
                            <SwitchRow 
                                text='See distance lines (radius: 3km)' 
                                iconName='eye'
                                _value={seeDistanceLines}
                                _onValueChange={() => {dispatch(setSeeDistanceLines(!seeDistanceLines))}} />
                            <SliderRow 
                                text={`Set Default Map Zoom Level (1~20) : ${locationSaved.mapZoomLevel}`}
                                iconName='expand'
                                _color='#000'
                                _min={1}
                                _max={20}
                                _value={locationSaved.mapZoomLevel}
                                _onValueChange={()=>{}}
                                _onSlidingComplete={(e)=>dispatch(setLocationSaved({...locationSaved,mapZoomLevel:e}))} />
                            <NavigateRow
                                text='save & close'
                                iconName='save'
                                onPressCallback={async () => {
                                    await setMapLocationSettingsFirebase(user,locationSaved);
                                    dispatch(setMapSettingsModalVisible(false));
                            }}/>
                        </SectionRow>
                        <SectionRow text='Server Settings'>
                            <TextRow
                                text='Set IP Address'
                                iconName='edit'
                                _color='#000'
                                _value={serverLoginInput.ip}
                                _placeholder='put ip address here'
                                _onValueChange={(text: string) =>{dispatch(setServerLoginInput({...serverLoginInput,ip:text}))}} />
                            <TextRow
                                text='Set Port'
                                iconName='edit'
                                _color='#000'
                                _value={`${serverLoginInput.port}`}
                                _placeholder='put ip address here'
                                _onValueChange={(text: string) =>{dispatch(setServerLoginInput({...serverLoginInput,port:+text}))}} />
                            <TextRow
                                text='Set Password'
                                iconName='edit'
                                _color='#000'
                                _value={serverLoginInput.password}
                                _placeholder='put password here'
                                _onValueChange={(text: string) =>{dispatch(setServerLoginInput({...serverLoginInput,password:text}))}} />
                        </SectionRow>
                    </ReactNativeSettingsPage>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // 반투명한 회색 배경
    },
    modalView: {
        position:'absolute',
        width: "90%",
        height: "60%",
        padding: 20,
        backgroundColor:Theme.COLORS.WHITE,
        borderRadius: 10,
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    closeButton: {
        position:'absolute',
        top: 20,
        right: 20
    }
})
export default MapSettingsModalComponent;