const GET_TOTAL_LINKS = `
    SELECT COUNT(*)
    FROM links
    WHERE user_id = $1;
`;

const GET_TOTAL_CLICKS = `
    SELECT COUNT(*)
    FROM clicks c
    JOIN links l
    ON c.link_id = l.id
    WHERE l.user_id = $1;
`;

const GET_TOP_LINK = `
    SELECT
        l.id,
        l.title,
        l.short_code,
        COUNT(c.id) AS clicks
    FROM links l
    LEFT JOIN clicks c
    ON l.id = c.link_id
    WHERE l.user_id = $1
    GROUP BY l.id
    ORDER BY clicks DESC
    LIMIT 1;
`;

const GET_RECENT_LINKS = `
    SELECT
        l.id,
        l.title,
        l.short_code,
        l.original_url,
        COUNT(c.id) AS clicks
    FROM links l
    LEFT JOIN clicks c
    ON l.id = c.link_id
    WHERE l.user_id = $1
    GROUP BY
        l.id,
        l.original_url
    ORDER BY l.created_at DESC
    LIMIT 5;
`;

const GET_DAILY_CLICKS = `
    SELECT
        DATE(c.clicked_at) AS date,
        COUNT(*) AS count
    FROM clicks c
    JOIN links l
    ON c.link_id = l.id
    WHERE l.user_id = $1
    GROUP BY DATE(c.clicked_at)
    ORDER BY date;
`;

const GET_TRAFFIC_SOURCES = `
    SELECT
        c.referrer,
        COUNT(*) AS count
    FROM clicks c
    JOIN links l
    ON c.link_id = l.id
    WHERE l.user_id = $1
    GROUP BY c.referrer;
`;

const GET_COUNTRIES = `
    SELECT
        c.country,
        COUNT(*) AS count
    FROM clicks c
    JOIN links l
    ON c.link_id = l.id
    WHERE l.user_id = $1
    GROUP BY c.country;
`;

module.exports = {
    GET_TOTAL_LINKS,
    GET_TOTAL_CLICKS,
    GET_TOP_LINK,
    GET_RECENT_LINKS,
    GET_DAILY_CLICKS,
    GET_TRAFFIC_SOURCES,
    GET_COUNTRIES,
};