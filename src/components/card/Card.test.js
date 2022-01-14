import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe('Card Component', () => {
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
    it('should render a div wrapper', () => {
        render(<Card {...props}/>)
        const divWrapper = screen.getByTestId('div-wrapper');
        expect(divWrapper).toBeInTheDocument();
    });

    it('should render a div container without the flipped class when flipped prop is false', () => {
        render(<Card {...props}/>)
        const divContainer = screen.getByTestId('div-container')
        expect(divContainer).toBeInTheDocument()
        expect(divContainer).not.toHaveClass('flipped')
    });

    it('should render a div container with the flipped class when flipped prop is true', () => {
        render(<Card {...props2}/>)
        const divContainer = screen.getByTestId('div-container')
        expect(divContainer).toBeInTheDocument()
        expect(divContainer).toHaveClass('flipped')
    });

    it('should render a front-image', () => {
        render(<Card {...props}/>)
        const frontImage = screen.getByAltText('front');
        expect(frontImage).toBeInTheDocument();
    });

    it('should render a back-image', () => {
        render(<Card {...props}/>)
        const backImage = screen.getByAltText('back');
        expect(backImage).toBeInTheDocument();
    })

})