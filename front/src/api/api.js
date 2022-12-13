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

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const { config } = await error;
    const originalRequest = config;

    console.log(error);

    if (error) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
        const { data } = await axios.post(
          url + 'token',
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
          }
        );
        console.log(data);

        sessionStorage.clear();
        sessionStorage.setItem('ACCESS_TOKEN', data.accessToken);
        sessionStorage.setItem('REFRESH_TOKEN', data.refreshToken);
        isTokenRefreshing = false;
        axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
          'ACCESS_TOKEN'
        )}`;

        onTokenRefreshed(sessionStorage.getItem('ACCESS_TOKEN'));
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(async (accessToken) => {
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export { get, post, put, del as delete };
