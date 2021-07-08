import 'dotenv';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function sendNewReservation(data) {
  const requestInfo = {
    method: 'POST',
    body: data,
  }; // could use axios, chose not to, maybe in the future
  return await fetch(API_BASE_URL, requestInfo);
}

export default sendNewReservation;
