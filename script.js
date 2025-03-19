document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function updateNavButtons() {
        const prevBtn = document.querySelector('.nav-arrow.prev');
        const nextBtn = document.querySelector('.nav-arrow.next');
        
        // 第一个 slide 时禁用上一个按钮
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        
        // 最后一个 slide 时禁用下一个按钮
        nextBtn.classList.toggle('disabled', currentIndex === slides.length - 1);
    }

    function setActiveSlide(index) {
        // 确保索引在有效范围内
        if (index < 0 || index >= slides.length) return;
        
        // 移除当前活动状态
        document.querySelector('.slide.active')?.classList.remove('active');
        
        // 设置新的活动 slide
        slides[index].classList.add('active');
        currentIndex = index;
        
        // 更新导航按钮状态
        updateNavButtons();
    }

    // 绑定箭头按钮事件
    document.querySelectorAll('.nav-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            const isNext = btn.classList.contains('next');
            const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
            setActiveSlide(newIndex);
        });
    });

    // 初始化按钮状态
    updateNavButtons();

    // 添加滚动监听以实现 social card 动画
    const socialCard = document.querySelector('.social-card');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const movePercent = -50 - (window.scrollY * 0.05);
        socialCard.style.transform = `translate3d(0, ${movePercent}%, 0)`;
    });

    // 添加卡片动画
    const cards = document.querySelectorAll('.tokenomics-card, .roadmap-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // 卡片显示后就不需要再观察了
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // 当卡片出现 20% 时触发动画
    });

    cards.forEach(card => observer.observe(card));

    // 优化导航滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // 获取导航栏高度
            const navHeight = document.querySelector('nav').offsetHeight;
            
            // 计算目标位置，考虑导航栏高度
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}); 