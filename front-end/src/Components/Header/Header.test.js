import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../Redux/Store/store";

import Header from "./Header";


const MockHeader = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    </Provider>
)

afterEach(() => { cleanup() })

describe('Header render', () => {

    it('render test', async () => {
        render(<MockHeader />)

        const title = screen.getByRole('heading')
        expect(title).toBeInTheDocument();
    })

    it('render home btn', async () => {
        render(<MockHeader />)

        const homeBtn = screen.getByRole('link', { name: 'Home' })
        expect(homeBtn).toBeInTheDocument()
    })

    it('render account btn', async () => {
        render(<MockHeader />)

        const accountBtn = screen.queryByRole('link', { name: 'Account' });
        expect(accountBtn).not.toBeInTheDocument()
    })

    it('render polls btn', async () => {
        render(<MockHeader />)

        const pollsBtn = screen.queryByRole('link', { name: 'Polls' })
        expect(pollsBtn).not.toBeInTheDocument()
    })

    it('render login btn', async () => {
        render(<MockHeader />)

        const loginBtn = screen.getByRole('link', { name: 'Login/Registry' })
        expect(loginBtn).toBeInTheDocument()
    })

    it('render logout btn', async () => {
        render(<MockHeader />)

        const loginBtn = screen.queryByRole('link', { name: 'Logout' })
        expect(loginBtn).not.toBeInTheDocument()
    })
})

describe('Header click btn', () => {


    it('click home btn', async () => {
        render(<MockHeader />)

        const homeBtn = screen.getByRole('link', { name: 'Home' })
        fireEvent.click(homeBtn)
        expect(window.location.pathname).toBe('/')
    })

    it('click login btn', async () => {
        render(<MockHeader />)

        const loginBtn = screen.getByRole('link', { name: 'Login/Registry' })
        fireEvent.click(loginBtn)
        expect(window.location.pathname).toBe('/login')
    })

});