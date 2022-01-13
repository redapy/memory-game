import './Card.css'
const Card = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }   
    }


    return ( 
        <div data-testid="div-wrapper" className="card">
            <div data-testid="div-container" className={flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="front" />
                <img 
                    className="back" 
                    src="/img/cover.png" 
                    alt="back"
                    onClick={handleClick}
                />
            </div>
        </div>
     );
}
 
export default Card;