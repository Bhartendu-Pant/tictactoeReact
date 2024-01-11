import React, { useState} from 'react';
import '../styles/TicTacToe.css';
import Popup from '../components/Popup';

const TicTacToe = (props) => {
  
  const userSymbol = props.userSymbol;
  const pcSymbol = userSymbol === 'X' ? 'O' : 'X';
  const [currentPlayer, setCurrentPlayer] = useState(userSymbol);
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);


 
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className='row'>
        {row.map((cell, colIndex) => (
          <button
            key={colIndex}
            className='cell'
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell === 'X' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='53'
                height='53'
                viewBox='0 0 53 53'
                fill='none'
              >
                <path
                  d='M47 6L6 47M6 6L47 47'
                  stroke='#32C4C3'
                  strokeWidth='11'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
            {cell === 'O' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='58'
                height='58'
                viewBox='0 0 58 58'
                fill='none'
              >
                <path
                  d='M15.8933 42.1067C19.3694 45.5828 24.084 47.5357 29 47.5357C33.916 47.5357 38.6306 45.5828 42.1067 42.1067C45.5828 38.6306 47.5357 33.916 47.5357 29C47.5357 24.084 45.5828 19.3694 42.1067 15.8933C38.6306 12.4172 33.916 10.4643 29 10.4643C24.084 10.4643 19.3694 12.4172 15.8933 15.8933C12.4172 19.3694 10.4643 24.084 10.4643 29C10.4643 33.916 12.4172 38.6306 15.8933 42.1067ZM48.6222 9.37779C53.8263 14.5819 56.75 21.6402 56.75 29C56.75 36.3598 53.8263 43.4181 48.6222 48.6222C43.4181 53.8263 36.3598 56.75 29 56.75C21.6402 56.75 14.5819 53.8263 9.37779 48.6222C4.17365 43.4181 1.25 36.3598 1.25 29C1.25 21.6402 4.17365 14.5819 9.37779 9.37779C14.5819 4.17365 21.6402 1.25 29 1.25C36.3598 1.25 43.4181 4.17365 48.6222 9.37779Z'
                  fill='#F7B336'
                  stroke='#F7B336'
                  strokeWidth='1.5'
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    ));
  };

  const checkForWinner = (currentBoard, symbol) => {
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[i][0] === symbol &&
        currentBoard[i][1] === symbol &&
        currentBoard[i][2] === symbol
      ) {
        return true;
      }

      if (
        currentBoard[0][i] === symbol &&
        currentBoard[1][i] === symbol &&
        currentBoard[2][i] === symbol
      ) {
        return true;
      }
    }

    if (
      currentBoard[0][0] === symbol &&
      currentBoard[1][1] === symbol &&
      currentBoard[2][2] === symbol
    ) {
      return true;
    }

    if (
      currentBoard[0][2] === symbol &&
      currentBoard[1][1] === symbol &&
      currentBoard[2][0] === symbol
    ) {
      return true;
    }

    return false;
  };

  const declareWinnerOrTie = () => {
    let winner = null;

    if (checkForWinner(board, userSymbol)) {
      winner = 'user';
     
    } else if (checkForWinner(board, pcSymbol)) {
      winner = 'pc';
      
    }

    if (winner || getAvailableCells().length === 0) {
      // Render the Popup component
      return (
        <div className='overlay'>
          <div className='popup'>
          <Popup
          winner={winner}
          userSymbol={userSymbol}
          pcSymbol={pcSymbol}
          onNewRound={() => handleNewRound()}
          onQuit={() => handleQuit()}
        />
          </div>
        </div>
      );
    }
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] === '' && currentPlayer === userSymbol) {
      const newBoard = [...board];
      newBoard[row][col] = userSymbol;
      setBoard(newBoard);

      if (checkForWinner(newBoard, userSymbol)) {
        declareWinnerOrTie();
        return;
      }

      setCurrentPlayer(pcSymbol);

      setTimeout(() => {
        makeComputerMove();
      }, 2000);
    }
    
  };

  const makeComputerMove = () => {
    const availableCells = getAvailableCells();
    if (availableCells.length === 0) {
      declareWinnerOrTie();
      return;
    }

    let blockingMove = null;

    for (const [row, col] of availableCells) {
      const newBoard = [...board];
      newBoard[row][col] = pcSymbol;

      if (checkForWinner(newBoard, pcSymbol)) {
        blockingMove = [row, col];
        break;
      }
      newBoard[row][col] = '';
    }

    if (blockingMove) {
      const [row, col] = blockingMove;
      const newBoard = [...board];
      newBoard[row][col] = pcSymbol;
      setBoard(newBoard);
    } else {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const [row, col] = availableCells[randomIndex];

      const newBoard = [...board];
      newBoard[row][col] = pcSymbol;
      setBoard(newBoard);
    }

    if (checkForWinner(board, pcSymbol)) {
      declareWinnerOrTie();
      return;
    }

    setCurrentPlayer(userSymbol);
  };

  const getAvailableCells = () => {
    const availableCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          availableCells.push([i, j]);
        }
      }
    }
    return availableCells;
  };

  const handleNewRound = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer(userSymbol);
  };

  const handleQuit = () => {
    
  };

  const renderBottomBar = () => {
      return (
        <div className='render-bottom-bar' style={{ visibility: 'visible' }}>
          <div className='user-symbol'><p>{`${userSymbol} (YOU) `}</p> <p></p></div>
          <div className='ties'> <p>TIES</p> <p></p></div>
          <div className='pc-symbol'><p>{`${pcSymbol} (CPU)`}</p> <p></p></div>
        </div>
      );
    }
    
  

  return (
    <div className='tic-tac-toe'>
      <div className='top-bar'>
        <div className='svg'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19.7188 4.28125L4.28125 19.7188M4.28125 4.28125L19.7188 19.7188" stroke="#32C4C3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M7.97449 18.0255C9.30734 19.3584 11.1151 20.1071 13 20.1071C14.8849 20.1071 16.6927 19.3584 18.0255 18.0255C19.3584 16.6927 20.1071 14.8849 20.1071 13C20.1071 11.1151 19.3584 9.30734 18.0255 7.97449C16.6927 6.64164 14.8849 5.89286 13 5.89286C11.1151 5.89286 9.30734 6.64164 7.97449 7.97449C6.64164 9.30734 5.89286 11.1151 5.89286 13C5.89286 14.8849 6.64164 16.6927 7.97449 18.0255ZM21.3085 4.6915C23.5121 6.89505 24.75 9.88371 24.75 13C24.75 16.1163 23.5121 19.105 21.3085 21.3085C19.1049 23.5121 16.1163 24.75 13 24.75C9.88371 24.75 6.89505 23.5121 4.69149 21.3085C2.48794 19.105 1.25 16.1163 1.25 13C1.25 9.88371 2.48794 6.89505 4.69149 4.6915C6.89505 2.48794 9.88371 1.25 13 1.25C16.1163 1.25 19.1049 2.48794 21.3085 4.6915Z" fill="#F7B336" stroke="#F7B336" strokeWidth="1.5" />
          </svg>
        </div>

        <div className='turn-indicator'><span className='diff-style'>{currentPlayer}</span> <span className='turn'>TURN</span></div>
        <div className='refresh-button' style={{ visibility: '' }}>
          <button className='refresh-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_15_259)">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.32 0.0289756C8.70071 -0.0888534 10.0884 0.153982 11.347 0.733693C12.6056 1.31341 13.6921 2.21011 14.5 3.33598V1.74998C14.5 1.55106 14.579 1.3603 14.7197 1.21965C14.8603 1.07899 15.0511 0.999976 15.25 0.999976C15.4489 0.999976 15.6397 1.07899 15.7803 1.21965C15.921 1.3603 16 1.55106 16 1.74998V5.99998H11.75C11.5511 5.99998 11.3603 5.92096 11.2197 5.78031C11.079 5.63965 11 5.44889 11 5.24998C11 5.05106 11.079 4.8603 11.2197 4.71965C11.3603 4.57899 11.5511 4.49998 11.75 4.49998H13.477C12.7931 3.42988 11.8107 2.58356 10.6512 2.06556C9.4917 1.54757 8.20584 1.38058 6.95248 1.58524C5.69912 1.7899 4.53316 2.35723 3.59864 3.21715C2.66412 4.07708 2.00198 5.19192 1.694 6.42398C1.67128 6.52076 1.62955 6.61206 1.57123 6.69257C1.51291 6.77308 1.43917 6.84119 1.35429 6.89294C1.26942 6.9447 1.1751 6.97906 1.07682 6.99403C0.97854 7.00901 0.878265 7.0043 0.781825 6.98017C0.685385 6.95604 0.594703 6.91298 0.515053 6.8535C0.435404 6.79401 0.368375 6.71928 0.317865 6.63366C0.267355 6.54803 0.234371 6.45322 0.220832 6.35473C0.207293 6.25625 0.213469 6.15605 0.239 6.05998C0.643544 4.4424 1.5434 2.99166 2.81279 1.91052C4.08218 0.82939 5.65766 0.171906 7.319 0.0299756L7.32 0.0289756ZM3.92 14.881C4.99199 15.5164 6.19758 15.8925 7.44068 15.9795C8.68378 16.0665 9.93001 15.8618 11.08 15.3819C12.23 14.902 13.252 14.1601 14.0646 13.2153C14.8771 12.2704 15.4577 11.1489 15.76 9.93997C15.805 9.74817 15.7728 9.54635 15.6702 9.37814C15.5676 9.20993 15.403 9.08883 15.2119 9.04101C15.0207 8.9932 14.8185 9.02251 14.6488 9.12261C14.4791 9.22271 14.3556 9.38557 14.305 9.57598C13.9969 10.8078 13.3347 11.9223 12.4002 12.782C11.4658 13.6417 10.3 14.2089 9.04688 14.4136C7.79373 14.6182 6.50809 14.4513 5.34871 13.9336C4.18933 13.4158 3.20699 12.5698 2.523 11.5H4.25C4.44891 11.5 4.63968 11.421 4.78033 11.2803C4.92098 11.1397 5 10.9489 5 10.75C5 10.5511 4.92098 10.3603 4.78033 10.2196C4.63968 10.079 4.44891 9.99998 4.25 9.99998H0V14.25C0 14.4489 0.0790176 14.6397 0.21967 14.7803C0.360322 14.921 0.551088 15 0.75 15C0.948912 15 1.13968 14.921 1.28033 14.7803C1.42098 14.6397 1.5 14.4489 1.5 14.25V12.664C2.14478 13.5623 2.96879 14.3172 3.92 14.881Z" fill="#3F5560" />
              </g>
              <defs>
                <clipPath id="clip0_15_259">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

        </div>
      </div>

      {renderBoard()}

      {renderBottomBar()}
      {declareWinnerOrTie()}
    </div>
  )
}

export default TicTacToe