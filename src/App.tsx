import { useState } from "react";
import GameBoard from "./components/gameBoard";
import Player from "./components/Player/Player";
import { Iplayer } from "./components/Player/IPlayer";
import Log from "./components/Log";
import { Turn } from "./types";
import { WINNING_COMBINATIONS } from "./data";
import GameOver from "./components/GameOver";

const initialGameBoard: ("X" | "O" | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: Turn[]): "X" | "O" {
  let currentPlayer: "X" | "O" = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const [player1, setPlayer1] = useState<Iplayer>({
    name: "Player 1",
    symbol: "X",
  });
  const [player2, setPlayer2] = useState<Iplayer>({
    name: "Player 2",
    symbol: "O",
  });

  const gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner: string | undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = getWinnerName(firstSquareSymbol);
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer: "X" | "O" = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function getWinnerName(symbol: string): string {
    return symbol === player1.symbol ? player1.name : player2.name;
  }

  function handlePlayer1Change(event: React.ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value;
    player1.name = newName;
    setPlayer1((prev) => ({ ...prev, name: event.target.value }));
  }

  function handlerPlayer2Change(event: React.ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value;
    player2.name = newName;
    setPlayer2((prev) => ({ ...prev, name: event.target.value }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={player1.name}
            symbol={player1.symbol}
            isActive={activePlayer === player1.symbol}
            handleNameChange={handlePlayer1Change}
          />
          <Player
            name={player2.name}
            symbol={player2.symbol}
            isActive={activePlayer === player2.symbol}
            handleNameChange={handlerPlayer2Change}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
