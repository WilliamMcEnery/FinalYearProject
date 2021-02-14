import NodeGeocoder, {Options} from "node-geocoder";
import { CoordinateObj } from "../models/coordinateObject";

export class GeoCodingService {

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

            console.log("This is the filtered array: ");
            console.log(filteredArr);
            return filteredArr;

        } catch (Error) {
            console.log(`there is an error ${Error}`);
        }

        return res;
    }
}

