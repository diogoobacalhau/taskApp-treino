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
      const response = await axios.post(
        `${apiBaseURL}/atividades`,
        novaAtividade
      );
      console.log("Resposta do Laravel:", response.data);
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

  return {
    getAtividades,
    atividades,
    loading,
    postAtividade,
    updateAtividade,
    getAtividade
  };
});
