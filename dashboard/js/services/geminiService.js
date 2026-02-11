import { GoogleGenAI } from "@google/genai";

let ai = null;

const getAI = () => {
    if (!ai) {
        if (!window.API_KEY || window.API_KEY.trim() === '') {
            console.warn("Gemini API Key missing. Service will run in DEMO MODE.");
            return null;
        }
        ai = new GoogleGenAI(window.API_KEY);
    }
    return ai;
};

export const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const base64Data = base64String.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const getLanguageName = (lang) => {
    switch (lang) {
        case 'ne': return "Nepali";
        case 'mai': return "Maithili";
        case 'bho': return "Bhojpuri";
        case 'new': return "Nepal Bhasa (Newari)";
        default: return "English";
    }
};

export const analyzeDisease = async (file, language) => {
    const langName = getLanguageName(language);

    try {
        const base64Data = await fileToGenerativePart(file);

        const prompt = `You are an expert Agricultural AI for Nepal. Analyze this image. 
         If it is a plant or animal, identify any diseases.
         
         IMPORTANT: Provide the response strictly in valid JSON format.
         Translate all fields to ${langName} where appropriate, except for 'diseaseName' which should be in English.
         
         The JSON structure must be:
         {
            "diseaseName": "Name in English",
            "localName": "Name in ${langName}",
            "affectedType": "Plant" | "Animal" | "Other",
            "confidence": 85,
            "severity": "Low" | "Medium" | "High" | "Critical",
            "symptoms": ["Symptom 1", "Symptom 2"],
            "causes": ["Cause 1", "Cause 2"],
            "spreadRisk": "Low" | "Medium" | "High",
            "treatments": {
                "organic": ["Organic method 1", "Organic method 2"],
                "chemical": ["Chemical name 1", "Chemical name 2"],
                "dosage": "Specific dosage instructions"
            },
            "prevention": ["Prevention tip 1", "Prevention tip 2"],
            "recoveryTimeline": "e.g., 7-10 days",
            "contactExpert": true,
            "seasonalWarning": "Warning text if this is common in current season (e.g., Monsoon) in Nepal, else null"
         }

         If the image is not related to agriculture (e.g., a person, car, building not related to farm), set "affectedType" to "Other" and provide a polite message in "localName" asking for a clear photo of a crop or livestock.
         `;

        const genAI = getAI();
        if (!genAI) return mockDiseaseResult(); // Fallback for demo

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64Data
                }
            },
            { text: prompt }
        ]);

        const response = await result.response;
        const text = response.text();
        if (!text) return null;

        return JSON.parse(text);

    } catch (error) {
        console.error("Error analyzing disease:", error);
        return null;
    }
};

export const getCropRecommendation = async (data, language) => {
    const langName = getLanguageName(language);

    const prompt = `
    Act as a senior agricultural scientist for Nepal.
    Based on the following data:
    - Soil: ${data.soil}
    - Altitude Zone: ${data.altitude}
    - Current Season: ${data.season}
    - Location: ${data.location}
    - Irrigation Access: ${data.irrigation}
    - Land Area: ${data.landArea}

    Consider the Nepali Panchanga calendar for sowing dates and local Mandi (market) price trends.
    
    Recommend 3 best crops.
    Return ONLY a raw JSON array.
    
    The JSON structure for each crop must be:
    {
      "cropName": "English Name",
      "localName": "Name in ${langName}",
      "scientificName": "Scientific Name",
      "matchScore": 85,
      "duration": "e.g. 120 Days",
      "season": "Planting Season in ${langName}",
      "economics": {
        "estimatedYield": "e.g. 400 kg/ropani",
        "marketDemand": "High",
        "marketPriceTrend": "Rising",
        "estimatedProfit": "e.g. NPR 25,000",
        "investmentCost": "e.g. NPR 10,000"
      },
      "requirements": {
        "water": "High",
        "fertilizer": "Brief schedule in ${langName}",
        "labor": "Medium"
      },
      "risks": {
        "level": "Low",
        "pestVulnerability": "Specific pest in ${langName}",
        "weatherResilience": "Brief note in ${langName}"
      },
      "farmingTips": {
        "sowingWindow": "Best week based on Panchanga in ${langName}",
        "rotationCrop": "Best next crop for soil health in ${langName}",
        "soilHealth": "Impact on soil in ${langName}"
      }
    }
  `;

    try {
        const genAI = getAI();
        if (!genAI) return mockCropResults(language); // Fallback for demo

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (!text) return [];

        const recommendations = JSON.parse(text);
        return Array.isArray(recommendations) ? recommendations : [];
    } catch (error) {
        console.error("Error getting recommendation:", error);
        return [];
    }
};

// --- Mock Data for Demo Mode ---
function mockDiseaseResult() {
    const diseases = [
        {
            "diseaseName": "Tomato Late Blight",
            "localName": "गोलभेडाको डढुवा रोग (Demo)",
            "affectedType": "Plant",
            "confidence": 98,
            "severity": "Critical",
            "symptoms": ["Dark, water-soaked spots on leaves", "White mold on the underside of leaves", "Fruit turning brown and rotting"],
            "causes": ["Phytophthora infestans fungus", "High humidity and cool temperatures"],
            "spreadRisk": "High",
            "treatments": {
                "organic": ["Remove and burn infected plants", "Apply neem oil or copper-based organic fungicides"],
                "chemical": ["Mancozeb", "Metalaxyl-M"],
                "dosage": "Apply 2g/liter of water every 7 days during damp weather"
            },
            "prevention": ["Crop rotation", "Drip irrigation", "Proper spacing"],
            "recoveryTimeline": "14 days for control",
            "contactExpert": true,
            "seasonalWarning": "Highly common during Monsoon in Nepal."
        },
        {
            "diseaseName": "Rice Blast",
            "localName": "धानको मरुवा रोग (Demo)",
            "affectedType": "Plant",
            "confidence": 92,
            "severity": "High",
            "symptoms": ["Diamond-shaped spots on leaves", "Gray or whitish centers with brown borders", "Broken necks of grain heads"],
            "causes": ["Magnaporthe oryzae fungus", "High nitrogen levels", "Long durations of leaf wetness"],
            "spreadRisk": "High",
            "treatments": {
                "organic": ["Burn crop residues", "Use resistant varieties", "Proper water management"],
                "chemical": ["Tricyclazole", "Carbendazim"],
                "dosage": "Spray Tricyclazole at 0.6g per liter of water"
            },
            "prevention": ["Early planting", "Avoid over-irrigation", "Seed treatment"],
            "recoveryTimeline": "10-15 days for stabilization",
            "contactExpert": true,
            "seasonalWarning": "Risk increases during warm, humid conditions."
        },
        {
            "diseaseName": "Citrus Canker",
            "localName": "सुन्तलाजातको क्यान्कर (Demo)",
            "affectedType": "Plant",
            "confidence": 89,
            "severity": "Medium",
            "symptoms": ["Raised, corky spots on leaves and fruit", "Yellow halos around lesions", "Premature fruit drop"],
            "causes": ["Xanthomonas citri bacteria", "Wind-blown rain", "Human movement"],
            "spreadRisk": "Medium",
            "treatments": {
                "organic": ["Prune and destroy infected branches", "Copper-based sprays"],
                "chemical": ["Copper oxychloride", "Streptomycin sulphate"],
                "dosage": "Apply Copper oxychloride at 3g/L"
            },
            "prevention": ["Windbreaks", "Clean tools", "Quarantine"],
            "recoveryTimeline": "Continuous management required",
            "contactExpert": true,
            "seasonalWarning": "Spreads rapidly during rainy periods."
        }
    ];

    return diseases[Math.floor(Math.random() * diseases.length)];
}

export const createKrishiChat = (language) => {
    const langName = getLanguageName(language);

    const systemInstruction = `You are 'Krishi Sahathi' (Agricultural Friend) from Urva Sansar, an app for Nepali farmers.
    Your goal is to help farmers with agriculture, government schemes, and market prices in Nepal.
    ALWAYS reply in ${langName} language.
    Keep answers simple, concise, and culturally appropriate for rural Nepal.
    If asked about market prices or government schemes, use the search tool to find recent information.`;

    const genAI = getAI();
    if (!genAI) return mockChatSession(language); // Fallback for demo

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        tools: [{ googleSearch: {} }] 
    });

    return model.startChat({
        history: [],
        systemInstruction: systemInstruction
    });
};

// --- Mock Data Generators ---
function mockCropResults(lang) {
    const isNe = lang === 'ne';
    const allCrops = [
        {
            "cropName": "Off-Season Tomato",
            "localName": isNe ? "बेमौसमी गोलभेडा (Demo)" : "Off-Season Tomato (Demo)",
            "scientificName": "Solanum lycopersicum",
            "matchScore": 95,
            "duration": "90-120 Days",
            "economics": {
                "estimatedYield": "500 kg/ropani",
                "estimatedProfit": "NPR 45,000",
                "marketDemand": "Very High",
                "investmentCost": "NPR 15,000"
            },
            "farmingTips": {
                "sowingWindow": "Feb-March",
                "rotationCrop": "Legumes",
                "soilHealth": "Improves with plastic mulching"
            }
        },
        {
            "cropName": "Ginger",
            "localName": isNe ? "अदुवा (Demo)" : "Ginger (Demo)",
            "scientificName": "Zingiber officinale",
            "matchScore": 88,
            "duration": "8-9 Months",
            "economics": {
                "estimatedYield": "1200 kg/ropani",
                "estimatedProfit": "NPR 60,000",
                "marketDemand": "High",
                "investmentCost": "NPR 20,000"
            },
            "farmingTips": {
                "sowingWindow": "April-May",
                "rotationCrop": "Maize",
                "soilHealth": "Requires high organic matter"
            }
        },
        {
            "cropName": "Buckwheat",
            "localName": isNe ? "फापर (Demo)" : "Buckwheat (Demo)",
            "scientificName": "Fagopyrum esculentum",
            "matchScore": 92,
            "duration": "70-90 Days",
            "economics": {
                "estimatedYield": "150 kg/ropani",
                "estimatedProfit": "NPR 18,000",
                "marketDemand": "Medium",
                "investmentCost": "NPR 5,000"
            },
            "farmingTips": {
                "sowingWindow": "Sept-Oct",
                "rotationCrop": "Mustard",
                "soilHealth": "Good for high altitudes"
            }
        },
        {
            "cropName": "Cauliflower",
            "localName": isNe ? "काउली (Demo)" : "Cauliflower (Demo)",
            "scientificName": "Brassica oleracea var. botrytis",
            "matchScore": 90,
            "duration": "85-110 Days",
            "economics": {
                "estimatedYield": "600 kg/ropani",
                "estimatedProfit": "NPR 35,000",
                "marketDemand": "High",
                "investmentCost": "NPR 12,000"
            },
            "farmingTips": {
                "sowingWindow": "Aug-Sept",
                "rotationCrop": "Beans",
                "soilHealth": "Needs heavy fertilization"
            }
        }
    ];

    // Shuffle and pick 3
    return allCrops.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function mockChatSession(lang) {
    const isNe = lang === 'ne';
    return {
        sendMessage: async (message) => {
            const lowerText = message.toLowerCase();
            let reply = "";
            
            if (isNe) {
                if (lowerText.includes('धान') || lowerText.includes('रोग')) {
                    const replies = [
                        "धानको डढुवा रोग (Blast) रोक्नका लागि ट्राइसाइक्लाजोल (Tricyclazole) ७५ WP को प्रयोग गर्नुहोस्। साथै, खेतमा सन्तुलित नाइट्रोजनको प्रयोग गर्नु बेस हुन्छ।",
                        "धानमा लाग्ने खैरो थोप्ले रोग (Brown Spot) न्यूनीकरण गर्न बीउ उपचार र पोटास मलको प्रयोगमा ध्यान दिनुहोस्।",
                        "तपाईंको धान बालीमा किरा लागेको छ भने निमको तेलको झोल ३ मिली प्रति लिटर पानीमा मिसाएर छर्कनुहोस्।"
                    ];
                    reply = replies[Math.floor(Math.random() * replies.length)];
                } else if (lowerText.includes('भाउ')) {
                    const prices = [
                        "आज कालीमाटी बजारमा गोलभेडाको खुद्रा मूल्य प्रतिकिलो ७०-८० रुपैयाँ रहेको छ।",
                        "स्थानीय बजारमा हाल प्याजको मूल्यमा केही गिरावट आएको छ, अहिले प्रतिकिलो ६० रुपैयाँ हाराहारीमा उपलब्ध छ।",
                        "आजको बजार भाउ अनुसार आलुको मूल्य प्रतिकिलो ४५ रुपैयाँ कायम गरिएको छ।"
                    ];
                    reply = prices[Math.floor(Math.random() * prices.length)];
                } else {
                    const intros = [
                        "म तपाईंको कृषि साथी हुँ। मलाई खेतीपाती, बजार भाउ वा सरकारी अनुदानका बारेमा सोध्न सक्नुहुन्छ।",
                        "नमस्ते! म उर्व संसारको AI सहायक हुँ। आज तपाईंलाई कुन बालीको बारेमा जानकारी चाहिन्छ?",
                        "कृषि सम्बन्धी कुनै पनि जिज्ञासा भए ढुक्कसँग सोध्नुहोस्, म मद्दत गर्न तयार छु।"
                    ];
                    reply = intros[Math.floor(Math.random() * intros.length)];
                }
            } else {
                if (lowerText.includes('rice') || lowerText.includes('disease')) {
                    const replies = [
                        "To control Rice Blast, use Tricyclazole 75 WP. Also, ensure balanced nitrogen application in your fields.",
                        "For Brown Spot in rice, focus on seed treatment and adequate potash application.",
                        "If you see pests in your rice field, try spraying a neem oil solution (3ml/L water) as an organic alternative."
                    ];
                    reply = replies[Math.floor(Math.random() * replies.length)];
                } else if (lowerText.includes('price')) {
                    const prices = [
                        "The retail price of tomatoes at Kalimati market today is around NPR 70-80 per kg.",
                        "Onion prices have dropped slightly; they are currenty hovering around NPR 60 per kg.",
                        "Potatoes are currently priced at NPR 45 per kg in the wholesale market."
                    ];
                    reply = prices[Math.floor(Math.random() * prices.length)];
                } else {
                    const intros = [
                        "I am Krishi Sahathi. You can ask me about farming, market prices, or government subsidies.",
                        "Hello! I am your AI farming assistant. What would you like to grow today?",
                        "Feel free to ask me anything about sprouts, soil, or selling your produce!"
                    ];
                    reply = intros[Math.floor(Math.random() * intros.length)];
                }
            }
            
            return {
                response: {
                    text: () => reply
                }
            };
        }
    };
}
