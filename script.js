/**
 * LIHASH — MACHINE LEARNING ENGINEER PORTFOLIO JAVASCRIPT
 * Features:
 *  - Scroll Reading Progress Line
 *  - Interactive Neural Network Synapse Canvas
 *  - Custom Smooth Glowing Cursor
 *  - Dynamic Scrollytelling Engine ("My Story")
 *  - Navbar Scroll State & Section Intersection Tracker
 *  - Mobile Drawer Navigation
 *  - Animated Metric Counters
 *  - Project Category Filters
 *  - Project Deep Dive Modals
 *  - Contact Form with Direct Mailto Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. SCROLL READING PROGRESS LINE
    // ========================================================
    const progressLine = document.getElementById('scroll-progress-line');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressLine) {
            progressLine.style.width = `${scrolled}%`;
        }
    });

    // ========================================================
    // 2. NEURAL NETWORK CANVAS
    // ========================================================
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor((width * height) / 14000), 90);
        const connectionDistance = 130;
        const mouse = { x: null, y: null, radius: 160 };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class SynapseNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.65;
                this.vy = (Math.random() - 0.5) * 0.65;
                this.size = Math.random() * 2 + 1;
                this.isAmber = Math.random() > 0.4;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.isAmber ? 'rgba(245, 158, 11, 0.75)' : 'rgba(56, 189, 248, 0.75)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new SynapseNode());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.25;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.5;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    // ========================================================
    // 3. CUSTOM GLOWING CURSOR
    // ========================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        });

        const hoverElements = document.querySelectorAll('a, button, input, textarea, .clean-card, .filter-btn, .social-tag, .skill-chip');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // ========================================================
    // 4. NAVBAR SCROLL STATE & ACTIVE TRACKING
    // ========================================================
    const navCapsule = document.querySelector('.navbar-capsule');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navCapsule?.classList.add('scrolled');
        } else {
            navCapsule?.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 160;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === currentSectionId) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerItems = document.querySelectorAll('.drawer-item');

    mobileToggle?.addEventListener('click', () => mobileDrawer?.classList.add('active'));
    mobileClose?.addEventListener('click', () => mobileDrawer?.classList.remove('active'));
    drawerItems.forEach(item => item.addEventListener('click', () => mobileDrawer?.classList.remove('active')));

    // ========================================================
    // 5. SCROLLYTELLING ENGINE: "MY STORY"
    // ========================================================
    const storyCards = document.querySelectorAll('.story-card');
    const stepLabel = document.getElementById('showcase-step-label');
    const progressLabel = document.getElementById('showcase-progress');
    const showcaseScreens = document.querySelectorAll('.showcase-screen');

    const stepTitles = {
        '1': 'PHASE 01: FOUNDATIONS & MATH',
        '2': 'PHASE 02: COMPUTER VISION & CNN',
        '3': 'PHASE 03: GEOSPATIAL NLP & PLACELENS',
        '4': 'PHASE 04: ENSEMBLE RESEARCH & PUBLICATION'
    };

    if (storyCards.length) {
        const scrollyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target.getAttribute('data-step');

                    storyCards.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active');

                    if (stepLabel && stepTitles[step]) {
                        stepLabel.textContent = stepTitles[step];
                    }
                    if (progressLabel) {
                        progressLabel.textContent = `STEP ${step}/4`;
                    }

                    showcaseScreens.forEach(s => s.classList.remove('active'));
                    const targetScreen = document.getElementById(`scrolly-screen-${step}`);
                    if (targetScreen) targetScreen.classList.add('active');
                }
            });
        }, {
            threshold: 0.55,
            rootMargin: '0px 0px -20% 0px'
        });

        storyCards.forEach(c => scrollyObserver.observe(c));
    }

    // ========================================================
    // 6. ANIMATED METRIC COUNTERS
    // ========================================================
    let countersAnimated = false;
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    if (statNums.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    statNums.forEach(stat => {
                        const target = parseFloat(stat.getAttribute('data-target'));
                        const isDecimal = String(target).includes('.');
                        let current = 0;
                        const duration = 1500;
                        const steps = 35;
                        const increment = target / steps;
                        const stepTime = duration / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = isDecimal ? target.toFixed(1) : target;
                                clearInterval(timer);
                            } else {
                                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                            }
                        }, stepTime);
                    });
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statNums[0]);
    }

    // ========================================================
    // 7. PROJECT CATEGORY FILTERS
    // ========================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ========================================================
    // 8. PROJECT MODALS
    // ========================================================
    const modalBackdrop = document.getElementById('modal-backdrop');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.modal-close');
    const modalWindows = document.querySelectorAll('.modal-window');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal && modalBackdrop) {
            modalWindows.forEach(m => m.classList.remove('active'));
            modal.classList.add('active');
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modalBackdrop) {
            modalBackdrop.classList.remove('active');
            modalWindows.forEach(m => m.classList.remove('active'));
            document.body.style.overflow = 'auto';
        }
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-modal');
            openModal(id);
        });
    });

    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

    modalBackdrop?.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================================
    // 9. SCROLL REVEAL ANIMATIONS
    // ========================================================
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // ========================================================
    // 10. CONTACT FORM WITH MAILTO DISPATCH
    // ========================================================
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'AIML Internship / Opportunity Inquiry';
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                if (formMsg) {
                    formMsg.className = 'form-feedback-pill error';
                    formMsg.textContent = 'Please fill out all required fields marked with *';
                }
                return;
            }

            const mailBody = encodeURIComponent(
                `Hello Lihash,\n\nName / Organization: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n(Sent via Lihash Portfolio)`
            );
            const mailUrl = `mailto:Lihashbalusamy@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailBody}`;

            if (formMsg) {
                formMsg.className = 'form-feedback-pill success';
                formMsg.innerHTML = `Message prepared! Launching your email client for <strong>${email}</strong>... If it didn't open automatically, <a href="${mailUrl}" style="color:var(--accent-amber);text-decoration:underline;">Click Here to Dispatch</a>.`;
            }

            setTimeout(() => {
                window.location.href = mailUrl;
            }, 600);

            contactForm.reset();
        });
    }

});
