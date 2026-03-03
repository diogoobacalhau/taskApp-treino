import {defineStore } from 'pinia'
import {ref, inject} from 'vue'
import axios from 'axios'



export const useAtividadeStore = defineStore('atividade', () => {

    const atividades = ref([]);
    const apiBaseURL = inject('apiBaseURL') 

    async function getAtividades(){
        try{
            const response = await axios.get(`${apiBaseURL}/atividades`);
            atividades.value = response.data;
            return atividades.value;
        }
        catch(error){
            console.error("Erro ao obter atividades:", error);
        }
    }
    return {
        getAtividades,
        atividades
    }







})
