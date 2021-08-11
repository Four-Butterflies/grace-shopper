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

// This is a bit overly verbose while debugging something
export async function createAlbum(album) {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) {
    return false;
  }

  const {
    name,
    artists,
    release_date,
    genres,
    price,
    quantity,
    reorder,
    image,
    total_tracks,
    spotify,
  } = album;

  try {
    const { data } = await fetch(`${BASE_URL}/albums`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        artists,
        release_date,
        genres,
        price,
        quantity,
        reorder,
        image,
        total_tracks,
        spotify,
      }),
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// SEARCH
export async function searchByAlbumName(name) {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/name/${name}`)

    return data
  } catch (error) {
    throw error
  }
}

export async function searchByArtist(artist) {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/artist/${artist}`)

    return data
  } catch (error) {
    throw error
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

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetails(orderId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/details/${orderId}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createOrder() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    const { data } = await axios.post(`${BASE_URL}/orders/submit_order`, {
      userId: user.id,
      status: 'in progress',
      total: 0,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// CREATE ALBUM_UNIT
export async function createAlbumUnit(albumId, orderId, strikePrice) {
  try {
    const { data } = await axios.post(`${BASE_URL}/album_units`, {
      albumId,
      orderId,
      strikePrice,
    });
    console.log(data);
    return { data };
  } catch (error) {
    throw error
  }
}

// CHECKOUT
export async function stripeCharge(id, currentOrderId) {
  try {
    const { data } = await axios.post(`${BASE_URL}/charge`, { id, currentOrderId });

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
