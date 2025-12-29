// Configuration
const YOUTUBE_TUTORIAL_LINK = "https://youtu.be/zaXXsBMsvck?si=S45kEVzye85_uZyQ";
const ACCESS_DURATION = 24; // Hours

// DOM Elements
const currentTimeElement = document.getElementById('currentTime');
const checkbox1 = document.getElementById('checkbox1');
const task1 = document.getElementById('task1');
const keyDisplay = document.getElementById('keyDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const successMessage = document.getElementById('successMessage');
const timerDisplay = document.getElementById('timerDisplay');

// Variables
let taskCompleted = false;
let accessKey = '';
let keyExpiryTime = null;

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }) + ' ' + now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    currentTimeElement.textContent = formattedTime;
}

// Initialize task
function initTask() {
    // Make task clickable
    task1.style.cursor = 'pointer';
    
    task1.addEventListener('click', function() {
        if (!taskCompleted) {
            // Open YouTube tutorial in new tab
            window.open(YOUTUBE_TUTORIAL_LINK, '_blank');
            
            // Mark as completed after 3 seconds
            setTimeout(function() {
                taskCompleted = true;
                checkbox1.classList.add('checked');
                
                // Enable generate button
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span>🔑</span> Generate Access Key';
                
                // Show message
                alert('✅ Task completed! You can now generate your access key.');
            }, 3000);
        }
    });
    
    // Make checkbox clickable too
    checkbox1.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent double trigger
        
        if (!taskCompleted) {
            window.open(YOUTUBE_TUTORIAL_LINK, '_blank');
            
            setTimeout(function() {
                taskCompleted = true;
                checkbox1.classList.add('checked');
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span>🔑</span> Generate Access Key';
                alert('✅ Task completed! You can now generate your access key.');
            }, 3000);
        }
    });
}

// Generate access key
function generateAccessKey() {
    if (!taskCompleted) {
        alert('Please complete the task first!');
        return;
    }
    
    // Generate random key (format: XXXX-XXXX-XXXX-XXXX)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    
    for (let i = 0; i < 16; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i === 3 || i === 7 || i === 11) {
            key += '-';
        }
    }
    
    accessKey = key;
    
    // Display the key
    keyDisplay.textContent = key;
    keyDisplay.style.color = '#4cc9f0';
    keyDisplay.style.fontSize = '22px';
    keyDisplay.style.letterSpacing = '1px';
    
    // Set expiry time
    keyExpiryTime = Date.now() + (ACCESS_DURATION * 60 * 60 * 1000);
    
    // Save to localStorage
    localStorage.setItem('accessKeyData', JSON.stringify({
        key: accessKey,
        expiry: keyExpiryTime,
        generated: new Date().toISOString()
    }));
    
    // Show copy button
    copyBtn.style.display = 'flex';
    
    // Auto-copy to clipboard
    setTimeout(function() {
        copyToClipboard();
    }, 500);
    
    // Start countdown timer
    startCountdown();
    
    // Update button text
    generateBtn.textContent = '✅ Key Generated!';
    generateBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
    generateBtn.disabled = true;
}

// Copy to clipboard
function copyToClipboard() {
    if (!accessKey) return;
    
    const textarea = document.createElement('textarea');
    textarea.value = accessKey;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Show success message
            successMessage.style.display = 'block';
            
            // Hide message after 3 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 3000);
        }
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
    
    document.body.removeChild(textarea);
}

// Start countdown timer
function startCountdown() {
    function updateTimer() {
        if (!keyExpiryTime) return;
        
        const now = Date.now();
        const timeLeft = keyExpiryTime - now;
        
        if (timeLeft <= 0) {
            timerDisplay.textContent = '⏰ Key has expired! Generate a new one.';
            timerDisplay.style.color = '#ff4757';
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        timerDisplay.textContent = `⏰ Key expires in: ${hours}h ${minutes}m ${seconds}s`;
        
        // Change color based on time
        if (hours < 6) {
            timerDisplay.style.color = '#ff9966';
        }
        if (hours < 1) {
            timerDisplay.style.color = '#ff4757';
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Load saved key if exists
function loadSavedKey() {
    const saved = localStorage.getItem('accessKeyData');
    
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const now = Date.now();
            
            if (now < data.expiry) {
                // Key is still valid
                accessKey = data.key;
                keyExpiryTime = data.expiry;
                
                // Display the key
                keyDisplay.textContent = accessKey;
                keyDisplay.style.color = '#4cc9f0';
                keyDisplay.style.fontSize = '22px';
                
                // Show copy button
                copyBtn.style.display = 'flex';
                
                // Mark task as completed
                taskCompleted = true;
                checkbox1.classList.add('checked');
                
                // Update generate button
                generateBtn.textContent = '✅ Key Already Generated';
                generateBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
                generateBtn.disabled = true;
                
                // Start countdown
                startCountdown();
            } else {
                // Key expired
                localStorage.removeItem('accessKeyData');
            }
        } catch (err) {
            console.error('Error loading saved key:', err);
        }
    }
}

// Initialize everything
function init() {
    // Update time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Initialize task
    initTask();
    
    // Load saved key
    loadSavedKey();
    
    // Button events
    generateBtn.addEventListener('click', generateAccessKey);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Initially disable generate button
    generateBtn.disabled = true;
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
