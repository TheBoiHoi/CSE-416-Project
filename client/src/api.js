import axios from 'axios'
axios.defaults.withCredentials = true
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user/login', payload)
const Register = (payload) => api.post('/user/register', payload)

const GetCurrentUser = () => api.get(`/user`)
const generateProfileQRCode = (id) => api.get(`/qrcode/profile/${id}`, {responseType:'arraybuffer'})

const CompanyLogin = (payload) => api.post('/company_login', payload)
const GetCompany = () => api.get(`/company`)
const apis = {
    Login,
    Register,
    GetCurrentUser,
    generateProfileQRCode,
    CompanyLogin,
    GetCompany
}

export default apis