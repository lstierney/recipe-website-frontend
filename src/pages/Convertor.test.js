import {fireEvent, screen} from "@testing-library/react";
import Convertor from "./Convertor";
import {renderWithProviders} from "../utils/test-utils";

describe('Convertors page', () => {
    test('renders main <h1>', () => {
        // Arrange
        renderWithProviders(<Convertor/>);

        // Act
        // ...nothing

        // Assert
        const mainTitle = screen.getByText("Convertors", {exact: true});
        expect(mainTitle).toBeInTheDocument();
    });
    test('converts Grams to Ounces (28g = 1oz)', () => {
        // Arrange
        renderWithProviders(<Convertor/>);

        // Act
        const gramsInput = screen.getByLabelText('Grams', {exact: true});
        fireEvent.change(gramsInput, {target: {value: 28}})


        // Assert
        const ouncesInput = screen.getByLabelText("Ounces", {exact: true});
        expect(ouncesInput).toHaveValue('' + 1);
    });
    test('converts Grams to Ounces (500g = 17.5oz)', () => {
        // Arrange
        renderWithProviders(<Convertor/>);

        // Act
        const gramsInput = screen.getByLabelText('Grams', {exact: true});
        fireEvent.change(gramsInput, {target: {value: 500}})


        // Assert
        const ouncesInput = screen.getByLabelText("Ounces", {exact: true});
        expect(ouncesInput).toHaveValue('' + 17.5);
    });

    test('calculates New Quantity 2000, 4, 3, 1500', () => testPortions(2000, 4, 3, 1500));

    test('calculates New Quantity 15, 4, 3, 11.25', () => testPortions(15, 4, 3, 11.25));

});

const testPortions = (quantity, servings, newServings, newQuantity) => {
    // Arrange
    renderWithProviders(<Convertor/>);

    // Act
    fireEvent.change(screen.getByLabelText('Quantity', {exact: true}), {target: {value: quantity}})
    fireEvent.change(screen.getByLabelText('Servings', {exact: true}), {target: {value: servings}})
    fireEvent.change(screen.getByLabelText('New Servings', {exact: true}), {target: {value: newServings}})

    // Assert
    const ouncesInput = screen.getByLabelText("New Quantity", {exact: true});
    expect(ouncesInput).toHaveValue('' + newQuantity);
}