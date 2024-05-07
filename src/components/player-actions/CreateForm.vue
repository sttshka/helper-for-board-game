<template>
  <Button label="Добавить гаврика в игру" @click="visible = true" />

  <Dialog v-model:visible="visible" modal header="Создание гаврика" :style="{ width: '25rem' }">
    <form @submit.prevent>
      <div class="flex flex-col gap-3 mb-3">
        <label for="name" class="text-lg text-surface-600 dark:text-primary-50">Как назвать</label>
        <InputText id="name" v-model="player.name" />
      </div>
      <div class="flex flex-col gap-3 mb-3">
        <label for="color" class="text-lg text-surface-600 dark:text-primary-50">Его цвет</label>
        <div class="flex gap-2 items-center">
          <ColorPicker
            id="color"
            @update:model-value="player.color = `#${$event}`"
            :modelValue="player.color"
          />
          <Button size="small" severity="secondary" @click="player.color = randomHexColorCode()">
            <i class="pi pi-sync"></i>
          </Button>
        </div>
      </div>

      <Inplace :closable="true" class="my-3">
        <template #display>
          <span class="my-3">{{ 'Сразу внести хар-ки' }}</span>
        </template>
        <template #content>
          <div class="flex flex-col gap-3 my-3">
            <div
              v-for="characteristic in player.characteristics"
              :key="characteristic.name"
              class="flex flex-col"
            >
              <label :for="characteristic.name" class="text-surface-600 dark:text-primary-50">
                {{ characteristic.title }}
              </label>

              <InputNumber
                v-model="characteristic.value"
                :id="characteristic.name"
                :autofocus="false"
                showButtons
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
            </div>
          </div>
        </template>
      </Inplace>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Отмена" severity="secondary" @click="handleCancelForm" />
        <Button type="button" label="Создать" @click="handleSubmitForm" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { randomHexColorCode } from '../../helpers';
import { Characteristics, IPlayer } from '../../types';

const emit = defineEmits<{
  (e: 'submit', player: IPlayer): void;
}>();

const visible = ref(false);

const player = ref<IPlayer>({
  name: '',
  color: randomHexColorCode(),
  characteristics: getDefaultCharacteristics()
});

function getDefaultCharacteristics() {
  return [
    {
      title: 'Здоровье',
      name: Characteristics.HEALTH,
      value: 0
    },
    {
      title: 'Ловкость',
      name: Characteristics.AGILITY,
      value: 0
    },
    {
      title: 'Сила',
      name: Characteristics.STRENGTH,
      value: 0
    },
    {
      title: 'Харизма',
      name: Characteristics.CHARISMA,
      value: 0
    }
  ];
}

function handleCancelForm() {
  player.value = {
    name: '',
    color: randomHexColorCode(),
    characteristics: getDefaultCharacteristics()
  };
  visible.value = false;
}

function handleSubmitForm() {
  emit('submit', JSON.parse(JSON.stringify(player.value)));
  handleCancelForm();
}
</script>

<style scoped></style>
