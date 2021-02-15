// Load required modules
import NodeGeocoder, {Options} from "node-geocoder";
import { CoordinateObj } from "../models/coordinateObject";

/**
 * This class is responsible providing the ability to geo-code location names and return
 * the locations co-ordinates.
 */
export class GeoCodingService {

    /**
     * This method is responsible for getting location co-ordinates form the location names.
     * @param data list of locations
     */
    public async getCoordinates(data: any): Promise<CoordinateObj[]> {
        const options: Options = {
            provider: "mapquest",
            apiKey: "CLs6cEsAxjnv5Ynbnk2iR5x9lQUX3Trv",
        };

        const geocoder = NodeGeocoder(options);

        const res: CoordinateObj[] = [
            {
                name: "",
                latitude: 0,
                longitude: 0
            }
        ];

        console.log("Fetching Co-Ordinates...");
        try {
            const results = await geocoder.batchGeocode(data.locations);

            const coordinates: CoordinateObj[] = results.map(location => {
                const coordinate: CoordinateObj = {
                    name: location.value[0].formattedAddress!,
                    latitude: location.value[0].latitude!,
                    longitude: location.value[0].longitude!
                };
                return coordinate;
            });

            const filteredArr = coordinates.reduce((acc: CoordinateObj[], current: CoordinateObj) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

            return filteredArr;

        } catch (Error) {
            console.log(`there is an error ${Error}`);
        }

        return res;
    }
}
