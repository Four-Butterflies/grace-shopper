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

// CART
export async function getOrders() {
  try {
    const token = localStorage.getItem('token')
    const res = localStorage.getItem('user')
    const user = JSON.parse(res)

    if (!token) {
      console.error("token not valid")
    }

    const { data } = await axios.get(`${BASE_URL}/orders/user_orders/${user.id}`)
    // const inProgressOrders = data.filter((album) => album.status === 'in progress')
    // console.log(data)
    return data
  } catch (error) {
    throw error;
  }
}

// export async function addAlbumToCart(albumId) {

// }

// CHECKOUT
export async function stripeCharge({ id, amount }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/charge`, { id, amount });
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

    const { token, user } = await res.json();

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
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

    const { token, user } = await res.json();

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

