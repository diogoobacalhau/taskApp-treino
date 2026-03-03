import { defineStore } from 'pinia'
import axios from 'axios'
import { inject, ref } from 'vue'

export const useAPIStore = defineStore('api', () => {
  const API_BASE_URL = inject('apiBaseURL')
  const token = ref()

  // Função auxiliar para evitar repetir código de configuração do token
  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const postLogin = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials)
    setToken(response.data.token) // Usa a função auxiliar
    return response.data.user
  }

  // NOVA FUNÇÃO: postRegister
  const postRegister = async (userData) => {
    // Envia os dados para a rota /api/register do Laravel
    const response = await axios.post(`${API_BASE_URL}/register`, userData)
    setToken(response.data.token) // Guarda o token vindo do registo
    return response.data.user
  }

  const postLogout = async () => {
    await axios.post(`${API_BASE_URL}/logout`)
    setToken(undefined)
  }

  const getAuthUser = () => {
    return axios.get(`${API_BASE_URL}/users/me`)
  }

  return {
    postLogin,
    postRegister, // Não esquecer de exportar aqui
    postLogout,
    getAuthUser,
  }
})