<template>
  <Dialog
    :visible="!!player"
    modal
    header="Редактирование гаврика"
    :style="{ width: '25rem' }"
    @update:visible="handleUpdateVisible"
  >
    <form @submit.prevent v-if="localChanges">
      <div class="flex flex-col gap-3 mb-3">
        <label for="name" class="text-lg text-surface-600 dark:text-primary-50">Изменить имя</label>
        <InputText id="name" v-model="localChanges.name" />
      </div>
      <div class="flex flex-col gap-3 mb-3">
        <label for="color" class="text-lg text-surface-600 dark:text-primary-50"
          >Изменить цвет</label
        >
        <div class="flex gap-2 items-center">
          <ColorPicker
            id="color"
            @update:model-value="localChanges.color = `#${$event}`"
            :modelValue="localChanges.color"
          />
          <Button
            size="small"
            severity="secondary"
            @click="localChanges.color = randomHexColorCode()"
          >
            <i class="pi pi-sync"></i>
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-3 my-3">
        <div
          v-for="characteristic in localChanges.characteristics"
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

      <ConfirmPopup></ConfirmPopup>
      <div class="flex justify-between gap-2">
        <Button type="button" label="Отмена" severity="secondary" @click="emit('cancel')" />
        <Button type="submit" label="Удалить" severity="danger" @click="confirmDelete($event)" />
        <Button type="button" label="Сохранить" @click="handleSubmitForm" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { IPlayer } from '../../types';
import { randomHexColorCode } from '../../helpers';
import { ref, watchEffect } from 'vue';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from 'primevue/useconfirm';

const props = withDefaults(
  defineProps<{
    player: IPlayer | null;
  }>(),
  {
    player: null
  }
);

const emit = defineEmits<{
  (e: 'edit', player: IPlayer): void;
  (e: 'cancel'): void;
  (e: 'delete', playerId: string): void;
}>();

const localChanges = ref<IPlayer | null>();

watchEffect(() => {
  localChanges.value = props.player ? JSON.parse(JSON.stringify(props.player)) : null;
});

const confirm = useConfirm();

const confirmDelete = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Точно удалить?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',

    accept: () => {
      handleDelete();
    }
  });
};

function handleUpdateVisible(visible: boolean) {
  if (!visible) {
    emit('cancel');
  }
}

function handleSubmitForm() {
  emit('edit', JSON.parse(JSON.stringify(localChanges.value)));
  emit('cancel');
}

function handleDelete() {
  if (props.player && props.player.id) {
    emit('delete', props.player.id);
  }
  emit('cancel');
}
</script>

<style scoped></style>
