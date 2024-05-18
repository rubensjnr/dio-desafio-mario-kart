const player1 = {
  nome: 'Mario',
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  ponto: 0,
};

const player2 = {
  nome: 'Luigi',
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  ponto: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = 'Reta';
      break;
    case random < 0.66:
      result = 'Curva';
      break;
    default:
      result = 'Confronto';
      break;
  }
  return result;
}

async function logRollResult(cName, block, diceResult, att) {
  console.log(
    `${cName} rolou o dado de ${block} ${diceResult} + ${att} = ${
      diceResult + att
    }`,
  );
}

async function playRaceEngine(p1, p2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Volta número ${round}:`);

    let block = await getRandomBlock();

    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice(),
      diceResult2 = await rollDice();
    let totalTesteSkill1 = 0,
      totalTesteSkill2 = 0;

    if (block === 'Reta') {
      totalTesteSkill1 = diceResult1 + p1.velocidade;
      totalTesteSkill2 = diceResult2 + p2.velocidade;
      logRollResult(p1.nome, 'Reta', diceResult1, p1.velocidade);
      logRollResult(p2.nome, 'Reta', diceResult2, p2.velocidade);
    }
    if (block === 'Curva') {
      totalTesteSkill1 = diceResult1 + p1.manobrabilidade;
      totalTesteSkill2 = diceResult2 + p2.manobrabilidade;
      logRollResult(p1.nome, 'Curva', diceResult1, p1.manobrabilidade);
      logRollResult(p2.nome, 'Curva', diceResult2, p2.manobrabilidade);
    }
    if (block === 'Confronto') {
      let powerResult1 = diceResult1 + p1.poder,
        powerResult2 = diceResult2 + p2.poder;

      console.log(`${p1.nome} confrontou com ${p2.nome}! 🥊`);
      logRollResult(p1.nome, 'Confronto', diceResult1, p1.poder);
      logRollResult(p2.nome, 'Confronto', diceResult2, p2.poder);
      if (powerResult1 > powerResult2 && p2.ponto > 0) {
        console.log(
          `${p1.nome} venceu o confronto! ${p2.nome} perdeu um ponto!🐢`,
        );
        p2.ponto--;
      } else if (powerResult1 < powerResult2 && p1.ponto > 0) {
        console.log(
          `${p2.nome} venceu o confronto! ${p1.nome} perdeu um ponto!🐢`,
        );
        p1.ponto--;
      } else {
        console.log('Nenhum jogador perdeu ponto! Empate ou pontuação zerada.');
      }
    }

    if (totalTesteSkill1 > totalTesteSkill2) {
      console.log(`${p1.nome} marcou um ponto!`);
      p1.ponto++;
    } else if (totalTesteSkill2 > totalTesteSkill1) {
      console.log(`${p2.nome} marcou um ponto!`);
      p2.ponto++;
    }
    console.log('----------------------------------');
  }
}

async function declareWinner(p1, p2) {
  console.log('Resultado:');
  console.log(
    `${p1.nome} somou ${p1.ponto} ponto(s). \n${p2.nome} somou ${p2.ponto} ponto(s)`,
  );
  if (p1.ponto > p2.ponto)
    console.log(`\n${p1.nome} venceu a corrida, parabéns!!!🏆`);
  else if (p1.ponto < p2.ponto)
    console.log(`\n${p2.nome} venceu a corrida, parabéns!!!🏆`);
  else console.log('\nA corrida terminou empatada!!!');
}

(async function main() {
  console.log(
    `\n🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n
    `,
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
