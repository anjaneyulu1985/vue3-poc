// filepath: c:\Veu\employee-management\src\components\EmployeeList.vue
<template>
  <div class="container">
    <nav class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add</router-link> |
      <router-link to="/employees">Details</router-link>
    </nav>
    <div class="card-container">
      <h2 class="title">Employee List</h2>
      <div v-for="employee in employees" :key="employee.id" 
           :class="['employee-card', employee.available ? 'available' : 'unavailable']"
           @click="editEmployee(employee.id)">
        <h3 class="employee-name">{{ employee.name }}</h3>
        <p class="employee-position">{{ employee.position }}</p>
        <p class="employee-description">{{ employee.description }}</p>
      </div>
      <router-link to="/add" class="add-button">Add</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const employees = ref([
  { id: 1, name: 'John Doe', position: 'Software Engineer', description: 'Lorem ipsum dolor sit amet...', available: true },
  { id: 2, name: 'Jane Smith', position: 'UX Designer', description: 'Consectetur adipiscing elit...', available: true },
  { id: 3, name: 'David Lee', position: 'Project Manager', description: 'Sed do eiusmod tempor...', available: false },
  { id: 4, name: 'Emily Chen', position: 'Data Scientist', description: 'Ut labore et dolore magna...', available: false }
])

const router = useRouter()

const editEmployee = (id) => {
  router.push(`/edit/${id}`)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.nav-links {
  margin-bottom: 16px;
  color: #15803d;
}

.nav-links a {
  margin: 0 8px;
  text-decoration: none;
  color: inherit;
}

.nav-links a:hover {
  text-decoration: underline;
}

.card-container {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 320px;
  background: #fff;
}

.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.employee-card {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 2px solid;
  cursor: pointer;
}

.available {
  border-color: #16a34a;
}

.unavailable {
  border-color: #dc2626;
}

.employee-name {
  font-weight: bold;
}

.employee-position {
  font-size: 0.875rem;
}

.employee-description {
  font-size: 0.75rem;
  color: #6b7280;
}

.add-button {
  background-color: #8b5cf6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.add-button:hover {
  background-color: #7c3aed;
}
</style>