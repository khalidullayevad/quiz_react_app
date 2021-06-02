import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8000/api/test/';
const GET_USER_API = 'http://localhost:8000/api/'
const GET_USER_ALL_API = 'http://localhost:8000/api/allUsers/'
const GET_ROLES_API = 'http://localhost:8000/api/rolesUsers/'
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getPassword(id){
    return axios.get(GET_USER_API +`getPassword/${id}`,{ headers: authHeader() })
  }
  updatePassword(data){
    return axios.put(GET_USER_API +'updatePassword',data,{ headers: authHeader() })
  }
  getAllUsers(){
    return axios.get(GET_USER_ALL_API, {headers:authHeader()});
}
 getAllRoles(){
  return axios.get(GET_ROLES_API, {headers:authHeader()});
 }
}

export default new UserService();