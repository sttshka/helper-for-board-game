<template>
  <div>
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <CreatePlayerForm @submit="handleCreatePlayer" />
        <EditPlayerForm
          :player="playerToEdit"
          @edit="handleEditPlayer"
          @cancel="playerToEdit = null"
          @delete="handleDeletePlayer"
        />
        <GameInfo :players="players" :results="results" v-if="players.length" />
      </div>
      <GameSettings :results="results" @clear-players="players = []" />
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

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { IPlayer, IResult } from './types';
import { CreatePlayerForm, EditPlayerForm, PlayerCard, GameInfo } from './components';
import { useStorage } from '@vueuse/core';
import { GameSettings } from './components/game-settings';
import { collection } from 'firebase/firestore';
import { db, getFirestoreConverter } from './firebase';
import { useFirestore } from '@vueuse/firebase';

const players = ref<IPlayer[]>([]);
const store = useStorage('players', players);

const resultsCollectionRef = collection(db, 'words').withConverter(
  getFirestoreConverter<IResult>()
);
const results = useFirestore(resultsCollectionRef);

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

<style scoped></style>
