import axios from 'axios';

type signInDto = {
  login: string;
  fullName: string;
  password: String;
}

type userExistsDto = {
  login: string;
}

type getUserWithTokenDto = {
  token: string;
}

type createUserDto = {
  token: string;
  formData: {
    lastName: string;
    name: string;
    surname: string;
    contractNumber: string;
    phone: string;
    email: string;
    roles: string[];
  };
}

type createRoomDto = {
  token: string;
  formData: {
    hostel: string;
    floor: number;
    room: number;
    place: number;
  };
}

type deleteUserDto = {
  token: string;
  userId: number;
};

type deleteRoomDto = {
  token: string;
  roomId: number;
};

class API {
  private serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  async userExists({ login }: userExistsDto) {
    const response = await axios.get(`${this.serverUrl}/user/exists/${login}`);

    return response.data;
  }

  async signIn({ login, fullName, password }: signInDto) {
    const response = await axios.post(`${this.serverUrl}/auth/signIn`, { login, fullName, password });

    return response.data;
  }

  async getUserWithToken({ token }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data;
  }

  async getUsers({ token }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createUser({ token, formData }: createUserDto) {
    const response = await axios.post(`${this.serverUrl}/auth/createUser`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async updateUser({ token, formData }: createUserDto) {
    const response = await axios.put(`${this.serverUrl}/user/update`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  deleteUser({ token, userId }: deleteUserDto) {
    return axios.delete(`${this.serverUrl}/user/delete/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getRooms({ token }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/room`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createRoom({ token, formData }: createRoomDto) {
    const response = await axios.post(`${this.serverUrl}/room/create`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async updateRoom({ token, formData }: createRoomDto) {
    const response = await axios.put(`${this.serverUrl}/room/update`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  deleteRoom({ token, roomId }: deleteRoomDto) {
    return axios.delete(`${this.serverUrl}/room/delete/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

const apiInstance = new API(process.env.REACT_APP_SERVER_HOST || '');

export default apiInstance;
