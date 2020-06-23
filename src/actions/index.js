import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging';

const BASE_URL = 'https://pandemix.blaho.in';

export const isAuthenticated = async () => {
    try {
        const data = JSON.parse(await AsyncStorage.getItem("user_details"));
        return data.uid && data.token;
    } catch (err) {
        return Promise.reject(false);
    }
}

export const getAuthToken = async () => {
    try {
        const data = await AsyncStorage.getItem("user_details");
        return JSON.parse(data).token;
    } catch (err) {
        return Promise.reject(null);
    }
};

export const signIn = ({ phone, countryCode, pin }) => Axios.post(`${BASE_URL}/account/login`, {
    phone,
    countryCode,
    pin,
});

export const signUp = ({ phone, countryCode, pin }) => {
    return Axios.post(`${BASE_URL}/account/register`, {
        phone,
        countryCode,
        pin,
    });
}

export const fetchProfile = async () => {
    const token = await getAuthToken();
    return Axios.get(`${BASE_URL}/account/profile`, {
        headers: {
            'Authorization': token,
        }
    });
}


export const updateProfile = async (profileData) => {
    const token = await getAuthToken();
    return Axios.put(`${BASE_URL}/account/profile`, profileData, {
        headers: {
            'Authorization': token,
        }
    });
}

export const pingLocation = async ({ lat, lng }) => {
    const token = await getAuthToken();
    return Axios.put(`${BASE_URL}/account/ping`, null, {
        params: {
            lat,
            lng,
        },
        headers: {
            'Authorization': token,
        }
    });
}

export const getOverlappingLocations = ({
    latitude: lat,
    longitude: lng,
    cov_status = true,
    radius = 3000,
    limit = 10,
    offset =0,
}) => {
    return Axios.get(`${BASE_URL}/account/pings/overlaps`, {
        params: {
            lat,
            lng,
            radius,
            cov_status,
            limit,
            offset,
        },
    });
};

export const updateCovidStatus = async (status) => {
    const token = await getAuthToken();
    Axios.put(`${BASE_URL}/account/covid19`, null, {
        params: {
            status,
        },
        headers: {
            'Authorization': token,
        }
    });
};

export const fetchnotifications = async () => {
    const token = await getAuthToken();
    return Axios.get(`${BASE_URL}/notifications`, {
        headers: {
            'Authorization': token,
        }
    });
};

export const fetchFeedWhoNews = () => Axios.get('https://www.who.int/rss-feeds/news-english.xml');


export const verifyToken = async () => {
    const token = await getAuthToken();
    return Axios.post(`https://pandemix.blaho.in/account/verify`, {}, {
        headers: {
            'Authorization': token,
        }
    });
}

export const updateFCMToken = async () => {
    try {
        const _updateToken = async (fcm_id_again) => {
            try{
                const token = await getAuthToken();
                const { data: profile } = await fetchProfile();
                const { name, email } = profile;
                return Axios.put(`${BASE_URL}/account/profile`, {
                    name,
                    email,
                    fcm_id: fcm_id_again,
                }, {
                    headers: {
                        'Authorization': token,
                    }
                });
            }catch(err) { throw err }
        }
    
        const _fetchAndUpdateToken = async () => {
            try {
                const {data: profile} = await fetchProfile();
                if(profile.fcm_id == null  || profile.fcm_id == 'null' || profile.fcm_id == 'undefined') {
                    const fcm_token = await messaging().getToken();
                    console.debug(`Updating FCM id of user...`)
                    const status = await _updateToken(fcm_token);
                    console.debug(`Update of FCM id for user:${profile.username} successful`);
                    return !!status;
                } else {
                    console.debug(`Skipping FCM id update as it already exists`);
                    return false;
                }
            }catch(err) { 
                console.warn(err);
                throw false; 
            }
        }
        setTimeout(_fetchAndUpdateToken, 800);
        const _timer = setInterval(() => {
            _fetchAndUpdateToken().then(() => {
                clearInterval(_timer);
            }).catch(err => console.warn(err))
        }, 20000);
        return true;
    }catch(err) {
       console.error(`Error Updating FCM token`, err);
       Promise.reject(err);
    }
};
