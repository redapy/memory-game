import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe('Card Component', () => {
    //mocking
    const mockedHandleChoice = jest.fn()
    //dummy props
    const props = {
        card: { "src": "/img/helmet-1.png", 'matched': false },
        handleChoice: mockedHandleChoice,
        flipped: false,
        disabeled: false
    };
    const props2 = {
        card: { "src": "/img/helmet-1.png", 'matched': false },
        handleChoice: mockedHandleChoice,
        flipped: true,
        disabeled: false
    };
    //tests
    describe('Renders', () => {
        it('Should render a card', () => {
            render(<Card {...props}/>)
            const divWrapper = screen.getByTestId('card-component');
            expect(divWrapper).toBeInTheDocument();
        });
    
        it('Should render a div container without the flipped class when flipped prop is false', () => {
            render(<Card {...props}/>)
            const divContainer = screen.getByTestId('card-container')
            expect(divContainer).toBeInTheDocument()
            expect(divContainer).not.toHaveClass('flipped')
        });
    
        it('Should render a div container with the flipped class when flipped prop is true', () => {
            render(<Card {...props2}/>)
            const divContainer = screen.getByTestId('card-container')
            expect(divContainer).toBeInTheDocument()
            expect(divContainer).toHaveClass('flipped')
        });
    
        it('Should render a front-image', () => {
            render(<Card {...props}/>)
            const frontImage = screen.getByAltText('front');
            expect(frontImage).toBeInTheDocument();
        });
    
        it('Should render a back-image', () => {
            render(<Card {...props}/>)
            const backImage = screen.getByAltText('back');
            expect(backImage).toBeInTheDocument();
        })
    })

    describe('Calling handlChoice', () => {
        it('Should call handleChoice once when clicking a card', () => {
            render(<Card {...props}/>)
            const backImage = screen.getByAltText('back');
            fireEvent.click(backImage);
            expect(mockedHandleChoice).toHaveBeenCalled();
            expect(mockedHandleChoice).toHaveBeenCalledTimes(1);
        })
    })
})