<template>
  <div
    :key="player.name"
    class="flex flex-col border-2 p-3 gap-3 my-3 rounded-2xl"
    :style="{ borderColor: player.color }"
  >
    <div class="flex items-center justify-between">
      <div :style="{ backgroundColor: player.color }" class="w-10 h-10 rounded-xl"></div>
      <div class="flex items-center gap-3">
        <div class="text-2xl text-surface-600 dark:text-primary-50">{{ player.name }}</div>
        <Button severity="secondary" @click="$emit('edit', player)">
          <i class="pi pi-pencil"></i>
        </Button>
      </div>
    </div>
    <Divider class="my-0" />
    <div class="flex flex-col gap-3">
      <div
        v-for="characteristic in player.characteristics"
        :key="characteristic.name"
        class="flex items-center justify-between gap-3"
      >
        <div class="text-surface-600 dark:text-primary-50 text-sm">
          {{ characteristic.title }}
        </div>

        <div class="flex justify-center items-center">
          <span class="text-surface-600 dark:text-primary-50 text-lg">{{
            characteristic.value
          }}</span>
          <Button size="small" severity="secondary" class="ml-3" @click="characteristic.value++">
            <i class="pi pi-plus"></i>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPlayer } from '../../types';

defineProps<{
  player: IPlayer;
}>();

defineEmits<{
  (e: 'edit', player: IPlayer): void;
}>();
</script>

<style scoped></style>
