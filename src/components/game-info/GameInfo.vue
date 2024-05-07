<template>
  <Button @click="visible = true">Game Info</Button>
  <Dialog v-model:visible="visible" v-if="visible" modal header="Итоги игры" class="w-full">
    <div class="flex flex-col gap-3 text-surface-600 dark:text-primary-50 text-lg p-3">
      <div v-for="message in messages" class="flex flex gap-2">
        <span class="text-surface-900 dark:text-primary-50 text-2xl">{{ message.name }}:</span>
        <span class="text-xl">{{ message.message }}</span>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Characteristics, IPlayer, IResult } from '../../types';

const props = defineProps<{
  players: IPlayer[];
  results: IResult[];
}>();

const visible = ref(false);

const resultsHandbook = computed<Record<Characteristics, Record<string, string>>>(() => {
  if (!props.results) {
    return {} as Record<Characteristics, Record<string, string>>;
  }

  return props.results.reduce(
    (acc, current) => {
      acc[current.name] = current.values;
      return acc;
    },
    {} as Record<Characteristics, Record<string, string>>
  );
});

const messages = computed(() => {
  if (!props.players.length || !visible.value || !props.results) {
    return [];
  }

  return props.players.map((player) => {
    const messages = player.characteristics.map((characteristic) => {
      if (!resultsHandbook.value[characteristic.name]) {
        return 'Неизвестное значение';
      }
      return resultsHandbook.value[characteristic.name][characteristic.value];
    });
    return {
      name: player.name,
      message: messages.join(' ')
    };
  });
});
</script>

<style scoped></style>
