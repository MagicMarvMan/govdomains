import { writeFileSync } from 'fs';
import chalk from "chalk";

import secrets from "./../secrets.json";

import Nominatim from 'nominatim-geocoder';
const geocoder = new Nominatim()

import domains, { forEach } from "./../domains.json";

forEach((part, index, object) => {
    geocoder.search( { q: object[index]["City"] + ', ' + object[index]["State"] } )
    .then((response) => {
        domains[index]["Latitude"] = response[0]["lat"]
        domains[index]["Longitude"] = response[0]["lon"]
        domains[index]["OSM_Licence"] = response[0]["licence"]
        console.log()
    })
    .catch((error) => {
        console.log(error)
    })
})

writeFileSync("domains.json", JSON.stringify(domains, null, 4))
