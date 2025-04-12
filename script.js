document.addEventListener('DOMContentLoaded', function() {
    const textElements = [
        document.getElementById('text1'),
        document.getElementById('text2'),
        document.getElementById('text3'),
        document.getElementById('text4')
    ];
    
    let currentIndex = 0;
    
    function animateText() {
        if (currentIndex >= textElements.length) {
            currentIndex = 0;
        }
        
        anime({
            targets: textElements[currentIndex],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: function() {
                setTimeout(function() {
                    anime({
                        targets: textElements[currentIndex],
                        opacity: 0,
                        duration: 1000,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            currentIndex++;
                            setTimeout(animateText, 500);
                        }
                    });
                }, 1000);
            }
        });
    }
    
    // 텍스트 애니메이션 시작
    animateText();

    // 메인 텍스트 클릭 시 키워드 페이지로 이동
    document.querySelectorAll('.text-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            document.querySelector('.keywords-page').style.display = 'block';
        });
    });

    // 뒤로가기 링크 클릭 시 메인 페이지로 이동
    document.querySelector('.back-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.keywords-page').style.display = 'none';
    });
});

// 팝업과 키워드 페이지 관련 함수들
function goToKeywords() {
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.keywords-page').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
}

function goBack() {
    document.querySelector('.keywords-page').style.display = 'none';
}

// 팝업과 키워드 페이지 관련 기능
document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const keywordsPage = document.querySelector('.keywords-page');
    const backButton = document.querySelector('.back-button');

    // 메인 텍스트 클릭 시 팝업 표시
    document.querySelectorAll('.text-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            popupOverlay.style.display = 'flex';
        });
    });

    // 팝업 버튼 이벤트
    document.querySelectorAll('.popup-button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '이동하기') {
                goToKeywords();
            } else {
                closePopup();
            }
        });
    });

    // 뒤로가기 버튼 이벤트
    backButton.addEventListener('click', goBack);
});