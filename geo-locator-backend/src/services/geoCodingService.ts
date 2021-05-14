// Load required modules
import NodeGeocoder, {Options, Providers} from "node-geocoder";
import { CoordinateObj } from "../models/coordinateObject";

/**
 * This class is responsible providing the ability to geo-code location names and return
 * the locations co-ordinates.
 */
export class GeoCodingService {
    private whichData = true;

    /**
     * This method is responsible for getting location co-ordinates form the location names.
     * @param data list of locations
     */
    public async getCoordinates(data: any): Promise<CoordinateObj[]> {
        // const options: Options = {
        //     provider: process.env.GEOCODING_PROVIDER as Providers,
        //     apiKey: process.env.MAPQUEST_API_KEY,
        // };

        // const geocoder = NodeGeocoder(options);

        const res: CoordinateObj[] = [
            {
                name: "",
                latitude: 0,
                longitude: 0
            }
        ];

        console.log("Fetching Co-Ordinates...");
        try {
            // const results = await geocoder.batchGeocode(data.locations);
            console.log("Received geo-codes!");
            //
            // const coordinates = results.reduce((filtered: CoordinateObj[], location) => {
            //     if (location.value.length !== 0) {
            //         const coordinate: CoordinateObj = {
            //             name: location.value[0].formattedAddress!,
            //             latitude: location.value[0].latitude!,
            //             longitude: location.value[0].longitude!
            //         };
            //         filtered.push(coordinate);
            //     }
            //     return filtered;
            // }, []);
            //
            // const filteredArr = coordinates.reduce((acc: CoordinateObj[], current: CoordinateObj) => {
            //     const x = acc.find(item => item.name === current.name);
            //     if (!x) {
            //         return acc.concat([current]);
            //     } else {
            //         return acc;
            //     }
            // }, []);

            const liverpoolData = [
                {
                    "name":", Lagos, , NG",
                    "latitude":6.455058,
                    "longitude":3.39418
                },
                {
                    "name":"Von Øtkens Vei, Oslo, Oslo, NO",
                    "latitude":59.84983,
                    "longitude":10.78582
                },
                {
                    "name":"Dubai, Calumpit, Central Luzon, PH",
                    "latitude":14.89569,
                    "longitude":120.79034
                },
                {
                    "name":", Barnsley, , GB",
                    "latitude":53.552772,
                    "longitude":-1.482776
                },
                {
                    "name":", , , US",
                    "latitude":39.390897,
                    "longitude":-99.066067},
                {
                    "name":"Stretford Road, Manchester, ENG M14, GB",
                    "latitude":53.44971,
                    "longitude":-2.21711
                },
                {
                    "name":", New York, NY, US",
                    "latitude":40.713054,
                    "longitude":-74.007228
                },
                {
                    "name":"Vintage Earth Path, Laurel, MD 20723, US",
                    "latitude":39.13486,
                    "longitude":-76.84496},
                {
                    "name":", Hartlington, ENGLAND, GB",
                    "latitude":54.047669,
                    "longitude":-1.943269},
                {
                    "name":"Via Lazio, Roma, Lazio 00187, IT",
                    "latitude":41.9086,
                    "longitude":12.48808},
                {
                    "name":", , ENGLAND, GB",
                    "latitude":52.795479,
                    "longitude":-0.54024},
                {
                    "name":"Kaposvári út 10, Sásd, Baranya 7370, HU",
                    "latitude":46.25587,
                    "longitude":18.10356},
                {
                    "name":", Istanbul, İSTANBUL, TR",
                    "latitude":41.017058,
                    "longitude":28.985568},
                {
                    "name":"Notting Hill Gate, London, ENG W11, GB",
                    "latitude":51.50898,
                    "longitude":-0.19708},
                {
                    "name":"Calle Liverpool, Ojén, Andalucía 29610, ES",
                    "latitude":36.5327,
                    "longitude":-4.75873},
                {
                    "name":"Jalan Veteran Selatan, Makassar, Sulawesi Selatan, ID",
                    "latitude":-5.15744,
                    "longitude":119.42351},
                {
                    "name":", , , NG",
                    "latitude":8.7006,
                    "longitude":8.5172},
                {
                    "name":"South Devon Avenue, , PA, US",
                    "latitude":40.03989,
                    "longitude":-75.40808},
                {
                    "name":", Teneriffa, CANARY ISLANDS, ES",
                    "latitude":28.274799,
                    "longitude":-16.549207},
                {
                    "name":", Liverpool, , GB",
                    "latitude":53.405472,
                    "longitude":-2.980539},
                {
                    "name":"Calle ElMaíz, Cáseda, Comunidad Foral de Navarra 31312, ES",
                    "latitude":42.43663,
                    "longitude":-1.37075},
                {
                    "name":", Syracuse, NY, US",
                    "latitude":43.047945,
                    "longitude":-76.147448},
                {
                    "name":"North West Drive, Lancaster, ENG LA1, GB",
                    "latitude":54.01179,
                    "longitude":-2.78734},
                {
                    "name":", , , PK",
                    "latitude":31.474501,
                    "longitude":70.770103},
                {
                    "name":", La Plata, , AR",
                    "latitude":-34.921136,
                    "longitude":-57.954384},
                {
                    "name":", , PROVINCIA DE MANABÍ, EC",
                    "latitude":-0.758803,
                    "longitude":-80.061213},
                {
                    "name":", Cayambe, PICHINCHA, EC",
                    "latitude":0.041064,
                    "longitude":-78.142954},
                {
                    "name":", London, , GB",
                    "latitude":51.507276,
                    "longitude":-0.12766},
                {
                    "name":", Norwich, , GB",
                    "latitude":52.628606,
                    "longitude":1.29227},
                {
                    "name":",Uk, , RU",
                    "latitude":55.079018,
                    "longitude":98.8508},
                {
                    "name":", , , VE",
                    "latitude":7.159467,
                    "longitude":-66.245689},
                {
                    "name":", , , TH",
                    "latitude":15.0086,
                    "longitude":100.955704},
                {
                    "name":", Frodsham, , GB",
                    "latitude":53.296364,
                    "longitude":-2.711485},
                {
                    "name":", Ellesmere Port, , GB",
                    "latitude":53.278935,
                    "longitude":-2.902251},
                {
                    "name":"Somewhere Road, Portola, CA, US",
                    "latitude":39.78913,
                    "longitude":-120.54214},
                {
                    "name":"Humber Road, Immingham, ENG, GB",
                    "latitude":53.63213,
                    "longitude":-0.2371},
                {
                    "name":", Manhattan, NY, US",
                    "latitude":40.753259,
                    "longitude":-74.003804},
                {
                    "name":", , , ES",
                    "latitude":40.93,
                    "longitude":-3.4},
                {
                    "name":", Dublin, , IE",
                    "latitude":53.349307,
                    "longitude":-6.261175},
                {
                    "name":", Ankara, , TR",
                    "latitude":39.927232,
                    "longitude":32.851977},
                {
                    "name":"Chadwick Street, Leeds, England LS10 1LJ, GB",
                    "latitude":53.789843,
                    "longitude":-1.533942},
                {
                    "name":", Doctor Gonzalez, NLE, MX",
                    "latitude":25.859417,
                    "longitude":-99.941748
                }
            ];
            const chinaData = [
                {"name":", Mexico City, DIF, MX","latitude":19.43253,"longitude":-99.13321},
                {"name":"Houke Road Section 3 Lane 888, Taichung City, Taichung City 421, TW","latitude":24.31442,"longitude":120.70374},
                {"name":", Dumlupınar, Αμμόχωστος, CY","latitude":35.09749,"longitude":33.94215},
                {"name":", , , US","latitude":39.390897,"longitude":-99.066067},
                {"name":", Shalford, ENGLAND, GB","latitude":51.21225,"longitude":-0.565412},
                {"name":"[224057 - 224099] Priddis Ridge Rd W, Priddis, AB T0L, CA","latitude":50.89163,"longitude":-114.329642},
                {"name":", , , NZ","latitude":-43.9674,"longitude":170.489395},
                {"name":", , , IN","latitude":27.0858,"longitude":80.314003},
                {"name":"Mountains Boulevard, Lake Lure, NC 28746, US","latitude":35.46566,"longitude":-82.19144},
                {"name":", Harare, , ZW","latitude":-17.831589,"longitude":31.045807},
                {"name":"Southwest Court, Gaston, NC, US","latitude":36.51068,"longitude":-77.83632},
                {"name":", Barcelona, CATALUÑA/CATALUNYA, ES","latitude":41.38256,"longitude":2.177135},
                {"name":", Istanbul, İSTANBUL, TR","latitude":41.017058,"longitude":28.985568},
                {"name":", Panama, , PA","latitude":8.970743,"longitude":-79.534454},
                {"name":", , ENGLAND, GB","latitude":52.795479,"longitude":-0.54024},
                {"name":", , , GB","latitude":54,"longitude":-2},
                {"name":", Thane, MAHARASHTRA, IN","latitude":19.194329,"longitude":72.970178},
                {"name":", Hong Kong, HONG KONG, HK","latitude":22.264412,"longitude":114.167061},
                {"name":", Córdoba, , AR","latitude":-31.416775,"longitude":-64.183601},
                {"name":"New York State Military Reservation, Cortlandt, NY, US","latitude":41.30367,"longitude":-73.93977},
                {"name":", Cuttack, ODISHA, IN","latitude":20.4686, "longitude":85.8792}
            ];
            let filteredArr;

            if (this.whichData) {
                filteredArr = liverpoolData;
                this.whichData = !this.whichData;
            } else {
                filteredArr = chinaData;
                this.whichData = !this.whichData;
            }

            return filteredArr;

        } catch (Error) {
            console.log(`there is an error ${Error}`);
        }

        return res;
    }
}
