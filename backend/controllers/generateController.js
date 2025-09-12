const { Generation, User } = require('../models');
const { generateMeta } = require('../utils/openai');

const FREE_GENERATIONS = parseInt(process.env.FREE_GENERATIONS || '4');

async function generate(req, res) {
  try {
    const user = req.user; // set by firebaseAuth
    const body = req.body;
    const idAiEnabled = body.isAiEnabled
    let data = []

    // Check free limit
    const subscription = await user.getSubscription?.(); // if you implement eager association
    const isPaid = subscription && subscription.status === 'active';

    if (!isPaid && user.generationCount >= FREE_GENERATIONS) {
      return res.status(402).json({
        error: 'Free generation limit reached. Please subscribe to continue.',
        needSubscription: true
      });
    }

    if(idAiEnabled){
          // Call OpenAI
      data = await generateMeta({
        title: body.title,
        description: body.description,
        url: body.url,
        imageUrl: body.imageUrl,
        twitterHandle: body.twitterHandle,
        language: body.language,
        contentType: body.contentType,
        includeSchema: body.includeSchema
      });
    }else{
      // Non-AI (Free) generation
      data =  `
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <meta name="language" content="${language}" />
      <link rel="canonical" href="${url}" />
      
      <meta property="og:type" content="${contentType}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${url}" />
      ${imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : ""}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      ${imageUrl ? `<meta name="twitter:image" content="${imageUrl}" />` : ""}
      ${twitterHandle ? `<meta name="twitter:site" content="@${twitterHandle}" />` : ""}
            `;
    }

    // Save generation
    const gen = await Generation.create({
      title: body.title,
      description: body.description,
      url: body.url,
      imageUrl: body.imageUrl,
      twitterHandle: body.twitterHandle,
      schemaJson: body.includeSchema ? data.schemaJson : null,
      usedModel: process.env.FREE_MODEL || 'gpt-4o-mini',
      UserId: user.id
    });

    // Increment counter
    user.generationCount = user.generationCount + 1;
    await user.save();

    return res.json({ success: true, result: data, generation: gen, remaining: Math.max(0, FREE_GENERATIONS - user.generationCount) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { generate };
