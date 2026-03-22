import React from 'react'
import { AiKeywords } from './AiKeywords'
import { KeywordResearch } from './KeywordResearch';

export const KeywordTab = () => {
    const data = [
        {
            keyword: "3D printed home décor",
            intent: "Informational",
            type: "Guide",
            funnelStage: "Awareness",
            businessRelevance: 85,
        },
        {
            keyword: "custom 3D wall art",
            intent: "Commercial",
            type: "Product",
            funnelStage: "Consideration",
            businessRelevance: 72,
        },
        {
            keyword: "custom 3D wall art",
            intent: "Commercial",
            type: "Product",
            funnelStage: "Consideration",
            businessRelevance: 72,
        },
        {
            keyword: "custom 3D wall art",
            intent: "Commercial",
            type: "Product",
            funnelStage: "Consideration",
            businessRelevance: 72,
        },
        {
            keyword: "custom 3D wall art",
            intent: "Commercial",
            type: "Product",
            funnelStage: "Consideration",
            businessRelevance: 72,
        },
    ];


    const rankingData = [
        {
            "keyword": "seo tools",
            "volume": 40500,
            "difficulty": 78,
            "cpc": 2.8,
            "intent": "Commercial",
            "opportunity": "Low"
        },
        {
            "keyword": "best keyword research tool",
            "volume": 12100,
            "difficulty": 65,
            "cpc": 3.5,
            "intent": "Commercial",
            "opportunity": "Medium"
        },
        {
            "keyword": "free seo audit",
            "volume": 9900,
            "difficulty": 52,
            "cpc": 2.1,
            "intent": "Transactional",
            "opportunity": "High"
        },
        {
            "keyword": "on page seo checklist",
            "volume": 5400,
            "difficulty": 38,
            "cpc": 1.2,
            "intent": "Informational",
            "opportunity": "High"
        },
        {
            "keyword": "technical seo guide",
            "volume": 3600,
            "difficulty": 45,
            "cpc": 1.8,
            "intent": "Informational",
            "opportunity": "High"
        },
        {
            "keyword": "seo services pricing",
            "volume": 2900,
            "difficulty": 60,
            "cpc": 4.2,
            "intent": "Transactional",
            "opportunity": "Medium"
        },
        {
            "keyword": "local seo tips",
            "volume": 2400,
            "difficulty": 35,
            "cpc": 1.5,
            "intent": "Informational",
            "opportunity": "High"
        },
        {
            "keyword": "seo for beginners",
            "volume": 18100,
            "difficulty": 70,
            "cpc": 2.0,
            "intent": "Informational",
            "opportunity": "Medium"
        },
        {
            "keyword": "seo audit checklist",
            "volume": 6600,
            "difficulty": 48,
            "cpc": 2.3,
            "intent": "Informational",
            "opportunity": "High"
        },
        {
            "keyword": "best free seo tools",
            "volume": 14800,
            "difficulty": 68,
            "cpc": 2.6,
            "intent": "Commercial",
            "opportunity": "Medium"
        }
    ]

    return (
        <>
            <AiKeywords keywords={data} />
            <KeywordResearch keywords={rankingData} />

        </>
    )
}
