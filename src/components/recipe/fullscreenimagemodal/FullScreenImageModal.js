import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: 'transparent',
        overflow: 'hidden',
    },
};

// The modal component
const FullScreenImageModal = ({isOpen, closeModal, imageUrl}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Fullscreen Image Modal"
            appElement={document.getElementById('root')}
            shouldCloseOnOverlayClick={true}
        >
            <img src={imageUrl} alt="Fullscreen" style={{width: '100%', height: '100%'}}/>
        </Modal>
    );
};

export default FullScreenImageModal;