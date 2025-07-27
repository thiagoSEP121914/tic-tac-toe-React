import { useState } from "react";
import { Iplayer } from "./IPlayer";

interface PlayerProps extends Iplayer {
  isActive: boolean;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Player({
  name,
  symbol,
  isActive,
  handleNameChange,
}: PlayerProps) {

  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing === false ? (
          <span className="player-name">{name}</span>
        ) : (
          <input
            onChange={handleNameChange}
            placeholder="player name: "
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing === true ? "save" : "edit"}
      </button>
    </li>
  );
}
