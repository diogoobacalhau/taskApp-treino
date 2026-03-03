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
    <template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Minhas Atividades</h1>
        
        <div v-if="atividadeStore.carregando">A carregar...</div>
        
        <div v-else-if="atividadeStore.atividades.length === 0">
            Nenhuma atividade registada.
        </div>

        <div v-else class="grid gap-4">
            <div v-for="atividade in atividadeStore.atividades" :key="atividade.id" class="border p-4 rounded shadow">
                <h2 class="text-xl font-semibold">{{ atividade.nome }}</h2>
            </div>
        </div>
    </div>
</template>
</template>