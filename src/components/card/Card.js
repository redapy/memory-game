import './Card.css'
const Card = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }   
    }


    return ( 
        <div data-testid="card-component" className="card">
            <div data-testid="card-container" className={flipped ? 'flipped' : ''}>
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