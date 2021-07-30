import axios from 'axios';

const BASE_URL = `http://localhost:5000/api`

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getAllAlbums() {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums`)
    return data
  } catch(error) {
    throw error
  }
}

export async function getAlbumById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/album/${id}`);
    return data
  } catch(error) {
    throw error
  }
}

