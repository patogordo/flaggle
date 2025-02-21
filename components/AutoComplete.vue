<script lang="ts" setup>
interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  options: Option[];
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const modelValue = ref("");

watch(modelValue, (newVal) => {
  emit("update:modelValue", newVal);
});

const filteredOptions = computed(() => {
  return modelValue.value === ""
    ? []
    : props.options.filter((option) =>
        option.label.toLowerCase().includes(modelValue.value.toLowerCase())
      );
});
</script>

<template>
  <div class="relative w-full">
    <!-- Campo de entrada -->
    <input
      type="text"
      v-model="modelValue"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Comece a digitar..."
    />

    <!-- Lista de opções filtradas -->
    <div
      v-if="filteredOptions.length > 0"
      class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
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
</template>

