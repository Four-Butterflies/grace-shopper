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
    const token = localStorage.getItem('token');
    const res = localStorage.getItem('user');
    const user = JSON.parse(res);

    if (!token) {
      console.error('token not valid');
    }

    const { data } = await axios.get(
      `${BASE_URL}/orders/user_orders/${user.id}`
    );
    // const inProgressOrders = data.filter((album) => album.status === 'in progress')
    // console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetails(orderId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/details/${orderId}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}


// CHECKOUT
export async function stripeCharge({ id }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/charge`, { id });

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

export async function isAdmin() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) {
    return false;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/users/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
