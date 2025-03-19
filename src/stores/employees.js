import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref(JSON.parse(localStorage.getItem('employees')) || [])

  function saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees.value))
  }

  function addEmployee(employee) {
    employee.id = Date.now() // Simple unique ID
    employees.value.push(employee)
    saveToLocalStorage()
  }

  function updateEmployee(updatedEmployee) {
    const index = employees.value.findIndex(emp => emp.id === updatedEmployee.id)
    if (index !== -1) {
      employees.value[index] = updatedEmployee
      saveToLocalStorage()
    }
  }

  function deleteEmployee(id) {
    employees.value = employees.value.filter(emp => emp.id !== id)
    saveToLocalStorage()
  }

  function toggleAvailability(id) {
    const employee = employees.value.find(emp => emp.id === id)
    if (employee) {
      employee.available = !employee.available
      saveToLocalStorage()
    }
  }

  return { employees, addEmployee, updateEmployee, deleteEmployee, toggleAvailability }
})