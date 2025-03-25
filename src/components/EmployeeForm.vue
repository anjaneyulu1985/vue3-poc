<template>
  <div class="container">
    <nav class="nav-links">
      <a href="#" @click.prevent="showHomeView">Home View</a> |
      <a href="#" @click.prevent="showAddForm = true">Add</a> |
      <a href="#" @click.prevent="showDetailsView">Details</a>
    </nav>
 
    <div v-if="!showAddForm && !showDetails" class="card-container">
      <h2 class="title">Home View</h2>
      <div
        v-for="employee in employeeStore.employees"
        :key="employee.id"
        :class="['employee-card', employee.available ? 'available' : 'unavailable']"
      >
        <h3 class="employee-name">{{ employee.name }} {{ employee.lastname }}</h3>
        <p class="employee-position">{{ employee.position }}</p>
        <p class="employee-description">{{ employee.about }}</p>
        <button @click="viewDetails(employee)" class="details-button">
          View Details
        </button>
      </div>
      <button class="add-button" @click="showAddForm = true">Add</button>
    </div>
 
    <div v-else-if="showAddForm" class="add-form">
      <h2 class="title">Add Employee</h2>
      <input
        v-model="newEmployee.name"
        placeholder="New Name"
        class="input-field"
      />
      <input
        v-model="newEmployee.lastname"
        placeholder="Lastname"
        class="input-field"
      />
      <input
        v-model="newEmployee.position"
        placeholder="Field of employment"
        class="input-field"
      />
      <div class="input-group">
        <label class="subtitle">Skills:</label>
        <div v-for="(skill, index) in newEmployee.skills" :key="index" class="skill-input">
          <input
            v-model="newEmployee.skills[index]"
            placeholder="Skill"
            class="input-field"
          />
          <button @click="removeSkill(index)" class="remove-skill">
            -
          </button>
        </div>
        <button @click="addSkill" class="add-skill">
          +
        </button>
      </div>
      <h3 class="subtitle">About:</h3>
      <textarea
        v-model="newEmployee.about"
        placeholder="About"
        class="input-textarea"
      ></textarea>
      <div class="button-group">
        <button @click="showAddForm = false" class="cancel-button">
          Cancel
        </button>
        <button @click="saveEmployee" class="save-button">
          Save
        </button>
      </div>
    </div>
 
    <div v-else class="details-view">
      <h2 class="title">Employee Details</h2>
      <div v-if="selectedEmployee">
        <h3 class="employee-name">
          {{ selectedEmployee.name }} {{ selectedEmployee.lastname }}
        </h3>
        <p class="employee-position">{{ selectedEmployee.position }}</p>
        <p class="employee-description">{{ selectedEmployee.about }}</p>
        <div class="input-group">
          <label class="subtitle">Skills:</label>
          <ul class="centered-list">
            <li v-for="(skill, index) in selectedEmployee.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
        <h3 class="subtitle">About:</h3>
        <p class="centered-text">{{ selectedEmployee.about }}</p>
        <div class="button-group">
          <button @click="editEmployee(selectedEmployee)" class="edit-button">
            Edit
          </button>
          <button @click="deleteEmployee(selectedEmployee.id)" class="delete-button">
            Delete
          </button>
        </div>
      </div>
      <button @click="goBack" class="back-button">
        Back
      </button>
    </div>
  </div>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useEmployeeStore } from '../stores/employees'; // Import the store
 
 const employeeStore = useEmployeeStore(); // Use the store
 
 // State variables to control view visibility and selected employee
 const showAddForm = ref(false);
 const showDetails = ref(false);
 const selectedEmployee = ref(null);
 
 // State variable for the new employee form
 const newEmployee = ref({
  name: '',
  lastname: '',
  position: '',
  skills:[],
  about: '',
 });
 
 // Function to add a new skill input
 const addSkill = () => {
  newEmployee.value.skills.push('');
 };
 
 // Function to remove a skill input
 const removeSkill = (index) => {
  newEmployee.value.skills.splice(index, 1);
 };
 
 // Function to save/update an employee
 const saveEmployee = () => {
  if (selectedEmployee.value) {
    // Update existing employee
    employeeStore.updateEmployee({ ...selectedEmployee.value, ...newEmployee.value });
  } else {
    // Add new employee
    employeeStore.addEmployee({ ...newEmployee.value });
  }
  // Reset form and hide it
  newEmployee.value = { name: '', lastname: '', position: '', skills:[], about: '' };
  selectedEmployee.value = null;
  showAddForm.value = false;
 };
 
 // Function to show employee details
 const viewDetails = (employee) => {
  selectedEmployee.value = employee;
  showDetails.value = true;
 };
 
 // Function to edit an employee
 const editEmployee = (employee) => {
  newEmployee.value = { ...employee };
  showAddForm.value = true;
  showDetails.value = false;
 };
 
 // Function to delete an employee
 const deleteEmployee = (id) => {
  employeeStore.deleteEmployee(id);
  selectedEmployee.value = null;
  showDetails.value = false;
 };
 
 // Function to show the home view
 const showHomeView = () => {
  showAddForm.value = false;
  showDetails.value = false;
 };
 
 // Function to show the details view
 const showDetailsView = () => {
  showAddForm.value = false;
  showDetails.value = true;
 };
 
 // Function to go back from details view
 const goBack = () => {
  selectedEmployee.value = null;
  showDetails.value = false;
 };
 </script>
 
 

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px auto;
}

.nav-links {
  margin-bottom: 20px;
  color: #555;
  display: flex;
  justify-content: center;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
  color: #0056b3;
}

.card-container,
.add-form,
.details-view {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.employee-card {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 2px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Needed for availability indicators */
}

.available {
  border-color: #28a745;
  background-color: #e5f5e9;
}

.unavailable {
  border-color: #dc3545;
  background-color: #f8d7da;
}

.employee-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.employee-position,
.employee-description {
  color: #555;
  margin-bottom: 10px;
}

.add-button,
.details-button,
.back-button,
.edit-button,
.delete-button {
  background-color: #8b5cf6; /* Updated to purple */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  position: relative; /* For the arrow */
  padding-right: 40px; /* Make space for the arrow */
}

.add-button:hover,
.details-button:hover,
.back-button:hover,
.edit-button:hover,
.delete-button:hover {
  background-color: #7c3aed; /* Darker purple on hover */
}

/* Arrow in the button */
.details-button::after {
  content: ">";
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: white;
}

.input-field,
.input-textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

.input-field::placeholder,
.input-textarea::placeholder {
  color: #a0aec0;
}

.subtitle {
  font-weight: bold;
  margin-top: 15px;
  text-align: left;
  color: #333;
}

.input-group {
  margin-bottom: 15px; /* Add spacing between input groups */
}

.skill-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.add-skill,
.remove-skill {
  background-color: #6c757d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: bold;
}

.add-skill:hover,
.remove-skill:hover {
  background-color: #5a6268;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.cancel-button {
  background-color: #d1d5db;
  color: black;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #a6a6a6; /* Darker grey on hover */
}

.save-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #218838;
}

.centered-list,
.centered-text {
  text-align: left;
}

.centered-list {
  list-style-type: disc;
  padding-left: 20px;
}

.employee-description {
  font-style: italic;
}

.details-button {
  background-color: #8b5cf6; /* Updated to purple */
  position: relative; /* For the arrow */
  padding-right: 40px; /* Make space for the arrow */
}

.details-button:hover {
  background-color: #7c3aed; /* Darker purple on hover */
}

/* Availability Indicators */
.employee-card::before {
  content: "";
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.available::before {
  background-color: #28a745; /* Green for available */
}

.unavailable::before {
  background-color: #dc3545; /* Red for unavailable */
}
</style>