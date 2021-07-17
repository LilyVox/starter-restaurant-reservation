import 'dotenv';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function sendNewTable(data) {
  let body = JSON.stringify({data});
  const request = {
    method: 'POST',
    headers,
    body,
  }; 
  console.info(body);
  return await fetch(`${API_BASE_URL}/tables/`, request);
}
// export async function seatNewTable(data) {
//   let body = JSON.stringify({data});
//   const request = {
//     method: 'POST',
//     headers,
//     body,
//   }; 
//   console.info(body);
//   return await fetch(`${API_BASE_URL}/tables/`, request);
// }

