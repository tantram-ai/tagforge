export interface ExtractedMeta {
    title: string;
    description: string;
    url: string;
    image: string;
    meta: Record<string, string>;
    og: Record<string, string>;
    twitter: Record<string, string>;
    links: Record<string, string>;
    jsonld: any[];
    raw: {
        allMetaTags: string[];
        allLinks: string[];
    };
}

export const extractAllMeta = (htmlString: string = "") => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const result: ExtractedMeta = {
        title: "",
        description: "",
        url: "",
        image: "",
        meta: {},
        og: {},
        twitter: {},
        links: {},
        jsonld: [],
        raw: {
            allMetaTags: [],
            allLinks: []
        }
    };

    // -------------------------
    // TITLE
    // -------------------------
    result.title = doc.querySelector("title")?.textContent?.trim() || "";

    // -------------------------
    // DESCRIPTION
    // -------------------------
    result.description =
        doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ||
        "";

    // -------------------------
    // ALL META TAGS
    // -------------------------
    const metaTags = Array.from(doc.querySelectorAll("meta"));

    metaTags.forEach((meta) => {
        const name = meta.getAttribute("name");
        const prop = meta.getAttribute("property");
        const content = meta.getAttribute("content");

        if (!content) return;

        // Normal meta[name]
        if (name) {
            result.meta[name] = content.trim();
        }

        // meta[property]
        if (prop) {
            // OpenGraph
            if (prop.startsWith("og:")) {
                result.og[prop.replace("og:", "")] = content.trim();
            }

            // Twitter Card
            if (prop.startsWith("twitter:")) {
                result.twitter[prop.replace("twitter:", "")] = content.trim();
            }

            // Add to general meta
            result.meta[prop] = content.trim();
        }
    });

    // -------------------------
    // LINK TAGS
    // -------------------------
    const linkTags = Array.from(doc.querySelectorAll("link"));

    linkTags.forEach((link) => {
        const rel = link.getAttribute("rel");
        const href = link.getAttribute("href");

        if (!rel || !href) return;

        result.links[rel] = href.trim();

        if (rel === "canonical") result.url = href.trim();
        if (rel === "image_src") result.image = href.trim();
    });

    // -------------------------
    // FALLBACKS
    // -------------------------
    if (!result.url) result.url = result.og["url"] || "";
    if (!result.image) result.image = result.og["image"] || "";
    if (!result.title) result.title = result.og["title"] || "";

    if (!result.description) {
        result.description =
            result.og["description"] ||
            result.twitter["description"] ||
            "";
    }

    // -------------------------
    // JSON-LD (Schema.org)
    // -------------------------
    const jsonLdScripts = Array.from(
        doc.querySelectorAll('script[type="application/ld+json"]')
    );

    jsonLdScripts.forEach((script) => {
        try {
            const json = JSON.parse(script.textContent || "{}");
            result.jsonld.push(json);
        } catch (error) {
            console.warn("Invalid JSON-LD:", error);
        }
    });

    // -------------------------
    // RAW BACKUP
    // -------------------------
    result.raw.allMetaTags = metaTags.map((m) => m.outerHTML);
    result.raw.allLinks = linkTags.map((l) => l.outerHTML);

    return result;
}
