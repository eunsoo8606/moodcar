const express = require('express');
const router = express.Router();

// 메인 랜딩페이지 라우팅
// 공통 레이아웃 구조에서 페이지별로 다른 CSS/JS를 로드할 수 있도록 파라미터를 넘겨줍니다.
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: '무드카 (Moodcar) - 나만의 프리미엄 자동차 무드등',
    pageCss: 'index', // public/css/pages/index.css 로드 목적
    pageJs: 'index'   // public/js/pages/index.js 로드 목적
  });
});

module.exports = router;
