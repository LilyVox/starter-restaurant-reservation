import 'dotenv';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function search(mobile_number, signal) {
  const request = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetch(`${API_BASE_URL}/reservations?mobile_number=${mobile_number}`, request)
  .then((response)=> response.json())
  .then((response)=> response.data);
}