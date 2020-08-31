const HttpError = require('../models/http-error');

const DUMMY_PORT = [
  {
    user_id: 'jaleintz',
    first_name: 'John',
    last_name: 'Leintz',
  }
]


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


const getStockByTicker = (req, res, next) => {
  const tickerId = req.params.tid;

  if (!tickerId) {
    return res.status('404').json({message: 'Ticker not received'})
  }

  res.json({stock: tickerId});
};

const getStockPortfolioByID = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PORTFOLIO_USER.find(u => {
    return u.user_id === userId;
  });

  // Error for middleware
  if (!user) {
    return next(
      new HttpError('Could not find the user_id', 404)
    );
  }

  res.json({user: user});
}

// const createPortfolio = (req, res, next ) => {
//   const { user_id, first_name, last_name}
//   // const user_id = req.body.user_id
// };


const createdPortfolio = (req, res, next ) => {
  // const user_id = req.body.user_id
  const { user_id, first_name, last_name} = req.body;
  const createdPortfolio = {
    user_id,
    first_name,
    last_name
  };
  DUMMY_PORT.push(createdPortfolio);  //upshift()

  res.status(201).json({portfolio: createdPortfolio })
};


exports.getStockByTicker = getStockByTicker;
exports.getStockPortfolioByID = getStockPortfolioByID;
exports.createPortfolio = createdPortfolio;