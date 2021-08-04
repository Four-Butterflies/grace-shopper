import axios from 'axios';

const BASE_URL = `http://localhost:5000/api`;

// ALBUM
export async function getAllAlbums() {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAlbumById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/album/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMostRecentAlbums() {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/recent`);

    return data;
  } catch (error) {
    throw error;
  }
}

// CHECKOUT
export async function stripeCharge({ id }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/charge`, { id });
    console.log('src api', data)
    return data;
  } catch (error) {
    throw error;
  }
}

// USER
export async function registerUser(username, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const result = await res.json();

    result.token && localStorage.setItem('token', JSON.stringify(result.token));
    result.user && localStorage.setItem('user', JSON.stringify(result.user));

    //TODO: result can contain api error messages. provide for that.
    return result;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    result.token && localStorage.setItem('token', JSON.stringify(result.token));
    result.user && localStorage.setItem('user', JSON.stringify(result.user));

    //TODO: result can contain api error messages. provide for that.
    return result;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
