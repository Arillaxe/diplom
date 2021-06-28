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
  offset?: number;
  limit?: number;
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

type createCourseDto = {
  token: string;
  formData: {
    title: string;
  };
}

type deleteCourseDto = {
  token: string;
  courseId: number;
};

class API {
  private serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;

    axios.interceptors.response.use((res) => res, (err) => {
      if (err.response.status === 401) {
        localStorage.clear();
        window.location.replace('/login');
      }

      return Promise.reject(err);
    });
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

  async getUsers({ token, offset = 0, limit = 50 }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/user?offset=${offset}&limit=${limit}`, {
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

  async getRooms({ token, offset = 0, limit = 50 }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/room?offset=${offset}&limit=${limit}`, {
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

  async getCourses({ token, offset = 0, limit = 50 }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/course?offset=${offset}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createCourse({ token, formData }: createCourseDto) {
    const response = await axios.post(`${this.serverUrl}/course/create`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async updateCourse({ token, formData }: createCourseDto) {
    const response = await axios.put(`${this.serverUrl}/course/update`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  deleteCourse({ token, courseId }: deleteCourseDto) {
    return axios.delete(`${this.serverUrl}/course/delete/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getFaculties({ token, offset = 0, limit = 50 }: getUserWithTokenDto) {
    const response = await axios.get(`${this.serverUrl}/faculty?offset=${offset}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createFaculty({ token, formData }: createCourseDto) {
    const response = await axios.post(`${this.serverUrl}/faculty/create`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async updateFaculty({ token, formData }: createCourseDto) {
    const response = await axios.put(`${this.serverUrl}/faculty/update`, { ...formData }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  deleteFaculty({ token, courseId }: deleteCourseDto) {
    return axios.delete(`${this.serverUrl}/faculty/delete/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getRequests({ token, offset = 0, limit = 50 }: any) {
    const response = await axios.get(`${this.serverUrl}/request?offset=${offset}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  }

  updateRequestStatus({ token, id, status }: any) {
    return axios.put(`${this.serverUrl}/request/updateStatus/${id}`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

const apiInstance = new API(process.env.REACT_APP_SERVER_HOST || '');

export default apiInstance;
