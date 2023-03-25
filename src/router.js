import { createRouter, createWebHistory } from 'vue-router';
import DynamicFormPage from './pages/DynamicFormPage.vue';
import ToolBoxPage from './pages/ToolBoxPage.vue';

const routes = [
  { path: '/', component: DynamicFormPage },
  { path: '/toolBox', component: ToolBoxPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
