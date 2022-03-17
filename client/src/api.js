import axios from 'axios'
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/login', payload)
const Register = (payload) => api.post('./register', payload)

const GetUser = (id) => api.get(`/profile/${id}`)
const apis = {
    Login,
    Register,
    GetUser
}

export default apis