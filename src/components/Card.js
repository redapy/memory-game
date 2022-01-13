
const Card = ({card, handleChoice}) => {

    const handleClick = () => {
        handleChoice(card)
    }
    
    return ( 
        <div className="card">
            <div>
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