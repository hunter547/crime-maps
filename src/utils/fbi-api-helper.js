import axios from 'axios'

/**
 * @typedef {Object} ArresteeSexData
 * @property {number} Male
 * @property {number} Female
 */

/**
 * @typedef {Object} OffenseNameData
 * @property {number} Rape
 * @property {number} Arson
 * @property {number} Fraud
 * @property {number} Larceny
 * @property {number} Robbery
 * @property {number} Runaway
 * @property {number} Weapons
 * @property {number} Burglary
 * @property {number} Gambling
 * @property {number} Vagrancy
 * @property {number} Suspicion
 * @property {number} Vandalism
 * @property {number} Drunkenness
 * @property {number} Embezzlement
 * @property {number} "Sex Offenses"
 * @property {number} "Rape (Legacy)"
 * @property {number} "Simple Assault"
 * @property {number} "Drug Possession"
 * @property {number} "Stolen Property"
 * @property {number} "Human Trafficking"
 * @property {number} "Aggravated Assault"
 * @property {number} "All Other Offenses"
 * @property {number} "Disorderly Conduct"
 * @property {number} "Motor Vehicle Theft"
 * @property {number} "Drug Abuse Violations"
 * @property {number} "Liquor Law Violations"
 * @property {number} "Counterfeiting/Forgery"
 * @property {number} "Drug Sale/Manufacturing"
 * @property {number} "Drive Under the Influence"
 * @property {number} "Manslaughter by Negligence"
 * @property {number} "Murder and Nonnegligent Homicide"
 * @property {number} "Curfew and Loitering Law Violations"
 * @property {number} "Prostitution and Commercialized Vice"
 * @property {number} "Offenses Against the Family and Children"
 */

/**
 * @typedef {Object} ArresteeRaceData
 * @property {number} Asian
 * @property {number} White
 * @property {number} Unknown
 * @property {number} Multiple
 * @property {number} "Not Specified"
 * @property {number} "Black or African American"
 * @property {number} "American Indian or Alaska Native"
 * @property {number} "Native Hawaiian or Other Pacific Islander"
 * @property {number} "Asian, Native Hawaiian, or Other Pacific Islander"
 */

/**
 * @typedef {Object} CdeProperties
 * @property {Object} max_data_date
 * @property {string} max_data_date.UCR
 * @property {Object} last_refresh_date
 * @property {string} last_refresh_date.UCR
 */

/**
 * @typedef {Object} OffenseCategoryData
 * @property {number} Arson
 * @property {number} Larceny
 * @property {number} Robbery
 * @property {number} Runaway
 * @property {number} Burglary
 * @property {number} Suspicion
 * @property {number} Drunkenness
 * @property {number} Embezzlement
 * @property {number} "Sex Offenses"
 * @property {number} "Fraud Offenses"
 * @property {number} "Simple Assault"
 * @property {number} "Gambling Offenses"
 * @property {number} "Homicide Offenses"
 * @property {number} "Human Trafficking"
 * @property {number} "Aggravated Assault"
 * @property {number} "All Other Offenses"
 * @property {number} "Disorderly Conduct"
 * @property {number} "Vagrancy/Loitering"
 * @property {number} "Motor Vehicle Theft"
 * @property {number} "Liquor Law Violations"
 * @property {number} "Prostitution Offenses"
 * @property {number} "Weapon Law Violations"
 * @property {number} "Counterfeiting/Forgery"
 * @property {number} "Drug/Narcotic Offenses"
 * @property {number} "Stolen Property Offenses"
 * @property {number} "Drive Under the Influence"
 * @property {number} "Sex Offenses, Non-forcible"
 * @property {number} "Family Offenses, Nonviolent"
 * @property {number} "Destruction/Damage/Vandalism of Property"
 */

/**
 * @typedef {Object} OffenseBreakdownData
 * @property {number} Fraud
 * @property {number} Runaway
 * @property {number} Vagrancy
 * @property {number} Suspicion
 * @property {number} Vandalism
 * @property {number} Drunkenness
 * @property {number} Embezzlement
 * @property {number} "Simple Assault"
 * @property {number} "Disorderly Conduct"
 * @property {number} "Commercial Sex Acts"
 * @property {number} "Rape - Not Specified"
 * @property {number} "Arson (Not Specified)"
 * @property {number} "Involuntary Servitude"
 * @property {number} "Liquor Law Violations"
 * @property {number} "Gambling (Unspecified)"
 * @property {number} "Assault - Not Specified"
 * @property {number} "Robbery - Not Specified"
 * @property {number} "Burglary - Not Specified"
 * @property {number} "Forgery and Counterfeiting"
 * @property {number} "Manslaughter by Negligence"
 * @property {number} "Driving Under the Influence"
 * @property {number} "Drug Possession - Marijuana"
 * @property {number} "Drug Possession (Unspecified)"
 * @property {number} "Gambling - All Other Gambling"
 * @property {number} "Rape - Not Specified (Legacy)"
 * @property {number} "Gambling - Numbers and Lottery"
 * @property {number} "Larceny - Theft (Not Specified)"
 * @property {number} "Murder and Nonnegligent Homicide"
 * @property {number} "All Other Offenses (Except Traffic)"
 * @property {number} "Curfew and Loitering Law Violations"
 * @property {number} "Drug Abuse Violations (Unspecified)"
 * @property {number} "Drug Sale/Manufacturing - Marijuana"
 * @property {number} "Motor Vehicle Theft - Not Specified"
 * @property {number} "Weapons: Carrying, Possessing, Etc."
 * @property {number} "Drug Possession - Synthetic Narcotics"
 * @property {number} "Drug Sale/Manufacturing (Unspecified)"
 * @property {number} "Offenses Against the Family and Children"
 * @property {number} "Gambling - Bookmaking (Horse and Sport Book)"
 * @property {number} "Drug Sale/Manufacturing - Synthetic Narcotics"
 * @property {number} "Stolen Property: Buying, Receiving, Possessing"
 * @property {number} "Prostitution and Commercialized Vice (Unspecified)"
 * @property {number} "Prostitution and Commercialized Vice - Prostitution"
 * @property {number} "Drug Possession - Other - Dangerous Nonnarcotic Drugs"
 * @property {number} "Drug Possession - Opium or Cocaine or Their Derivatives"
 * @property {number} "Drug Sale/Manufacturing - Other - Dangerous Nonnarcotic Drugs"
 * @property {number} "Prostitution and Commercialized Vice - Purchasing Prostitution"
 * @property {number} "Drug Sale/Manufacturing - Opium or Cocaine or Their Derivatives"
 * @property {number} "Sex Offenses (Except Rape, and Prostitution and Commercialized Vice)"
 * @property {number} "Prostitution and Commercialized Vice - Assisting or Promoting Prostitution"
 */

/**
 * @typedef {Object} ArrestsByAgeData
 * @property {number} "15"
 * @property {number} "16"
 * @property {number} "17"
 * @property {number} "18"
 * @property {number} "19"
 * @property {number} "20"
 * @property {number} "21"
 * @property {number} "22"
 * @property {number} "23"
 * @property {number} "24"
 * @property {number} "10-12"
 * @property {number} "11-12"
 * @property {number} "13-14"
 * @property {number} "25-29"
 * @property {number} "30-34"
 * @property {number} "35-39"
 * @property {number} "40-44"
 * @property {number} "45-49"
 * @property {number} "50-54"
 * @property {number} "55-59"
 * @property {number} "60-64"
 * @property {number} "Under 10"
 * @property {number} "Under 11"
 * @property {number} "65 and over"
 * @property {number} "Adult Other"
 * @property {number} "Juvenile Other"
 */

/**
 * @typedef {Object} OffensesFromAgencyResponse
 * @property {ArresteeSexData} "Arrestee Sex"
 * @property {OffenseNameData} "Offense Name"
 * @property {ArresteeRaceData} "Arrestee Race"
 * @property {CdeProperties} cde_properties
 * @property {OffenseCategoryData} "Offense Category"
 * @property {OffenseBreakdownData} "Offense Breakdown"
 * @property {ArrestsByAgeData} "Male Arrests By Age"
 * @property {ArrestsByAgeData} "Female Arrests By Age"
 */

export async function getAgenciesFromState(state) {
    let responseData;
    try {
        const { data } = await axios.get('https://api.usa.gov/crime/fbi/cde/agency/byStateAbbr/' + state, {
            params: {
                API_KEY: process.env.REACT_APP_CRIME_KEY
            }
        })
        responseData = data
    } catch (err) {
        console.log(err)
        responseData = err.toJSON()
    }
    return responseData;
}

/**
 * @param {string} ori - The ORI (Originating Agency Identifier) code
 * @param {string} offenseCode - The offense code to query
 * @param {string} fromDate - Start date in mm-yyyy format
 * @param {string} toDate - End date in mm-yyyy format
 * @returns {Promise<OffensesFromAgencyResponse>} Promise that resolves to the offense data response
 */
export async function getOffensesFromAgencyInTimeRange(ori, offenseCode, fromDate, toDate) {
    let responseData;
    try {
        const { data } = await axios.get(`https://api.usa.gov/crime/fbi/cde/arrest/agency/${ori}/${offenseCode}`, {
            params: {
                type: 'totals',
                from: fromDate,
                to: toDate,
                API_KEY: process.env.REACT_APP_CRIME_KEY
            }
        })
        responseData = data
    } catch (err) {
        console.log(err)
        responseData = err.toJSON()
    }
    return responseData;
}
