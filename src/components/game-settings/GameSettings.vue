<template>
  <Button @click="isVisible = true">
    <i class="pi pi-cog"></i>
  </Button>
  <Dialog v-model:visible="isVisible" modal header="Настройка игры" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-3">
      <Button label="Очистить игроков" severity="danger" @click="emit('clear-players')"></Button>

      <div v-for="result in results" class="flex flex-col">
        <Divider />
        <div class="text-lg text-surface-600 dark:text-primary-50">{{ result.title }}</div>
        <div v-for="(prop, index) in result.values" class="flex flex-col">
          <SettingsField :value="prop" @update="handleUpdateProp(result, index, $event)" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IResult } from '../../types';
import SettingsField from './SettingsField.vue';
import { updateFirestoreDocument } from '../../firebase';

const isVisible = ref(false);

defineProps<{ results: IResult[] | undefined }>();

const emit = defineEmits<{
  (e: 'clear-players'): void;
}>();

async function handleUpdateProp(result: IResult, index: number, prop: string) {
  console.log(result, index, prop);
  await updateFirestoreDocument('words', result.name, {
    ...result,
    values: {
      ...result.values,
      [index]: prop
    }
  });
}
</script>

<style scoped></style>
