<script lang="ts" setup>
interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  options: Option[];
}>();

const emit = defineEmits<{
  (event: "submit:guess", guess: string): void;
}>();

const modelValue = defineModel<string>();

const filteredOptions = computed(() => {
  return modelValue.value === ""
    ? []
    : props.options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(modelValue?.value?.toLowerCase() || "")
      );
});

const handleSubmit = () => {
  emit("submit:guess", filteredOptions?.value?.[0]?.value);
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full flex flex-row items-center justify-center gap-4 py-6"
  >
    <div class="relative w-full">
      <!-- Campo de entrada -->
      <input
        type="text"
        v-model="modelValue"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type here"
      />

      <!-- Lista de opções filtradas -->
      <div
        v-if="filteredOptions.length > 0"
        class="absolute left-0 right-0 mt-1 bg-gray-200 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
      >
        <ul class="max-h-full">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="modelValue = option.label"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>

    <button
      class="text-gray-900 bg-cyan-500 h-full px-4 py-2 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    >
      Submit
    </button>
  </form>
</template>

