const API_URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
export async function getDolarValues() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return ['data', data];
  } catch (error) {
    console.error('Error fetching data:', error);
    return ['error', error];
  }
}