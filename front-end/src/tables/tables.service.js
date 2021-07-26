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
  return await fetch(`${API_BASE_URL}/tables/`, request);
}

export async function seatTable(reservation_id, table_id) {
  let data = { reservation_id };
  let body = JSON.stringify({ data });
  const request = {
    method: 'PUT',
    headers,
    body,
  };
  return await fetch(`${API_BASE_URL}/tables/${table_id}/seat`, request);
}

export async function unseatTable(table_id) {
  const request = {
    method: 'DELETE',
    headers,
  };
  return await fetch(`${API_BASE_URL}/tables/${table_id}/seat`, request);
}

export async function loadTables(signal) {
  const request = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetch(`${API_BASE_URL}/tables`, request)
    .then((response) => response.json())
    .then((response) => response.data);
}

export default loadTables;
