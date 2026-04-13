from fastapi import APIRouter, Query

router = APIRouter()


@router.post("/multilingual")
async def multilingual_chat(query: str = Query(...), lang: str = Query("en")):
    """
    Multilingual chat endpoint - returns response based on query and language.

    Args:
        query: User's question/query
        lang: Language code ('en', 'hi', 'mr')

    Returns:
        JSON with response, language, and timestamp
    """
    # Mock response for now
    responses = {
        "en": f"I received your question: '{query}'. This is the AI Advisor.",
        "hi": f"मैंने आपका सवाल प्राप्त किया: '{query}'। यह एआई सलाहकार है।",
        "mr": f"मी आपल्या प्रश्नाचे उत्तर द्या: '{query}'। हा AI सल्लागार आहे।"
    }

    response_text = responses.get(lang, responses["en"])

    return {
        "response": response_text,
        "lang": lang,
        "timestamp": __import__('datetime').datetime.now().isoformat()
    }
