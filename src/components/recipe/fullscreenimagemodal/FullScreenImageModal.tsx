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

type Props = {
    isOpen: boolean,
    imageUrl: string,
    closeModal: () => void
}

// The modal component
const FullScreenImageModal = (props: Props) => {
    const root: HTMLElement | null = document.getElementById('root');
    const appElement: HTMLElement | undefined = root ? root : undefined;
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Fullscreen Image Modal"
            appElement={appElement}
            shouldCloseOnOverlayClick={true}
        >
            <img src={props.imageUrl} alt="Fullscreen" style={{width: '100%', height: '100%'}}/>
        </Modal>
    );
};

export default FullScreenImageModal;