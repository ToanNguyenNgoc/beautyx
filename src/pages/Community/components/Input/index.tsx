import { Avatar, Chip, CircularProgress, Dialog, Tooltip } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import style from "./input.module.css"
import HeadMobile from "features/HeadMobile";
import { useDeviceMobile, useNoti, usePostMedia } from "hooks";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { AlertSnack, XButton } from "components/Layout";
import icon from "constants/icon";
import { accept_media } from "common";
import { useFormik } from "formik";
import { IOrganization, ITag, Media, ReqPost } from "interface";
import img from "constants/img";
import * as Yup from "yup"
import { SelectOrg } from './Selection-Org'
import { SelectTag } from './Selection-Tag'
import { useMutation } from "@tanstack/react-query";
import { postApi } from "api";
import { regexHTML, testRegexImage } from "utils";
import { pick } from "lodash";

interface PostInputProps {
  open?: boolean,
  setOpen?: (open: boolean) => void,
}
interface InitialValues {
  content: string;
  media_ids: Media[];
  organization: IOrganization | null;
  tag: ITag | null
}
export const Input: FC<PostInputProps> = ({
  open = false,
  setOpen = () => false
}) => {
  const mb = useDeviceMobile()
  const { USER } = useSelector((state: IStore) => state.USER)
  const { noti, resultLoad, onCloseNoti } = useNoti()
  const { handlePostMedia } = usePostMedia()
  const [openOrg, setOpenOrg] = useState(false)
  const [openTag, setOpenTag] = useState(false)
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ReqPost) => postApi.createPost(body),
    onSuccess: () => {
      resultLoad('Đăng bài thành công!')
      setTimeout(() => setOpen(false), 1000)
    },
    onError: () => resultLoad('Có lỗi xảy ra !')
  })
  const formik = useFormik<InitialValues>({
    initialValues: {
      content: '',
      media_ids: [],
      organization: null,
      tag: null
    },
    validationSchema: Yup.object({
      content: Yup.string().required(),
      organization: Yup.object().shape({}),
      tag: Yup.object().shape({})
    }),
    onSubmit: (values) => {
      mutate({
        // ...values,
        content: values.content.replace(regexHTML, ''),
        status: 1,
        media_ids: values.media_ids.map(i => i.model_id),
        organization_id: values.organization?.id || 0,
        tag_id: values.tag?.id
      })
    }
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        const { media_ids } = formik.values
        formik.setFieldValue('media_ids', [...data, ...media_ids])
      }
    })
  }
  const onRemoveItem = (model_id: number) => {
    formik.setFieldValue('media_ids', formik.values.media_ids.filter(i => i.model_id !== model_id))
  }
  return (
    <>
      <AlertSnack
        open={noti.openAlert}
        onClose={onCloseNoti}
        title={noti.message}
      />
      <Dialog fullScreen={mb} open={open} onClose={() => setOpen(false)} >
        <div className={style.container}>
          {mb && <HeadMobile title='Tạo bài viết' onBackFunc={() => setOpen(false)} />}
          <div className={style.user}>
            <Avatar src={USER?.avatar} />
            <span className={style.user_fullname}>{USER?.fullname}</span>
          </div>
          <form className={style.form} autoComplete='off' onSubmit={formik.handleSubmit}>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
              autoFocus className={style.text_area}
              placeholder="Viết bài..."
            />
            <div className={style.control}>
              <Tooltip title="Ảnh/video" placement="top">
                <div>
                  <input onChange={onChangeMedia} type="file" hidden accept={accept_media} multiple id='file' />
                  <label className={style.control_btn} htmlFor="file">
                    <img style={{ width: '20px', height: '20px' }} src={icon.addImg} alt="" />
                  </label>
                </div>
              </Tooltip>
              <Tooltip title="Gắn thẻ doanh nghiệp" placement="top">
                <div>
                  <XButton iconSize={20} onClick={() => setOpenOrg(true)} type='button' className={style.control_btn} icon={icon.addBtn} />
                </div>
              </Tooltip>
              <Tooltip title="Gắn tag" placement="top">
                <div>
                  <XButton iconSize={20} onClick={() => setOpenTag(true)} type='button' className={style.control_btn} icon={icon.tag} />
                </div>
              </Tooltip>
            </div>
            <SelectOrg
              open={openOrg} setOpen={setOpenOrg}
              value={formik.values.organization}
              onChange={(e) => formik.setFieldValue('organization', e)}
            />
            <SelectTag open={openTag} setOpen={setOpenTag}
              value={formik.values.tag} onChange={(e) => formik.setFieldValue('tag', e)}
            />
            {
              formik.values?.organization &&
              <div className={style.section}>
                <div className={style.organization}>
                  <p className={style.title}>Doanh nghiệp</p>
                  <Chip
                    onDelete={() => formik.setFieldValue('organization', null)}
                    style={{ backgroundColor: 'var(--purple)', color: 'var(--white)' }}
                    avatar={<Avatar src={formik.values.organization?.image_url ?? img.beautyx} />}
                    label={formik.values.organization?.name}
                  />
                </div>
              </div>
            }
            {
              formik.values.tag &&
              <div className={style.section}>
                <div className={style.organization}>
                  <p className={style.title}>Tag</p>
                  <Chip
                    onDelete={() => formik.setFieldValue('tag', null)}
                    style={{ backgroundColor: 'var(--purple)', color: 'var(--white)' }}
                    label={formik.values.tag?.name}
                  />
                </div>
              </div>
            }
            {
              formik.values.media_ids.length > 0 &&
              <div className={style.section}>
                <p className={style.title}>Ảnh/video</p>
                <div className={style.images_list}>
                  {
                    formik.values.media_ids.map((i: Media) => (
                      <div key={i.model_id} className={style.image_item}>
                        {
                          testRegexImage(i.model_type) ?
                            <img className={style.image} src={i.original_url} alt="" />
                            :
                            <video webkit-playsinline="webkit-playsinline" playsInline controls className={style.image}>
                              <source src={i.original_url} />
                            </video>
                        }
                        {
                          i.model_id > 0 ?
                            <XButton onClick={() => onRemoveItem(i.model_id)} type='button' iconSize={20} icon={icon.closeCircle} />
                            :
                            <div className={style.image_load}>
                              <CircularProgress size={24} />
                            </div>
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            }
            <button id='btn_submit' type="submit" hidden>Submit</button>
          </form>
          <div className={style.form_bottom}>
            <label htmlFor="btn_submit" className={style.form_bottom_btn}>
              Đăng bài viết
            </label>
            {
              isLoading &&
              <div className={style.form_bottom_btn_load}>
                <CircularProgress size={20} />
              </div>
            }
          </div>
        </div>
      </Dialog>
    </>
  )
}
