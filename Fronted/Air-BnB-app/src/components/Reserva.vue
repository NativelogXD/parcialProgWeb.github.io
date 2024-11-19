<template>
  <div class="reserva-container">
    <p v-if="user">Bienvenido, {{ user.Name }} ({{ user.UserName }})</p>
    <p v-else>Usuario no disponible</p>

    <h1>Lista de Apartamentos</h1>
    <ul>
      <li v-for="apartamento in apartamentos" :key="apartamento.id">
        <button @click="goToApartamentoDetail(apartamento, user)">
          <h2>{{ apartamento.titulo }}</h2>
          <p>{{ apartamento.descripcion }}</p>
          <p><strong>Ubicación:</strong> {{ apartamento.ubicacion }}</p>
          <p><strong>Precio:</strong> ${{ apartamento.precio }}</p>
          <p>
            <strong>Disponibilidad:</strong>
            {{ apartamento.disponibilidad ? 'Disponible' : 'No disponible' }}
          </p>
        </button>
      </li>
    </ul>
    <p v-if="loading">Cargando apartamentos...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/Interfaces/User'
import type { Apartamento } from '@/Interfaces/Apartamento'
import { useApartamentoStore } from '@/stores/apartamentoStore'

export default defineComponent({
  name: 'Reserva',
  props: {
    user: {
      type: Object as () => User | null,
      required: false,
    },
  },
  setup() {
    const router = useRouter()
    const apartamentoStore = useApartamentoStore()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const apartamentos = apartamentoStore.apartamentos

    //retornar todos los apartamentos 
    const loadApartamentos = async () => {
      loading.value = true
      error.value = null
      try {
        await apartamentoStore.fetchAllApartamento()
      } catch (err) {
        error.value = 'Error al obtener los apartamentos'
      } finally {
        loading.value = false
      }
    }
//obtener detaller de apartamento
    const goToApartamentoDetail = (
      apartamento: Apartamento,
      user: User | null | undefined,
    ) => {
      if (user && apartamento) {
        router.push({
          name: 'ApartamentoDetail',
          params: {
            id : apartamento.id,
            username : user.UserName,
          },
        })
      } else {
        console.error(
          'Usuario no disponible al intentar redirigir a ApartamentoDetail',
        )
      }
    }

    onMounted(() => {
      loadApartamentos()
    })

    return {
      apartamentos,
      goToApartamentoDetail,
      loading,
      error,
    }
  },
})
</script>

<style scoped>
/* Container */
.reserva-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(247, 250, 252, 0.8) 100%);
  border-radius: 20px;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  color: #1e3a8a;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.reserva-container:hover {
  transform: translateY(-5px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
}

/* Welcome Message */
.reserva-container p:first-of-type {
  font-size: 20px;
  color: #3b82f6;
  margin-bottom: 30px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.reserva-container p:first-of-type:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.02);
}

/* Heading */
.reserva-container h1 {
  font-size: 36px;
  color: #1e40af;
  text-align: center;
  border-bottom: 3px solid #60a5fa;
  padding-bottom: 15px;
  margin-bottom: 40px;
  position: relative;
  font-weight: 700;
  letter-spacing: 1px;
}

.reserva-container h1::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: #60a5fa;
  transition: width 0.3s ease;
}

.reserva-container h1:hover::after {
  width: 150px;
}

/* Apartment List */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 25px;
}

/* Apartment Button */
button {
  width: 100%;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #bfdbfe;
  border-radius: 20px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

button:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px) scale(1.02);
  background-color: rgba(255, 255, 255, 0.9);
}

button h2 {
  font-size: 26px;
  color: #2563eb;
  margin: 0 0 15px 0;
  font-weight: 600;
}

button p {
  font-size: 18px;
  color: #4b5563;
  margin: 10px 0;
  line-height: 1.6;
}

button strong {
  font-weight: 600;
  color: #1e40af;
}

/* Loading and Error Messages */
.loading,
.error {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.loading {
  color: #2563eb;
}

.error {
  color: #dc2626;
}

.loading:hover,
.error:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}

/* Add some animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.reserva-container h1 {
  animation: pulse 3s infinite;
}
</style>