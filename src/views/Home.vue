<template>
  <div>
    <h1>Employee Management</h1>
    <Button label="Add Employee" icon="pi pi-plus" @click="showForm = true" class="p-mb-2" />
    <EmployeeForm v-if="showForm" @close="showForm = false" />
    <EmployeeList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmployeeList from '../components/EmployeeList.vue'
import EmployeeForm from '../components/EmployeeForm.vue'
import Button from 'primevue/button'

const showForm = ref(false)
</script>