// filepath: c:\Veu\employee-management\src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'
import EmployeeList from '@/components/EmployeeList.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import EmployeeEdit from '@/views/EmployeeEdit.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/view/:id',
    name: 'EmployeeView',
    component: EmployeeView,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'EmployeeEdit',
    component: EmployeeForm,
    props: true
  },
  {
    path: '/add',
    name: 'EmployeeForm',
    component: EmployeeForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router