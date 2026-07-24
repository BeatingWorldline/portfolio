const experienceData = [
    {
        time: '2024.07 - 至今',
        company: '上海文枢网络科技有限公司',
        role: '前端开发工程师',
        desc: '负责3DM APP的H5项目，包含活动、新闻、资讯、攻略等各种类型的H5页面，支持安卓IOS双端交互并能够站外打开后引流APP。负责双商城项目。负责APP管理/库存/大数据后台。',
        tags: ['H5', 'APP', '双商城', '后台管理', 'AI']
    },
    {
        time: '2021.05 - 2024.05',
        company: '上海沪教智能科技有限公司',
        role: '前端开发工程师',
        desc: '负责公司学管业务线的云服务项目前后台前端项目的维护与开发。负责公司工单系统的钉钉小程序、钉钉PC、钉钉H5、公司物流系统IMS的物流单打印模块的维护与开发。',
        tags: ['Vue', '钉钉小程序', '物流系统', '云服务']
    },
    {
        time: '2020.08 - 2021.05',
        company: '上海维宏电子科技股份有限公司',
        role: 'JAVA开发 → 前端开发工程师',
        desc: '负责部门Web端、移动端Web产品项目的前端开发、前后端接口联调、提测后BUG修复等工作。负责部门自用Npm包与前端常用Vue组件的更新维护工作。',
        tags: ['Java', 'Vue', 'Npm包', '组件库']
    }
];

const strengthData = [
    { id: '01', note: 'Core', title: '完整项目主导能力', size: 'large',
      list: ['需求拆解与项目节奏规划', '跨阶段推进视觉落地', '把控质量、效率与交付结果'],
      tagStyles: ['tag-dark', 'tag-dark', 'tag-accent'], tagRotations: ['-2deg', '1.5deg', '-1deg'] },
    { id: '02', note: 'Core', title: '品牌视觉体系搭建', size: 'large',
      list: ['品牌识别系统梳理', '视觉规范与延展模板', '统一多渠道传播质感'],
      tagStyles: ['tag-dark', 'tag-accent', 'tag-light'], tagRotations: ['1deg', '-2deg', '2deg'] },
    { id: '03', note: 'Skill', title: 'AI 设计提效', size: 'small',
      list: ['AIGC 创意套索', '风格推演与方案筛选', '建立可复用工作流'],
      tagStyles: ['tag-dark', 'tag-accent', 'tag-light'], tagRotations: ['-1.5deg', '2deg', '-1deg'] },
    { id: '04', note: 'Skill', title: '设计管理统筹', size: 'small',
      list: ['多项目并行排期', '设计标准与复盘沉淀', '稳定交付与风险预判'],
      tagStyles: ['tag-accent', 'tag-dark', 'tag-light'], tagRotations: ['2deg', '-1.5deg', '1deg'] },
    { id: '05', note: 'Skill', title: '跨部门协同', size: 'small',
      list: ['连接产品、运营与研发', '将设计语言转成执行方案', '推动创意进入真实场景'],
      tagStyles: ['tag-dark', 'tag-light', 'tag-accent'], tagRotations: ['-1deg', '2.5deg', '-2deg'] }
];

const contactData = [
    { label: '手机', value: '176****8957' },
    { label: '邮箱', value: '162*****01@qq.com' },
    { label: '微信', value: 'DDR6RAM' }
];

const projectData = Array.isArray(window.portfolioData)
    ? window.portfolioData
    : (typeof portfolioData !== 'undefined' && Array.isArray(portfolioData) ? portfolioData : []);

/* ---- helpers ---- */
function escapeHtml(value) {
    return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function slugify(text, fallback) {
    const normalized = String(text || fallback || 'group').toLowerCase().replace(/[^\w一-龥]+/g, '-').replace(/^-+|-+$/g, '');
    return normalized || fallback || 'group';
}
function parseAspectRatio(value) {
    const parts = String(value || '').split('/');
    if (parts.length !== 2) return null;
    const a = Number(parts[0]), b = Number(parts[1]);
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return null;
    return a / b;
}
function showTip(message) {
    let toast = document.getElementById('toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
    toast.textContent = message; toast.className = 'toast show';
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => { toast.className = toast.className.replace('show', '').trim(); }, 3600);
}
function showModal(imageSrc, desc) {
    const modal = document.getElementById('image-modal');
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-desc').textContent = desc || '';
    modal.style.display = 'flex'; modal.offsetHeight; modal.classList.add('show');
}
function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 220);
}

/* ---- preload ---- */
function preloadPortfolioImages() {
    if (!Array.isArray(projectData) || !projectData.length) return;
    const urls = new Set();
    projectData.forEach(g => (g.cards || []).forEach(c => { if (c && c.image) urls.add(c.image); }));
    const preload = () => urls.forEach(src => { const img = new Image(); img.decoding = 'async'; img.src = src; });
    if (typeof window.requestIdleCallback === 'function') requestIdleCallback(preload, { timeout: 1800 });
    else setTimeout(preload, 0);
}

function getActionMeta(card) {
    const hasLink = !!(card.link && String(card.link).trim());
    const isMiniProgram = Array.isArray(card.tags) && card.tags.includes('微信小程序');
    if (isMiniProgram) return { kind: 'modal', text: '扫码体验' };
    if (hasLink) return { kind: 'link', text: '访问项目' };
    return { kind: 'tip', text: '查看说明' };
}

/* ---- render showcase carousel ---- */
function renderHeroShowcase() {
    const container = document.getElementById('hero-showcase');
    if (!container || !Array.isArray(projectData) || !projectData.length) return;
    const cards = projectData.flatMap(g => Array.isArray(g.cards) ? g.cards : []);
    container.innerHTML = cards.map(card => `
        <div class="showcase-item" data-title="${escapeHtml(card.title)}" data-link="${escapeHtml(card.link || '')}">
            <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)}" loading="lazy" draggable="false">
        </div>
    `).join('');
}

/* ---- render projects ---- */
function renderProjects() {
    const filter = document.getElementById('project-filter');
    const groupsContainer = document.getElementById('project-groups');
    if (!filter || !groupsContainer || !Array.isArray(projectData) || !projectData.length) return;

    filter.innerHTML = projectData.map((group, index) => {
        const groupId = `project-group-${slugify(group.groupTitle, index)}`;
        return `<button class="filter-chip ${index === 0 ? 'is-active' : ''}" type="button" data-group-target="${groupId}">${escapeHtml(group.groupTitle)}</button>`;
    }).join('');

    groupsContainer.innerHTML = projectData.map((group, index) => {
        const groupId = `project-group-${slugify(group.groupTitle, index)}`;
        const cardsHtml = (group.cards || []).map(card => {
            const actionMeta = getActionMeta(card);
            const ratioValue = parseAspectRatio(card.aspectRatio);
            const cardWidth = ratioValue !== null ? (ratioValue < 0.88 ? 190 : ratioValue > 1.18 ? 280 : 240) : null;
            const cardStyle = cardWidth ? `style="--card-width:${cardWidth}px"` : '';
            const ratioStyle = card.aspectRatio ? `style="--card-ratio:${escapeHtml(card.aspectRatio)}"` : '';
            const tagsHtml = (card.tags || []).slice(0, 3).map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('');
            return `
                <article class="project-card" ${cardStyle} tabindex="0" data-kind="${actionMeta.kind}" data-link="${escapeHtml(card.link || '')}" data-image="${escapeHtml(card.image || '')}" data-tip="${escapeHtml(card.tip || '暂无补充说明')}" aria-label="${escapeHtml(card.title)}">
                    <div class="project-card-media" ${ratioStyle}>
                        <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)}" loading="lazy">
                    </div>
                    <div class="project-card-content">
                        <h3 class="project-card-title">${escapeHtml(card.title)}</h3>
                        <div class="project-card-meta">${tagsHtml}</div>
                        <p class="project-card-desc">${escapeHtml(card.desc)}</p>
                        <span class="project-card-action">${escapeHtml(actionMeta.text)} →</span>
                    </div>
                </article>`;
        }).join('');

        return `
            <section class="project-group ${index === 0 ? 'is-active is-entering' : ''}" id="${groupId}">
                <div class="project-group-header">
                    <div>
                        <div class="project-group-index">Category 0${index + 1}</div>
                        <h3 class="project-group-title">${escapeHtml(group.groupTitle)}</h3>
                        <p class="project-group-desc">${escapeHtml(group.groupDesc)}</p>
                    </div>
                </div>
                <div class="project-grid">${cardsHtml}</div>
            </section>`;
    }).join('');
}

/* ---- render experience / strengths / contact ---- */
function renderExperience() {
    const el = document.getElementById('timeline-entries');
    if (!el) return;
    el.innerHTML = experienceData.map(item => `
        <div class="timeline-entry">
            <div class="timeline-dot"></div>
            <div class="timeline-time">${escapeHtml(item.time)}</div>
            <h3 class="timeline-company">${escapeHtml(item.company)}</h3>
            <div class="timeline-tags">${(item.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
            <p class="timeline-desc">${escapeHtml(item.desc)}</p>
        </div>`).join('');
}

function renderStrengths() {
    const el = document.getElementById('strength-grid');
    if (!el) return;
    el.innerHTML = strengthData.map(item => {
        const tags = (item.list || []).map((l, i) => {
            const cls = item.tagStyles && item.tagStyles[i] ? item.tagStyles[i] : 'tag-dark';
            const rot = item.tagRotations && item.tagRotations[i] ? item.tagRotations[i] : '0deg';
            return `<span class="${escapeHtml(cls)}" style="--tag-rotate:${rot}">${escapeHtml(l)}</span>`;
        }).join('');
        return `
        <article class="strength-card ${escapeHtml(item.size)}">
            <div class="strength-top">
                <span class="strength-id">${escapeHtml(item.id)}</span>
                <span class="strength-note">${escapeHtml(item.note)}</span>
            </div>
            <h3 class="strength-title">${escapeHtml(item.title)}<span class="strength-title-dot"></span></h3>
            <div class="strength-list">${tags}</div>
            <div class="strength-icon icon-${item.id}" aria-hidden="true"></div>
            <div class="strength-line"></div>
        </article>`;
    }).join('');
}

function renderContact() {
    const el = document.getElementById('contact-list');
    if (!el) return;
    el.innerHTML = contactData.map(item => `
        <div class="contact-item">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
        </div>`).join('');
}

/* ---- filter switching ---- */
function updateActiveChip(targetId) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('is-active', c.dataset.groupTarget === targetId));
}
function switchProjectGroup(targetId) {
    const current = document.querySelector('.project-group.is-active');
    if (current && current.id === targetId) return;
    if (current) {
        let done = false;
        current.classList.remove('is-entering');
        const finish = () => {
            if (done) return; done = true;
            current.classList.remove('is-active');
            const next = document.getElementById(targetId);
            if (next) { next.classList.add('is-active'); void next.offsetHeight; requestAnimationFrame(() => next.classList.add('is-entering')); }
        };
        current.addEventListener('transitionend', finish, { once: true });
        setTimeout(finish, 450);
    } else {
        const next = document.getElementById(targetId);
        if (next) { next.classList.add('is-active'); void next.offsetHeight; requestAnimationFrame(() => next.classList.add('is-entering')); }
    }
}
function handleProjectCardAction(card) {
    const kind = card.dataset.kind;
    if (kind === 'link' && card.dataset.link) {
        const ext = /^https?:/i.test(card.dataset.link);
        window.open(card.dataset.link, ext ? '_blank' : '_self', ext ? 'noopener,noreferrer' : undefined);
    } else if (kind === 'modal') {
        showModal(card.dataset.image, card.dataset.tip || '请使用微信扫码体验');
    } else {
        showTip(card.dataset.tip || '该项目暂未提供外链，可后续补充。');
    }
}

/* ---- events ---- */
function bindEvents() {
    document.addEventListener('click', e => {
        const chip = e.target.closest('[data-group-target]');
        if (chip) { updateActiveChip(chip.dataset.groupTarget); switchProjectGroup(chip.dataset.groupTarget); return; }

        const showcaseItem = e.target.closest('.showcase-item');
        if (showcaseItem) {
            if (showcaseItem.dataset.link) window.open(showcaseItem.dataset.link, '_blank', 'noopener,noreferrer');
            else if (showcaseItem.dataset.title) showTip(showcaseItem.dataset.title);
            return;
        }

        const card = e.target.closest('.project-card');
        if (card) handleProjectCardAction(card);
    });

    document.addEventListener('keydown', e => {
        const card = e.target.closest('.project-card');
        if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleProjectCardAction(card); }
    });

    initCarousel();
    initHeroVideoObserver();
    initStrengthCardTap();
}

/* ---- carousel: auto-scroll + infinite loop + drag + touch ---- */
function initCarousel() {
    const track = document.getElementById('hero-showcase');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.showcase-item'));
    if (!items.length) return;

    track.innerHTML = track.innerHTML + track.innerHTML;

    let isDragging = false, startX = 0, scrollLeft = 0, hasMoved = false;
    let autoScrollId = null;
    const SPEED = 0.4;

    function getSetWidth() {
        const sw = track.scrollWidth;
        return sw > 0 ? sw / 2 : sw;
    }

    function normalizeScroll() {
        const w = getSetWidth();
        if (w <= 0) return;
        track.scrollLeft = ((track.scrollLeft % w) + w) % w;
    }

    function startAutoScroll() {
        if (autoScrollId) return;
        autoScrollId = requestAnimationFrame(function tick() {
            if (track.matches(':hover') || isDragging) {
                autoScrollId = requestAnimationFrame(tick);
                return;
            }
            track.scrollLeft += SPEED;
            normalizeScroll();
            autoScrollId = requestAnimationFrame(tick);
        });
    }
    startAutoScroll();

    track.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        isDragging = true; hasMoved = false;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.classList.add('dragging');
        e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const x = e.pageX - track.offsetLeft;
        const walk = x - startX;
        if (Math.abs(walk) > 3) hasMoved = true;
        track.scrollLeft = scrollLeft - walk;
    });
    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');
        normalizeScroll();
        scrollLeft = track.scrollLeft;
        startX = 0;
    });

    track.addEventListener('click', e => {
        if (hasMoved) { e.stopPropagation(); e.preventDefault(); }
    }, true);

    let touchStartX = 0, touchScrollLeft = 0, touchMoved = false;
    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = track.scrollLeft;
        touchMoved = false;
    }, { passive: true });
    track.addEventListener('touchmove', e => {
        const walk = e.touches[0].pageX - touchStartX;
        if (Math.abs(walk) > 3) touchMoved = true;
        track.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });
    track.addEventListener('touchend', e => {
        if (touchMoved) {
            normalizeScroll();
            e.stopPropagation();
        }
    }, true);
}

/* ---- hero video observer ---- */
function initHeroVideoObserver() {
    const hero = document.querySelector('.hero-section');
    const heroVideo = document.querySelector('.hero-bg');
    if (!hero) return;
    const syncVideoState = visible => {
        if (!heroVideo) return;
        if (visible && document.visibilityState === 'visible') {
            const playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
        } else {
            heroVideo.pause();
        }
    };

    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting;
            document.body.classList.toggle('hero-scrolled', !isVisible);
            syncVideoState(isVisible);
        });
    }, { threshold: 0.1 }).observe(hero);

    document.addEventListener('visibilitychange', () => {
        const inHero = !document.body.classList.contains('hero-scrolled');
        syncVideoState(inHero);
    });
}

// Touch devices: toggle strength cards on tap
function initStrengthCardTap() {
    if (window.matchMedia('(hover: hover)').matches) return; // skip on devices with real hover
    document.addEventListener('click', e => {
        const card = e.target.closest('.strength-card');
        if (!card) {
            // Tap outside: close all
            document.querySelectorAll('.strength-card.is-touched').forEach(c => c.classList.remove('is-touched'));
            return;
        }
        const wasTouched = card.classList.contains('is-touched');
        // Close all first
        document.querySelectorAll('.strength-card.is-touched').forEach(c => c.classList.remove('is-touched'));
        // Toggle this one
        if (!wasTouched) card.classList.add('is-touched');
    });
}

function initTiltedPortrait() {
    const card = document.getElementById('experience-tilt-card');
    if (!card) return;

    const maxRotate = 7;
    const activeScale = 1.02;
    let frameId = 0;
    let isActive = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function setVars(rx, ry, scale) {
        card.style.setProperty('--tilt-rotate-x', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--tilt-rotate-y', `${ry.toFixed(2)}deg`);
        card.style.setProperty('--tilt-scale', String(scale));
    }

    function render() {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        if (!isActive && Math.abs(currentX) < 0.02 && Math.abs(currentY) < 0.02) {
            currentX = 0;
            currentY = 0;
            setVars(0, 0, 1);
            frameId = 0;
            return;
        }

        setVars(currentY, currentX, isActive ? activeScale : 1);
        frameId = window.requestAnimationFrame(render);
    }

    function startRenderLoop() {
        if (!frameId) frameId = window.requestAnimationFrame(render);
    }

    function resetCard() {
        isActive = false;
        card.classList.remove('is-active');
        targetX = 0;
        targetY = 0;
        startRenderLoop();
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
        resetCard();
        return;
    }

    card.addEventListener('pointerenter', () => {
        isActive = true;
        card.classList.add('is-active');
        startRenderLoop();
    });

    card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        targetY = (offsetY / (rect.height / 2)) * -maxRotate;
        targetX = (offsetX / (rect.width / 2)) * maxRotate;
        startRenderLoop();
    });

    card.addEventListener('pointerleave', resetCard);
    card.addEventListener('blur', resetCard);
    card.addEventListener('focus', () => {
        isActive = true;
        card.classList.add('is-active');
        startRenderLoop();
    });
}

/* ---- loading screen ---- */
function runLoadingScreen() {
    return new Promise(resolve => {
        const el = document.getElementById('loading-screen');
        const numEl = document.getElementById('loading-number');
        if (!el || !numEl) { resolve(); return; }

        const DURATION = 2200;
        let start = null;

        function tick(now) {
            if (start === null) start = now;
            const elapsed = Math.max(0, now - start);
            const t = Math.min(elapsed / DURATION, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const pct = Math.max(0, Math.min(100, Math.round(eased * 100)));
            numEl.textContent = pct + '%';

            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    el.classList.add('fade-out');
                    setTimeout(() => {
                        el.style.display = 'none';
                        resolve();
                    }, 650);
                }, 300);
            }
        }
        requestAnimationFrame(tick);
    });
}

/* ---- init ---- */
document.addEventListener('DOMContentLoaded', async () => {
    preloadPortfolioImages();
    renderHeroShowcase();
    renderProjects();
    renderExperience();
    renderStrengths();
    renderContact();
    bindEvents();
    initTiltedPortrait();

    // Wait for loading screen to finish
    await runLoadingScreen();

    // Trigger hero text entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('is-visible');
    const showcasePanel = document.querySelector('.showcase-panel');
    if (showcasePanel) showcasePanel.classList.add('is-visible');
});
