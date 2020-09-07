# flop-n-pop-backend

npm i express
npm i nodemon
npm i --save uuid
npm i bcryptjs

https://www.youtube.com/watch?v=yLjfS5iKZPM

db.portfolio.updateOne {
 {
   "stock.portfolio" : "WonderStocks"
 },
 {
   $set: {
   "stock.$.portfolio" : "wonderStocksX"
 }
}
)
