import Axios from 'axios';
const API_KEY =  `d3478d6d-740a-11ea-9fa5-0200cd936042`;
const TEMPLATE_NAME = `Pandemix`;
const BASE_URL = `https://2factor.in/API/V1/${API_KEY}/SMS`;

export const requestOTP = ({ countryCode, phone }) => {
    const URL = `${BASE_URL}/+${countryCode}${phone}/AUTOGEN/${TEMPLATE_NAME}`
    console.debug(`Sending request to:`, URL);
    return Axios.get(URL);
};

export const verifyOTP = ({ sessionId, otp }) => {
    return Axios.get(`${BASE_URL}/VERIFY/${sessionId}/${otp}`);
}