<script lang="ts" setup>
const {
  status: flagsFetchStatus,
  data: flags,
  error,
  execute,
} = await useFetch<Flag[]>("/api/flags", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  immediate: false,
});

const randomFlag = ref<Flag | undefined>();
const guess = ref("");
const maxLifes = 6;
const guesses = ref<string[]>([]);

const lifes = computed(() => {
  return maxLifes - guesses.value.length;
});

const options = computed(
  () =>
    flags?.value?.map((f) => ({
      label: f.name,
      value: f.name,
    })) || []
);

const handleGetRandomFlag = () => {
  randomFlag.value =
    flags?.value?.[Math.floor(Math.random() * flags?.value?.length)];
};

const handleGuess = (userGuess: string) => {
  guess.value = "";

  if (userGuess === randomFlag.value?.name) {
    handleGetRandomFlag();
    guesses.value = [];
  } else {
    guesses.value.push(userGuess);
  }
};

watch(flags, () => {
  handleGetRandomFlag();
});

onMounted(() => {
  execute();
});

interface Flag {
  code: string;
  name: string;
  img: string;
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-if="flagsFetchStatus === 'pending'">
      <p>Loading...</p>
    </div>

    <div v-else-if="flagsFetchStatus === 'error'">
      <p>Error fetching flags: {{ error?.message }}</p>
    </div>

    <div class="max-w-[520px] flex flex-col self-center" v-else>
      <div class="flex justify-center mt-6">
        <img
          class="max-h-[300px] select-none rounded border-[0.1px] border-gray-600"
          :src="randomFlag?.img"
          user-select="none"
          draggable="false"
        />
      </div>
      <div class="flex justify-center flex-col w-full">
        <div class="p-3 mt-3 flex justify-center space-x-6">
          <Icon
            class="text-cyan-500 w-8 h-8"
            name="si:heart-alt-duotone"
            v-for="_ of lifes"
          />
        </div>

        <AutoComplete
          v-model="guess"
          :options="options"
          v-on:submit:guess="handleGuess"
        />

        <div
          class="bg-gray-800 border-[0.1px] border-gray-600 w-full rounded-lg mt-3"
        >
          <p class="p-2 text-white" v-for="guess of guesses">{{ guess }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
