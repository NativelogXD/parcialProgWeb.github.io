<template>
  <div class="apartamento-container">
    <h1 class="title">Agregar Apartamento</h1>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          v-model="apartment.titulo"
          required
          placeholder="Ingrese el título"
        />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          v-model="apartment.descripcion"
          required
          placeholder="Ingrese la descripción"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="ubicacion">Ubicación</label>
        <input
          type="text"
          id="ubicacion"
          v-model="apartment.ubicacion"
          required
          placeholder="Seleccione la ubicación en el mapa"
          readonly
        />
      </div>
      <div id="map" class="map-container"></div>
      <div class="form-group">
        <label for="disponibilidad">Disponibilidad</label>
        <select id="disponibilidad" v-model="apartment.disponibilidad" required>
          <option :value="true">Disponible</option>
          <option :value="false">No disponible</option>
        </select>
      </div>
      <div class="form-group">
        <label for="imagen">URL de la Imagen</label>
        <input
          type="text"
          id="imagen"
          v-model="apartment.imagen"
          required
          placeholder="Ingrese la URL de la imagen"
        />
      </div>
      <div class="form-group">
        <label for="precio">Precio</label>
        <input
          type="number"
          id="precio"
          v-model="apartment.precio"
          required
          min="0"
          placeholder="Ingrese el precio"
        />
      </div>

      <button type="submit" class="submit-btn">Agregar Apartamento</button>
    </form>

    <h2 class="subtitle">Lista de Apartamentos</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Disponibilidad</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(apartment, index) in apartamentos" :key="apartment.id">
            <td>{{ apartment.titulo }}</td>
            <td>{{ apartment.descripcion }}</td>
            <td>{{ apartment.ubicacion }}</td>
            <td>
              <span :class="{ disponible: apartment.disponibilidad, 'no-disponible': !apartment.disponibilidad }">
                {{ apartment.disponibilidad ? 'Disponible' : 'No disponible' }}
              </span>
            </td>
            <td>
              <img :src="apartment.imagen" alt="Imagen del apartamento" width="100" />
            </td>
            <td>{{ apartment.precio }}</td>
            <td>
              <button @click="deleteApartment(apartment.id)" class="delete-btn">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="loading" class="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useApartamentoStore } from '@/stores/apartamentoStore'
import type { Apartamento } from '@/Interfaces/Apartamento'
import type { Ubicacion } from '@/Interfaces/Ubicacion'
import type { ImagenApartamento } from '@/Interfaces/ImagenApartamento'
import { useUbicacionStore } from '@/stores/ubicacionStore'
import { useApartamentoImagenStore } from '@/stores/imagenApartamentoStore'
import L from 'leaflet'

export default defineComponent({
  name: 'Apartamento',
  setup() {
    const apartamentoStore = useApartamentoStore()
    const ubicacionStore = useUbicacionStore()
    const imagenApartamentoS = useApartamentoImagenStore()

    const apartment = ref<Apartamento>({
      titulo: '',
      descripcion: '',
      ubicacion: '',
      disponibilidad: true,
      imagen: '',
      precio: 0,
      id: 0,
    })

    // Inicializar 'ubicacion' solo con los valores necesarios
    const ubicacion = ref<Ubicacion>({
      nombre: '',
      descripcion: '',
    })

    const imagenApartamento = ref<ImagenApartamento>({
      apartamento_id : 0,
      url_imagen : '',
    })

    let currentMarker: L.Marker | null = null
    let map: L.Map | null = null

    const handleSubmit = async () => {
      try {
        // Rellenamos 'ubicacion' con los datos del apartamento
        ubicacion.value.nombre = apartment.value.titulo
        ubicacion.value.descripcion = apartment.value.ubicacion

        imagenApartamento.value.apartamento_id = apartment.value.id
        imagenApartamento.value.url_imagen = apartment.value.imagen

        // Guardamos el apartamento y la ubicación
        await apartamentoStore.addApartamento({ ...apartment.value })
        await ubicacionStore.addUbicacion(ubicacion.value)
        await imagenApartamentoS.addApartamentoImage(imagenApartamento.value)

        resetForm()
      } catch (err) {
        console.error('Error adding apartment:', err)
      }
    }

    const deleteApartment = async (id: number) => {
      try {
        await apartamentoStore.deleteApartamento(id)
        await ubicacionStore.removeUbicacion(id)
      } catch (err) {
        console.error('Error deleting apartment:', err)
      }
    }

    const resetForm = () => {
      if (currentMarker && map) {
        map.removeLayer(currentMarker)
        currentMarker = null
      }
      apartment.value = {
        titulo: '',
        descripcion: '',
        ubicacion: '',
        disponibilidad: true,
        imagen: '',
        precio: 0,
        id: 0,
      }
    }

    onMounted(() => {
      map = L.map('map').setView([4.5709, -74.2973], 6)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng

        if (currentMarker && map) {
          map.removeLayer(currentMarker)
        }

        apartment.value.ubicacion = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
        currentMarker = L.marker([lat, lng])
        if (map) {
          currentMarker
            .addTo(map)
            .bindPopup(`Ubicación seleccionada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup()
        }
      })
    })

    return {
      apartamentos: apartamentoStore.apartamentos,
      loading: apartamentoStore.loading,
      error: apartamentoStore.error,
      apartment,
      handleSubmit,
      deleteApartment,
      ubicacion,
      imagenApartamento
    }
  },
})
</script>


<style scoped>
.apartamento-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.title,
.subtitle {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 2rem;
}

.subtitle {
  font-size: 1.5rem;
}

.form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #34495e;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

tr:hover {
  background-color: #f8f9fa;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.disponible {
  color: #27ae60;
  font-weight: bold;
}

.no-disponible {
  color: #e74c3c;
  font-weight: bold;
}

.loading,
.error {
  text-align: center;
  margin-top: 2rem;
  color: #e74c3c;
}

.map-container {
  height: 400px;
  margin-bottom: 1.5rem;
}
</style>