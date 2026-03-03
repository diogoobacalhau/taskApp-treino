<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useAtividadeStore } from '@/stores/atividade';


    const atividadeStore = useAtividadeStore();

    onMounted(() => {
        atividadeStore.getAtividades();
    })

</script>



<template>
    <div v-for="atividade in atividadeStore.atividades" :key="atividade.id">
        <h2>{{ atividade.nome }}</h2>
    </div>
</template>