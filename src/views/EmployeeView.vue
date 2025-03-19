<template>
  <div>
    <h2>Employee Details</h2>
    <Card>
      <template #content>
        <p><strong>Name:</strong> {{ employee.name }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
        <p><strong>Position:</strong> {{ employee.position }}</p>
        <p><strong>Availability:</strong> {{ employee.available ? 'Available' : 'Unavailable' }}</p>
      </template>
    </Card>
    <Button label="Back" icon="pi pi-arrow-left" @click="router.push('/')" class="p-mt-2" />
  </div>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employees'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const store = useEmployeeStore()
const route = useRoute()
const router = useRouter()

const employee = ref({})

onMounted(() => {
  const emp = store.employees.find(e => e.id === Number(route.params.id))
  if (emp) employee.value = { ...emp }
})
</script>