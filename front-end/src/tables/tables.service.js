import 'dotenv';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function sendNewTable(data) {
  let body = JSON.stringify({ data });
  const request = {
    method: 'POST',
    headers,
    body,
  };
  console.info('making new table: ' + body);
  return await fetch(`${API_BASE_URL}/tables/`, request);
}

export async function seatTable(data) {
  let body = JSON.stringify({ data });
  const request = {
    method: 'POST',
    headers,
    body,
  };
  console.info('seating table: ' + body);
  return await fetch(`${API_BASE_URL}/tables/`, request);
}
export async function loadTables(signal) {
  const request = {
    method: 'GET',
    headers,
    signal
  };
  return await fetch(`${API_BASE_URL}/tables/`, request);
}

export async function loadReservation(reservation_id, signal) {
  const request = {
    method: 'GET',
    headers,
    signal
  };
  return await fetch(`${API_BASE_URL}/reservations/${reservation_id}`, request);
}

