import axios from 'axios'

const URL = 'http://localhost:3333'

axios.defaults.headers.common = { Authorization: `Bearer ${sessionStorage.getItem('token')}` }

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      const data = error.response.data

      if (data && data.statusCode === 401 && data.message === 'Unauthorized') {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
      }
    } else {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export async function request<T>(method: any, path: string, params?: any): Promise<T> {
  const { data } = await axios({
    method: method,
    url: URL + path,
    data: params,
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  })

  return data
}
