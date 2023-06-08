import React from 'react';

const Footer = () => {
  return (
    // 리액트 - 인라인 스타일
    // 1. 자바 객체 형태로 넣어야 함
    // 2. - 사용 불가이므로 카멜케이스 사용
    <footer style={{
        width: '100%',
        padding: '50px 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        background: '#38d9a9',
        color: '#fff'
    }}>copyright. 2023 happy new year~~!!</footer>
  );
};

export default Footer;