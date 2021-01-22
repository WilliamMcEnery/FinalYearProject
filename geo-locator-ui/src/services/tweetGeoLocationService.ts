export class TweetGeoLocationService {

    public async getLocations(topic: string) {
        return (
            fetch(`http://localhost:3000/api/getLocations?topic=${topic}`)
                .then((res: any) => res.json())
                .catch((err) => console.log(err))
        )
    }
}
