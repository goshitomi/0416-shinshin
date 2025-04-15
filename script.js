document.addEventListener('DOMContentLoaded', function() {
    // 텍스트 애니메이션
    const textElements = [];
    for(let i = 1; i <= 25; i++) {
        const element = document.getElementById('text' + i);
        if(element) textElements.push(element);
    }
    
    let currentIndex = 0;
    let isAnimating = false;
    
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
        if (!isAnimating) return;
        
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
                if (!isAnimating) return;
                
                setTimeout(function() {
                    if (!isAnimating) return;
                    
                    anime({
                        targets: currentElement,
                        opacity: 0,
                        duration: animationDuration,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            if (!isAnimating) return;
                            currentIndex++;
                            setTimeout(animateText, 300);
                        }
                    });
                }, displayDuration);
            }
        });
    }
    
    function stopAnimation() {
        isAnimating = false;
        textElements.forEach(element => {
            anime.remove(element);
            element.style.opacity = 0;
        });
    }
    
    function startMainAnimation() {
        stopAnimation();
        currentIndex = 0;
        isAnimating = true;
        animateText();
    }
    
    startMainAnimation();

    // 메인 텍스트 클릭 시 전체 내용 페이지로 이동
    document.querySelectorAll('.text-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            stopAnimation();
            const fullContentPage = document.querySelector('.full-content-page');
            fullContentPage.style.display = 'block';
            
            // 단락별로 순차적으로 나타나는 애니메이션
            const paragraphs = document.querySelectorAll('.content-text p');
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.add('visible');
                }, index * 200);
            });
        });
    });

    // 전체 내용 페이지 클릭 시 키워드 페이지로 이동
    document.querySelector('.full-content-page').addEventListener('click', function() {
        this.style.display = 'none';
        // 전체 내용 페이지의 단락 애니메이션 초기화
        document.querySelectorAll('.content-text p').forEach(p => {
            p.classList.remove('visible');
        });
        document.querySelector('.keywords-page').style.display = 'block';
    });

    // 키워드 아이템 클릭 이벤트
    document.querySelectorAll('.keyword-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('clicked');
        });
    });

    // 뒤로 가기 링크 클릭 이벤트
    document.querySelector('.back-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.keywords-page').style.display = 'none';
        document.querySelector('.full-content-page').style.display = 'none';
        // 약간의 지연 후 메인 애니메이션 시작
        setTimeout(startMainAnimation, 100);
    });
});