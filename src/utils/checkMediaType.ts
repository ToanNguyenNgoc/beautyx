/* eslint-disable no-useless-escape */
export const checkMediaType = (url: string) => {
    let MEDIA_TYPE: string = "IMAGE"
    if (typeof url !== 'string') {
        return false;
    }
    const newLocal = /^http[^\?]*.(mp4|3gp)(\?(.*))?$/gmi;
    if (url.match(newLocal) !== null) {
        MEDIA_TYPE = "VIDEO";
    }
    return MEDIA_TYPE;
}

export const regexFileType = {
    image: /^image\/(png|jpg|jpeg|gif|webp|bmp|svg)$/i,
    video: /^video\/(mp4|webm|mov|avi|wmv|flv|mkv|3gp)$/i,
    pdf: /^application\/pdf$/i,
    word: /^application\/(msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/i,
    youtube:/^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(?:[^/]+\/)?watch\?v=[\w-]+$/i
  }
  
  type FileType = 'IMAGE' | 'VIDEO' | 'PDF' | 'WORD' | 'FILE'
  export const acceptMedia={
    imageVideo:'image/*, video/*'
  }
  export const getFileType = (file?: string): FileType => {
    let type:FileType = 'FILE';
    if (!file) return type;
    if(regexFileType.image.test(file)) type = 'IMAGE';
    if(regexFileType.video.test(file)) type = 'VIDEO';
    return type;
  }