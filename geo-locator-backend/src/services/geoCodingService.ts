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
                latitude: 0,
                longitude: 0
            }
        ];

        console.log("Fetching Co-Ordinates...");
        try {
            const results = await geocoder.batchGeocode(data.locations);

            const coordinates: CoordinateObj[] = results.map(location => {
                const coordinate: CoordinateObj = {
                    latitude: location.value[0].latitude!,
                    longitude: location.value[0].longitude!
                };
                return coordinate;
            });

            console.log(coordinates);
            return coordinates;

        } catch (Error) {
            console.log(`there is an error ${Error}`);
        }

        return res;
    }
}

