<template>
  <Button @click="visible = true">Game Info</Button>
  <Dialog v-model:visible="visible" v-if="visible" modal header="Итоги игры" class="w-full">
    <div class="flex flex-col gap-3 text-surface-600 dark:text-primary-50 text-lg">
      <div v-for="(word, index) in words" :key="index" class="">
        <Divider v-if="index > 0" />
        <div>
          <div v-for="item in word" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { finalWordsGenerator } from '../../helpers';
import { IPlayer } from '../../types';

const props = defineProps<{
  players: IPlayer[];
}>();

const visible = ref(false);
const words = computed(() => finalWordsGenerator(props.players));
</script>

<style scoped></style>
