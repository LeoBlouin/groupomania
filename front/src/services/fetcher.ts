import axios from 'axios'

const URL = 'http://localhost:3333'

export async function get<T>(path: string, params: any): Promise<T> {
  const { data } = await axios.get(URL + path, params)
  return data
}

export async function post<T>(path: string, params: any): Promise<T> {
  const { data } = await axios.post(URL + path, params)
  return data
}

export async function put<T>(path: string, params: any): Promise<T> {
  const { data } = await axios.put(URL + path, params)
  return data
}
