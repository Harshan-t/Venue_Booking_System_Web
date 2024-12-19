import '../styles/Success.css';
import { useNavigate } from "react-router-dom"

function Success() {
    const navigate = useNavigate();

    const handleClick= () =>{
        navigate('/home')
    }

    return (
        <div>
            <div className='success'>
                <div className="success-container">
                    <div className="tick-icon">✓</div>
                    <div className="particles">
                        <div className="particle" style={{ '--x': '-20px', '--y': '15px' }}></div>
                        <div className="particle" style={{ '--x': '25px', '--y': '-5px' }}></div>
                        <div className="particle" style={{ '--x': '25px', '--y': '-15px' }}></div>
                        <div className="particle" style={{ '--x': '-15px', '--y': '25px' }}></div>
                        <div className="particle" style={{ '--x': '-35px', '--y': '10px' }}></div>
                        <div className="particle" style={{ '--x': '35px', '--y': '-10px' }}></div>
                        <div className="particle" style={{ '--x': '-30px', '--y': '-15px' }}></div>
                        <div className="particle" style={{ '--x': '30px', '--y': '15px' }}></div>
                        <div className="particle" style={{ '--x': '15px', '--y': '35px' }}></div>
                    </div>
                    <div className='success-msg'>Booked!</div>
                    <div className='flex justify-evenly'>
                        <button className='create-btn' onClick={handleClick}>Got it!</button>
                        <button className='create-btn' onClick={() => {navigate('/book')}}>Book Another</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;