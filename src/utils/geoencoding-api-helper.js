// Docs
// https://nominatim.org/release-docs/develop/api/Search/

import axios from 'axios'

export async function getCoordinatesFromAddress(address) {
    let responseData;
    try {
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${encodeURI(address)}&polygon_geojson=1&format=jsonv2`)
        responseData = data[0]
    } catch (err) {
        console.log(err)
        responseData = err.toJSON()
    }
    return responseData;
}