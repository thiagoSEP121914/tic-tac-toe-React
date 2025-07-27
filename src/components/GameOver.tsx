type GameOverProps = {
    winner: string | undefined;
    restart: () => void;
}

export default function GameOver({ winner, restart }: GameOverProps ) {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      <p>{winner ? `You won ${winner}`: "Its a drawn"}</p>
      <button onClick={restart}>Rematch</button>
    </div>
  );
}
