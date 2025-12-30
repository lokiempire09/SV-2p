// ===== SMOOTH SCROLL & NAVIGATION =====
        const navbar = document.getElementById('navbar');
        const smoothContainer = document.getElementById('smoothContainer');
        const progressDots = document.querySelectorAll('.progress-dot');
        let currentTargetUrl = '';
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update progress tracker
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    progressDots.forEach(dot => dot.classList.remove('active'));
                    if (progressDots[index]) {
                        progressDots[index].classList.add('active');
                    }
                }
            });
        });

        // Progress tracker navigation
        progressDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ===== SEARCH FUNCTIONALITY =====
        const searchInput = document.getElementById('searchInput');
        const courseCards = document.querySelectorAll('.course-card');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                const description = card.querySelector('.course-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });

        // ===== FILTER FUNCTIONALITY =====
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                courseCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // ===== ENHANCED MODAL SYSTEM =====
        const enhancedModal = document.getElementById('enhancedModal');
        const modalContinueBtn = document.getElementById('modalContinueBtn');
        const enrollBtns = document.querySelectorAll('.enroll-btn');
        
        // Store all course URLs
        const courseUrls = {
            'english': 'Full_Course_of_English_Pre_+_Mains_Recorded_ʀᴀɴɪ_ᴍᴀᴍ_ABHISHEK_SANJIT.html',
            'achievers5': '/ACHIEVERS BATCH  5.html',
            'achievers3': '/ACHIEVERS BATCH  3.O.html',
            'crash': '/cash.html',
            'crash2': '/Crash_Course 2.html',
            'ssc2025': '/Practice Batch For SSC 2025 Exams.HTML',
            '1': '/Rani_mam_Practice_Batch__2025_Exams_.html',
            '2': '/Samundramanthan Of Vocabulary .html'
        };
        
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const course = btn.getAttribute('data-course');
                currentTargetUrl = courseUrls[course] || '#';
                
                // Show enhanced modal
                enhancedModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Modal continue button
        modalContinueBtn.addEventListener('click', () => {
            enhancedModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Smooth transition before navigation
            setTimeout(() => {
                if (currentTargetUrl) {
                    window.location.href = currentTargetUrl;
                }
            }, 300);
        });
        
        // Close modal on background click
        enhancedModal.addEventListener('click', (e) => {
            if (e.target === enhancedModal) {
                enhancedModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // ===== CHATBOT FUNCTIONALITY =====
        const chatbotBtn = document.getElementById('chatbotBtn');
        const chatbot = document.getElementById('chatbot');
        const closeChatbot = document.getElementById('closeChatbot');
        const chatInput = document.getElementById('chatInput');
        const chatBody = document.getElementById('chatBody');
        
        // Predefined responses
        const botResponses = {
            'hello': 'Hello! How can I help you with your studies today?',
            'hi': 'Hi there! What would you like to know about our courses?',
            'courses': 'We have various courses including English, Achievers Batches, Crash Courses, and more. Which one interests you?',
            'price': 'All our courses are currently free! You can enroll in any course without any charges.',
            'help': 'I can help you with course information, navigation, or answer general queries. What do you need?',
            'download': 'You can download course materials from each course page. Click the download button in the course section.',
            'contact': 'You can reach us through WhatsApp or email. Check the footer for contact details.',
            'thanks': 'You\'re welcome! Let me know if you need anything else.',
            'thank you': 'Happy to help! 😊'
        };
        
        chatbotBtn.addEventListener('click', () => {
            chatbot.classList.toggle('active');
        });
        
        closeChatbot.addEventListener('click', () => {
            chatbot.classList.remove('active');
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                const userMessage = chatInput.value.toLowerCase().trim();
                chatInput.value = '';
                
                // Add user message
                addMessage(userMessage, 'user');
                
                // Bot response
                setTimeout(() => {
                    let response = 'I\'m not sure about that. Can you please rephrase?';
                    
                    for (const [key, value] of Object.entries(botResponses)) {
                        if (userMessage.includes(key)) {
                            response = value;
                            break;
                        }
                    }
                    
                    addMessage(response, 'bot');
                }, 500);
            }
        });
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.style.marginBottom = '1rem';
            messageDiv.style.padding = '0.75rem';
            messageDiv.style.borderRadius = '12px';
            messageDiv.style.maxWidth = '80%';
            messageDiv.style.wordWrap = 'break-word';
            
            if (sender === 'user') {
                messageDiv.style.background = 'var(--accent)';
                messageDiv.style.marginLeft = 'auto';
                messageDiv.style.borderBottomRightRadius = '4px';
            } else {
                messageDiv.style.background = 'rgba(255, 255, 255, 0.05)';
                messageDiv.style.borderBottomLeftRadius = '4px';
            }
            
            messageDiv.textContent = text;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        // ===== DOWNLOAD SIMULATION =====
        const downloadBtn = document.getElementById('downloadBtn');
        const downloadProgress = document.getElementById('downloadProgress');
        const downloadPercent = document.getElementById('downloadPercent');
        const downloadBar = document.getElementById('downloadBar');
        
        downloadBtn.addEventListener('click', () => {
            downloadProgress.classList.add('active');
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        downloadProgress.classList.remove('active');
                        // Reset progress
                        setTimeout(() => {
                            downloadPercent.textContent = '0%';
                            downloadBar.style.width = '0%';
                        }, 300);
                    }, 1500);
                }
                
                downloadPercent.textContent = Math.round(progress) + '%';
                downloadBar.style.width = progress + '%';
            }, 200);
        });

        // ===== THEME TOGGLE =====
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        let isDark = true;
        
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            
            if (isDark) {
                // Switch to dark
                document.documentElement.style.setProperty('--dark-bg', '#0a0a0f');
                document.documentElement.style.setProperty('--darker-bg', '#05050a');
                themeIcon.className = 'fas fa-moon';
            } else {
                // Switch to light
                document.documentElement.style.setProperty('--dark-bg', '#ffffff');
                document.documentElement.style.setProperty('--darker-bg', '#f5f5f5');
                document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
                document.documentElement.style.setProperty('--text-secondary', '#4b5563');
                document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.05)');
                themeIcon.className = 'fas fa-sun';
            }
        });

        // ===== SHARE FUNCTIONALITY =====
        const shareBtn = document.getElementById('shareBtn');
        
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'VIP STUDY - Premium Courses',
                        text: 'Check out these amazing free courses!',
                        url: window.location.href
                    });
                } catch (error) {
                    console.log('Share cancelled');
                }
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                });
            }
        });

        // ===== FLOATING SHAPES ANIMATION =====
        const floatingShapes = document.getElementById('floatingShapes');
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            
            const size = Math.random() * 100 + 20;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.animationDelay = `${Math.random() * 5}s`;
            shape.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            // Random gradient
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            ];
            shape.style.background = gradients[Math.floor(Math.random() * gradients.length)];
            
            floatingShapes.appendChild(shape);
        }

        // ===== SMOOTH PAGE LOAD =====
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // ===== NOTIFICATION SYSTEM =====
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationCount = notificationBtn.querySelector('.notification-count');
        
        notificationBtn.addEventListener('click', () => {
            // Show notification panel (you can extend this)
            alert('You have 3 unread notifications:\n1. New course added\n2. Live class starting soon\n3. Study material updated');
            
            // Mark as read
            notificationCount.style.display = 'none';
        });

        // ===== HOVER EFFECTS ENHANCEMENT =====
        const cards = document.querySelectorAll('.course-card, .featured-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // ===== KEYBOARD SHORTCUTS =====
        document.addEventListener('keydown', (e) => {
            // Ctrl + F for search
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchInput.focus();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                enhancedModal.classList.remove('active');
                chatbot.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Space to pause/resume animations
            if (e.code === 'Space') {
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach(shape => {
                    const isPaused = shape.style.animationPlayState === 'paused';
                    shape.style.animationPlayState = isPaused ? 'running' : 'paused';
                });
            }
        });

        // ===== PERFORMANCE OPTIMIZATION =====
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize completion
            }, 250);
        });

        // ===== OFFLINE DETECTION =====
        window.addEventListener('online', () => {
            showToast('You are back online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            showToast('You are offline. Some features may not work.', 'warning');
        });
        
        function showToast(message, type) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.position = 'fixed';
            toast.style.bottom = '100px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.background = type === 'success' ? 'var(--success)' : 'var(--warning)';
            toast.style.color = 'white';
            toast.style.padding = '1rem 2rem';
            toast.style.borderRadius = '10px';
            toast.style.zIndex = '10000';
            toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(20px)';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }



// === VERIFICATION GATE (FINAL WORKING VERSION) ===

(function () {
    const verificationGate = document.getElementById("verificationGate");
    const mainContent = document.getElementById("mainContent");

    const KEY = "verification_24hr";
    const VALIDITY = 24 * 60 * 60 * 1000; // 24 hours

    const params = new URLSearchParams(window.location.search);

    // AUTO VERIFY ONLY IF ?true-show
    if (params.has("true-show")) {
        localStorage.setItem(KEY, Date.now().toString());
        window.history.replaceState({}, "", window.location.pathname);

        mainContent.style.display = "block";
        verificationGate.classList.remove("show-gate");
        return;
    }

    // NORMAL CHECK
    const lastTime = localStorage.getItem(KEY);

    if (lastTime) {
        const diff = Date.now() - parseInt(lastTime);

        if (diff < VALIDITY) {
            // VALID USER
            mainContent.style.display = "block";
            return;
        }
    }

    // NOT VERIFIED → SHOW POPUP
    mainContent.style.display = "none";
    verificationGate.classList.add("show-gate");
    document.body.style.overflow = "hidden";
})();


