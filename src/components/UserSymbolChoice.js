import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/UserSymbolChoice.css'
import { toast } from 'react-toastify';
import copy from 'clipboard-copy'

const UserSymbolChoice = (props) => {
    const navigate = useNavigate();
   
    const [isXactive, setIsXactive] = useState(true);
    const [isOactive, setIsOactive] = useState(false);
    
    const userSymbol=props.userSymbol
    const setUserSymbol=props.setUserSymbol
    const xFillColor = isXactive ? '#192A32' : '#FAFAFA';
    const oFillColor = isOactive ? '#192A32' : '#FAFAFA';

    const handleInviteFriend=()=>{
        copy('google.com')
        toast.success('Invite link copied')
    }
    const handleSymbolX = (symbol) => {
        setUserSymbol(symbol);
        if(isXactive){
            setIsXactive(isXactive);
        }else{
            setIsXactive(!isXactive);
            setIsOactive(!isOactive);
        }
      
        
    }
    const handleSymbolO = (symbol) => {
        setUserSymbol(symbol);
        
        if(isOactive){
            setIsOactive(isOactive);
        }
        else{
            setIsOactive(!isOactive);
            setIsXactive(!isXactive);
        }
       
        
        
    }

    const handlePlayerVsComputer = () => {
        if (userSymbol) {
            navigate('/tictactoe');


        } else {
            alert('Please choose a symbol (X or O) first');
        }
    }
    return (
        <div className='user-symbol-choice-container'>
            <div className='top-bar'>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill={"none"}>
                    <path d="M19.4375 4.28125L4 19.7188M4 4.28125L19.4375 19.7188" stroke="#32C4C3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg></span>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M7.69324 18.0255C9.02609 19.3584 10.8338 20.1071 12.7188 20.1071C14.6037 20.1071 16.4114 19.3584 17.7443 18.0255C19.0771 16.6927 19.8259 14.8849 19.8259 13C19.8259 11.1151 19.0771 9.30734 17.7443 7.97449C16.4114 6.64164 14.6037 5.89286 12.7188 5.89286C10.8338 5.89286 9.02609 6.64164 7.69324 7.97449C6.36039 9.30734 5.61161 11.1151 5.61161 13C5.61161 14.8849 6.36039 16.6927 7.69324 18.0255ZM21.0273 4.6915C23.2308 6.89505 24.4688 9.88371 24.4688 13C24.4688 16.1163 23.2308 19.105 21.0273 21.3085C18.8237 23.5121 15.835 24.75 12.7188 24.75C9.60246 24.75 6.6138 23.5121 4.41024 21.3085C2.20669 19.105 0.96875 16.1163 0.96875 13C0.96875 9.88371 2.20669 6.89505 4.41024 4.6915C6.6138 2.48794 9.60246 1.25 12.7188 1.25C15.835 1.25 18.8237 2.48794 21.0273 4.6915Z" fill="#F7B336" stroke="#F7B336" strokeWidth="1.5" />
                </svg></span>
            </div>

            <div className='symbol-choice'>
                <p className='pick-player'>PICK PLAYER</p>
                <div className='choose-symbol'>
                    <button className='choice-x-btn' onClick={() => handleSymbolX('X')}><div className={`choice-X ${isXactive ? 'active-X' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M19.4375 4L4 19.4375M4 4L19.4375 19.4375" stroke={xFillColor} fill={xFillColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></div></button>
                    <button className='choice-o-btn' onClick={() => handleSymbolO('O')}><div className={`choice-O ${isOactive ? 'active-O' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path d="M7.97449 18.0255C9.30734 19.3584 11.1151 20.1071 13 20.1071C14.8849 20.1071 16.6927 19.3584 18.0255 18.0255C19.3584 16.6927 20.1071 14.8849 20.1071 13C20.1071 11.1151 19.3584 9.30734 18.0255 7.97449C16.6927 6.64164 14.8849 5.89286 13 5.89286C11.1151 5.89286 9.30734 6.64164 7.97449 7.97449C6.64164 9.30734 5.89286 11.1151 5.89286 13C5.89286 14.8849 6.64164 16.6927 7.97449 18.0255ZM21.3085 4.6915C23.5121 6.89505 24.75 9.88371 24.75 13C24.75 16.1163 23.5121 19.105 21.3085 21.3085C19.1049 23.5121 16.1163 24.75 13 24.75C9.88371 24.75 6.89505 23.5121 4.69149 21.3085C2.48794 19.105 1.25 16.1163 1.25 13C1.25 9.88371 2.48794 6.89505 4.69149 4.6915C6.89505 2.48794 9.88371 1.25 13 1.25C16.1163 1.25 19.1049 2.48794 21.3085 4.6915Z" fill={oFillColor} stroke="#192A32" strokeWidth="1.5" />
                    </svg></div></button>
                </div>
            </div>

            <div className='vs-com-button'>
                <button
                    className='vs-com-btn'
                    onClick={handlePlayerVsComputer}
                >
                    NEW GAME ( VS CPU )
                </button>

            </div>

            <div className='vs-human-button'>
                <button
                    className='vs-human-btn'

                >
                    NEW GAME ( VS HUMAN ) Coming soon
                </button>

            </div>

            <div className='invite-friend-button'>
                <button onClick={handleInviteFriend} className='invite-friend-btn'>
                    Invite your friend
                </button>
            </div>



        </div>
    )
}

export default UserSymbolChoice