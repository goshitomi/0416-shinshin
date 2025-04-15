document.addEventListener('DOMContentLoaded', function() {
    // 텍스트 애니메이션
    const textElements = [];
    for(let i = 1; i <= 25; i++) {
        const element = document.getElementById('text' + i);
        if(element) textElements.push(element);
    }
    
    let currentIndex = 0;
    
    function getAnimationDuration(element) {
        const text = element.textContent;
        // 텍스트 길이에 따라 지속 시간 조정
        if (text.length > 50) return 1500;
        if (text.length > 30) return 1200;
        return 800;
    }

    function getDisplayDuration(element) {
        const text = element.textContent;
        // 텍스트 길이에 따라 표시 시간 조정
        if (text.length > 50) return 2000;
        if (text.length > 30) return 1500;
        return 800;
    }
    
    function animateText() {
        if (currentIndex >= textElements.length) {
            currentIndex = 0;
        }
        
        const currentElement = textElements[currentIndex];
        const animationDuration = getAnimationDuration(currentElement);
        const displayDuration = getDisplayDuration(currentElement);
        
        anime({
            targets: currentElement,
            opacity: [0, 1],
            duration: animationDuration,
            easing: 'easeInOutQuad',
            complete: function() {
                setTimeout(function() {
                    anime({
                        targets: currentElement,
                        opacity: 0,
                        duration: animationDuration,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            currentIndex++;
                            setTimeout(animateText, 300);
                        }
                    });
                }, displayDuration);
            }
        });
    }
    
    animateText();

    // 메인 텍스트 클릭 시 키워드 페이지로 이동
    document.querySelectorAll('.text-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            document.querySelector('.keywords-page').style.display = 'block';
        });
    });

    // 키워드 아이템 클릭 이벤트
    document.querySelectorAll('.keyword-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('clicked');
        });
    });

    // 뒤로 가기 링크 클릭 이벤트
    document.querySelector('.back-link').addEventListener('click', function() {
        document.querySelector('.keywords-page').style.display = 'none';
    });
});