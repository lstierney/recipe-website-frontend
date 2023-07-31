import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like 'toBeInTheDocument'
import FullScreenImageModal from './FullScreenImageModal';

// Mock the 'Modal' component to prevent errors during testing
jest.mock('react-modal', () => ({
    __esModule: true,
    default: ({isOpen, onRequestClose, children}) => (
        isOpen && (
            <div role="dialog">
                <button data-testid="close-modal-button" onClick={onRequestClose}/>
                {children}
            </div>
        )
    ),
}));

describe('FullScreenImageModal', () => {
    test('should render the modal with the provided image URL', () => {
        const imageUrl = 'https://example.com/image.jpg';
        const closeModal = jest.fn(); // Mock the closeModal function

        render(<FullScreenImageModal isOpen={true} closeModal={closeModal} imageUrl={imageUrl}/>);

        // Check if the modal container is present using the "dialog" role
        const modalContainer = screen.getByRole('dialog');
        expect(modalContainer).toBeInTheDocument();

        // Check if the image with the provided URL is displayed
        const imageElement = screen.getByAltText('Fullscreen');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.src).toBe(imageUrl);

        // Close the modal
        fireEvent.click(screen.getByTestId('close-modal-button'));
        expect(closeModal).toHaveBeenCalled();
    });
});
