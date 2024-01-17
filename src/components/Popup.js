import React from 'react';
import '../styles/Popup.css';

const Popup = ({ winner, userSymbol, pcSymbol, onNewRound, onQuit }) => {
  const getWinnerText = () => {
    if (winner === 'user') {
      return 'You Won!';
    } else if (winner === 'pc') {
      return 'You Lost!';
    } else {
      return "It's a Tie!";
    }
  };

  const getRoundText = () => {
    if (winner === 'user' || winner === 'pc') {
      return `${winner === "user" ? userSymbol : pcSymbol}`;
    } else {
      return 'noOne';
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="top-bar">
          <p>{getWinnerText()}</p>
        </div>
        <div className="content">
          {getRoundText() === 'X' &&

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.7188 4.28125L4.28125 19.7188M4.28125 4.28125L19.7188 19.7188" stroke="#32C4C3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

          {getRoundText() === 'O' &&
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M10.4491 25.5509C12.4517 27.5535 15.1679 28.6786 18 28.6786C20.8321 28.6786 23.5483 27.5535 25.5509 25.5509C27.5535 23.5483 28.6786 20.8321 28.6786 18C28.6786 15.1679 27.5535 12.4517 25.5509 10.4491C23.5483 8.44649 20.8321 7.32143 18 7.32143C15.1679 7.32143 12.4517 8.44649 10.4491 10.4491C8.44649 12.4517 7.32143 15.1679 7.32143 18C7.32143 20.8321 8.44649 23.5483 10.4491 25.5509ZM29.844 6.15596C32.9853 9.2972 34.75 13.5576 34.75 18C34.75 22.4424 32.9853 26.7028 29.844 29.844C26.7028 32.9853 22.4424 34.75 18 34.75C13.5576 34.75 9.2972 32.9853 6.15596 29.844C3.01473 26.7028 1.25 22.4424 1.25 18C1.25 13.5576 3.01473 9.2972 6.15596 6.15596C9.2972 3.01473 13.5576 1.25 18 1.25C22.4424 1.25 26.7028 3.01473 29.844 6.15596Z" fill="#F7B336" stroke="#F7B336" strokeWidth="1.5" />
            </svg>
          }
          {
            getRoundText()==='noOne' && <p>NO ONE</p>
          }
       
          <p> takes the round</p>
        </div>
        <div className="bottom-bar">
            <button className='quit' onClick={onQuit}>QUIT</button>
          <button className='next' onClick={onNewRound}>NEXT ROUND</button>
          
        </div>
      </div>
      </div>
      );
};

      export default Popup;
