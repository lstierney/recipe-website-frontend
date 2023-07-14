import React from 'react'
import {render} from '@testing-library/react'
import {MemoryRouter} from "react-router-dom";

export const renderWithProviders = (ui, {...renderOptions} = {}) => {
    const Wrapper = ({children}) => {
        return <MemoryRouter>{children}</MemoryRouter>
    }

    return {...render(ui, {wrapper: Wrapper, ...renderOptions})}
}