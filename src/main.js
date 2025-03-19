import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

// Import PrimeVue CSS files
import 'primevue/resources/themes/vela-blue/theme.css'       // theme
import 'primevue/resources/primevue.min.css'                 // core css
import 'primeicons/primeicons.css'                           // icons

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.mount('#app')