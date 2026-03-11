import { defineStore } from "pinia";
import { ref, inject } from "vue";
import axios from "axios";

export const useAtividadeStore = defineStore("atividade", () => {
  const atividades = ref([]);
  const apiBaseURL = inject("apiBaseURL");
  const loading = ref(false);

  async function getAtividades() {
    loading.value = true;
    try {
        const response = await axios.get(`${apiBaseURL}/atividades`);
        atividades.value = response.data;
    } catch (error) {
        console.error("Erro ao obter atividades:", error);
    } finally {
        loading.value = false;
    }
  }

  async function postAtividade(novaAtividade) {
    try {
      const response = await axios.post( `${apiBaseURL}/atividades`,novaAtividade);

      atividades.value.push(response.data);
      
    } catch (error) {
      console.error("erro ao criar atividade", error);
      throw error;
    }
  }

  async function updateAtividade(id, dadosEditados) {
    try {

      const response = await axios.put(`${apiBaseURL}/atividades/${id}`, dadosEditados);
      
      const index = atividades.value.findIndex(at => at.id === id);
    
      if (index !== -1) {
        // Substituir pelos dados atualizados que vieram do servidor
        atividades.value[index] = response.data;
      }

    } catch (error) {
      console.error("Erro ao atualizar", error);
    }
  }

  async function getAtividade(id) {
    loading.value = true;
    try {
        const response = await axios.get(`${apiBaseURL}/atividades/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar atividade:", error);
    } finally {
        loading.value = false;
    }
  }

  async function deleteAtividade(id) {
    try {
        // 1. Envia o pedido de eliminação para o Laravel
        await axios.delete(`${apiBaseURL}/atividades/${id}`);

        // 2. Filtra a lista local: "Cria uma lista nova onde NÃO esteja o ID que apaguei"
        atividades.value = atividades.value.filter(at => at.id !== id);

    } catch (error) {
        console.error("Erro ao apagar atividade:", error);
        throw error; // Lança o erro para o componente saber que falhou
    }
  }

  return {
    getAtividades,
    atividades,
    loading,
    postAtividade,
    updateAtividade,
    getAtividade,
    deleteAtividade
  };
});
