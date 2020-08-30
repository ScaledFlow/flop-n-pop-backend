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
    portfolioId: 'wondertech',
    user: 'jaleintz',
    stocks: [ 
      {
        id: 'tsla',
        name: 'Tesla'
      },
      {
        id: 'amzn',
        name: "Amazon"
      },
      {
        id: 'msft',
        name: 'Microsoft'
      }
    ]
    },
    {
      portfolioId: 'airline',
      user: 'jaleintz',
      stocks: [ 
        {
          id: 'dal',
          name: 'Delta Airlines'
        },
        {
          id: 'aal',
          name: 'American Airlines'
        },
        {
          id: 'luv',
          name: 'Southwest Airlines'
        }
      ]
      },
      {
        portfolioId: 'legacyauto',
        user: 'jaleintz',
        stocks: [ 
          {
            id: 'gm'
          },
          {
            id: 'f'
          },
          {
            id: 'bmw'
          }
        ]
        }
  ]

  const DUMMY_PORTFOLIO_USER = [
    {
      user_id: 'jaleintz',
      portfolios: [
    {
      portfolioId: 'wondertech',
      stocks: [ 
        {
          id: 'tsla',
          name: 'Tesla'
        },
        {
          id: 'amzn',
          name: "Amazon"
        },
        {
          id: 'msft',
          name: 'Microsoft'
        }
      ]
      },
      {
        portfolioId: 'airline',
        stocks: [ 
          {
            id: 'dal',
            name: 'Delta Airlines'
          },
          {
            id: 'aal',
            name: 'American Airlines'
          },
          {
            id: 'luv',
            name: 'Southwest Airlines'
          }
        ]
        },
        {
          portfolioId: 'legacyauto',
          stocks: [ 
            {
              id: 'gm'
            },
            {
              id: 'f'
            },
            {
              id: 'bmw'
            }
          ]
          }
        ]
    },

    {
      user_id: 'laleintz',
      portfolios: [
    {
      portfolioId: 'wondertech',
      stocks: [ 
        {
          id: 'tsla',
          name: 'Tesla'
        },
        {
          id: 'amzn',
          name: "Amazon"
        },
        {
          id: 'msft',
          name: 'Microsoft'
        }
      ]
      },
      {
        portfolioId: 'airline',
        stocks: [ 
          {
            id: 'dal',
            name: 'Delta Airlines'
          },
          {
            id: 'aal',
            name: 'American Airlines'
          },
          {
            id: 'luv',
            name: 'Southwest Airlines'
          }
        ]
        },
        {
          portfolioId: 'legacyauto',
          stocks: [ 
            {
              id: 'gm',
              name: 'General Motors'
            },
            {
              id: 'f',
              name: 'Ford Motor'
            },
            {
              id: 'bmw',
              name: 'Bayerische Motoren Werke'
            },
            {
              id: 'tm',
              name: 'Toyota Motor'
            }
          ]
          }
        ]
    }
  ]
  console.log(DUMMY_PORTFOLIO_USER[0]);
  console.log(DUMMY_PORTFOLIO_USER[0].user_id);
  console.log(DUMMY_PORTFOLIO_USER[0].portfolios[0]);
  console.log(DUMMY_PORTFOLIO_USER[0].portfolios[0].stocks[0].id);

// http://localhost:5000/api/stocks/appl
router.get('/:tid', (req, res, next) => {
  const tickerId = req.params.tid;
  const stock = DUMMY_STOCKS.find(t => {
    return t.id === tickerId;
  });
  res.json({stock: stock});
});

// http://localhost:5000/api/stocks/portfolio/wondertech
router.get('/portfolio/:pid', (req, res, next) => {
  const portfolioId = req.params.pid;
  const portfolio = DUMMY_PORTFOLIO.find(p => {
    return p.portfolioId === portfolioId;
  });
  res.json({portfolio: portfolio});
});

module.exports = router;