const express = require('express');

const router = express.Router();


const DUMMY_PORTFOLIO_USER = [
  {
    user_id: 'jaleintz',
    first_name: 'John',
    last_name: 'Leintz',
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
    user_id: 'bajohnson',
    first_name: 'Bob',
    last_name: 'Johnson',
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

// console.log(DUMMY_PORTFOLIO_USER[0]);
// console.log(DUMMY_PORTFOLIO_USER[0].user_id);
// console.log(DUMMY_PORTFOLIO_USER[0].portfolios[0]);
// console.log(DUMMY_PORTFOLIO_USER[0].portfolios[0].stocks[0].id);

// get stock by ticker
// http://localhost:5000/api/stocks/appl
router.get('/:tid', (req, res, next) => {
  const tickerId = req.params.tid;

  if (!tickerId) {
    return res.status('404').json({message: 'Ticker not received'})
  }

  res.json({stock: tickerId});
});

// get portfolio by user id
// http://localhost:5000/api/stocks/user/jaleintz
// http://localhost:5000/api/stocks/user/bajohnson
router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PORTFOLIO_USER.find(u => {
    return u.user_id === userId;
  });

  // if (!user) {
  //   return res.status('404').json({message: 'Could not find user.'})
  // }

  // Error for middleware
  if (!user) {
    const error = new Error('Could not find the provided user_id');
    error.code = 404;
    // Asynchronous Error
     return next(error);

    // Synchronous Error
    // throw error;
  }

  res.json({user: user});
});


module.exports = router;