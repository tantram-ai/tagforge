const { validateContentGenLimit } = require("../middlewares");
const { generation, keywords, users } = require("../models");
const { fetchSuccess, internalServer } = require("../utils");
const { generate } = require("./aiGenerateController");

const mockData = {
    id: 'msg_0da9c2bc2a1004e10068fa2e5a3f9c819684589313caacef0e',
    type: 'message',
    status: 'completed',
    content: [
        {
            type: 'output_text',
            annotations: [],
            logprobs: [],
            text: {
                id: 'msg_0da9c2bc2a1004e10068fa2e5a3f9c819684589313caacef0e',
                type: 'message',
                status: 'completed',
                content: [
                    {
                        type: 'output_text',
                        annotations: [],
                        logprobs: [],
                        text: '```json\n' +
                            '{\n' +
                            '  "meta": "<html><title>Top Sustainable Fashion Trends of 2023 - Eco-Friendly Style</title><meta name=\\"description\\" content=\\"Explore the latest <strong>sustainable fashion trends</strong> for 2023 that are stylish and eco-friendly. Shop now at vastra!\\"/><link rel=\\"canonical\\" href=\\"https://www.vastra.com/sustainable-fashion-trends-2023\\"/><meta property=\\"og:title\\" content=\\"Top Sustainable Fashion Trends of 2023\\"/><meta property=\\"og:description\\" content=\\"Discover stylish and affordable <strong>sustainable fashion trends</strong> for 2023! Join the eco-friendly movement with vastra.\\"/></html>",\n' +
                            `  "seoContent": "<html><h1>Unveiling the Top <strong>Sustainable Fashion Trends</strong> of 2023</h1><p>If you're passionate about the planet and love to express yourself through style, you've come to the right place! At vastra, we focus on <strong>sustainable fashion trends</strong> that cater to environmentally conscious millennials. Let’s take a look at what’s in vogue for <strong>sustainable fashion trends 2023</strong>.</p><h2>Latest <strong>Sustainability Trends in Fashion</strong></h2><ul><li><strong>Organic Materials</strong>: Eco-friendly fabrics like organic cotton are becoming the norm.</li><li><strong>Upcycled Fashion</strong>: Transforming old garments into new treasures is gaining traction.</li><li><strong>Minimalist Styles</strong>: Less is more! Simple designs are both stylish and sustainable.</li><li><strong>Timeless Pieces</strong>: Investing in clothes that last rather than fast fashion.</li></ul><h2>Why <strong>Sustainable Fashion Trends 2022</strong> Matter</h2><p>Sustainability in fashion isn't just a passing phase; it's a movement. By embracing <strong>sustainable fashion trends</strong>, you're supporting eco-friendly practices that reduce waste and conserve resources.</p><h2>Your Guide to Trends in <strong>Sustainable Fashion</strong></h2><p>Looking forward to refreshing your wardrobe? Consider these steps:</p><ol><li>Check for certifications in fabrics.</li><li>Opt for brands committed to sustainability, like vastra!</li><li>Mix and match classic styles for versatility.</li></ol><h3>Join the Movement!</h3><pReady to style a sustainable future? <strong>Shop now</strong> at vastra and embrace the latest in eco-fashion!</p></html>",\n` +
                            '  "schema": {\n' +
                            '    "@context": "https://schema.org",\n' +
                            '    "@type": "FAQPage",\n' +
                            '    "mainEntity": [\n' +
                            '      {\n' +
                            '        "@type": "Question",\n' +
                            '        "name": "What are the latest sustainable fashion trends for 2023?",\n' +
                            '        "acceptedAnswer": {\n' +
                            '          "@type": "Answer",\n' +
                            '          "text": "The latest sustainable fashion trends for 2023 include organic materials, upcycled fashion, minimalist styles, and timeless pieces."\n' +
                            '        }\n' +
                            '      },\n' +
                            '      {\n' +
                            '        "@type": "Question",\n' +
                            '        "name": "Why are sustainable fashion trends important?",\n' +
                            '        "acceptedAnswer": {\n' +
                            '          "@type": "Answer",\n' +
                            '          "text": "Sustainable fashion trends are important because they promote eco-friendly practices that reduce waste and prevent harm to the environment."\n' +
                            '        }\n' +
                            '      }\n' +
                            '    ]\n' +
                            '  }\n' +
                            '}\n' +
                            '```'
                    }
                ],
                role: 'assistant'
            }
        }
    ],
    role: 'assistant'
}
const setSuggestedKeyWords = async (selectedKeywords, projectId) => {
    const suggestedKeyWordCount = await keywords.count({ where: { projectId, selected: true } })
    if (suggestedKeyWordCount > 0) {
        return await keywords.update({ selected: true, phrase: selectedKeywords, projectId }, { where: { projectId, selected: true } })
    } else {
        return await keywords.create({ selected: true, phrase: selectedKeywords, projectId })
    }
}

const setGeneratedContent = async (content, projectId) => {
    const generatedContentCount = await generation.count({ where: { projectId } })
    if (generatedContentCount > 0) {
        return await generation.update({
            projectId: projectId,
            seoContent: content?.seoContent,
            metaHtml: content?.meta,
            data: content?.schema
        }, { where: { projectId } })
    } else {
        return await generation.create({
            projectId: projectId,
            seoContent: content?.seoContent,
            metaHtml: content?.meta,
            data: content?.schema
        })
    }
}

const generateContent = async (req, res) => {
    const uid = req?.firebaseUser?.uid;
    const planId = req?.subsciptionData?.Plan?.planId
    const { projectId, selectedKeywords } = req?.body

    try {
        const isProjectLimitValid = await validateContentGenLimit(req, res)

        if (isProjectLimitValid) {
            // const output = await generate(req, res)
            let cleaned = mockData?.content[0]?.text?.content[0].text.replace(/```json|```/g, "").trim()
            await setGeneratedContent(JSON.parse(cleaned), projectId)
            await setSuggestedKeyWords(JSON.stringify(selectedKeywords), projectId)
            await users.increment('generationCount', {
                by: 1,
                where: { uid }
            });
            return fetchSuccess(res, JSON.parse(cleaned))
        }

    } catch (error) {
        return internalServer(error, res)
    }
}

module.exports = { generateContent }