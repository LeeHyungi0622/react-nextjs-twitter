import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Header = styled.header`
    header: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;
    & h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

export const SlickWrapper = styled.div`
    height: cal(100% - 44px);
    background: #090909;
`;

export const ImageWrapper = styled.div`
    padding: 32px;
    text-align: center;
    & img {
        margin: 0 auto;
        max-height: 750px;
    }
`;

export const Indicator = styled.div`
    text-align: center;
    /* 자식 선택자 */
    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`;

// slick의 이미 정해진 className을 변경하기 위해 createGlobalStyle 적용(덮어쓰기)
export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
    // transform 속성의 컴포넌트 내부에 fixed 속성을 가진 컴포넌트를 넣어주게 되면
    // fixed 속성 컴포넌트의 위치를 제대로 잡아주지 못한다.
    .ant-card-cover {
        transform: none !important;
    }
`;