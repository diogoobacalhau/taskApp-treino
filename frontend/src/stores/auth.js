import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAPIStore } from './api'

export const useAuthStore = defineStore('auth', () => {
  const apiStore = useAPIStore()

  const currentUser = ref(undefined)

  const isLoggedIn = computed(() => {
    return currentUser.value !== undefined
  })

  const currentUserID = computed(() => {
    return currentUser.value?.id
  })

  const currentUserName = computed(() => {
    return currentUser.value?.name
  })

  const login = async (credentials) => {
    await apiStore.postLogin(credentials)
    const response = await apiStore.getAuthUser()
    currentUser.value = response.data
    return response.data
  }

  // NOVA FUNÇÃO: register
  const register = async (userData) => {
    // 1. Chama o apiStore para fazer o POST no Laravel
    await apiStore.postRegister(userData)
    // 2. Após o registo, o apiStore já guardou o token, então pedimos os dados do utilizador
    const response = await apiStore.getAuthUser()
    // 3. Guardamos o utilizador no estado reativo
    currentUser.value = response.data
    return response.data
  }

  const logout = async () => {
    await apiStore.postLogout()
    currentUser.value = undefined
  }

  return {
    currentUser,
    isLoggedIn,
    currentUserID,
    currentUserName,
    login,
    register, // Adicionado ao retorno
    logout,
  }
})