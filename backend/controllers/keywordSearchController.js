const axios = require("axios");
const { fetchSuccess, internalServer } = require("../utils");

const Keywordata = {
    "version": "0.1.20251015",
    "status_code": 20000,
    "status_message": "Ok.",
    "time": "2.1993 sec.",
    "cost": 0.075,
    "tasks_count": 1,
    "tasks_error": 0,
    "tasks": [
        {
            "id": "10160728-1184-0090-0000-df98810eb7a5",
            "status_code": 20000,
            "status_message": "Ok.",
            "time": "2.0798 sec.",
            "cost": 0.075,
            "result_count": 28,
            "path": [
                "v3",
                "keywords_data",
                "google",
                "keywords_for_keywords",
                "live"
            ],
            "data": {
                "api": "keywords_data",
                "function": "keywords_for_keywords",
                "se": "google",
                "location_name": "United States",
                "language_name": "English",
                "keywords": [
                    "sustainable fashion trends"
                ]
            },
            "result": [
                {
                    "keyword": "sustainable fashion trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0.06,
                    "cpc": 1.52,
                    "search_volume": 140,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 140
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 140
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 50
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 140
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 210
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 210
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 170
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 170
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 170
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 210
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 140
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 90
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion trends 2023",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 50
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainability trends fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "trends in sustainable fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 30,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 70
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 30
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion trends 2022",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 20,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 40
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainability trends in fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0.04,
                    "cpc": 4.33,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "eco fashion trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "eco friendly fashion trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0.14,
                    "cpc": null,
                    "search_volume": 20,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 50
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 70
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "ethical fashion trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 1,
                    "cpc": 6.8,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "ethical trendy clothing",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "fashion sustainability trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0.14,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "green fashion 2022",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "green fashion week 2022",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 0,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "mintel sustainable fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "sustainability trends in fashion industry",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 50
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainability trends in the fashion industry",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainable clothing trend",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 20
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion industry trends",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion inspiration",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion style",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0.06,
                    "cpc": null,
                    "search_volume": 30,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 30
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 20
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 20
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion themes",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion tiktok",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "sustainable fashion trends 2021",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 30
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 70
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 40
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "trend sustainable fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                },
                {
                    "keyword": "trends in the sustainable clothing industry",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "upcycling clothes 2021",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 0,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "upcycling in fashion industry",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": 0,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 40
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 0
                        }
                    ]
                },
                {
                    "keyword": "y2k sustainable fashion",
                    "location_code": 2840,
                    "language_code": "en",
                    "search_partners": false,
                    "competition": null,
                    "cpc": null,
                    "search_volume": 10,
                    "categories": null,
                    "monthly_searches": [
                        {
                            "year": 2025,
                            "month": 8,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 7,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 6,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 5,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 4,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 3,
                            "search_volume": 10
                        },
                        {
                            "year": 2025,
                            "month": 2,
                            "search_volume": 0
                        },
                        {
                            "year": 2025,
                            "month": 1,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 12,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 11,
                            "search_volume": 10
                        },
                        {
                            "year": 2024,
                            "month": 10,
                            "search_volume": 0
                        },
                        {
                            "year": 2024,
                            "month": 9,
                            "search_volume": 10
                        }
                    ]
                }
            ]
        }
    ]
}

const keywordSearch = async (req, res) => {
    const data = req?.body
    const LIMIT = 20;
    const offset = (req?.body?.page - 1) * LIMIT;
    const payload = [
        {
            location_name: "United States",
            language_name: "English",
            keywords: data?.keywords,
            limit: LIMIT,
            offset: offset
        }
    ]

    try {
        // --------------- DataForSEO ------------------

        const resp = await axios.post(process.env.KEYWORD_API_BASE, payload, {
            headers: { Authorization: `Basic ${process.env.KEYWORD_API_KEY}` }
        });
        if (resp?.data) {
            return fetchSuccess(res, resp?.data)
        }

        //------------------Zenserp-----------------------

        // const resp = await axios.post(process.env.ZENSERP_API_BASE, payload, {
        //     headers: { Authorization: `Basic ${process.env.ZENSERP_API_KEY}` }
        // });
        // if (resp?.data) {
        //     return fetchSuccess(res, resp?.data)
        // }

        //------------------Mock Data--------------------------
        // setTimeout(() => {
        //     return fetchSuccess(res, Keywordata)
        // }, 2000);

    } catch (error) {
        return internalServer(error, res)
    }

}

module.exports = { keywordSearch }