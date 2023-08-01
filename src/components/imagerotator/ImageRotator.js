import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import classes from './ImageRotator.module.css';

const ImageRotator = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(timer); // Clean up timer on unmount
    }, [images.length]);

    const handleClick = id => {
        navigate(`/recipes/${id}`);
    };

    return (
        <div className={classes['image-rotator']}>
            {images.map((image, index) => {
                const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + image.imageFileName;
                return (
                    <img
                        onClick={() => handleClick(image.id)}
                        key={image.id}
                        src={imgSrc}
                        alt={image.name}
                        style={{
                            display:
                                index === currentImageIndex
                                    ? 'block'
                                    : 'none',
                            width: '100%',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ImageRotator;
