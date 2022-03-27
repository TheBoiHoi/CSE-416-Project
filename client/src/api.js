import axios from 'axios'
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user_login', payload)
const Register = (payload) => api.post('/user_register', payload)

const GetUser = (id) => api.get(`/user_profile/${id}`)
const apis = {
    Login,
    Register,
    GetUser
}

export default apis