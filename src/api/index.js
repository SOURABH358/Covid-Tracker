import axios from "axios"

const url_history = "https://covid-193.p.rapidapi.com/history";
const url_country = "https://covid-193.p.rapidapi.com/countries";
const url_historical = "https://disease.sh/v3/covid-19/historical"
let api_key = process.env.REACT_APP_API_KEY;
console.log(api_key)
// to fetch data for all the countries for cards component
export async function fetchData(count, date) {
  if(count==='World'){
    count = 'all'
  }
  const options = {
    method: 'GET',
    url: url_history,
    params: {country: count, day: date},
    headers: {
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
      'X-RapidAPI-Key': api_key
    }
  };
    const {data:{response}} = await axios.request(options).then(response=> response).catch(error=>error);
    // const response = await axios.get(url)
    return response[0];

}
// for covid cases in a single day recovered is not working
export const fetchDailyData = async (country)=>{
  country = country.toLowerCase()
  console.log(country)
  if(country==='world')
  {
    country = 'all'
  }
  const {data} = await axios.request(url_historical + '/' + country + '?lastdays=2').then((response)=>response).catch((error)=>error)
  if(country!=='all'){
    return data.timeline;
  }
  return data;
}

// to get all the countries
export const fetchCountries = async ()=>{
  const options = {
    method: 'GET',
    url: url_country,
    headers: {
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
      'X-RapidAPI-Key': api_key
    }
  };
  options.url = url_country;
  const {data:{response}} = await axios.request(options).then((response)=>response).catch((error)=>error)
  return response;
}

// to get data of past 60 days for line chart
export async function fetchLast(country){
  country = country.toLowerCase()
  if(country === 'world'){
    country = 'all'
  }
  const {data} = await axios.request(url_historical + '/' + country + '?lastdays=120').then(response=> response).catch(error=>error);
  if(country==='all'){
    return data;
  }
  return data.timeline;
}