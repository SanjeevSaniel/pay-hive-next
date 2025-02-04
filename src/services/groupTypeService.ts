import axios from 'axios';

// Define the fetch function for group types
export const fetchGroupTypes = async () => {
  const response = await axios.get('/api/grouptypes');
  if (response.status !== 200) {
    throw new Error('Failed to fetch group types');
  }
  return response.data;
};
