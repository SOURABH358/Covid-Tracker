import axios from "axios"

// for barchart and card component
export async function fetchData(country){
  
  if(country === 'World'){
    return await axios.get('https://disease.sh/v3/covid-19/all')
    .then(response=> response)
    .then(({data})=>data)
  }
  else{
    country = country.toLowerCase()
    return axios.get(`https://disease.sh/v3/covid-19/countries/${country}`).then(response=>response).then(({data})=>data)
  }
}

// to get all the countries

export const fetchCountries = async ()=> {
  return await axios.get('https://disease.sh/v3/covid-19/countries')
  .then(response=>response)
  .then(({data})=>{
    return data.map(item=>{
      return {
        'name':item.country,
        'code':item.countryInfo.iso3,
        'coord':[item.countryInfo.lat, item.countryInfo.long]
      }
    })
  })
}

// to get data of past 120 days for line chart
export async function fetchLast(country){
  country = country.toLowerCase()
  if(country === 'world'){
    country = 'all'
  }
  const {data} = await axios.request('https://disease.sh/v3/covid-19/historical' + '/' + country + '?lastdays=120').then(response=> response).catch(error=>error);
  if(country==='all'){
    return data;
  }
  return data.timeline;
}