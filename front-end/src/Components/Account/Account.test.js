import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import Account from "./Account";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../Redux/Store/store";


afterEach(() => { cleanup() })

const MockAccount = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Account />
        </BrowserRouter>
    </Provider>
)

describe('Account render', () => {

    it('render component', () => {
        render(<MockAccount />)
    })

    it('render header', () => {
        render(<MockAccount />)

        const header = screen.getByRole('heading')
        expect(header).toBeInTheDocument()
    })

    it('render from', () => {
        render(<MockAccount />)

        const form = screen.getByRole('form');
        // const form = screen.getByTestId('form-1');
        expect(form).toBeInTheDocument()
    })

})