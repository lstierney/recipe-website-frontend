import React, {isValidElement} from 'react'
import {render} from '@testing-library/react'
import {createMemoryRouter, MemoryRouter, RouterProvider} from "react-router-dom";


// https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
export const renderWithProviders = (children, routes = []) => {
    const options = isValidElement(children)
        ? {element: children, path: "/"}
        : children;

    const router = createMemoryRouter([{...options}, ...routes], {
        initialEntries: [options.path],
        initialIndex: 1,
    });

    const Wrapper = ({children}) => {
        return <MemoryRouter>{children}</MemoryRouter>
    }

    //return {...render(ui, {wrapper: Wrapper, ...renderOptions})}
    return render(<RouterProvider router={router}/>);
}