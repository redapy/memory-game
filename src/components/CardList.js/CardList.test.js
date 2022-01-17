import {render, screen } from "@testing-library/react";
import CardList from "./CardList";

describe('CardLIst Component', () => {

    //dummy data
    const cards = [
        {'src': 'test1', 'matched': false, 'id': 1},
        {'src': 'test2', 'matched': false, 'id': 2},
        {'src': 'test3', 'matched': false, 'id': 3},
        {'src': 'test4', 'matched': false, 'id': 4},
        {'src': 'test5', 'matched': false, 'id': 5},
    ];
    const mockedHandleChoice = jest.fn();
    const props = {
        cards,
        mockedHandleChoice,
        choiceOne: cards[1],
        choiceTwo: cards[4],
        disabled: false
    };

    //tests
    describe('Renders', () => {

        it('should render div grid', () => {
          render(<CardList {...props}/>)
          const divGRid = screen.getByTestId('div-grid');
          expect(divGRid).toBeInTheDocument();
        })

        it('should render a list of the cards', () => {
            render(<CardList {...props}/>)
            const cardsWrapper = screen.getAllByTestId('card-component');
            expect(cardsWrapper.length).toBe(cards.length);
        })
    })

    // describe('Calling handleChoice', () => {
    //     it('Should call handleChoice twice after clicking two cards in squence', () => {
    //         render(<CardList {...props}/>)
    //         const backImages = screen.getAllByAltText('back');
    //         expect(mockedHandleChoice).not.toHaveBeenCalled();
    //         fireEvent.click(backImages[0]);
    //         fireEvent.click(backImages[1]);
    //         expect(mockedHandleChoice).toHaveBeenCalledTimes(2)

    //     })
    //     it('Should NOT call handleChoice when the third card is Clicked after two cards have been clicked in sqence', () => {

    //     })
    // })
})