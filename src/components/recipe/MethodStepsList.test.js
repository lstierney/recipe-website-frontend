import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import MethodStepsList from "./MethodStepsList";

const METHOD_STEPS = [
    {
        ordering: 1,
        description: 'Method Step One desc'
    },
    {
        ordering: 2,
        description: 'Method Step Two desc'
    }
];

describe('MethodStepsList component', () => {
    test('renders list of MethodSteps', () => {
        // Arrange
        renderWithProviders(<MethodStepsList methodSteps={METHOD_STEPS}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByText('Method Step One desc')).toBeInTheDocument();
        expect(screen.getByText('Method Step Two desc')).toBeInTheDocument();
    });
    test('does not display "No Method Steps found" when MethodSteps are supplied', () => {
        // Arrange
        renderWithProviders(<MethodStepsList methodSteps={METHOD_STEPS}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.queryByText('No Method Steps found', {exact: false});
        expect(message).not.toBeInTheDocument();
    });
    test('displays "No Method Steps found" when no MethodSteps are supplied', () => {
        // Arrange
        renderWithProviders(<MethodStepsList/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.getByText('No Method Steps found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('does not render any MethodSteps when none are supplied', () => {
        // Arrange
        renderWithProviders(<MethodStepsList/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });


});