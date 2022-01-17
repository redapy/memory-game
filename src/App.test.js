/* eslint-disable testing-library/no-node-access */
import {fireEvent, render, screen } from "@testing-library/react"
import App from "./App"


describe('App component', () => {

    describe('Renders', () => {
        it('Should render a div wrapper', () => {
            render(<App />)
            const divWrapper = screen.getByTestId('app-wrapper');
            expect(divWrapper).toBeInTheDocument();
        });

        it('Should render a header', () => {
            render(<App />)
            const header = screen.getByText('Magic Match');
            expect(header).toBeInTheDocument()
        })

        it('Should render a button to start new game', () => {
            render(<App />);
            const butoon = screen.getByRole('button', {name: 'New Game'})
            expect(butoon).toBeInTheDocument()
        });

        it('Should render a div grid element',() => {
            render(<App />)
            const divGrid = screen.getByTestId('div-grid')
            expect(divGrid).toBeInTheDocument()
        });

        it('Should render 12 cards', () => {
            render(<App />)
            const cards = screen.getAllByTestId('card-component')
            expect(cards.length).toBe(12);
        });

        it('Should render a p tag for number of turns', () => {
            render(<App />)
            const pElement = screen.getByText(/turns/i)
            expect(pElement).toBeInTheDocument()
        })
    })

    describe('Card container class', () => {

        it('The clicked card should has a flipped Class', () => {
            render(<App />)
            const backImages = screen.getAllByAltText('back');
            const cardContainer = screen.getAllByTestId('card-container');
            fireEvent.click(backImages[0])
            expect(cardContainer[0]).toHaveClass('flipped');
        });

        it('If two elements that are the same have been clicked in sequence they should stay flipped', () => {
            render(<App />)
            const frontImages = screen.getAllByAltText('front');
            const [imageOne, imageTwo] = frontImages.filter((image) => {
                 return image.getAttribute('src') === "/img/sword-1.png"
            });
            fireEvent.click(imageOne.nextElementSibling)
            fireEvent.click(imageTwo.nextElementSibling)
            expect(imageOne.parentElement).toHaveClass('flipped');
            expect(imageTwo.parentElement).toHaveClass('flipped');
        })

        it('If two elements that are NOT the same have been clicked in sequence they should NOT stay flipped after 1 sec', () => {
            render(<App />)
            const frontimages = screen.getAllByAltText('front');
            const imageOne = frontimages.find(image => {
                return image.getAttribute('src') === "/img/sword-1.png"
            });
            const imageTwo = frontimages.find(image => {
                return image.getAttribute('src') === "/img/shield-1.png"
            });
            fireEvent.click(imageOne.nextElementSibling);
            expect(imageOne.parentElement).toHaveClass('flipped');
            fireEvent.click(imageTwo.nextElementSibling);
            expect(imageOne.parentElement).toHaveClass('flipped');
            expect(imageTwo.parentElement).toHaveClass('flipped');
            setTimeout(() => {
                expect(imageOne.parentElement).not.toHaveClass('flipped');
                expect(imageTwo.parentElement).not.toHaveClass('flipped');
            }, 1000)         
        })

        it('Should not flipp when a third card is clicked directly after two cards have been clicked', () => {
            render(<App />)
            const backImages = screen.getAllByAltText('back');
            const cardContainer = screen.getAllByTestId('card-container');
            fireEvent.click(backImages[0]);
            fireEvent.click(backImages[1]);
            expect(cardContainer[0]).toHaveClass('flipped')
            expect(cardContainer[1]).toHaveClass('flipped')
            fireEvent.click(backImages[2])
            expect(cardContainer[2]).not.toHaveClass('flipped');
        })
    })

    describe('Increasing the turns', () => {

        it(`should increase turns when clicking two cards in sequence even they don't match`, () => {
            render(<App />)
            const frontimages = screen.getAllByAltText('front');
            const imageOne = frontimages.find(image => {
                return image.getAttribute('src') === "/img/sword-1.png"
            });
            const imageTwo = frontimages.find(image => {
                return image.getAttribute('src') === "/img/shield-1.png"
            });
            const pElement = screen.getByText(/turns/i);
            expect(pElement.textContent).toBe('Turns: 0')
            fireEvent.click(imageOne.nextElementSibling);
            fireEvent.click(imageTwo.nextElementSibling);
            setTimeout(() => {
                expect(pElement.textContent).toBe('Turns: 1')
            }, 1000);            
        })

        it('Should increase turns when clicking two cards that match in sequence', () => {
            render(<App />)
            const frontImages = screen.getAllByAltText('front');
            const [imageOne, imageTwo] = frontImages.filter(image => {
                return image.getAttribute('src') === "/img/sword-1.png"
            });
            const pElement = screen.getByText(/turns/i);
            expect(pElement.textContent).toBe('Turns: 0');
            fireEvent.click(imageOne.nextElementSibling);
            fireEvent.click(imageTwo.nextElementSibling);
            setTimeout(() => {
                expect(pElement.textContent).toBe('Turns: 1')
            }, 1000);  
        })
    })

    describe('Clicking the "new game" button', () => {

        it('Should rest turns to 0', () => {
            render(<App />)
            const backImages = screen.getAllByAltText('back');
            const pElement = screen.getByText(/turns/i);
            const butoon = screen.getByRole('button', {name: 'New Game'});
            fireEvent.click(backImages[0]);
            fireEvent.click(backImages[1]);
            setTimeout(() => {
                expect(pElement.textContent).toBe('Turns: 1')
            }, 1000);
            fireEvent.click(butoon)  
            expect(pElement.textContent).toBe('Turns: 0')
        });

        it('Should return Clicked card to not be flipped',() => {
            render(<App />)
            const backImages = screen.getAllByAltText('back');
            const butoon = screen.getByRole('button', {name: 'New Game'});
            const cardContainer = screen.getAllByTestId('card-container');
            fireEvent.click(backImages[0]);
            fireEvent.click(butoon)
            expect(cardContainer[0]).not.toHaveClass('.flipped')
        })
    })
})