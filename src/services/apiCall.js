const API_URL = 'https://dolarapi.com/v1/dolares';
export async function getDolarValues() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data)
    return ['data', data];
  } catch (error) {
    console.error('Error fetching data:', error);
    return ['error', error];
  }
}