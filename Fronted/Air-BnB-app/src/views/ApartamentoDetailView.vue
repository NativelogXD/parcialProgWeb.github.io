<template>
  <div>
    <ApartamentoDetail v-if="user && apartamento" :user="user" :apartamento="apartamento"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ApartamentoDetail from '@/components/ApartamentoDetail.vue'
import { getApartamentoByIndex } from '@/Services/ServiceApartamento'
import { getUsuarioByUserName_ } from '@/Services/ServiceUser'
import type { Apartamento } from '@/Interfaces/Apartamento'
import type { User } from '@/Interfaces/User'

export default defineComponent({
  name: 'ApartamentoDetailView',
  components: { ApartamentoDetail },
  setup() {
    console.log()
    const route = useRoute()
    const apartamento = ref<Apartamento | null>(null)
    const user = ref<User | null>(null)
    onMounted(async () => {
      const id = Number(route.params.id)
      const username = String(route.params.username)
      try {
        apartamento.value = await getApartamentoByIndex(id);
        console.log(apartamento.value)
        console.log(id)
        user.value = await getUsuarioByUserName_(username);
      } catch (error) {
        console.error('Error al cargar detalles:', error)
      }
    })

    return {
      apartamento,
      user,
    }
  },
})
</script>
