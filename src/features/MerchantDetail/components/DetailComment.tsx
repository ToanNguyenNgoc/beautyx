import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import DetailCommentItem from "./DetailCommentItem";
import SectionTitle from "../../SectionTitle";
import ButtonCus from "../../../components/ButtonCus/index";
import { AppContext } from "../../../context/AppProvider";
import { IComment } from "../../../interface/comments";
import commentsApi from "../../../api/commentsApi";

interface IData {
  comments: IComment[] | any,
  page: number,
  totalItem: number
}

function DetailComment(props: any) {
  const history = useHistory();
  function handleSeeAllFeedback() {
    history.push({
      pathname: `/merchant-comment`,
      state: data
    });
  }
  const { styleCmt, org } = props;
  const { t } = useContext(AppContext);
  const [data, setData] = useState<IData>({
    comments: [],
    page: 1,
    totalItem: 1
  })

  const handleGetCommentsArg = async () => {
    const ORG = await org;
    try {
      const res = await commentsApi.getCommentsOrg({
        org_id: ORG?.id, page: data.page
      });
      setData({
        ...data,
        comments: res.data.context.data,
        totalItem: res.data.context.total
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (org) {
      handleGetCommentsArg()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org])
  return (
    <div style={{ width: styleCmt?.width }} className="mer-detail__content-cmt">
      <div className="flex-row-sp mer-detail-cmt__head">
        <span className="flex-row-sp">
          <SectionTitle title={t("Mer_de.feedback")} />
          <h1 className="flex-row mer-detail-cmt__head-star">
            4.5/5
            <img src={icon.star} alt="" />
          </h1>
        </span>
        <div className="mer-detail-cmt__head-total">
          <span>{data.totalItem}</span> {t("Mer_de.feedbacks")}
        </div>
      </div>
      <ul className="mer-detail-cmt__box">
        {
          data.comments.slice(0,7).map((item:IComment, index:number) => (
            <DetailCommentItem
              key={index}
              comment = {item}
            />
          ))
        }
      </ul>
      {
        data.comments.length > 7 &&
        <ButtonCus
          text={t("Mer_de.view_all_feedback")}
          imgIcon={icon.next}
          color="var(--purple)"
          border="solid 1px var(--purple)"
          borderRadius="18px"
          onClick={() => {
            handleSeeAllFeedback();
          }}
        />
      }
    </div>
  );
}

export default DetailComment;
