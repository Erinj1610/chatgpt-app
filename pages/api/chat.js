export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.OPENAI_API_KEY;
  const messages = req.body.messages || [];

  const systemMessage = {
    role: 'system',
    content: 'You are a helpful assistant.'
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [systemMessage, ...messages]
      })
    });

    const data = await response.json();

    res.status(200).json({ reply: data.choices[0].message });
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
}