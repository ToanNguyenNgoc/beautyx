import React from 'react';
import { IOrganization } from '../../../interface/organization';
import './org-item.css';
import icon from '../../../constants/icon';
import img from '../../../constants/img';
import { useHistory } from 'react-router-dom';
import scrollTop from '../../../utils/scrollTop'
interface IProps {
    org: IOrganization
}

function OrgItem(props: IProps) {
    const { org } = props;
    const history = useHistory();
    const gotoDetail = () => {
        scrollTop()
        history.push({
            pathname: `/org/${org.subdomain}`,
            search: `${org.id}`,
            state: org,
        })
    }
    return (
        <div onClick={gotoDetail} className='re-org-item'>
            <div className="org-img-cnt">
                <img src={org.image ? `${org.image_url}` : `${img.imgDefault}`} alt="" className="re-org-item__img" />
                <div className="flex-row org-img-cnt__rate">
                    <div style={{ justifyContent: "flex-start", width: '100%' }} className='flex-row'>
                        <div className="flex-row org-img-cnt__rate-item">
                            <img src={icon.heart} alt="" />
                            <span>{org.favorites_count}</span>
                        </div>
                        <div className="flex-row org-img-cnt__rate-item">
                            <img src={icon.star} alt="" />
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="re-org-item__cnt">
                <span className="org_name">
                    {org.name}
                </span>
                <span className="org_address">
                    <img src={icon.pinMap} alt="" />
                    {org?.address}
                </span>
                {
                    org.distance ?
                        <div className="flex-row org_distance">
                            <div></div>
                            khoảnh cách:
                            {
                                org.distance < 1000 ?
                                    `${Math.round(org.distance)}(m)`
                                    :
                                    `${Math.round(org.distance / 1000)}(km)`
                            }
                        </div>
                        :
                        <></>
                }
                <span className="org_tag">
                    <img src={icon.Menu} alt="" />
                    {org.tags?.map((t: any) => t.name).join(',')}
                </span>
            </div>
        </div>
    );
}

export default OrgItem;