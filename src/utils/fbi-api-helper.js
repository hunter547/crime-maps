import axios from 'axios'

export async function getAgenciesFromState(state) {
    let responseData;
    try {
        const { data } = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/${state}?API_KEY=${process.env.REACT_APP_CRIME_KEY}`)
        responseData = data.results
    } catch (err) {
        console.log(err)
        responseData = err.toJSON()
    }
    return responseData;
}