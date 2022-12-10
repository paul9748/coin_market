import axios from 'axios';

const portNum = 3000;
const url = 'http://' + window.location.hostname + ':' + portNum + '/';

async function get(endpoint, params = '') {
  return await axios.get(url + endpoint + params, {
    headers: {
      Authentication: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

async function post(endpoint, data) {
  return axios.post(url + endpoint, data);
}

async function put(endpoint, data) {
  return axios.put(url + endpoint, data, {
    headers: {
      Authentication: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

async function del(endpoint) {
  return axios.delete(url + endpoint, {
    headers: {
      Authentication: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
}

// // 요청 인터셉터 추가하기
// axios.interceptors.request.use(
//   function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 추가하기
// axios.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     return response;
//   },
//   function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

export { get, post, put, del as delete };
