import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import axios from 'axios'

export const useTarefaStore = defineStore('tarefa', () => {
  const apiBaseURL = inject('apiBaseURL') // URL base configurado no main.js
  const tarefas = ref([])
  const aCarregar = ref(false)

  // Função para ler todas as tarefas (READ)
  const fetchTarefas = async () => {
    aCarregar.value = true
    try {
      const response = await axios.get(`${apiBaseURL}/tarefas`)
      tarefas.value = response.data
    } catch (error) {
      console.error("Erro ao procurar tarefas:", error)
    } finally {
      aCarregar.value = false
    }
  }

  return {
    tarefas,
    aCarregar,
    fetchTarefas
  }
})