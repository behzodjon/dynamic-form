<template>
  <div class="mt-20">
    <div class="container mx-auto px-10">
      <h1 class="text-3xl text-center mb-4">Dynamic form</h1>
      <DynamicForm :config="formConfig" />
    </div>
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
