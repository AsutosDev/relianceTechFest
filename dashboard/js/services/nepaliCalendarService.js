const NEPALI_MONTHS_EN = [
    "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
];

const NEPALI_MONTHS_NE = [
    "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
    "कार्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"
];

const NEPALI_DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const NEPALI_DAYS_NE = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"];

const YEAR_DATA_2082 = {
    startDayIndex: 1,
    startDateAD: new Date('2025-04-14'),
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]
};

export const getMonthName = (index, lang) => {
    if (lang === 'ne' || lang === 'new' || lang === 'mai' || lang === 'bho') {
        return NEPALI_MONTHS_NE[index % 12];
    }
    return NEPALI_MONTHS_EN[index % 12];
};

export const getDayName = (index, lang) => {
    if (lang === 'ne' || lang === 'new' || lang === 'mai' || lang === 'bho') {
        return NEPALI_DAYS_NE[index % 7];
    }
    return NEPALI_DAYS_EN[index % 7];
};

export const generateMonthData = (year, month) => {
    let daysInMonth = 30;
    let startDayIndex = 0;
    let currentAdDate = new Date();

    if (year === 2082) {
        daysInMonth = YEAR_DATA_2082.daysInMonths[month];
        let totalDaysPassed = 0;
        for (let i = 0; i < month; i++) {
            totalDaysPassed += YEAR_DATA_2082.daysInMonths[i];
        }
        startDayIndex = (YEAR_DATA_2082.startDayIndex + totalDaysPassed) % 7;
        currentAdDate = new Date(YEAR_DATA_2082.startDateAD);
        currentAdDate.setDate(currentAdDate.getDate() + totalDaysPassed);
    } else {
        daysInMonth = 32;
        startDayIndex = (year + month) % 7;
    }

    const dates = [];

    const tithis = [
        "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasti",
        "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
        "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasti",
        "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
    ];

    const agriculturalEvents = {
        0: {
            1: { title: "Naya Barsha (New Year)", type: 'festival', auspicious: true },
            11: { title: "Mata Tirtha Aunsi", type: 'festival', auspicious: true },
            15: { title: "Maize Sowing (Hills)", type: 'farming', auspicious: true }
        },
        1: {
            5: { title: "Rice Seedbed Prep", type: 'farming', auspicious: true },
            15: { title: "Ubhauli Parva", type: 'festival', auspicious: true }
        },
        2: {
            15: { title: "Dhan Diwas (Paddy Day)", type: 'farming', auspicious: true },
            29: { title: "Bhanu Jayanti", type: 'festival', auspicious: false }
        },
        3: {
            1: { title: "Sawan Sankranti", type: 'festival', auspicious: true },
            15: { title: "Kheer Khane Din", type: 'festival', auspicious: true }
        },
        4: {
            3: { title: "Kuse Aunsi", type: 'festival', auspicious: true },
            10: { title: "Teej", type: 'festival', auspicious: true }
        },
        5: {
            1: { title: "Sorha Shradda Start", type: 'festival', auspicious: false },
            15: { title: "Ghatasthapana (Dashain)", type: 'festival', auspicious: true },
            21: { title: "Phulpati", type: 'festival', auspicious: true },
            24: { title: "Vijaya Dashami", type: 'festival', auspicious: true }
        },
        6: {
            15: { title: "Laxmi Puja (Tihar)", type: 'festival', auspicious: true },
            17: { title: "Bhai Tika", type: 'festival', auspicious: true },
            25: { title: "Wheat Sowing Start", type: 'farming', auspicious: true }
        }
    };

    const monthEvents = agriculturalEvents[month] || {};

    for (let i = 1; i <= daysInMonth; i++) {
        const weekDay = (startDayIndex + i - 1) % 7;
        const tithiIndex = (i + (month * 2)) % 30;
        const evt = monthEvents[i];

        const dayAdDate = new Date(currentAdDate);
        dayAdDate.setDate(dayAdDate.getDate() + (i - 1));

        dates.push({
            year,
            month,
            day: i,
            weekDay,
            monthName: NEPALI_MONTHS_EN[month],
            tithi: tithis[tithiIndex],
            event: evt ? evt.title : undefined,
            isHoliday: weekDay === 6 || (evt && evt.type === 'festival'),
            isAuspicious: evt ? evt.auspicious : undefined,
            adDate: dayAdDate
        });
    }

    return dates;
};

export const getFarmingAdviceForDate = (date, lang) => {
    const isNepali = lang === 'ne' || lang === 'mai' || lang === 'bho';

    if (date.month === 0) return isNepali ? "मकै रोप्ने र माटो परीक्षण गर्ने समय।" : "Time for maize sowing and soil testing.";
    if (date.month === 1) return isNepali ? "धानको ब्याड राख्ने र सिँचाइ कुलो मर्मत गर्ने।" : "Rice seedbed preparation and canal repair.";
    if (date.month === 2) return isNepali ? "मुख्य धान रोपाइँको समय। पानीको स्तर मिलाउनुहोस्।" : "Main paddy plantation time. Manage water levels.";
    if (date.month === 3) return isNepali ? "धान गोडमेल र युरिया मल राख्ने समय।" : "Weeding paddy and applying Urea top dressing.";
    if (date.month === 4) return isNepali ? "तरकारी बाली (काउली, बन्दा) को ब्याड राख्ने।" : "Prepare nursery for winter vegetables (Cauliflower/Cabbage).";
    if (date.month === 5) return isNepali ? "धान बालीमा कीराको निगरानी गर्नुहोस्।" : "Monitor pests in paddy fields.";
    if (date.month === 6) return isNepali ? "गहुँ र तोरी छर्ने तयारी गर्नुहोस्।" : "Prepare land for Wheat and Mustard sowing.";
    if (date.month === 7) return isNepali ? "धान भित्र्याउने र हिउँदे बाली लगाउने।" : "Harvest paddy and plant winter crops.";
    if (date.month === 8) return isNepali ? "आलु र गहुँमा सिँचाइ गर्नुहोस्।" : "Irrigate potato and wheat crops.";
    if (date.month === 9) return isNepali ? "हिउँदे बालीमा गोडमेल र मल राख्ने।" : "Weeding and fertilizer for winter crops.";
    if (date.month === 10) return isNepali ? "मकै लगाउन जग्गा तयारी गर्नुहोस्।" : "Prepare land for Spring Maize.";
    if (date.month === 11) return isNepali ? "चैते धान र लहरे तरकारी लगाउने।" : "Sow Chaite Paddy and cucurbits.";

    if (date.weekDay === 6) return isNepali ? "आज शनिबार, औजार मर्मत र योजना बनाउनुहोस्।" : "Saturday. Maintain tools and plan ahead.";

    return isNepali ? "मौसम अनुसार नियमित हेरचाह गर्नुहोस्।" : "Perform regular maintenance based on weather.";
};
