import axios from 'axios'
axios.defaults.withCredentials = true
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user/login', payload)
const Register = (payload) => api.post('/user/register', payload)

const GetCurrentUser = () => api.get(`/user`)
const generateProfileQRCode = (id) => api.get(`/qrcode/profile/${id}`, {responseType:'arraybuffer'})
const apis = {
    Login,
    Register,
    GetCurrentUser,
    generateProfileQRCode
}

export default apis