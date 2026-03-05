<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAtividadeStore } from '@/stores/atividade'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const route = useRoute()
const router = useRouter()
const atividadeStore = useAtividadeStore()
const nomeAtividade = ref('')





onMounted(async () => {
    // Procura a atividade pelo ID que está no URL
    const data = await atividadeStore.getAtividade(route.params.id)
    if (data) {
        nomeAtividade.value = data.nome
    }
})




async function guardarAlteracao() {
    try {
        await atividadeStore.updateAtividade(route.params.id, { nome: nomeAtividade.value })
        router.push({ name: 'atividades' }) // Volta para a lista após sucesso
    } catch (err) {
        alert("Erro ao guardar!")
    }
}
</script>















<template>
    <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">Editar Atividade</h1>
        <div class="space-y-4">
            <Input v-model="nomeAtividade" placeholder="Nome da atividade" />
            <div class="flex gap-2">
                <Button @click="guardarAlteracao">Guardar</Button>
                <Button variant="outline" @click="router.back()">Cancelar</Button>
            </div>
        </div>
    </div>
</template>