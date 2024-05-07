import { Characteristics, IPlayer } from '../types';

export const finalWordsGenerator = (players: IPlayer[]) => {
  players = Array.from(players);
  if (players === null || players.length === 0) {
    return [['No players found!']];
  }
  console.log(players);
  const messages = players.map((player) => {
    return player.characteristics.map((characteristic) => {
      if (characteristic.name === Characteristics.HEALTH) {
        switch (characteristic.value) {
          case 0:
            return `${player.name} был мертв, его тело лежало на земле, и никто не мог его спасти.`;
          case 1:
            return `${player.name} был при смерти, его тело было слабым, и он едва мог дышать.`;
          case 2:
            return `${player.name} был больным, его тело было слабым, и он часто болел`;
          case 3:
            return `${player.name} был здоровым, его тело было сильным, и он редко болел.`;
          case 4:
            return `${player.name} был неуязвимым, его тело было идеальным, и он никогда не болел.`;
          default:
            return `${player.name} вовсе не было, ни в одной переписи он не участвовал`;
        }
      }

      if (characteristic.name === Characteristics.STRENGTH) {
        switch (characteristic.value) {
          case 0:
            return `${player.name} был хилым, весь день лежал на диване и не мог подняться с места.`;
          case 1:
            return `Сильным ${player.name} назвать трудно, даже ложку он поднимал с трудом.`;
          case 2:
            return `${player.name} был средне силён, мог поднять стул, но не мог сдвинуть диван.`;
          case 3:
            return `${player.name} был силён, мог поднять тяжелый ящик, но не мог сдвинуть стену.`;
          case 4:
            return `${player.name} Иван был самым сильным, мог поднять целый дом, и никто не мог его остановить.`;
          default:
            return `В детстве ${player.name} был потерян в лесу и растерзан волками`;
        }
      }

      if (characteristic.name === Characteristics.AGILITY) {
        switch (characteristic.value) {
          case 0:
            return `${player.name} был неуклюжим, постоянно спотыкался о собственные ноги`;
          case 1:
            return `${player.name} был не очень ловким, мог споткнуться о камень, но не падал.`;
          case 2:
            return `${player.name} был средне ловким, мог бежать быстро, но не мог прыгать высоко`;
          case 3:
            return `${player.name} был ловким, мог бежать быстро и прыгать высоко, но не мог делать сложные трюки.`;
          case 4:
            return `${player.name} Иван был самым ловким, мог делать сложные трюки и бежать быстрее ветра.`;
          default:
            return `В начальной школе ${player.name} наклонился, чтобы поднять карандаш и упал на него. Дальше о нем никто не слышал`;
        }
      }

      if (characteristic.name === Characteristics.CHARISMA) {
        switch (characteristic.value) {
          case 0:
            return `${player.name} был необщительным, никто не хотел с ним разговаривать.`;
          case 1:
            return `${player.name} был не очень харизматичным, мог убедить только самого себя.`;
          case 2:
            return `${player.name} был средне харизматичным, мог убедить несколько человек, но не мог убедить толпу на концерте Паши Техника`;
          case 3:
            return `${player.name} был харизматичным, мог убедить многих, но не мог убедить всех.`;
          case 4:
            return `${player.name} был самым харизматичным, мог убедить всех, и никто не мог противостоять его словам.`;
          default:
            return `${player.name} родители были убеждены, что его не стоит рожать`;
        }
      }
    });
  });

  return messages;
};
