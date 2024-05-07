<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { IPlayer } from './types';
import { CreatePlayerForm, EditPlayerForm, PlayerCard, GameInfo } from './components';
import { useStorage } from '@vueuse/core';

const players = ref<IPlayer[]>([]);
const store = useStorage('players', players);

onMounted(() => {
  players.value = store.value;
});
watch(players, () => {
  store.value = players.value;
});

const playerToEdit = ref<IPlayer | null>(null);
function handleCreatePlayer(player: IPlayer) {
  players.value.push({ ...player, id: Date.now().toString() });
}

function handleEditPlayer(player: IPlayer) {
  const index = players.value.findIndex((p) => p.id === player.id);
  players.value[index] = player;
}

function handleDeletePlayer(playerId: string) {
  players.value = players.value.filter((p) => p.id !== playerId);
}
</script>

<template>
  <div>
    <div class="flex items-center gap-3">
      <CreatePlayerForm @submit="handleCreatePlayer" />
      <EditPlayerForm
        :player="playerToEdit"
        @edit="handleEditPlayer"
        @cancel="playerToEdit = null"
        @delete="handleDeletePlayer"
      />
      <GameInfo :players="players" v-if="players.length" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-full gap-3">
      <PlayerCard
        v-for="player in players"
        :key="player.name"
        :player="player"
        @edit="(player) => (playerToEdit = player)"
      />
    </div>
  </div>
</template>

<style scoped></style>
