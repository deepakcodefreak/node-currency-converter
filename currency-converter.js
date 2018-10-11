const axios = require('axios');

const getCurrentRate = async (to)=>{
   let x = to.toUpperCase()
    try {
      let response  =  await axios.get(`http://data.fixer.io/api/latest?&access_key=0d7482dde5b01185cf0646840668bdf6&format=1&symbols=${to}`);

       return response.data.rates[x];

    } catch (err) {
      throw new Error(`Unable to fetch exchange rate for ${x}`);
    }
  }


const getCountries = async (countryCode)=>{

    try {

        let response =  await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`);
          return response.data.map((country)=>country.name);

    } catch (err) {
      throw new Error(`Unable to locate countries that use ${countryCode}`);
    }

  }


const currencyConverter = (to,amount)=>{
  return axios.get(`http://data.fixer.io/api/latest?&access_key=0d7482dde5b01185cf0646840668bdf6&format=1&symbols=${to}`).then((response)=>{
    let x = to.toUpperCase()
    let countries;
    return getCountries(to).then((tempcountries)=>{
      countries = tempcountries;
      return response.data.rates[x];
    }).then((rate)=>{
      return `${amount} EU in ${to} is ${rate*amount} and it can be used in following countries... ${countries}`
    })
  })
}

const currencyConverterAlt = async (to,amount)=>{
  let countries  = await getCountries(to);
  let rate = await getCurrentRate(to);

  return `${amount} EU in ${to} is ${rate*amount} and it can be used in following countries... ${countries}`
}



getCurrentRate('mmm').then((res)=>{
  console.log(res);
},(err)=>{
  console.error(err.message);
})




//
// getCountries('inr').then((res)=>{
//   console.log(res);
// },(err)=>{
//   console.error(err.message);
// })

//
// currencyConverterAlt('inr',10).then((res)=>{
//   console.log(res);
// },(err)=>{
//   console.error(err);
// })
