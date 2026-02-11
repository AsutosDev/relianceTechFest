const STORAGE_KEY = 'urva_notif_prefs';

export const DEFAULT_PREFERENCES = {
    weatherAlerts: true,
    marketPrices: true,
    diseaseAlerts: true,
    schemes: false
};

export const loadPreferences = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES;
    } catch {
        return DEFAULT_PREFERENCES;
    }
};

export const savePreferences = (prefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

export const requestPermission = async () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support desktop notification');
        return false;
    }
    if (Notification.permission === 'granted') return true;
    try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    } catch (e) {
        console.error("Permission request failed", e);
        return false;
    }
};

export const sendNotification = (title, body) => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        try {
            new Notification(title, {
                body,
                icon: 'https://cdn-icons-png.flaticon.com/512/3601/3601521.png',
                tag: 'urva-alert',
                lang: 'en-US',
                requireInteraction: true
            });
        } catch (e) {
            console.error("Notification trigger failed", e);
        }
    }
};

export const simulateIncomingAlert = (prefs, language, user) => {
    const alerts = [];
    const location = (user && user.district) || "Nepal";
    const isNepali = language === 'ne';

    if (prefs.weatherAlerts) {
        alerts.push({
            title: isNepali ? 'बाढीको चेतावनी' : '⚠️ Flood Warning',
            body: isNepali
                ? `${location} क्षेत्रमा भारी वर्षाको सम्भावना छ। कृपया सतर्क रहनुहोस्।`
                : `Heavy rainfall expected in ${location}. Please stay alert.`
        });
    }

    if (prefs.marketPrices) {
        alerts.push({
            title: isNepali ? 'बजार मूल्य अपडेट' : '📈 Market Price Alert',
            body: isNepali
                ? `${location} नजिकैको बजारमा गोलभेडाको मूल्य २०% ले बढेको छ।`
                : `Tomato prices have increased by 20% in markets near ${location}.`
        });
    }

    if (prefs.diseaseAlerts) {
        alerts.push({
            title: isNepali ? 'रोग प्रकोप' : '🦠 Disease Outbreak',
            body: isNepali
                ? `${location} का खेतहरूमा फौजी किरा (Armyworm) देखिएको छ। तुरुन्त जाँच गर्नुहोस्।`
                : `Fall Armyworm detected in fields near ${location}. Check your crops immediately.`
        });
    }

    if (alerts.length > 0) {
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        sendNotification(randomAlert.title, randomAlert.body);
    }
};
