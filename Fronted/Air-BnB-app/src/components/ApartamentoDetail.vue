<template>
  <div class="apartamento-detail">
    <p v-if="apartamento" class="welcome-message">
      Hola {{ user?.UserName }}, estás reservando el apartamento "{{
        apartamento.titulo
      }}".
    </p>
    <h1>Detalles del Apartamento</h1>
    <div class="apartamento-info" v-if="apartamento">
      <p><strong>Título:</strong> {{ apartamento.titulo }}</p>
      <p><strong>Descripción:</strong> {{ apartamento.descripcion }}</p>
      <p><strong>Ubicación:</strong> {{ apartamento.ubicacion }}</p>
      <p><strong>Precio:</strong> ${{ apartamento.precio }}</p>
      <p>
        <strong>Disponibilidad:</strong>
        <span :class="apartamento.disponibilidad ? 'disponible' : 'no-disponible'">
          {{ apartamento.disponibilidad ? 'Disponible' : 'No disponible' }}
        </span>
      </p>
    </div>
    
    <div v-if="apartamento" class="pago-info">
      <h2>Información de Pago</h2>
      <div class="monto">
        <label for="monto">Monto a pagar:</label>
        <input type="number" id="monto" v-model.number="monto" step="0.01" min="0" required />
      </div>
      <div class="metodo-pago">
        <h3>Método de pago:</h3>
        <div class="opciones-pago">
          <label class="metodo-btn">
            <input type="radio" v-model="metodoPagoSeleccionado" value="tarjeta" />
            <span>Tarjeta</span>
          </label>
          <label class="metodo-btn">
            <input type="radio" v-model="metodoPagoSeleccionado" value="transferencia" />
            <span>Transferencia</span>
          </label>
          <label class="metodo-btn">
            <input type="radio" v-model="metodoPagoSeleccionado" value="paypal" />
            <span>PayPal</span>
          </label>
        </div>
      </div>
    </div>

    
    <div v-if="apartamento" class="comentarios-section">
      <h2>Agregar Comentario</h2>
      <form @submit.prevent="agregarComentario" class="comentario-form">
        <textarea
          v-model="nuevoComentario"
          placeholder="Escribe tu comentario aquí"
          required
        ></textarea>
        <span
  v-for="(estrella, index) in 5"
  :key="index"
  class="estrella"
  :class="{ activa: index < puntuacionSeleccionada }"
  @click="seleccionarPuntuacion(index)"
>
  ★
</span>
        <button type="submit" class="comentario-btn">Agregar Comentario</button>
      </form>
    </div>
    <div v-if="apartamento" class="calificar-section">
  
 
</div>

    <div class="action-buttons">
      <button v-if="apartamento" @click="reservarApartamento" class="reservar-btn">Reservar</button>
      <button v-if="apartamento" @click="agregarAFavoritos" class="favorito-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        Agregar a Favoritos
      </button>
    </div>
    <p v-if="!apartamento" class="loading">Cargando detalles del apartamento...</p>
    <p v-if="mensaje" :class="['mensaje', { exito: esExito, error: !esExito }]">
      {{ mensaje }}
    </p>
  </div>

  <div>
   
    <router-link :to="{ name: 'Chat', params: { userId: user?.id } }">
  <button>Ir al Chat</button>
</router-link>
  </div>

</template>

<script lang="ts">
import type { Apartamento } from '@/Interfaces/Apartamento';
import type { Calificacion } from '@/Interfaces/Calificacion';
import type { Comentario } from '@/Interfaces/Comentario';
import type { User } from '@/Interfaces/User';
import { useCalificacionStore } from '@/stores/calificacionStore';
import { usecomentarioStore } from '@/stores/comentarioStore';
import { useFavoritosStore } from '@/stores/favoritoStore';
import { usePagoStore } from '@/stores/pagoStore';
import { useReservaStore } from '@/stores/reservaStore';
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'ApartamentoDetail',
  props: {
    user: {
      type: Object as () => User | null,
      required: true,
    },
    apartamento: {
      type: Object as () => Apartamento | null,
      required: true,
    },
  },
  setup(props) {
    const mensaje = ref<string | null>(null)
    const esExito = ref<boolean>(false)
    const monto = ref<number>(0)
    const metodoPagoSeleccionado = ref<string>('')
    const nuevoComentario = ref<string>('')
    const puntuacionSeleccionada = ref<number>(0)
    const calificacionStore = useCalificacionStore()
    const comentarioStore = usecomentarioStore()
    const favoritoStore = useFavoritosStore()
    const reservaStore = useReservaStore()
    const pagoStore = usePagoStore()


    const reservarApartamento = async () => {
      if (props.apartamento && props.user && metodoPagoSeleccionado != null ) {
        try {
          const reserva = await reservaStore.addReserva(props.user, props.apartamento)  
      
          const pago = await pagoStore.addPago(monto.value, reserva.id, metodoPagoSeleccionado.value)
          mensaje.value = '¡Reserva realizada con éxito!'
          esExito.value = true
        } catch (error) {
          mensaje.value = 'Error al realizar la reserva. Inténtalo de nuevo más tarde.'
          esExito.value = false
        }
      } else {
        mensaje.value = 'No se puede realizar la reserva: apartamento o usuario no disponible'
        esExito.value = false
      }
    }
  

// Método para seleccionar la estrella
const seleccionarPuntuacion = (indice: number) => {
  
  puntuacionSeleccionada.value = indice + 1
  
}


    


 
//agregar favoritos
    const agregarAFavoritos = async () => {
      try {
        const fav = await favoritoStore.crearFavorito(props.user.id, props.apartamento.id)
        mensaje.value = '¡Agregado a favoritos!'
        esExito.value = true
      } catch (error) {
        mensaje.value = 'Error al agregar el apartamento a favoritos'
        esExito.value = false
      }
    }
//agregar comentarios
    const agregarComentario = async () => {
      try {
        const comentario: Comentario = {
          apartamento_id: props.apartamento.id,
          usuario_id: props.user.id,
          comentario: nuevoComentario.value,
          username : props.user.UserName
        }
        const calificion : Calificacion ={
          apartamento_id : props.apartamento.id,
            usuario_id : props.user.id,
            puntuacion : puntuacionSeleccionada.value,
            comentario: nuevoComentario.value,
            username : props.user.UserName
        }

        if(calificion.puntuacion != 0){
          await comentarioStore.crearComentario(comentario)
        await calificacionStore.crearCalificacion(calificion)
        mensaje.value = '¡Comentario realizado con éxito!'
        esExito.value = true
        nuevoComentario.value = '' // Limpiar el campo de comentario después de enviarlo
        }
        else{
           mensaje.value = 'Agrega una calificacion para enviar tu comentario'
           esExito.value = false
        }
        
      } catch (error) {
        mensaje.value = 'Error al agregar el comentario'
        esExito.value = false
      }
    }

    return {
      mensaje,
      esExito,
      reservarApartamento,
      monto,
      metodoPagoSeleccionado,
      agregarAFavoritos,
      agregarComentario,
      nuevoComentario,
      puntuacionSeleccionada,
      seleccionarPuntuacion,
      
    }
  },
})
</script>

<style scoped>
.apartamento-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', Arial, sans-serif;
  color: #333;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-message {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 500;
}

h1, h2, h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.apartamento-info, .pago-info, .comentarios-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.apartamento-info p, .pago-info p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.disponible {
  color: #27ae60;
  font-weight: bold;
}

.no-disponible {
  color: #e74c3c;
  font-weight: bold;
}

.monto {
  margin-bottom: 1.5rem;
}

.monto label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.monto input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.monto input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.25);
}

.metodo-pago h3 {
  margin-bottom: 1rem;
}

.opciones-pago {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.metodo-btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 2px solid #3498db;
  background-color: #fff;
  color: #3498db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.metodo-btn:hover {
  background-color: #ebf5fb;
}

.metodo-btn input {
  margin-right: 0.5rem;
}

.metodo-btn input:checked + span {
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.reservar-btn, .favorito-btn, .comentario-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reservar-btn {
  background-color: #3498db;
  color: white;
}

.reservar-btn:hover {
  background-color: #2980b9;
}

.favorito-btn {
  background-color: #e74c3c;
  color: white;
}

.favorito-btn:hover {
  background-color: #c0392b;
}

.comentario-btn {
  background-color: #2ecc71;
  color: white;
}

.comentario-btn:hover {
  background-color: #27ae60;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.loading {
  text-align: center;
  color: #3498db;
  font-weight: 500;
}

.mensaje {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 500;
}

.exito {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.comentarios-section {
  margin-top: 2rem;
}

.comentario-form textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
}

.comentario-form textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.25);
}
.calificar-section {
  margin-top: 1.5rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.estrellas {
  display: flex;
  gap: 0.5rem;
  font-size: 2rem;
  cursor: pointer;
  justify-content: center;
}

.estrella {
  color: #ced4da; /* Estrellas vacías */
  transition: color 0.3s ease;
}

.estrella.activa {
  color: #000; /* Estrellas rellenas */
}

.calificar-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calificar-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .apartamento-detail {
    padding: 1rem;
  }

  .opciones-pago, .action-buttons {
    flex-direction: column;
  }
  
  .metodo-btn, .reservar-btn, .favorito-btn, .comentario-btn {
    width: 100%;
  }
}
</style>