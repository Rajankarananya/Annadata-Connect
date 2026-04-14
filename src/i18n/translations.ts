export type LanguageCode = 'en' | 'hi' | 'mr'

type StepTranslation = {
  num: string
  title: string
  desc: string
}

type TranslationShape = {
  brand: string
  heroLine1: string
  heroLine2: string
  heroSub: string
  navCta: string
  authLabel: string
  loginBtn: string
  registerBtn: string
  langLabel: string
  eyebrow: string
  sectionTitle: string
  sectionBody: string
  step1: StepTranslation
  step2: StepTranslation
  step3: StepTranslation
  footerTagline: string
  footerPlatformTitle: string
  footerPlatformLinks: string[]
  footerCompanyTitle: string
  footerCompanyLinks: string[]
  footerSupportTitle: string
  footerSupportLinks: string[]
  footerRights: string
  footerBlessing: string
}

export const translations: Record<LanguageCode, TranslationShape> = {
  en: {
    brand: 'Annadata',
    heroLine1: 'AnnaData',
    heroLine2: 'Connect',
    heroSub: 'Bridging agriculture and intelligence to simplify claims, support, and governance.',
    navCta: 'Start Growing',
    authLabel: 'Join Annadata:',
    loginBtn: 'Login',
    registerBtn: 'Register Now',
    langLabel: 'Choose language / भाषा निवडा:',
    eyebrow: 'What AnnaData is',
    sectionTitle: 'A digital layer for farmer-first decisions',
    sectionBody:
      'AnnaData is a digital platform designed to support farmers in navigating challenges related to land, weather, and financial distress. It enables farmers to submit claims for loans or assistance based on real-world issues, while providing administrators and supervisors with a streamlined system to review, validate, and approve or reject claims - enhanced with machine learning for smarter, faster decision-making.',
    step1: {
      num: 'Step 1',
      title: 'Register your land',
      desc: 'Add your land details, crop type, and location in just a few minutes.',
    },
    step2: {
      num: 'Step 2',
      title: 'Submit your claim',
      desc: 'Report issues like weather damage, crop loss, or land-related problems and request financial support.',
    },
    step3: {
      num: 'Step 3',
      title: 'Smart review & approval',
      desc: 'Your claim is analyzed using ML and reviewed by admins for quick approval or resolution.',
    },
    footerTagline: 'Empowering India\'s farmers with technology, fair prices, and direct market access since 2026.',
    footerPlatformTitle: 'Platform',
    footerPlatformLinks: ['For Farmers', 'For Traders', 'Mandi Prices', 'Crop Advisory', 'Weather'],
    footerCompanyTitle: 'Company',
    footerCompanyLinks: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
    footerSupportTitle: 'Support',
    footerSupportLinks: ['Help Center', 'Privacy Policy', 'Terms of Use', 'Grievance Cell'],
    footerRights: '© 2026 Annadata. All rights reserved.',
    footerBlessing: 'अन्नदाता सुखी भव | Annadata Sukhi Bhava - May the food-giver prosper',
  },
  hi: {
    brand: 'अन्नदाता',
    heroLine1: 'अन्नदाता',
    heroLine2: 'कनेक्ट',
    heroSub: 'कृषि और बुद्धिमत्ता को जोड़ते हुए दावों, सहायता और प्रशासन को सरल बनाना।',
    navCta: 'खेती शुरू करें',
    authLabel: 'Annadata से जुड़ें:',
    loginBtn: 'लॉगिन',
    registerBtn: 'अभी पंजीकरण करें',
    langLabel: 'भाषा चुनें / भाषा निवडा:',
    eyebrow: 'AnnaData क्या है',
    sectionTitle: 'किसान-प्रथम निर्णयों के लिए एक डिजिटल परत',
    sectionBody:
      'AnnaData एक डिजिटल प्लेटफ़ॉर्म है जो किसानों को भूमि, मौसम और वित्तीय संकट से जुड़ी चुनौतियों को समझने और संभालने में सहायता करता है। यह किसानों को वास्तविक समस्याओं के आधार पर ऋण या सहायता के लिए दावे दर्ज करने में सक्षम बनाता है, जबकि प्रशासकों और पर्यवेक्षकों को दावों की समीक्षा, सत्यापन और स्वीकृति या अस्वीकृति के लिए एक सुव्यवस्थित प्रणाली प्रदान करता है - जिसे तेज़ और बेहतर निर्णय के लिए मशीन लर्निंग से सशक्त किया गया है।',
    step1: {
      num: 'चरण 1',
      title: 'अपनी भूमि पंजीकृत करें',
      desc: 'कुछ ही मिनटों में अपनी भूमि का विवरण, फसल प्रकार और स्थान जोड़ें।',
    },
    step2: {
      num: 'चरण 2',
      title: 'अपना दावा दर्ज करें',
      desc: 'मौसम से नुकसान, फसल हानि या भूमि से जुड़ी समस्याओं की रिपोर्ट करें और वित्तीय सहायता का अनुरोध करें।',
    },
    step3: {
      num: 'चरण 3',
      title: 'स्मार्ट समीक्षा और स्वीकृति',
      desc: 'आपके दावे का विश्लेषण ML से किया जाता है और त्वरित स्वीकृति या समाधान के लिए प्रशासकों द्वारा समीक्षा की जाती है।',
    },
    footerTagline: 'भारत के किसानों को तकनीक, उचित मूल्य और सीधे बाजार तक पहुंच के साथ 2026 से सशक्त बना रहे हैं।',
    footerPlatformTitle: 'प्लेटफ़ॉर्म',
    footerPlatformLinks: ['किसानों के लिए', 'व्यापारियों के लिए', 'मंडी भाव', 'फसल सलाह', 'मौसम'],
    footerCompanyTitle: 'कंपनी',
    footerCompanyLinks: ['हमारे बारे में', 'ब्लॉग', 'करियर', 'प्रेस', 'संपर्क'],
    footerSupportTitle: 'सहायता',
    footerSupportLinks: ['हेल्प सेंटर', 'गोपनीयता नीति', 'उपयोग की शर्तें', 'शिकायत प्रकोष्ठ'],
    footerRights: '© 2026 अन्नदाता। सर्वाधिकार सुरक्षित।',
    footerBlessing: 'अन्नदाता सुखी भव | Annadata Sukhi Bhava - अन्नदाता समृद्ध रहे',
  },
  mr: {
    brand: 'अन्नदाता',
    heroLine1: 'अन्नदाता',
    heroLine2: 'कनेक्ट',
    heroSub: 'दावे, मदत आणि प्रशासन सोपे करण्यासाठी शेती आणि बुद्धिमत्ता यांना जोडणारे व्यासपीठ.',
    navCta: 'शेतीला सुरुवात करा',
    authLabel: 'Annadata मध्ये सामील व्हा:',
    loginBtn: 'लॉगिन',
    registerBtn: 'आत्ताच नोंदणी करा',
    langLabel: 'Choose language / भाषा निवडा:',
    eyebrow: 'AnnaData म्हणजे काय',
    sectionTitle: 'शेतकरी-केंद्रित निर्णयांसाठी डिजिटल स्तर',
    sectionBody:
      'AnnaData हे एक डिजिटल व्यासपीठ आहे जे शेतकऱ्यांना जमीन, हवामान आणि आर्थिक अडचणींशी संबंधित आव्हाने हाताळण्यासाठी मदत करते. हे शेतकऱ्यांना प्रत्यक्ष समस्यांवर आधारित कर्ज किंवा सहाय्यासाठी दावे सादर करण्यास सक्षम करते, तर प्रशासक आणि पर्यवेक्षकांना दावे तपासणे, पडताळणी करणे आणि मंजूर किंवा नाकारण्यासाठी सुलभ प्रणाली देते - आणि अधिक जलद, अचूक निर्णयांसाठी मशीन लर्निंगची जोड देते.',
    step1: {
      num: 'पायरी 1',
      title: 'तुमची जमीन नोंदवा',
      desc: 'फक्त काही मिनिटांत जमिनीची माहिती, पिकाचा प्रकार आणि स्थान जोडा.',
    },
    step2: {
      num: 'पायरी 2',
      title: 'तुमचा दावा सादर करा',
      desc: 'हवामानामुळे झालेले नुकसान, पीक हानी किंवा जमीनसंबंधित अडचणी नोंदवा आणि आर्थिक मदतीची विनंती करा.',
    },
    step3: {
      num: 'पायरी 3',
      title: 'स्मार्ट पुनरावलोकन आणि मंजुरी',
      desc: 'तुमच्या दाव्याचे ML द्वारे विश्लेषण केले जाते आणि जलद मंजुरी किंवा निराकरणासाठी प्रशासकांकडून पुनरावलोकन होते.',
    },
    footerTagline: 'भारताच्या शेतकऱ्यांना तंत्रज्ञान, योग्य दर आणि थेट बाजारपेठ प्रवेशासह 2026 पासून सक्षम करत आहोत.',
    footerPlatformTitle: 'प्लॅटफॉर्म',
    footerPlatformLinks: ['शेतकऱ्यांसाठी', 'व्यापाऱ्यांसाठी', 'मंडी भाव', 'पीक सल्ला', 'हवामान'],
    footerCompanyTitle: 'कंपनी',
    footerCompanyLinks: ['आमच्याबद्दल', 'ब्लॉग', 'करिअर', 'प्रेस', 'संपर्क'],
    footerSupportTitle: 'सहाय्य',
    footerSupportLinks: ['मदत केंद्र', 'गोपनीयता धोरण', 'वापर अटी', 'तक्रार कक्ष'],
    footerRights: '© 2026 अन्नदाता. सर्व हक्क राखीव.',
    footerBlessing: 'अन्नदाता सुखी भव | Annadata Sukhi Bhava - अन्नदात्याचे कल्याण होवो',
  },
}
