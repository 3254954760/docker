const AK = 'M7trZF88RNgXhT6YOP0Z5iMD';
const SK = '4rbdy0gExypzfwQDUMbdGmXOYDa4dKcT';
export function getAccessToken() {
  return fetch(
    '/api/oauth/2.0/token?grant_type=client_credentials&client_id=' +
      AK +
      '&client_secret=' +
      SK,
  )
    .then((response) => response.json())
    .then((data) => data.access_token)
    .catch((error) => {
      console.error('Error fetching access token:', error);
      throw error;
    });
}
