import axios from 'axios'
axios.defaults.withCredentials = true
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/user/login', payload)
const Register = (payload) => api.post('/user/register', payload)

const GetCurrentUser = () => api.get(`/user/get`)
const generateProfileQRCode = () => api.get(`/qrcode/profile`, {responseType:'arraybuffer'})

const GetCompany = () => api.get(`/company/get`)
const CompanyLogin = (payload) => api.post('/company_login', payload)
const CreateItem = (payload) => api.post('/company/createItem',payload)
const apis = {
    Login,
    Register,
    GetCurrentUser,
    generateProfileQRCode,
    CompanyLogin,
    CreateItem,
    GetCompany
}

export default apis