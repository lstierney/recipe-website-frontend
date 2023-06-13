import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import {setupStore} from "../store";
import {MemoryRouter} from "react-router-dom";

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}