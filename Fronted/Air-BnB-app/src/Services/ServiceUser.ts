import axios from 'axios'
import type { User } from '@/Interfaces/User'

const Base_Url = 'http://localhost:3000/usuario'

// Función para obtener un usuario por su UserName y Password
export async function getUsuarioByUserName(UserName: string, Password: string): Promise<User | null> {
  const response = await axios.get(`${Base_Url}?username=${UserName}&password=${Password}`);
  return response.data;
}

// Función para crear un nuevo usuario
export async function postUser(newUsuario: User): Promise<User> {
  const response = await axios.post(`${Base_Url}`, newUsuario);
  return response.data;
}

export async function  getUsuarioByUserName_ (UserName: string): Promise<User | null> {
  const response = await axios.get(`${Base_Url}?username=${UserName}`);
  return response.data;
}

