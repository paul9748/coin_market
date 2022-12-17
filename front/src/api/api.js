import axios from 'axios';

const portNum = 3000;
const url = 'http://' + window.location.hostname + ':' + portNum + '/';

async function get(endpoint, params = '') {
  return await axios.get(url + endpoint + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

async function post(endpoint, data) {
  return await axios.post(url + endpoint, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

async function put(endpoint, data) {
  return await axios.put(url + endpoint, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

async function del(endpoint) {
  return await axios.delete(url + endpoint, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 400) {
      if (
        error.response.data.name === 'TokenExpiredError' ||
        error.response.data === 'jwt expired'
      ) {
        const originalRequest = config;
        const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
        try {
          const response = await axios.post(
            url + 'token',
            { refreshToken: refreshToken },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
              },
            }
          );
          console.log(response);
          sessionStorage.clear();
          sessionStorage.setItem('ACCESS_TOKEN', response.data.access_token);
          sessionStorage.setItem('REFRESH_TOKEN', response.data.refresh_token);
          axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
            'ACCESS_TOKEN'
          )}`;

          originalRequest.headers.Authorization = `Bearer ${sessionStorage.getItem(
            `ACCESS_TOKEN`
          )}`;

          return axios(originalRequest);
        } catch (err) {
          console.log(err);
          sessionStorage.clear();
          window.location.reload();
        }
      }
    }

    return Promise.reject(error);
  }
);

export { get, post, put, del as delete };
