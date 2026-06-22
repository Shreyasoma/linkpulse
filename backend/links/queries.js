const CREATE_LINK = ' INSERT INTO links (user_id, original_url, short_code) VALUES ($1, $2, $3) RETURNING *;';

const GET_USER_LINKS = ' SELECT *FROM links WHERE user_id = $1 ORDER BY created_at DESC; ';

const GET_USER_LINK_BY_ID = ' SELECT * FROM links WHERE id = $1 AND user_id = $2; ';

const UPDATE_LINK = ' UPDATE links SET title = $1, expires_at = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *; ';

const DELETE_LINK = ' DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING *; ';

const FIND_LINK_BY_SHORT_CODE = ' SELECT * FROM links WHERE short_code = $1; ';

const CREATE_CLICK = ' INSERT INTO clicks (link_id, ip_address, user_agent, referrer, country) VALUES ($1, $2, $3, $4, $5); ';

const GET_TOTAL_CLICKS = ' SELECT COUNT(*) FROM clicks WHERE link_id = $1; ';

const GET_DAILY_CLICKS = ' SELECT DATE(clicked_at) as date, COUNT(*) as count FROM clicks WHERE link_id = $1 GROUP BY DATE(clicked_at) ORDER BY date DESC; ';

const GET_REFERRERS = ' SELECT referrer, COUNT(*) as count FROM clicks WHERE link_id = $1 GROUP BY referrer; ';

module.exports = {
    CREATE_LINK,
    GET_USER_LINKS,
    GET_USER_LINK_BY_ID,
    UPDATE_LINK,
    DELETE_LINK,
    FIND_LINK_BY_SHORT_CODE,
    CREATE_CLICK,
    GET_TOTAL_CLICKS,
    GET_DAILY_CLICKS,
    GET_REFERRERS,
};