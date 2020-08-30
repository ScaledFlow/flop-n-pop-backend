const express = require('express');

const router = express.Router();

const DUMMY_STOCKS = [
  {
    id: 'tsla',
    name: 'Tesla'
  },
  {
    id: 'appl',
    name: 'Apple'
  }
]

const DUMMY_PORTFOLIO = [
  {
    portfolioId: 'wonderTech',
    user: 'jaleintz',
    stocks: {
        id: 'tsla',
        id: 'appl',
        id: 'amzn',
        id: 'msft',
        id: 'fb',
        id: 'googl'
      }
    },
    {
      portfolioId: 'airline',
      user: 'jaleintz',
      stocks: {
          id: 'dal',
          id: 'aal',
          id: 'luv'
        }
      },
      {
        portfolioId: 'legacyAuto',
        user: 'jaleintz',
        stocks: {
            id: 'f',
            id: 'gm',
            id: 'bmw'
          }
        }
  ]

router.get('/:tid', (req, res, next) => {
  const tickerId = req.params.tid;
  console.log(req.params);
  const stock = DUMMY_STOCKS.find(t => {
    return t.id === tickerId;
  });
  res.json({stock: stock});
});

module.exports = router;