<template>
  <div>
    <!-- drag & drop zone -->
    <div
      class="dropzone cursor-pointer"
      @dragover.prevent
      @dragenter.prevent
      @drop="handleDrop"
      @click="onDropZoneClick"
    >
      <p>Drag & drop a JSON file here, or click to select a file</p>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
    </div>

    <!-- json form fields to edit  -->
    <form @submit.prevent="submitForm">
      <div v-if="fields.length" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Form Fields</h2>
        <div v-for="(field, index) in fields" :key="index" class="border rounded p-4 mb-4">
          <label class="block mb-2">Type:</label>
          <select v-model="field.type" class="border rounded p-2 mb-2">
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
          </select>

          <label class="block mb-2">Label:</label>
          <input type="text" v-model="field.label" class="border rounded p-2 mb-2" />

          <label class="block mb-2">Name:</label>
          <input type="text" v-model="field.name" class="border rounded p-2 mb-2" />

          <label class="block mb-2">Placeholder:</label>
          <input type="text" v-model="field.placeholder" class="border rounded p-2 mb-2" />

          <label class="block mb-2">Required:</label>
          <input type="checkbox" v-model="field.required" class="mr-2" />
          <span class="text-gray-700">This field is required</span>

          <label class="block mb-2">Position:</label>
          <select v-model="field.position" class="border rounded p-2 mb-2 w-full">
            <option value="inline">Inline</option>
            <option value="row">Row</option>
          </select>

          <div class="mb-2" v-if="field.type === 'select'">
            <label class="block mb-2">Options:</label>
            <div v-for="(option, optionIndex) in field.options" :key="optionIndex" class="flex mb-2">
              <input type="text" v-model="option.text" class="border rounded p-2 flex-1 mr-2" />
              <input type="text" v-model="option.value" class="border rounded p-2 flex-1" />
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click.prevent="removeFieldOption(field, optionIndex)"
              >
                Remove
              </button>
            </div>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              @click.prevent="addFieldOption(field)"
            >
              Add Option
            </button>
          </div>

          <!-- if the field has relationship -->
          <div class="mb-2" v-if="field.type === 'select'">
            <div v-if="field.relationship">
              <label class="block font-bold mb-2">Relationship:</label>
              <div class="mb-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  v-if="field.relationship.enabled !== undefined"
                  v-model="field.relationship.enabled"
                />
                <span v-else class="font-bold">Relationship Enabled:</span>
              </div>

              <!-- show children options -->
              <div v-if="field.relationship.enabled">
                <div v-if="field.relationship.target">
                  <h3 class="font-bold mt-4 mb-2">Children:</h3>
                  <div v-for="(rule, ruleIndex) in field.relationship.rules" :key="ruleIndex">
                    <label class="block font-bold mb-2">Value:</label>
                    <input class="form-input w-full block sm:text-sm sm:leading-5" type="text" v-model="rule.value" />
                    <label class="block font-bold mb-2">Options:</label>
                    <div class="mb-2" v-for="(option, optionIndex) in rule.options" :key="optionIndex">
                      <input class="form-input w-2/5 block sm:text-sm sm:leading-5" type="text" v-model="option.text" />
                      <input
                        class="form-input w-2/5 block sm:text-sm sm:leading-5"
                        type="text"
                        v-model="option.value"
                      />
                      <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        @click.prevent="removeFieldRuleOption(rule, optionIndex)"
                      >
                        -
                      </button>
                    </div>
                    <button
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      @click.prevent="addFieldRuleOption(rule)"
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    onDropZoneClick() {
      this.$refs.fileInput.click();
    },

    parseFile(file) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        };
        reader.readAsText(file);
      });
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      this.fields = await this.parseFile(file);
    },

    async handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        this.fields = await this.parseFile(file);
      }
    },

    removeField(index) {
      this.fields.splice(index, 1);
    },

    addFieldOption(field) {
      field.options.push({ text: '', value: '' });
    },

    addFieldRuleOption(rule) {
      rule.options.push({
        text: '',
        value: '',
      });
    },

    removeFieldRuleOption(rule, optionIndex) {
      rule.options.splice(optionIndex, 1);
    },

    removeFieldOption(field, index) {
      field.options.splice(index, 1);
    },

    submitForm() {
      const data = JSON.stringify(this.fields, null, 2);
      const file = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'form-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style>
.dropzone {
  border: 2px dashed black;
  padding: 20px;
}
</style>
