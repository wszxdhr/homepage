export default function (axios) {
  axios.interceptors.request.use(config => config)
  axios.interceptors.response.use(data => data.data)
  return axios
}
