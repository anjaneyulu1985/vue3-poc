<template>
  <div>
    <h2>Edit Employee</h2>
    <div class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model="employee.name" />
      </div>
      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" v-model="employee.email" />
      </div>
      <div class="p-field">
        <label for="position">Position</label>
        <InputText id="position" v-model="employee.position" />
      </div>
    </div>
    <Button label="Save" icon="pi pi-check" @click="saveEmployee" class="p-mt-2" />
    <Button label="Cancel" icon="pi pi-times" @click="router.push('/')" class="p-mt-2 p-ml-2" />
  </div>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employees'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const store = useEmployeeStore()
const router = useRouter()
const route = useRoute()

const employee = ref({})

onMounted(() => {
  const emp = store.employees.find(e => e.id === Number(route.params.id))
  if (emp) employee.value = { ...emp }
})

const saveEmployee = () => {
  store.updateEmployee({ ...employee.value })
  router.push('/')
}
</script>