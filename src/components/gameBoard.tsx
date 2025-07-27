import { useState } from "react";
import { Turn } from "../types";


interface GameBoardProps {
  board: ("X" | "O" | null)[][];
  onSelectSquare: (row: number, col: number) => void;
}


export default function GameBoard({ onSelectSquare, board }: GameBoardProps) {


  //  // const [gameBoard, setGameBoard] =
  //     useState<(string | null)[][]>(initialGameBoard);

  //   function handleSelectSquare(rowIndex: number, colIndex: number) {
  //     setGameBoard((prevGameBoard) => {
  //       const updateBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateBoard;
  //     });

  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
