<template>
  <div>
    <h1 class="text-3xl text-center mb-4">Dynamic form</h1>
    <DynamicForm :config="formConfig" />
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue';
import formConfig from '@/assets/formConfig.json';

export default {
  components: {
    DynamicForm,
  },
  data() {
    return {
      formConfig,
    };
  },
};
</script>
