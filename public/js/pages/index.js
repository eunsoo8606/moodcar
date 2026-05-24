/**
 * Moodcar Landing Page Interactive Scripts (index.js)
 * 페이지별 전용 JS 스크립트 파일입니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 헤더 스크롤 효과
  // 스크롤 시 상단 헤더의 유리창(glassmorphism) 디테일을 강화하기 위한 이벤트 리스너입니다.
  const header = document.getElementById('global-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
      header.style.borderBottomColor = 'rgba(13, 148, 136, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.85)';
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(13, 148, 136, 0.06)';
    }
  });

  // 2. 요소 페이드업 스크롤 애니메이션 (Intersection Observer 사용)
  // 사용자가 화면을 내릴 때 콘텐츠 요소들이 매끄럽게 등장하도록 하기 위한 애니메이션 바인딩입니다.
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('compare-section')) {
          entry.target.classList.add('active');
        }
        observer.unobserve(entry.target); // 한 번 노출된 이후에는 감시를 종료하여 최적화
      }
    });
  }, observerOptions);

  // 애니메이션을 적용할 대상 카드 및 섹션 바인딩
  const featureCards = document.querySelectorAll('.feature-card');
  const sectionHeaders = document.querySelectorAll('.section-header');
  const sliderOuter = document.querySelector('.gallery-slider-outer');
  const compareSection = document.querySelector('.compare-section');

  // 각 요소를 옵저버에 등록
  sectionHeaders.forEach(el => animObserver.observe(el));
  featureCards.forEach((el, index) => {
    // 순차적인 지연 시간(Staggered delay) 부여로 프리미엄 시각 효과 향상
    el.style.transitionDelay = `${index * 0.1}s`;
    animObserver.observe(el);
  });
  if (sliderOuter) {
    animObserver.observe(sliderOuter);
  }
  if (compareSection) {
    animObserver.observe(compareSection);
  }

  // 3. CTA 버튼 모크 인터랙션
  const orderButton = document.querySelector('.btn-large');
  if (orderButton) {
    orderButton.addEventListener('click', (e) => {
      // 프로토타입 시연 시 작동 체크를 위한 콘솔 로그 및 알림(선택)
      console.log('상담 및 예약 페이지 이동 이벤트 감지됨.');
    });
  }

  // 4. Swiper 슬라이더 초기화
  // 4-1. 히어로 배경 페이드 슬라이더 (백그라운드 이미지 부드러운 전환)
  if (document.querySelector('.hero-bg-swiper')) {
    const heroBgSwiper = new Swiper('.hero-bg-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade', // 배경 이미지가 겹침 없이 자연스럽게 오버랩되는 페이드 효과
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 4500, // 4.5초 주기 전환
        disableOnInteraction: false,
      }
    });
  }

  // 4-2. 최근 수출 현황 갤러리 슬라이더
  if (document.querySelector('.gallery-swiper')) {
    const gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1120: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }



  // 6. 하단 고정바 모바일 트리거 스크롤 포커스
  const mobileTrigger = document.querySelector('.btn-sticky-mobile-trigger');
  if (mobileTrigger) {
    mobileTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      // 히어로 섹션 폼 영역으로 스무스 스크롤
      const targetForm = document.querySelector('.hero-form-area');
      if (targetForm) {
        targetForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 첫 번째 인풋 박스 자동 포커싱
        const firstInput = document.getElementById('car-model');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600); // 스크롤 이동 시간 감안
        }
      }
    });
  }
});

// ==========================================
// 글로벌 제어 함수 (인라인 이벤트 리스너 연동용)
// ==========================================

// 1. 개인정보 약관 모달 열기
window.openPolicyModal = () => {
  const modal = document.getElementById('policyModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 차단
  }
};

// 2. 개인정보 약관 모달 닫기
window.closePolicyModal = () => {
  const modal = document.getElementById('policyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // 배경 스크롤 복원
  }
};

// 3. 하단 고정바 닫기
window.closeStickyBar = () => {
  const bar = document.getElementById('stickyQuoteBar');
  if (bar) {
    bar.classList.add('closed');
  }
};

// 4. 하단 고정바 견적 신청 제출 처리
window.handleStickyFormSubmit = (e) => {
  e.preventDefault();
  const carModel = document.getElementById('sticky-car-model').value.trim();
  const phone = document.getElementById('sticky-phone').value.trim();
  const agree = document.getElementById('sticky-agree').checked;

  if (!carModel || !phone) {
    alert('차량명과 연락처를 모두 입력해 주세요.');
    return;
  }

  if (!agree) {
    alert('개인정보 제공에 동의하셔야 견적 신청이 가능합니다.');
    return;
  }

  // 성공 알림 및 피드백 제공 (바닐라 모크)
  alert(`[무드카 수출 실시간 견적 접수 완료]\n\n차량명: ${carModel}\n연락처: ${phone}\n\n감가 없는 최고가 견적 분석을 위해 감정사가 10분 내로 연락드리겠습니다.`);
  
  // 폼 리셋 및 바 닫기
  document.getElementById('stickyQuoteForm').reset();
  window.closeStickyBar();
};

