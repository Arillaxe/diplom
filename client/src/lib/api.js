import axios from 'axios';

class API {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;

    axios.interceptors.response.use((res) => res, (err) => {
      if (err.response.status === 401) {
        localStorage.clear();
        window.location.replace('/login');
      }

      return Promise.reject(err);
    });
  }

  async userExists({ login }) {
    const response = await axios.get(`${this.serverUrl}/user/exists/${login}`);

    return response.data;
  }

  async signIn({ login, fullName, password }) {
    const response = await axios.post(`${this.serverUrl}/auth/signIn`, { login, fullName, password });

    return response.data;
  }

  async getUser({ token }) {
    const response = await axios.get(`${this.serverUrl}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getAllRooms({ token }) {
    const response = await axios.get(`${this.serverUrl}/room/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getCurrentRequest({ token }) {
    const response = await axios.get(`${this.serverUrl}/request/forCurrentUser`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createRequest({ token, request }) {
    const response = await axios.post(`${this.serverUrl}/request/create`, request, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async deleteRequest({ token, id }) {
    const response = await axios.delete(`${this.serverUrl}/request/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

const apiInstance = new API(process.env.REACT_APP_SERVER_HOST || '');

export default apiInstance;
