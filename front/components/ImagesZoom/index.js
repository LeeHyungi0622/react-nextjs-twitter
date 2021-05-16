import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Global, Overlay, CloseBtn, Header, SlickWrapper, ImageWrapper, Indicator } from './styles';

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose} />
            </Header>
            <SlickWrapper>
                <Slick 
                    initialSlide={0}
                    beforeChange={(slide) => setCurrentSlide(slide)}
                    infinite
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                {images.map(image => (
                    <ImageWrapper key={image.src}>
                        <img src={image.src} alt={image.src} />
                    </ImageWrapper>
                ))}
                </Slick>
                {/* 몇 번째 슬라이드를 보고 있는지 보여주는 부분 */}
                <Indicator>
                    <div>
                        {currentSlide + 1}
                        {' '}
                        /
                        {images.length}
                    </div>
                </Indicator>
            </SlickWrapper>
        </Overlay>
    );
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
};

export default ImagesZoom;