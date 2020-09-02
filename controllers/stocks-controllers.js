const HttpError = require('../models/http-error');


const DUMMY_PORTFOLIO = 
[
  {
    "user_id" : "jaleintz",
    "email" : "jaleintz@gmail.com",
    "phone" : "651-999-9999",
    "name" : {"first" : "John", "last" : "Leintz"},
    "stocks" : [
    { "portfolio" : "Wonder Stocks", "ticker" : "appl" },
    { "portfolio" : "Wonder Stocks", "ticker" : "tsla" },
    { "portfolio" : "Legacy Auto", "ticker" : "gm" },
    { "portfolio" : "Legacy Auto", "ticker" : "f" }
    ]
  },
  {
    "user_id" : "bajohnson",
    "email" : "bajohnson.com",
    "phone" : "651-888-88888",
    "name" : {"first" : "Bob", "last" : "Johnson"},
    "stocks" : [
    { "portfolio" : "Wonder Stocks", "ticker" : "appl" },
    { "portfolio" : "Wonder Stocks", "ticker" : "tsla" },
    { "portfolio" : "Legacy Auto", "ticker" : "gm" },
    { "portfolio" : "Legacy Auto", "ticker" : "f" }
    ]
  }
  ]


const DUMMY_PORT = [
  {
    user_id: 'jaleintz',
    first_name: 'John',
    last_name: 'Leintz',
    portfolios: [ {
      portfolioId: 'suerptech',
    }
    ]
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
  const user = DUMMY_PORTFOLIO.find(u => {
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