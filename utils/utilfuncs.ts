export const hexToRgb = (hex: string) => {
    // Remove the hash at the start if it's there
    hex = hex.charAt(0) === '#' ? hex.substring(1) : hex;

    // Parse r, g, b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
};

// 사용 예시:
// const hexColor = "#3498db";
// const rgbColor = hexToRgb(hexColor);
// console.log(rgbColor);  // { r: 52, g: 152, b: 219 }

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

interface Options {
    body?: any;
    headers?: Record<string, string>;
}

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const get = async (baseUrl: string, endpoint: string, headers: Record<string, string> = defaultHeaders): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET Error:", error);
        throw error;
    }
};

export const post = async (baseUrl: string, endpoint: string, body: any, headers: Record<string, string> = defaultHeaders): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
};

export const put = async (baseUrl: string, endpoint: string, body: any, headers: Record<string, string> = defaultHeaders): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("PUT Error:", error);
        throw error;
    }
};

export const remove = async (baseUrl: string, endpoint: string, headers: Record<string, string> = defaultHeaders): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: headers,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("DELETE Error:", error);
        throw error;
    }
};
