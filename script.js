document.addEventListener('DOMContentLoaded', function() {
    // 텍스트 애니메이션
    const textElements = [
        document.getElementById('text1'),
        document.getElementById('text2'),
        document.getElementById('text3'),
        document.getElementById('text4'),
        document.getElementById('text5')
    ];
    
    let currentIndex = 0;
    
    function animateText() {
        if (currentIndex >= textElements.length) {
            currentIndex = 0;
        }
        
        anime({
            targets: textElements[currentIndex],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeInOutQuad',
            complete: function() {
                setTimeout(function() {
                    anime({
                        targets: textElements[currentIndex],
                        opacity: 0,
                        duration: 800,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            currentIndex++;
                            setTimeout(animateText, 300);
                        }
                    });
                }, 800);
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