<template>
  <Inplace v-model:active="isVisible" class="my-3">
    <template #display>
      <span class="my-3">{{ value }}</span>
    </template>
    <template #content>
      <form @submit.prevent="handleUpdate" class="flex flex-col gap-3">
        <InputText v-model="localValue" />
        <div class="flex gap-1">
          <Button label="Сохранить" type="submit" />
          <Button icon="pi pi-times" @click="isVisible = false" />
        </div>
      </form>
    </template>
  </Inplace>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  value: string;
}>();
const emit = defineEmits<{
  (e: 'update', value: string): void;
}>();

const isVisible = ref(false);
const localValue = ref('');

watchEffect(() => {
  localValue.value = props.value;
});

function handleUpdate() {
  emit('update', localValue.value);
  isVisible.value = false;
}
</script>

<style scoped></style>
