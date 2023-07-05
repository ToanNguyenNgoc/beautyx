import { mediaApi } from "api";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";

type Media = {
  model_id: number;
  original_url: string;
}

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  onError?: (error: AxiosError) => void
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, onError }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia = {
            original_url: '',
            model_id: i
          }
          formData.append('file', fileItem)
          let res: any
          res = await mediaApi.postMedia(formData).then(res => res.data.context)
          if (res) {
            resMedia = {
              original_url: res.original_url,
              model_id: res.model_id
            }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        setIsLoading(false)
        if (callBack) {
          callBack(mediaList)
        }
      } catch (error) {
        const err = error as AxiosError
        if (onError) {
          onError(err)
        }
      }
    }
  }
  return {
    medias,
    handlePostMedia,
    isLoading
  }
}