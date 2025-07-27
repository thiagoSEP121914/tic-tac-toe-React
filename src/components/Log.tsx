import { Turn } from "../types";

interface LogProps {
  turns: Turn[];
}

export default function Log({ turns }: LogProps) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}> {turn.player} selected {turn.square.row} </li>
      ))}
    </ol>
  );
}
