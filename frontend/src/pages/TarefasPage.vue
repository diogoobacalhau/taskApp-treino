<script setup>
import { onMounted } from 'vue'
import { useTarefaStore } from '@/stores/tarefa'
import { useAuthStore } from '@/stores/auth'

const tarefaStore = useTarefaStore()
const authStore = useAuthStore()

// Quando a página abre, dispara o pedido ao Laravel
onMounted(() => {
    tarefaStore.fetchTarefas()
})
</script>

<template>
    <div class="p-8 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">As Minhas Tarefas</h1>
            <p class="text-sm text-gray-600">Olá, {{ authStore.currentUserName }}!</p>
            <p class="text-sm text-gray-600">Olá, {{ authStore.currentUserID }}!</p>
        </div>

        <div v-if="tarefaStore.aCarregar" class="text-center py-10">
            <p class="animate-pulse text-blue-500 font-medium">A ligar ao servidor...</p>
        </div>

        <div v-else-if="tarefaStore.tarefas.length > 0" class="space-y-4">
            <div v-for="tarefa in tarefaStore.tarefas" :key="tarefa.id"
                class="bg-white p-5 rounded-lg shadow border-l-4"
                :class="tarefa.status === 'concluida' ? 'border-green-500' : 'border-yellow-500'">

                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-bold text-gray-800">{{ tarefa.nome }}</h3>
                        <p class="text-gray-600 mt-1">{{ tarefa.descricao || 'Sem descrição' }}</p>
                    </div>
                    <span class="text-xs font-semibold px-2 py-1 rounded bg-gray-100 uppercase">
                        {{ tarefa.status }}
                    </span>
                </div>

                <div class="mt-4 pt-3 border-t flex justify-between items-center text-xs text-gray-400">
                    <span>Criada por: <strong>{{ tarefa.owner?.name }}</strong></span>
                    <span>ID: #{{ tarefa.id }}</span>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
            <p class="text-gray-500">Ainda não existem tarefas na base de dados.</p>
        </div>
    </div>
</template>