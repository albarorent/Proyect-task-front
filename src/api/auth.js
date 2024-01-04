import axios from "./axios"

export const registerRequest = (user) => axios.post(`/register`,user)

export const loginRequest = (user) => axios.post(`/login`,user)

export const updateUserRequest = (user) => axios.put(`/updateProfile/${user.id}`,user)


export const verifyTokenRequest = () => axios.get(`/verify`)