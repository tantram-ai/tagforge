const { Generation, User } = require('../models');
const { generateMeta } = require('../utils/openai');

const FREE_GENERATIONS = parseInt(process.env.FREE_GENERATIONS || '4');

async function generate(req, res) {
  try {
    const user = req.user; // set by firebaseAuth
    const body = req.body;

    // Check free limit
    const subscription = await user.getSubscription?.(); // if you implement eager association
    const isPaid = subscription && subscription.status === 'active';

    if (!isPaid && user.generationCount >= FREE_GENERATIONS) {
      return res.status(402).json({
        error: 'Free generation limit reached. Please subscribe to continue.',
        needSubscription: true
      });
    }

    // Call OpenAI
    const data = await generateMeta({
      title: body.title,
      description: body.description,
      url: body.url,
      imageUrl: body.imageUrl,
      twitterHandle: body.twitterHandle,
      language: body.language,
      contentType: body.contentType,
      includeSchema: body.includeSchema
    });

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
