import userChat from "assets/icon/user-chat.png"
import img from '../constants/img'

export function onErrorImg(e: any, isDisable?: boolean) {
    // if (isDisable) { e.target.style.display = 'none';return}
    e.target.src = img.imgDefault;
    e.target.style.objectFit = "contain";
    //e.target.style.transform = "scale(0.5)";
}
export default onErrorImg
export const onLoadImg = (e: any) => {
    e.target.src = img.imgDefault
    e.target.style.objectFit = 'contain'
    //e.target.style.transform = "scale(0.5)";
}
export const onErrorAvatar = (e: any) => {
    e.target.src = userChat;
    e.target.style.objectFit = "contain";
}
export const getImageSizes = (imgUrl: string) => {
    return new Promise<{ width: number, height: number }>((resolve, reject) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            const width = img.width;
            const height = img.height
            resolve({ width, height });
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
}
export const fetchImageSizes = async (imageUrls: string[]) => {
    try {
        const sizePromises = imageUrls.map(async (imageUrl) => ({
            original_url: imageUrl,
            width: (await getImageSizes(imageUrl)).width,
            height: (await getImageSizes(imageUrl)).height
        }));
        const imageSizes = await Promise.all(sizePromises);
        return imageSizes
    } catch (error) {
        console.error('Error:', error);
        return imageUrls.map(i => ({
            original_url: i,
            width: 100,
            height: 100
        }))
    }
}
