<script setup>
import { ref, onMounted } from 'vue'
// Importante: Em algumas versões do Vue, o RouterLink precisa ser reconhecido
import { RouterLink } from 'vue-router' 
import { useAtividadeStore } from '@/stores/atividade';
import { Button } from '@/components/ui/button' 
import { Input } from '@/components/ui/input'

const atividadeStore = useAtividadeStore();
const novoNome = ref('');

async function submeterAtividade() {
  if (!novoNome.value) return;
  try {
    await atividadeStore.postAtividade({ nome: novoNome.value });
    novoNome.value = '';
  } catch (err) {
    alert("Erro ao criar!");
  }
}

onMounted(() => {
  atividadeStore.getAtividades();
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Minhas Atividades</h1>

    <div class="mb-10 p-4 border rounded-lg bg-slate-50 shadow-sm">
      <h2 class="text-lg font-bold mb-4">Nova Atividade</h2>
      <div class="flex gap-2">
        <Input v-model="novoNome" placeholder="Ex: Estudar Laravel" />
        <Button @click="submeterAtividade">Adicionar</Button>
      </div>
    </div>

    <hr class="mb-10" />

    <div v-if="atividadeStore.loading">A carregar...</div>

    <div v-else-if="atividadeStore.atividades.length === 0">
      Nenhuma atividade registada.
    </div>

    <div v-else class="grid gap-4">
      <div v-for="atividade in atividadeStore.atividades" :key="atividade.id" 
           class="border p-4 rounded shadow flex justify-between items-center">
        
        <h2 class="text-xl font-semibold">{{ atividade.id }} - {{ atividade.nome }}</h2>
        
        <router-link :to="{ name: 'atividades.editar', params: { id: atividade.id } }">
          <Button variant="outline">Editar</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>