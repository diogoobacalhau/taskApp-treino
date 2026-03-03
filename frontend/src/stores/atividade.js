import {defineStore } from 'pinia'
import {ref, inject} from 'vue'
import axios from 'axios'



export const useAtividadeStore = defineStore('atividade', () => {

    const atividades = ref([]);
    const apiBaseURL = inject('apiBaseURL') 
    const loading = ref(false);

    async function getAtividades(){
        loading.value = true;
        try{
            const response = await axios.get(`${apiBaseURL}/atividades`);
            atividades.value = response.data;
            
        }
        catch(error){
            console.error("Erro ao obter atividades:", error);
        } 
        finally{
            loading.value = false;
        }
    }
    return {
        getAtividades,
        atividades
    }







})
