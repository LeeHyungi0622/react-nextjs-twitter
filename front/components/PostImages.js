import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    },[]);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    },[]);

    if(images.length === 1){
        return (
            <>
                {/* screen reader에서 굳이 클릭해야 되는 요소라는 것을 알려주지 않아도 될때 */}
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {/* image를 확대해서 볼 수 있게 해주는 컴포넌트 */}
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    if(images.length === 2){
        return (
            <>
                {/* screen reader에서 굳이 클릭해야 되는 요소라는 것을 알려주지 않아도 될때 */}
                <img role="presentation" style={{ width: "50%" ,display: "inline-block"}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                <img role="presentation" style={{ width: "50%" ,display: "inline-block"}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    return (
        <>
            <div>
                <img role="presentation" style={{ width: "50%" ,display: "inline-block" }} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign:'center', verticalAlign: 'middle'}}
                    onClick={ onZoom }
                >
                    <PlusOutlined />
                    <br />
                    {images.length -1}
                </div>
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
        </>
    );
};

PostImages.propTypes = {
    images: PropTypes.string
}

export default PostImages;
