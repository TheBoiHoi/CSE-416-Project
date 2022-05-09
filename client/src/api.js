import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL='http://194.113.72.18:3000'
// const api=axios.create({
//     baseURL:'http://194.113.72.18:3000'
// })

const Login = (payload)=>axios.post('/user/login', payload)
const Register = (payload) => axios.post('/user/register', payload)

const GetCurrentUser = () => axios.get(`/user/get`)
const generateProfileQRCode = () => axios.get(`/qrcode/profile`, {responseType:'arraybuffer'})

const GetCompany = () => axios.get(`/company/get`)
const CompanyLogin = (payload) => axios.post('/company_login', payload)
const CreateItem = (payload) => axios.post('/company/createItem',payload)
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