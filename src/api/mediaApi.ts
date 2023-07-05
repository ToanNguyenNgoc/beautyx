import {axiosClient} from "config";

class Media {
    postMedia = (formData: FormData) => {
        const url = `media`;
        return axiosClient.post(url, formData, {
            headers:{'Content-Type':'multipart/form-data'}
        })
    }
}
export const mediaApi = new Media();
export default mediaApi