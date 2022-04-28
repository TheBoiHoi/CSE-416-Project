import axios from 'axios'
axios.defaults.withCredentials = true
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user/login', payload)
const Register = (payload) => api.post('/user/register', payload)

const GetCurrentUser = () => api.get(`/user/get`)
const generateProfileQRCode = () => api.get(`/qrcode/profile`, {responseType:'arraybuffer'})
const CompanyLogin = (payload) => api.post('/company/login', payload)
const apis = {
    Login,
    Register,
    GetCurrentUser,
    generateProfileQRCode,
    CompanyLogin
}

export default apis