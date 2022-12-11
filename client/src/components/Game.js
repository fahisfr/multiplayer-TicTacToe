/** @format */
import "../styles/game.scss";
import React, { useEffect, useState } from "react";

const initialBoard = ["", "", "", "", "", "", "", "", ""];

function Game({ socket, room }) {
  const [canPay, setCanPlay] = useState(true);
  const [board, setBoard] = useState(initialBoard);
  const [gameResult, setGameResult] = useState("");
  const [playAgin, setPlayAgin] = useState(false);

  useEffect(() => {
    socket.on("update-game", (index) => {
      updateGame(index, "0");
    });
    socket.on("play-agin", () => {
      if (playAgin) {
        setBoard(initialBoard);
        setGameResult("");
        setCanPlay(true);
      }
    });
  });
  const updateGame = (index, text) => {
    const oldBoard = [...board];
    oldBoard[index] = text;
    setBoard(oldBoard);

    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let comb of combs) {
      if (
        board[comb[0]] === board[comb[1]] &&
        board[comb[1]] === board[comb[2]] &&
        board[comb[0]] !== ""
      ) {
        console.log(oldBoard);
        setGameResult(board[comb[[0]]] == "x" ? "you won" : "you losse");
      }
    }

    if (!board.includes("")) {
      setGameResult("drew");
    }

    return;
  };

  const onClick = (index) => {
    if (canPay) {
      socket.emit("play", { index, room });
      updateGame(index, "x");
    }
  };

  return (
    <div className="game-container">
      {gameResult && (
        <div className="gameresult">
          <div className="gr">
            <h1>You win</h1>
            <button
              onClick={() => {
                socket.emit("play-agin", room);
                setPlayAgin(true);
              }}
            >
              {
                playAgin ? "Loading": "Play Agin"
              }
             
            </button>
          </div>
        </div>
      )}

      <div className="game-wrappe">
        <div className={`cell-wrappe`}>
          {board?.map((cell, index) => {
            return (
              <div key={index} className="cell" onClick={() => onClick(index)}>
                <span>{cell}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;
