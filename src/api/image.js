import {ImageApi} from "./api";

export class Image {
    static async getImage(query) {
        try {
            const response = await ImageApi.get(`search/photos?page=1&query=${query}&per_page=1`)
            return Promise.resolve(response.data.results[0])
        } catch (err) {
            console.log(err)
        }
    }
}