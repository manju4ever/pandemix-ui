import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

const geoDistance = (lat1, lon1, lat2, lon2) => {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist
}



export const getPatientsData = async (force = false) => {
    try {
        if(!force && Boolean(AsyncStorage.getItem("covid19_patients"))) {
            const parsed = await AsyncStorage.getItem("covid19_patients");
            console.debug(`Found ${parsed.travel_history.length} patients in cache`);
            return parsed.travel_history;
        }
       else {
           const results = await Axios.get(`https://api.covid19india.org/travel_history.json`);
           AsyncStorage.setItem('covid19_patients', JSON.stringify(results.data));
           return results.data.travel_history;
       }
    }catch(err) {
        console.error(`Error fetching patients DB`, err);
        return null;
    }
};

export const getPatientsLocation = async() => {
    try {
        const data = await getPatientsData(true);
        const points = data
        .filter(record => record.latlong !== "")
        .map(record => {
            const [lat, lng] = record.latlong.toString().trim().split(",");
            return [parseFloat(lat), parseFloat(lng)]
        })
        .map(([latitude, longitude]) => ({
            latitude,
            longitude,
            weight: 1.0
        }));
        return points;
    }catch(err) {
        console.error(`Error getPatientsLocation:`, err);
        return null;
    }
};

export const getPatientMarkers = async ({
    currentLocation
}) => {
    try {
        const data = await getPatientsData(true);
        const points = data
        .filter(record => record.latlong !== "")
        .map(record => {
            const [lat, lng] = record.latlong.toString().trim().split(",");
            return [parseFloat(lat), parseFloat(lng)]
        })
        .filter(([lat, lng]) => {
            return geoDistance(
                 lat, lng,
                 currentLocation.latitude, currentLocation.longitude
            ) <= 10;
        })
        .map(([latitude, longitude]) => {
            return {
                latlng: {
                    latitude,
                    longitude,
                },
                title: `Source:\nGovt. of India`
            };
        });
        return points;
    } catch(err) {
        console.error(`Error: creating patient markers`);
    }
}
