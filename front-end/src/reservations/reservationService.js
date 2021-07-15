import 'dotenv';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function sendNewReservation(data) {
  let body = JSON.stringify({data});
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const request = {
    method: 'POST',
    headers,
    body,
  }; // could use axios, chose not to, maybe in the future
  console.info(body);
  return await fetch(`${API_BASE_URL}/reservations/`, request);
}

export default sendNewReservation;
