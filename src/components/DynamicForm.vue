<template>
  <form @submit.prevent="submit" class="flex flex-wrap w-full gap-4">
    <div v-for="(field, index) in fields" :key="index" :class="getFieldClasses(field)">
      <div v-if="field.type === 'text'">
        <input
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          class="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
      </div>
      <div v-if="field.type === 'date'">
        <input
          :type="field.type"
          :name="field.name"
          :required="field.required"
          class="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
      </div>
      <div v-if="field.type === 'select'">
        <select
          :name="field.name"
          :required="field.required"
          @change="handleSelectChange(field, $event)"
          class="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        >
          <option v-if="!field.required" value=""></option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
      </div>
      <div v-if="field.type === 'checkbox'">
        <input :id="field.name" :type="field.type" :name="field.name" />
        <label class="text-gray-700 font-bold ml-2" :for="field.name">{{ field.label }}</label>
      </div>
    </div>
    <div class="w-full mt-4">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fields: JSON.parse(JSON.stringify(this.config)),
    };
  },
  methods: {
    handleSelectChange(field, event) {
      if (!field.relationship || field.relationship.target !== 'city') {
        return;
      }

      const targetField = this.fields.find((f) => f.name === field.relationship.target);
      const rule = field.relationship.rules.find((r) => r.value === event.target.value);
      targetField.options = rule?.options || [];
    },
    getFieldClasses(field) {
      return field.position === 'row' ? ['w-auto'] : ['w-full'];
    },
    submit() {
      console.log('Submitted!');
    },
  },
};
</script>
