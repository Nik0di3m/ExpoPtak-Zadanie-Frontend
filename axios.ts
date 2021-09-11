import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://expo-todo.herokuapp.com',
})
export default instance
