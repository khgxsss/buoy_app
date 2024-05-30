import { Coord } from 'react-native-nmap-fork1';

export interface serverLoginInputType {
    ip:string;
    port:number,
    password:string;
}
export interface appDimensionType {
    appWidth: number;
    appHeight: number;
    x?: number;
    y?: number;
    componentHeight:number;
    tabHeight:number;
}
export interface locationSavedType extends Coord  {
    mapZoomLevel: number;
}
export interface deviceType {
    userId: string;
    userName: string;
    regTime: string;
    device: string;
    deviceImg: string;
    online: boolean;
}
  
export interface DeviceDataType {
    buoy_id: string;
    location: Coord;
    time_generation: {
        year: number,
        month: number,
        day: number,
        hours: number,
        minutes: number,
        seconds: number,
        time: number,
    };
    status?: string;
};
  
export interface FetchedDataType {
    shiplocation: Coord;
    device: DeviceDataType
}
  
export interface Region {
    latitude: number;
    longitude: number;
    zoom: number;
    //������ ������ ������ ���� ��ǥ���� ��ȯ�մϴ�. ��ǥ���� �� ���� ��ǥ�� ������ �簢������ ǥ���˴ϴ�. ��, ��ȯ�Ǵ� �迭�� ũ��� 5�̸�, ù ��° ���ҿ� ������ ���Ұ� ������ ������ ����ŵ�ϴ�. ������ �е��� ��� 0�̸� getCoveringRegion()�� ������ �簢����, ������ �е��� �����Ǿ� ������ getCoveringRegion()���� ������ �е��� ������ �簢���� ��ȯ�˴ϴ�.
    contentRegion: [Coord, Coord, Coord, Coord, Coord];
    // ������ �е��� ������ ������ �� ��ü ������ ���� ��ǥ���� ��ȯ�մϴ�. ��ǥ���� �� ���� ��ǥ�� ������ �簢������ ǥ���˴ϴ�. ��, ��ȯ�Ǵ� �迭�� ũ��� 5�̸�, ù ��° ���ҿ� ������ ���Ұ� ������ ������ ����ŵ�ϴ�.
    coveringRegion: [Coord, Coord, Coord, Coord, Coord]; 
}
  
export const MAP_TYPE = {
    BASIC: 0,
    TERRAIN: 4,
    SATELLITE: 2,
    HYBRID: 3,
    NAVI: 1
};

export const oauth_config = {
    providers: ['google'],
    tosUrl: 'https://example.com/tos.htm',
    privacyPolicyUrl: 'https://example.com/privacypolicy.htm',
};

export const default_user = {displayName:'',email:'',isNewUser:false,phoneNumber:'',photoURL:'',uid:'',providerId:'',creationTimestamp:0,lastSignInTimestamp:0}