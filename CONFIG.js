// Configuration File - Easy to customize
const APP_CONFIG = {
    // App Info
    appName: "Selection Way",
    version: "1.0.0",
    
    // Earning Links - YAHAN APNE SHORTLINKS DALO
    earningLinks: {
        task1: "https://your-first-earning-link.com",
        task2: "https://your-second-earning-link.com"
    },
    
    // Key Settings
    keySettings: {
        validityHours: 24,
        format: "XXXX-XXXX-XXXX-XXXX",
        autoCopy: true
    },
    
    // Design Settings
    design: {
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        backgroundColor: "#0f172a",
        textColor: "#e2e8f0"
    },
    
    // Features
    features: {
        autoSave: true,
        deviceLock: true,
        timerDisplay: true
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
}
