const seoContentFunction = {
  type: "function",  // REQUIRED: added
  name: "generate_seo_content",
  description: "Generate SEO friendly page content, metadata and schema markup.",
  parameters: {
    type: "object",
    properties: {
      meta: {
        type: "string",
        description: "HTML block containing SEO title, meta description, canonical, OG tags etc."
      },
      seoContent: {
        type: "string",
        description: "Full HTML SEO content including headings, paragraphs, images, lists, FAQs and CTA."
      },
      schema: {
        type: "object",
        description: "JSON-LD schema markup for FAQPage or HowTo.",
        properties: {
          "@context": {
            type: "string",
            enum: ["https://schema.org"]
          },
          "@type": {
            type: "string",
            enum: ["FAQPage", "HowTo"]
          },
          "mainEntity": {
            type: "array",
            items: {
              type: "object",
              properties: {
                "@type": { type: "string" },
                "name": { type: "string" },
                "acceptedAnswer": {
                  type: "object",
                  properties: {
                    "text": { type: "string" }
                  },
                  required: ["text"],
                  additionalProperties: false
                }
              },
              required: ["@type", "name", "acceptedAnswer"],
              additionalProperties: false
            },
            minItems: 1
          }
        },
        required: ["@context", "@type", "mainEntity"],
        additionalProperties: false
      }
    },
    required: ["meta", "seoContent", "schema"],
    additionalProperties: false  // REQUIRED: added
  }
};


const seoContentSchema = {
  type: "object",
  properties: {
    meta: {
      type: "string",
      description: "HTML block containing SEO title, meta description, canonical, OG tags etc."
    },
    seoContent: {
      type: "string",
      description: "Full HTML SEO content including headings, paragraphs, images, lists, FAQs and CTA."
    },
    schema: {
      type: "object",
      description: "JSON-LD schema markup for FAQPage or HowTo.",
      properties: {
        "@context": {
          type: "string",
          enum: ["https://schema.org"]
        },
        "@type": {
          type: "string",
          enum: ["FAQPage", "HowTo"]
        },
        "mainEntity": {
          type: "array",
          items: {
            type: "object",
            properties: {
              "@type": { type: "string" },
              "name": { type: "string" },
              "acceptedAnswer": {
                type: "object",
                properties: {
                  "text": { type: "string" }
                },
                required: ["text"],
                additionalProperties: false
              }
            },
            required: ["@type", "name", "acceptedAnswer"],
            additionalProperties: false
          },
          minItems: 1
        }
      },
      required: ["@context", "@type", "mainEntity"],
      additionalProperties: false
    }
  },
  required: ["meta", "seoContent", "schema"],
  additionalProperties: false
}

module.exports = { seoContentFunction, seoContentSchema }