import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import UI from './presets/ui';
import 'primeicons/primeicons.css';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(PrimeVue, {
  unstyled: true,
  pt: UI
});
app.use(ConfirmationService);
app.mount('#app');
