import 'dotenv';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function sendNewReservation(data) {
  let body = JSON.stringify({ data });
  const request = {
    method: 'POST',
    headers,
    body,
  }; // could use axios, chose not to, maybe in the future
  return await fetch(`${API_BASE_URL}/reservations/`, request);
}

export async function loadReservation(reservation_id, signal) {
  const request = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetch(`${API_BASE_URL}/reservations/${reservation_id}`, request)
  .then((response)=> response.json())
  .then((response)=> response.data);;
}

export async function updateReservationStatus(reservation_id, status){
  let data = { status };
  let body = JSON.stringify({ data });
  const request = {
    method: 'PUT',
    headers,
    body,
  };
  return await fetch(`${API_BASE_URL}/reservations/${reservation_id}/status`, request);
}
export async function updateExistingReservation(reservation_id, reservation){
  let data = reservation;
  let body = JSON.stringify({ data });
  const request = {
    method: 'PUT',
    headers,
    body,
  };
  return await fetch(`${API_BASE_URL}/reservations/${reservation_id}`, request);
}
export default sendNewReservation;