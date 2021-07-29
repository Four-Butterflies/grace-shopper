import axios from 'axios';
const BASE_URL = "http://localhost:5000";
export async function getSomething() {
  try {
  } catch (error) {
    throw error;
  }
}

export async function stripeCharge({ id, amount }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/charge`, { id, amount });
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}
