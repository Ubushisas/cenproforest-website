// Conversation Storage Module for CENPROFOREST
// Handles saving conversations locally and preparing for cloud sync

class ConversationStorage {
    constructor() {
        this.storageKey = 'cenproforest_conversations';
        this.currentConversation = null;
        this.conversationId = null;
    }

    // Initialize a new conversation
    startConversation(sessionId) {
        this.conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.currentConversation = {
            id: this.conversationId,
            sessionId: sessionId,
            startTime: new Date().toISOString(),
            endTime: null,
            messages: [],
            userData: {
                area: null,
                quantity: null,
                height: null,
                zone: null,
                entityType: null,
                detectedCity: null,
                initialIntent: null
            },
            status: 'active',
            source: 'web_chat'
        };
        
        return this.conversationId;
    }

    // Add a message to the conversation
    addMessage(role, content, metadata = {}) {
        if (!this.currentConversation) return;
        
        const message = {
            timestamp: new Date().toISOString(),
            role: role, // 'user', 'bot', 'system'
            content: content,
            metadata: metadata
        };
        
        this.currentConversation.messages.push(message);
        this.saveToLocal();
    }

    // Update user data collected during conversation
    updateUserData(field, value) {
        if (!this.currentConversation) return;
        
        this.currentConversation.userData[field] = value;
        this.saveToLocal();
    }

    // Mark conversation as complete
    endConversation() {
        if (!this.currentConversation) return;
        
        this.currentConversation.endTime = new Date().toISOString();
        this.currentConversation.status = 'completed';
        this.saveToLocal();
        
        // Prepare for export
        return this.exportConversation();
    }

    // Save to localStorage (temporary before cloud)
    saveToLocal() {
        try {
            const allConversations = this.getAllConversations();
            allConversations[this.conversationId] = this.currentConversation;
            localStorage.setItem(this.storageKey, JSON.stringify(allConversations));
        } catch (e) {
            console.error('Error saving conversation:', e);
        }
    }

    // Get all conversations from localStorage
    getAllConversations() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Error loading conversations:', e);
            return {};
        }
    }

    // Export conversation for cloud storage
    exportConversation() {
        if (!this.currentConversation) return null;
        
        // Create a clean export format
        const exportData = {
            ...this.currentConversation,
            exportTime: new Date().toISOString(),
            summary: this.generateSummary()
        };
        
        return exportData;
    }

    // Generate conversation summary for salesmen
    generateSummary() {
        if (!this.currentConversation) return '';
        
        const data = this.currentConversation.userData;
        const summary = {
            quickInfo: `${data.entityType || 'Cliente'} - ${data.zone || 'Sin ubicación'} - ${data.area || 'Sin área'}`,
            details: {
                tipo: data.entityType,
                ubicacion: data.zone,
                altitud: data.height,
                area: data.area,
                cantidad: data.quantity,
                consulta: data.initialIntent
            },
            conversationLength: this.currentConversation.messages.length,
            duration: this.calculateDuration()
        };
        
        return summary;
    }

    // Calculate conversation duration
    calculateDuration() {
        if (!this.currentConversation) return '0 min';
        
        const start = new Date(this.currentConversation.startTime);
        const end = this.currentConversation.endTime ? 
            new Date(this.currentConversation.endTime) : 
            new Date();
        
        const durationMs = end - start;
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        
        return `${minutes}m ${seconds}s`;
    }

    // Prepare batch export for cloud sync
    exportAllForCloud() {
        const conversations = this.getAllConversations();
        const exportData = {
            exportDate: new Date().toISOString(),
            totalConversations: Object.keys(conversations).length,
            conversations: Object.values(conversations)
        };
        
        return exportData;
    }

    // Clear old conversations (keep last 30 days)
    cleanOldConversations() {
        const conversations = this.getAllConversations();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const cleaned = {};
        for (const [id, conv] of Object.entries(conversations)) {
            const convDate = new Date(conv.startTime);
            if (convDate > thirtyDaysAgo) {
                cleaned[id] = conv;
            }
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(cleaned));
    }
}

// Export for use in other modules
window.ConversationStorage = ConversationStorage;