const KEYS = {
    FEED: 'urva_cached_feed',
    PENDING_SCANS: 'urva_pending_scans'
};

// --- Feed Management ---
export const getCachedFeed = () => {
    try {
        const data = localStorage.getItem(KEYS.FEED);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load cached feed", e);
        return [];
    }
};

export const cacheFeed = (posts) => {
    try {
        localStorage.setItem(KEYS.FEED, JSON.stringify(posts));
    } catch (e) {
        console.error("Failed to cache feed (likely storage limit)", e);
    }
};

// --- Disease Scan Queue ---
export const getPendingScans = () => {
    try {
        const data = localStorage.getItem(KEYS.PENDING_SCANS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const queueScan = (base64Image) => {
    const scans = getPendingScans();
    if (scans.length >= 5) {
        alert("Offline queue full. Please connect to internet to process pending scans.");
        return;
    }
    const newScan = {
        id: Date.now().toString(),
        imageData: base64Image,
        timestamp: Date.now()
    };
    localStorage.setItem(KEYS.PENDING_SCANS, JSON.stringify([...scans, newScan]));
};

export const removeScanFromQueue = (id) => {
    const scans = getPendingScans().filter(s => s.id !== id);
    localStorage.setItem(KEYS.PENDING_SCANS, JSON.stringify(scans));
};

export const clearScanQueue = () => {
    localStorage.removeItem(KEYS.PENDING_SCANS);
};
