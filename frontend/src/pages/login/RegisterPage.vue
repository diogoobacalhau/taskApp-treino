<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const handleRegister = async () => {
    if (formData.value.password !== formData.value.password_confirmation) {
        toast.error("As passwords não coincidem!")
        return
    }

    toast.promise(authStore.register(formData.value), {
        loading: 'A criar conta...',
        success: (data) => {
            router.push('/')
            return `Bem-vindo, ${data?.name}!`
        },
        error: (err) => `Erro no registo: ${err.response?.data?.message || 'Erro desconhecido'}`,
    })
}
</script>

<template>
    <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow">
        <h2 class="text-2xl font-bold text-center mb-6">Criar Nova Conta</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Nome Completo</label>
                <Input v-model="formData.name" required placeholder="João Silva" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <Input v-model="formData.email" type="email" required placeholder="email@exemplo.com" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Password</label>
                <Input v-model="formData.password" type="password" required placeholder="••••••••" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Confirmar Password</label>
                <Input v-model="formData.password_confirmation" type="password" required placeholder="••••••••" />
            </div>
            
            <Button type="submit" class="w-full">Registar</Button>
            
            <p class="text-center text-sm mt-4">
                Já tem conta? 
                <router-link to="/login" class="text-blue-600 hover:underline">Faça Login</router-link>
            </p>
        </form>
    </div>
</template>