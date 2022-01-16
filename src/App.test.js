/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react"
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

        beforeEach(() => {
            jest.useFakeTimers()
          });

          afterEach(() => {
            jest.runOnlyPendingTimers()
            jest.useRealTimers()
          })

        it('The clicked card should have a flipped Class', () => {
            render(<App />)
            const backImages = screen.getAllByAltText('back');
            const cardContainer = screen.getAllByTestId('card-container');
            fireEvent.click(backImages[0])
            expect(cardContainer[0]).toHaveClass('flipped');
        });

        it('If two elements that have the same src are clicked in sequence they should stay flipped', () => {
            render(<App />)
            const frontImages = screen.getAllByAltText('front');
            const [imageOne, imageTwo] = frontImages.filter((image) => {
                let attr = image.getAttribute('src');
                 return attr === "/img/sword-1.png"
            });
            fireEvent.click(imageOne.nextElementSibling)
            fireEvent.click(imageTwo.nextElementSibling)
            expect(imageOne.parentElement).toHaveClass('flipped');
            expect(imageTwo.parentElement).toHaveClass('flipped');
        })

        it('If two elements that have NOT the same src are clicked in sequence they should NOT stay flipped', () => {
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
    })
})