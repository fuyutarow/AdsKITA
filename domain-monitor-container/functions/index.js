const {getData} = require('similarweb-scrape');

const request = require('request');

const noticeme = (message) => {
  const data = {
    url: 'https://discordapp.com/api/webhooks/718526064774742066/q_ABXOHF3wyu9CJTvr_G8RdZ1edYsjIW5EaNF4oVvazT8hut8t3BkGtYIHSOjsTP6YI1/slack',
    headers: {'Content-type': 'application/json'},
    json: {'text': message},
  };
  request.post(data, (err, _res, body) => {
    res.send(200);
    console.log(err, res, body);
  });
};

// NOTE
// domain は http:// https:// スキームは省かれていること
// NG https://github.com
// OK github.com
exports.fetchSimilarweb = async (req, res) => {
  const domain = req.query.domain;
  const data = await getData(domain);
  res.status(200).json(data);
  noticeme(`fetch ${domain} from similarweb`);
};
