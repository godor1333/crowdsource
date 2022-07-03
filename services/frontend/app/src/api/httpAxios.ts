import axios, { AxiosInstance } from 'axios'

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:5000/'
    : 'http://localhost:5000/'

export const clientBase =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080'
    : 'http://localhost:8080'

export const socketPath = '/api/socket.io'

export const socketURL =
  process.env.NODE_ENV === 'production' ? 'localhost:5000' : 'localhost:5000'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true
})
