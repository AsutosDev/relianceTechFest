export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            });
        }
    });
};

export const reverseGeocode = async (lat, lon) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
        if (!response.ok) {
            return "Detected Location";
        }
        const data = await response.json();
        const address = data.address;
        return address.county || address.district || address.city || address.town || address.village || address.state || "Nepal";
    } catch (error) {
        console.warn("Reverse geocoding error:", error);
        return "Unknown Location";
    }
};

export const determineAltitudeZone = (altitude) => {
    if (altitude === null) return "Hills (600-2000m)";
    if (altitude < 600) return "Terai (<600m)";
    if (altitude >= 600 && altitude <= 2000) return "Hills (600-2000m)";
    return "Mountain (>2000m)";
};

export const detectLocation = async () => {
    const position = await getCurrentPosition();
    const { latitude, longitude, altitude } = position.coords;

    let address = "Unknown";
    if (navigator.onLine) {
        address = await reverseGeocode(latitude, longitude);
    } else {
        address = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }

    return { latitude, longitude, altitude, address };
};
