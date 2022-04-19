import axios from 'axios'
axios.defaults.withCredentials = true
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user_login', payload)
const Register = (payload) => api.post('/user_register', payload)

const GetUser = (id) => api.get(`/user_profile/${id}`)
const generateProfileQRCode = (id) => api.post('/qrcode/profile', {userId:id})
const apis = {
    Login,
    Register,
    GetUser,
    generateProfileQRCode
}

export default apis