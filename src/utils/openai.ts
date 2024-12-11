import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function verifyExplanation(
  targetWord: string,
  explanation: string,
  tabooWords: string[]
): Promise<{ isValid: boolean; reason?: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a judge for a Taboo word game. You need to verify if the explanation correctly describes the target word without using any taboo words."
        },
        {
          role: "user",
          content: `Target word: "${targetWord}"
Taboo words: ${tabooWords.join(', ')}
User explanation: "${explanation}"

Verify if:
1. The explanation accurately describes the target word
2. None of the taboo words are used
3. The explanation is clear and specific enough

Respond with either:
VALID: If all criteria are met
INVALID: [reason] if any criteria fails`
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    });

    const result = response.choices[0].message.content || '';
    
    if (result.startsWith('VALID')) {
      return { isValid: true };
    } else {
      const reason = result.replace('INVALID:', '').trim();
      return { isValid: false, reason };
    }
  } catch (error) {
    console.error('OpenAI verification error:', error);
    return { 
      isValid: false, 
      reason: 'Failed to verify explanation. Please try again.' 
    };
  }
}