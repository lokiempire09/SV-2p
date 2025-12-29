// Configuration file for easy customization
const CONFIG = {
    // Task Configuration
    task: {
        youtubeLink: "https://youtube.com",
        taskText: "Watch Tutorial on YouTube",
        required: true
    },
    
    // Key Configuration
    key: {
        duration: 24, // Hours
        format: "XXXX-XXXX-XXXX-XXXX",
        autoCopy: true
    },
    
    // Design Configuration
    design: {
        primaryColor: "#4cc9f0",
        secondaryColor: "#4361ee",
        backgroundColor: "#1a1a2e",
        textColor: "#e6e6e6"
    },
    
    // App Info
    app: {
        name: "Access Key Generator",
        copyright: "studyarrays",
        developer: "DevJisu",
        year: "2024-2025"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
