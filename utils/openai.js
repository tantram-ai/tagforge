const axios = require('axios');
const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function generateMeta({title, description, url, imageUrl, twitterHandle, language, contentType, includeSchema}) {
  // Simple prompt; refine as needed
  const prompt = `
You are an expert SEO and metadata assistant.
Given:
Title: ${title || ''}
Description: ${description || ''}
URL: ${url || ''}
Image: ${imageUrl || ''}
Twitter: ${twitterHandle || ''}
Language: ${language || 'en'}
Content type: ${contentType || 'website'}
Generate:
1) A polished meta title (max 60 chars)
2) A polished meta description (max 160 chars)
3) Meta tags for Open Graph and Twitter Card
4) JSON-LD schema (if includeSchema is true)
Return JSON with keys: title, description, metaTagsHtml, schemaJson
`;

  const model = process.env.FREE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    input: prompt,
    // some models might require different shape; this is illustrative — adapt to your chosen API.
  };

  const resp = await axios.post('https://api.openai.com/v1/responses', payload, {
    headers: { Authorization: `Bearer ${OPENAI_KEY}` }
  });

  // Parse results appropriately depending on API response structure
  const text = resp.data.output?.[0]?.content?.[0]?.text || JSON.stringify(resp.data);
  // You should design the model response to be JSON so parsing is robust.
  // For now, return a minimal structure
  return {
    raw: resp.data,
    text
  };
}

module.exports = { generateMeta };
