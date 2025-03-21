<template>
  <div class="container">
    <nav class="nav-links">
      <a href="#" @click.prevent="showHomeView">Home View</a> |
      <a href="#" @click.prevent="showAddForm = true">ADD</a> |
      <a href="#" @click.prevent="showDetailsView">Details</a>
    </nav>
    <div v-if="!showAddForm && !showDetails" class="card-container">
      <h2 class="title">Home View</h2>
      <div v-for="employee in employees" :key="employee.id" 
           :class="['employee-card', employee.available ? 'available' : 'unavailable']">
        <h3 class="employee-name">{{ employee.name }}</h3>
        <p class="employee-position">{{ employee.position }}</p>
        <p class="employee-description">{{ employee.about }}</p>
        <button @click="viewDetails(employee)" class="details-button">View Details</button>
      </div>
      <button class="add-button" @click="showAddForm = true">Add</button>
    </div>
    <div v-else-if="showAddForm" class="add-form">
      <h2 class="title">Add</h2>
      <input v-model="newEmployee.name" placeholder="New Name" class="input-field" />
      <input v-model="newEmployee.lastname" placeholder="Lastname" class="input-field" />
      <input v-model="newEmployee.position" placeholder="Field of employment" class="input-field" />
      <h3 class="subtitle">Skills:</h3>
      <div v-for="(skill, index) in newEmployee.skills" :key="index" class="skill-input">
        <input v-model="newEmployee.skills[index]" placeholder="Skill" class="input-field" />
        <button @click="removeSkill(index)" class="remove-skill">-</button>
      </div>
      <button @click="addSkill" class="add-skill">+</button>
      <h3 class="subtitle">About:</h3>
      <textarea v-model="newEmployee.about" placeholder="About" class="input-textarea"></textarea>
      <div class="button-group">
        <button @click="showAddForm = false" class="cancel-button">Cancel</button>
        <button @click="saveEmployee" class="save-button">Save</button>
      </div>
    </div>
    <div v-else class="details-view">
      <h2 class="title">Details</h2>
      <div v-if="selectedEmployee">
        <h3 class="employee-name">{{ selectedEmployee.name }} {{ selectedEmployee.lastname }}</h3>
        <p class="employee-position">{{ selectedEmployee.position }}</p>
        <p class="employee-description">{{ selectedEmployee.description }}</p>
        <h3 class="subtitle">Skills:</h3>
        <ul class="centered-list">
          <li v-for="(skill, index) in selectedEmployee.skills" :key="index">{{ skill }}</li>
        </ul>
        <h3 class="subtitle">About:</h3>
        <p class="centered-text">{{ selectedEmployee.about }}</p>
        <div class="button-group">
          <button @click="editEmployee(selectedEmployee)" class="edit-button">Edit</button>
          <button @click="deleteEmployee(selectedEmployee.id)" class="delete-button">Delete</button>
        </div>
      </div>
      <button @click="goBack" class="back-button">Back</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showAddForm = ref(false);
const showDetails = ref(false);
const selectedEmployee = ref(null);

const employees = ref([
  { id: 1, name: 'John Doe', lastname: '', position: 'Software Engineer', description: 'Lorem ipsum dolor sit amet...', available: true, skills: ['JavaScript', 'Vue.js'], about: 'Experienced software engineer.' },
  { id: 2, name: 'Jane Smith', lastname: '', position: 'UX Designer', description: 'Consectetur adipiscing elit...', available: true, skills: ['Sketch', 'Figma'], about: 'Creative UX designer.' },
  { id: 3, name: 'David Lee', lastname: '', position: 'Project Manager', description: 'Sed do eiusmod tempor...', available: false, skills: ['Agile', 'Scrum'], about: 'Skilled project manager.' },
  { id: 4, name: 'Emily Chen', lastname: '', position: 'Data Scientist', description: 'Ut labore et dolore magna...', available: false, skills: ['Python', 'Machine Learning'], about: 'Expert data scientist.' }
]);

const newEmployee = ref({
  name: '',
  lastname: '',
  position: '',
  skills: [],
  about: ''
});

const addSkill = () => {
  newEmployee.value.skills.push('');
};

const removeSkill = (index) => {
  newEmployee.value.skills.splice(index, 1);
};

const saveEmployee = () => {
  if (selectedEmployee.value) {
    Object.assign(selectedEmployee.value, newEmployee.value);
    if(JSON.parse(localStorage.getItem('employeeDetails'))?.length>0) {
      employees.value = JSON.parse(localStorage.getItem('employeeDetails'));
      employees.value.map((emp, index)=> {  
        console.log(selectedEmployee.value.id, emp.id)
        if(emp.id == selectedEmployee.value.id) {
          employees.value[index] = selectedEmployee.value;
        }
      })
      localStorage.setItem("employeeDetails", JSON.stringify(employees.value))
      console.log(employees.value,"updated details")
    }
  } else {
    employees.value.push({
      id: employees.value.length + 1,
      name: newEmployee.value.name,
      lastname: newEmployee.value.lastname,
      position: newEmployee.value.position,
      description: newEmployee.value.about,
      available: true,
      skills: newEmployee.value.skills,
      about: newEmployee.value.about
    });
    localStorage.setItem("employeeDetails", JSON.stringify(employees.value))
  }
  newEmployee.value = { name: '', lastname: '', position: '', skills: [], about: '' };
  selectedEmployee.value = null;
  showAddForm.value = false;
};

const viewDetails = (employee) => {
  selectedEmployee.value = employee;
  showDetails.value = true;
};

const editEmployee = (employee) => {
  newEmployee.value = { ...employee };
  console.log(newEmployee.value,"new employee");
  showAddForm.value = true;
  showDetails.value = false;
};

const deleteEmployee = (id) => {
  employees.value = employees.value.filter(employee => employee.id !== id);
  localStorage.setItem("employeeDetails", JSON.stringify(employees.value))
  selectedEmployee.value = null;
  showDetails.value = false;
};

const showHomeView = () => {
  showAddForm.value = false;
  showDetails.value = false;
};

const showDetailsView = () => {
  showAddForm.value = false;
  showDetails.value = true;
};

const goBack = () => {
  selectedEmployee.value = null;
  showDetails.value = false;
};
onMounted(() => {
  if(JSON.parse(localStorage.getItem('employeeDetails'))?.length>0) {
    employees.value = JSON.parse(localStorage.getItem('employeeDetails'))
  }
})
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
  cursor: pointer;
}

.nav-links a:hover {
  text-decoration: underline;
}

.card-container, .add-form, .details-view {
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
}

.available {
  border-color: #16a34a;
}

.unavailable {
  border-color: #dc2626;
}

.add-button, .details-button, .back-button, .edit-button, .delete-button {
  background-color: #8b5cf6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  cursor: pointer;
}

.input-field, .input-textarea {
  width: 100%;
  padding: 8px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
}

.input-field::placeholder, .input-textarea::placeholder {
  color: #a0aec0; /* Placeholder text color */
}

.subtitle {
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.skill-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-skill, .remove-skill {
  background-color: #8b5cf6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cancel-button {
  background-color: #d1d5db;
  color: black;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.save-button {
  background-color: #8b5cf6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.centered-list, .centered-text {
  text-align: center;
}
</style>