const { rateLimit } = require("express-rate-limit");
//limitamos las conexiones para evitar ataques DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // limitamos cada ip a 100 peticiones cada 15 mins, se puede cambiar segun necesidad
  });

  /*Prueba git hub
  safsafsa
  asfsaffsa
  asfsafsa
  safsafsaf
  
  */
  module.exports= {
    limiter
  };
  