import axios from 'axios'
const api=axios.create({
    baseURL:'http://localhost:3000'
})

const Login = (payload)=>api.post('/login', payload)

const apis = {
    Login
}

export default apis