import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Automatically detect the user's language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          newChat: "New Chat",
          file: "File",
          telugu: "Telugu",
          hindi: "Hindi",
          english: "English",
          marathi: "Marathi",
          skillRecco: "Skill Recco",
          resumeSynthesizer: "Resume Synthesizer",
          buttonText: {
            rag: "What is RAG in ML?",
            careerRecommendations: "What are the best career path recommendations?",
            nonTechnical: "Good career path for non-technical students",
            improveCareer: "How can I make my career better?"
          },
          thinking: "Skill Recco Thinking...",
          enterQuestion: "Enter your question..."
        }
      },
      te: {
        translation: {
          newChat: "క్రొత్త చాట్",
          file: "ఫైల్",
          telugu: "తెలుగు",
          hindi: "హిందీ",
          english: "ఆంగ్లం",
          marathi: "మరాఠీ",
          skillRecco: "నైపుణ్య సిఫార్సు",
          resumeSynthesizer: "పునః ప్రారంభ సింథసైజర్",
          buttonText: {
            rag: "ఎంఎల్ లో RAG అంటే ఏమిటి?",
            careerRecommendations: "ఉత్తమ వృత్తి మార్గ సూచనలు ఏమిటి?",
            nonTechnical: "నాన్-టెక్నికల్ విద్యార్థులకు మంచి వృత్తి మార్గం",
            improveCareer: "నేను నా వృత్తిని ఎలా మెరుగుపరచవచ్చు?"
          },
          thinking: "నైపుణ్య సిఫార్సు ఆలోచిస్తున్నది...",
          enterQuestion: "మీ ప్రశ్న నమోదు చేయండి..."
        }
      },
      hi: {
        translation: {
          newChat: "नई चैट",
          file: "फ़ाइल",
          telugu: "तेलुगु",
          hindi: "हिंदी",
          english: "अंग्रेज़ी",
          marathi: "मराठी",
          skillRecco: "कौशल सिफारिश",
          resumeSynthesizer: "फिर से शुरू संश्लेषक",
          buttonText: {
            rag: "एमएल में आरएजी क्या है?",
            careerRecommendations: "सर्वश्रेष्ठ करियर पथ सिफारिशें क्या हैं?",
            nonTechnical: "गैर-तकनीकी छात्रों के लिए अच्छा करियर मार्ग",
            improveCareer: "मैं अपना करियर कैसे बेहतर बना सकता हूं?"
          },
          thinking: "कौशल सिफारिश सोच रही है...",
          enterQuestion: "अपना प्रश्न दर्ज करें..."
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already protects against XSS
    }
  });

export default i18n;
