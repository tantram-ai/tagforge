const { MetaSet } = require('../models');

async function saveMetaSet(req, res) {
  const user = req.user;
  const { name, metaHtml } = req.body;

  const ms = await MetaSet.create({
    name,
    metaHtml,
    UserId: user.id
  });
  res.json({ success: true, metaSet: ms });
}

module.exports = { saveMetaSet };
