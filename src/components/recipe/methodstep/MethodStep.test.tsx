import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import MethodStep from "./MethodStep";
import {MethodStepType} from "../../../types/methodStepType";

const METHOD_STEP: MethodStepType =
    {
        id: 1,
        description: 'Method Step Desc',
        number: 1
    };

describe('MethodStep component', () => {


    test('renders "STEP 1" and "Method Step Desc"', () => {
        // Arrange
        renderWithProviders(<MethodStep methodStep={METHOD_STEP} number={1}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('Method Step Desc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+Method Step Desc\s+/, {})).not.toBeInTheDocument();

        expect(screen.getByText('STEP 1', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+STEP 1\s+/, {})).not.toBeInTheDocument();
    });
});