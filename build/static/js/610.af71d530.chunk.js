"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[610],{64610:function(e,i,t){t.r(i),t.d(i,{default:function(){return ge}});var a=t(72791),l=t(12978),s=t(19598),r=t(2579),o=(t(85862),t(80561),t(80184));const n=()=>(0,o.jsx)("div",{className:"load-org-cnt",children:(0,o.jsx)("div",{className:"load-org-cnt__left",children:(0,o.jsx)("ul",{className:"list",children:[1,2,3,4,5,6,7,8,9,10].map((e=>(0,o.jsx)("li",{className:"list-item",children:(0,o.jsxs)("div",{className:"flex-row-sp list-item__cnt",children:[(0,o.jsx)("div",{className:"list-item__cnt-img",children:(0,o.jsx)(r.Z,{width:"100%",height:"100%"})}),(0,o.jsxs)("div",{className:"list-item__cnt-de",children:[(0,o.jsx)("span",{children:(0,o.jsx)(r.Z,{width:"100%",height:"100%"})}),(0,o.jsx)("span",{children:(0,o.jsx)(r.Z,{width:"100%",height:"100%"})}),(0,o.jsx)("span",{children:(0,o.jsx)(r.Z,{width:"100%",height:"100%"})})]})]})},e)))})})});var c=t(6652),d=t(75619),_=t(55307);function m(e){const{item:i,onMarkerClick:t}=e,a=(0,l.I0)();return(0,o.jsxs)("div",{id:`${i.id}`,onMouseEnter:()=>{a((0,d.Z9)(i))},onClick:()=>{t(i)},className:"dialog-map__item",children:[(0,o.jsx)("div",{className:"map-item__img",children:(0,o.jsx)("img",{onError:e=>(0,_.ZP)(e),src:null!==i&&void 0!==i&&i.image_url?null===i||void 0===i?void 0:i.image_url:null===i||void 0===i?void 0:i.image,alt:""})}),(0,o.jsxs)("div",{className:"map-item__content",children:[(0,o.jsx)("div",{className:"map-item__name",children:(0,o.jsx)("p",{children:null===i||void 0===i?void 0:i.name})}),(0,o.jsx)("div",{className:"map-item__address",children:(0,o.jsx)("p",{children:null!==i&&void 0!==i&&i.address?null===i||void 0===i?void 0:i.address:null===i||void 0===i?void 0:i.full_address})}),(0,o.jsxs)("div",{className:"map-item__evaluate",children:[(0,o.jsxs)("div",{className:"evaluate-item",children:[(0,o.jsx)("img",{src:c.Z.star,alt:""}),(0,o.jsx)("p",{children:"5"})]}),(0,o.jsxs)("div",{className:"evaluate-item",children:[(0,o.jsx)("img",{src:c.Z.cartCheckPurple,alt:""}),(0,o.jsx)("p",{children:"10"})]})]})]})]})}var g=t(14771),u=t(95717),h=t(98402),p=t(64060),v=t(73974),x=t(84191),j=t(76012),N=t(32470),b=t(84042),f=t(25500),k=t(8477),w=t(68915),y={org_detail_cnt:"map_org_detail_cnt__x2pEI",org_detail_head:"map_org_detail_head__0xEWe",org_detail_head_btn:"map_org_detail_head_btn__SgFMr",org_detail:"map_org_detail__BRJVg",org_detail_banners:"map_org_detail_banners__F7Vhx",org_banner_linear:"map_org_banner_linear__m2-Bs",org_banner_img:"map_org_banner_img__7QWjH",org_banner_count:"map_org_banner_count__quYof",org_detail_card:"map_org_detail_card__j9xpp",org_detail_avatar:"map_org_detail_avatar__fWp64",org_detail_info:"map_org_detail_info__ezrj4",org_name:"map_org_name__yFe5r",org_address:"map_org_address__JTt49",org_exc:"map_org_exc__mwdoz",org_exc_left:"map_org_exc_left__IJnNK",org_exc_item:"map_org_exc_item__XfjT9",org_exc_left_btn:"map_org_exc_left_btn__Hw0-t",org_exc_right:"map_org_exc_right__2r1Yr",org_section_title:"map_org_section_title__k4T7c",org_time_word_head_icon:"map_org_time_word_head_icon__irUSS",time_icon_ch:"map_time_icon_ch__3kEKA",org_time_word_head:"map_org_time_word_head__RXbvp",org_time_word:"map_org_time_word__BE5i5",org_time_word_body:"map_org_time_word_body__F2XmT",org_time_word_body_act:"map_org_time_word_body_act__iOlz9",org_list_time_item:"map_org_list_time_item__eHmax",time_day:"map_time_day__tyMkV",time_word:"map_time_word__MNGnC",org_galleries:"map_org_galleries__IebtR",org_galleries_list:"map_org_galleries_list__01ET4",org_gallery_item:"map_org_gallery_item__Z1UBj",org_gallery_item_img:"map_org_gallery_item_img__gw+vn",org_special_par:"map_org_special_par__4dlLs",org_special_list:"map_org_special_list__a78kd",org_special_item:"map_org_special_item__A8eis",island_marker:"map_island_marker__lIjvk",map_style_ctrl:"map_map_style_ctrl__USgQQ",style_item:"map_style_item__RdXD+"},Z=t(57096);function S(e){var i,t,l,r;const{org:n,setOpenDetail:d,openDetail:_}=e,m=(0,b.oG)(),g=(0,s.k6)(),{t:u}=(0,a.useContext)(x.I),p=(0,a.useRef)(null),v=(0,a.useRef)(null),S=(0,a.useRef)(null),R=(0,f.x)(),$=(0,b.YE)({API_URL:N.Z.ORG(null===n||void 0===n?void 0:n.id),enable:n,params:{"filter[location]":R}}).response,D=(null!==(i=(0,b.H9)({enable:null===n||void 0===n?void 0:n.id,API_URL:N.Z.GALLERIES_ORG_ID(null===n||void 0===n?void 0:n.id),params:j.w4}).resData)&&void 0!==i?i:[]).map((e=>{var i;const t=null===e||void 0===e||null===(i=e.images)||void 0===i?void 0:i.map((e=>e.image_url));return[e.image_url].concat(t)})).flat().filter(Boolean),{favoriteSt:T,onToggleFavorite:I}=(0,b.s4)({org_id:n.id,type:"ORG",count:null===$||void 0===$?void 0:$.favorites_count,favorite:null===$||void 0===$?void 0:$.is_favorite}),G=(0,Z.Rq)(n.opening_time);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:y.org_detail_cnt,children:[(0,o.jsx)("div",{className:y.org_detail_head,children:(0,o.jsx)(k.Rb,{onClick:()=>{if(!m)return d({..._,open:!1});d(!1)},className:y.org_detail_head_btn,icon:c.Z.closeBlack,iconSize:20})}),(0,o.jsxs)("div",{className:y.org_detail,children:[(0,o.jsxs)("div",{ref:p,className:y.org_detail_banners,children:[(0,o.jsx)("div",{className:y.org_banner_linear}),(0,o.jsx)("img",{className:y.org_banner_img,src:null!==(t=null!==(l=D[0])&&void 0!==l?l:null===n||void 0===n?void 0:n.image_url)&&void 0!==t?t:h.ZP.imgDefault,alt:""}),(null===D||void 0===D?void 0:D.length)>0&&(0,o.jsxs)("div",{className:y.org_banner_count,children:[null===D||void 0===D?void 0:D.length," ",u("Mer_de.galleries")]})]}),(0,o.jsxs)("div",{className:y.org_detail_card,children:[(0,o.jsx)("div",{className:y.org_detail_avatar,children:(0,o.jsx)("img",{src:null!==(r=null===n||void 0===n?void 0:n.image_url)&&void 0!==r?r:h.ZP.imgDefault,alt:""})}),(0,o.jsxs)("div",{className:y.org_detail_info,children:[(0,o.jsx)("p",{className:y.org_name,children:n.name}),(0,o.jsx)("p",{className:y.org_address,children:n.full_address}),(0,o.jsxs)("div",{className:y.org_exc,children:[(0,o.jsxs)("div",{className:y.org_exc_left,children:[(0,o.jsx)(k.Rb,{onClick:()=>{m?g.push((0,w.Hs)(n.subdomain)):window.open((0,w.Hs)(n.subdomain),"_blank","noopener,noreferrer")},className:y.org_exc_left_btn,title:u("app.details")}),(0,o.jsxs)("div",{className:y.org_exc_item,children:[(0,o.jsx)("img",{src:c.Z.heartBoldRed,alt:""}),(0,o.jsx)("span",{children:T.favorite_count})]})]}),(0,o.jsx)(k.Rb,{onClick:I,className:y.org_exc_right,icon:null!==T&&void 0!==T&&T.is_favorite?c.Z.heart:c.Z.unHeart,iconSize:16})]})]})]}),(0,o.jsxs)("div",{className:y.org_time_word,children:[(0,o.jsxs)("div",{onClick:()=>{var e,i;null===(e=v.current)||void 0===e||e.classList.toggle(y.org_time_word_body_act),null===(i=S.current)||void 0===i||i.classList.toggle(y.time_icon_ch)},className:y.org_time_word_head,children:[(0,o.jsx)("p",{className:y.org_section_title,children:u("pr.open_time")}),(0,o.jsx)("img",{ref:S,src:c.Z.chevronRightBlack,className:y.org_time_word_head_icon,alt:""})]}),(0,o.jsx)("div",{ref:v,className:y.org_time_word_body,children:(0,o.jsx)("ul",{className:y.org_list_time,children:G.map(((e,i)=>(0,o.jsxs)("li",{style:e.todayAct?{color:"var(--green)"}:{},className:y.org_list_time_item,children:[(0,o.jsx)("span",{className:y.time_day,children:e.day_week}),"on"===e.status?(0,o.jsxs)("div",{className:y.time_word,children:[u("se.from")," ",(0,o.jsx)("h4",{style:{marginRight:"16px"},children:e.from_time_opening})," ",u("se.to")," ",(0,o.jsx)("h4",{children:e.to_time_opening})]}):(0,o.jsx)("div",{className:y.time_word,children:"----"})]},i)))})}),(null===D||void 0===D?void 0:D.length)>0&&(0,o.jsx)(C,{images_url:D}),(0,o.jsx)(M,{org:n})]})]})]})})}const C=e=>{let{images_url:i}=e;const{t:t}=(0,a.useContext)(x.I);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{className:y.org_section_title,children:t("Mer_de.galleries")}),(0,o.jsx)("div",{className:y.org_galleries,children:(0,o.jsx)("ul",{className:y.org_galleries_list,children:i.map((e=>(0,o.jsx)("li",{className:y.org_gallery_item,children:(0,o.jsx)(R,{image_url:e})},e)))})})]})},R=e=>{let{image_url:i}=e;const[t,l]=(0,a.useState)(!1);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("img",{onClick:()=>l(!0),src:i,className:y.org_gallery_item_img,alt:""}),(0,o.jsx)(k.OK,{open:t,setOpen:l,src:[i]})]})},M=e=>{let{org:i}=e;const{t:t}=(0,a.useContext)(x.I),{services_special:l}=(0,Z.s4)(i),{products_special:s}=(0,Z.wl)(i);return(0,o.jsxs)(o.Fragment,{children:[(null===l||void 0===l?void 0:l.length)>0&&(0,o.jsxs)("div",{className:y.org_special_cnt,children:[(0,o.jsx)("p",{className:y.org_section_title,children:t("Mer_de.services")}),(0,o.jsx)("div",{className:y.org_special_par,children:(0,o.jsx)("ul",{className:y.org_special_list,children:null===l||void 0===l?void 0:l.map(((e,t)=>(0,o.jsx)("li",{className:y.org_special_item,children:(0,o.jsx)(k.IW,{item:e,org:i,type:"SERVICE"})},t)))})})]}),(null===s||void 0===s?void 0:s.length)>0&&(0,o.jsxs)("div",{className:y.org_special_cnt,children:[(0,o.jsx)("p",{className:y.org_section_title,children:t("Mer_de.products")}),(0,o.jsx)("div",{className:y.org_special_par,children:(0,o.jsx)("ul",{className:y.org_special_list,children:null===s||void 0===s?void 0:s.map(((e,t)=>(0,o.jsx)("li",{className:y.org_special_item,children:(0,o.jsx)(k.IW,{item:e,org:i,type:"PRODUCT"})},t)))})})]})]})};var $=function(e){const{open:i,setOpen:t,org:a,handleDirection:l}=e;return(0,o.jsx)(v.ZP,{open:i,onClose:()=>t(!1),anchor:"bottom",children:(0,o.jsx)("div",{className:"map map-org-de-mb-wrap",children:(0,o.jsx)(S,{org:a,openDetail:i,setOpenDetail:t,handleDirection:l})})})};function D(e){var i;const{item:t,handleDirection:l}=e,[s,r]=(0,a.useState)(!1);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)($,{open:s,setOpen:r,org:t,handleDirection:l}),(0,o.jsx)("div",{onClick:()=>{r(!0)},className:"map-item__wrap",children:(0,o.jsxs)("div",{className:"map-item__mobile",children:[(0,o.jsx)("div",{className:"item-img",children:(0,o.jsx)("img",{onError:e=>(0,p.bW)(e),src:null!==t&&void 0!==t&&t.image_url?null===t||void 0===t?void 0:t.image_url:h.ZP.beautyX,alt:""})}),(0,o.jsxs)("div",{className:"item-content",children:[(0,o.jsx)("div",{className:"item-content__name",children:(0,o.jsx)("p",{children:null===t||void 0===t?void 0:t.name})}),(0,o.jsx)("div",{className:"item-content__address",children:(0,o.jsx)("p",{children:null===t||void 0===t?void 0:t.full_address})}),(0,o.jsxs)("div",{className:"item-content__evaluate",children:[(0,o.jsxs)("div",{className:"evaluate-item",children:[(0,o.jsx)("div",{className:"evaluate-item__img",children:(0,o.jsx)("img",{src:c.Z.star,alt:""})}),(0,o.jsx)("p",{children:"5"})]}),(0,o.jsxs)("div",{className:"evaluate-item",children:[(0,o.jsx)("div",{className:"evaluate-item__img",children:(0,o.jsx)("img",{src:c.Z.heart,alt:""})}),(0,o.jsx)("p",{children:null===t||void 0===t||null===(i=t.favorites)||void 0===i?void 0:i.length})]})]})]})]})})]})}var T=t(83305),I=t(763),G=t(95330),O=t(63366),z=t(87462),P=t(28182),B=t(94419),E=t(12065),F=t(14036),L=t(97278),A=t(31402),H=t(66934),U=t(75878),W=t(21217);function J(e){return(0,W.Z)("MuiSwitch",e)}var V=(0,U.Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);const Q=["className","color","edge","size","sx"],X=(0,H.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,i)=>{const{ownerState:t}=e;return[i.root,t.edge&&i[`edge${(0,F.Z)(t.edge)}`],i[`size${(0,F.Z)(t.size)}`]]}})((e=>{let{ownerState:i}=e;return(0,z.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===i.edge&&{marginLeft:-8},"end"===i.edge&&{marginRight:-8},"small"===i.size&&{width:40,height:24,padding:7,[`& .${V.thumb}`]:{width:16,height:16},[`& .${V.switchBase}`]:{padding:4,[`&.${V.checked}`]:{transform:"translateX(16px)"}}})})),q=(0,H.ZP)(L.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,i)=>{const{ownerState:t}=e;return[i.switchBase,{[`& .${V.input}`]:i.input},"default"!==t.color&&i[`color${(0,F.Z)(t.color)}`]]}})((e=>{let{theme:i}=e;return{position:"absolute",top:0,left:0,zIndex:1,color:i.vars?i.vars.palette.Switch.defaultColor:`${"light"===i.palette.mode?i.palette.common.white:i.palette.grey[300]}`,transition:i.transitions.create(["left","transform"],{duration:i.transitions.duration.shortest}),[`&.${V.checked}`]:{transform:"translateX(20px)"},[`&.${V.disabled}`]:{color:i.vars?i.vars.palette.Switch.defaultDisabledColor:`${"light"===i.palette.mode?i.palette.grey[100]:i.palette.grey[600]}`},[`&.${V.checked} + .${V.track}`]:{opacity:.5},[`&.${V.disabled} + .${V.track}`]:{opacity:i.vars?i.vars.opacity.switchTrackDisabled:""+("light"===i.palette.mode?.12:.2)},[`& .${V.input}`]:{left:"-100%",width:"300%"}}}),(e=>{let{theme:i,ownerState:t}=e;return(0,z.Z)({"&:hover":{backgroundColor:i.vars?`rgba(${i.vars.palette.action.activeChannel} / ${i.vars.palette.action.hoverOpacity})`:(0,E.Fq)(i.palette.action.active,i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==t.color&&{[`&.${V.checked}`]:{color:(i.vars||i).palette[t.color].main,"&:hover":{backgroundColor:i.vars?`rgba(${i.vars.palette[t.color].mainChannel} / ${i.vars.palette.action.hoverOpacity})`:(0,E.Fq)(i.palette[t.color].main,i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${V.disabled}`]:{color:i.vars?i.vars.palette.Switch[`${t.color}DisabledColor`]:`${"light"===i.palette.mode?(0,E.$n)(i.palette[t.color].main,.62):(0,E._j)(i.palette[t.color].main,.55)}`}},[`&.${V.checked} + .${V.track}`]:{backgroundColor:(i.vars||i).palette[t.color].main}})})),Y=(0,H.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,i)=>i.track})((e=>{let{theme:i}=e;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:i.transitions.create(["opacity","background-color"],{duration:i.transitions.duration.shortest}),backgroundColor:i.vars?i.vars.palette.common.onBackground:`${"light"===i.palette.mode?i.palette.common.black:i.palette.common.white}`,opacity:i.vars?i.vars.opacity.switchTrack:""+("light"===i.palette.mode?.38:.3)}})),K=(0,H.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,i)=>i.thumb})((e=>{let{theme:i}=e;return{boxShadow:(i.vars||i).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),ee=a.forwardRef((function(e,i){const t=(0,A.Z)({props:e,name:"MuiSwitch"}),{className:a,color:l="primary",edge:s=!1,size:r="medium",sx:n}=t,c=(0,O.Z)(t,Q),d=(0,z.Z)({},t,{color:l,edge:s,size:r}),_=(e=>{const{classes:i,edge:t,size:a,color:l,checked:s,disabled:r}=e,o={root:["root",t&&`edge${(0,F.Z)(t)}`,`size${(0,F.Z)(a)}`],switchBase:["switchBase",`color${(0,F.Z)(l)}`,s&&"checked",r&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},n=(0,B.Z)(o,J,i);return(0,z.Z)({},i,n)})(d),m=(0,o.jsx)(K,{className:_.thumb,ownerState:d});return(0,o.jsxs)(X,{className:(0,P.Z)(_.root,a),sx:n,ownerState:d,children:[(0,o.jsx)(q,(0,z.Z)({type:"checkbox",icon:m,checkedIcon:m,ref:i,ownerState:d},c,{classes:(0,z.Z)({},_,{root:_.switchBase})})),(0,o.jsx)(Y,{className:_.track,ownerState:d})]})}));var ie=ee,te=t(31243),ae=t(13239);var le=function(){return(0,o.jsx)("div",{className:"loading-cnt",children:(0,o.jsx)(ae.Z,{})})},se=t(65209);var re=e=>{const{mapRef:i,onFlyTo:t,setOpenDetail:s,openDetail:r,slideRef:n}=e,{t:_}=(0,a.useContext)(x.I),m=[{id:4,title:"Spa",text:"Spa",img:h.U1.spa},{id:3,title:"Salon",text:"Salon",img:""},{id:1,title:"Nail",text:"Nail",img:h.U1.nails},{id:6,title:"clinic",text:"clinic",img:h.U1.clinic},{id:8,title:"Massage",text:"Massage",img:h.U1.massage},{id:5,title:"Th\u1ea9m m\u1ef9 vi\u1ec7n",text:_("home_2.beauty_salon"),img:h.U1.skinCare},{id:2,title:"nha khoa",text:_("home_2.dentistry"),img:h.U1.nhaKhoa}],g=(0,l.I0)(),[u,p]=(0,a.useState)([]),{getValueCenter:v,tags:j,orgsMap:N}=(0,l.v9)((e=>e.ORGS_MAP)),b=(0,a.useCallback)((0,I.debounce)((e=>{(async e=>{try{const i=await T.Z.getAll({page:1,limit:5,keyword:e,sort:"distance"});p(i.data.context.data)}catch(i){}})(e)}),1e3),[]),[f,k]=(0,a.useState)([]),[w,y]=(0,a.useState)("");return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:" map-filter-cnt",children:[(0,o.jsxs)("div",{className:"map-filter-cnt__left",children:[(0,o.jsxs)("div",{className:"map-filter-cnt__input",children:[(0,o.jsx)("input",{type:"text",placeholder:"T\xecm ki\u1ebfm tr\xean b\u1ea3n \u0111\u1ed3",value:w,onChange:async e=>{var i;const t=e.target.value;y(t);const a=`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsNnJmajVuZDBrNzEzY3BpNnB6dHpwMHAifQ.JsWqTj6D7GLSDGgNfnclXw&country=vn`,l=await te.Z.get(a);k(null===l||void 0===l||null===(i=l.data)||void 0===i?void 0:i.features),b(t)}}),(0,o.jsx)("div",{className:"map-filter-cnt__input-btn",children:N.status===se.Q.LOADING?(0,o.jsx)(le,{}):(0,o.jsx)("button",{onClick:()=>y(""),children:(0,o.jsx)("img",{src:c.Z.closeBlack,alt:""})})})]}),(0,o.jsx)("div",{className:"map-filter-cnt__drop",children:(0,o.jsxs)("ul",{className:"map-filter-list-org",children:[(null===w||void 0===w?void 0:w.length)>0&&(null===f||void 0===f?void 0:f.length)>0&&(null===f||void 0===f?void 0:f.map(((e,a)=>(0,o.jsx)("li",{onClick:()=>(e=>{y(e.place_name),k([]),s({...r,open:!1,check:!1}),p([]),(null===i||void 0===i?void 0:i.current.getZoom())<15&&(null===i||void 0===i||i.current.setZoom(13));const a=e.center.reverse().join(",");t(e.center[0],e.center[1]),g((0,d.P)()),g((0,d.ty)({page:1,LatLng:a,mountNth:2,tags:j.join("|")})),setTimeout((()=>{var e;null===n||void 0===n||null===(e=n.current)||void 0===e||e.slickGoTo(0)}),500)})(e),className:"map-list-org__item",children:e.place_name},a)))),(null===u||void 0===u?void 0:u.length)>0&&(null===w||void 0===w?void 0:w.length)>0&&(null===u||void 0===u?void 0:u.map(((e,a)=>(0,o.jsx)("li",{onClick:()=>{return t((a=e).latitude,a.longitude),(null===i||void 0===i?void 0:i.current.getZoom())<15&&(null===i||void 0===i||i.current.setZoom(13)),g((0,d.P)()),g((0,d.ty)({page:1,LatLng:`${a.latitude},${a.longitude}`,mountNth:2,tags:j.join("|")})),s({...r,open:!0,check:!0}),p([]),k([]),g((0,d.Z9)(a)),g((0,G.Gv)(a.subdomain)),void setTimeout((()=>{var e;null===n||void 0===n||null===(e=n.current)||void 0===e||e.slickGoTo(0)}),500);var a},className:"map-list-org__item",children:e.name},a))))]})})]}),(0,o.jsxs)("div",{className:"flex-row-sp map-filter-cnt__right",children:[(0,o.jsxs)("div",{className:"flex-row map-filter-cnt__right-switch",children:[(0,o.jsx)(ie,{onChange:e=>{g((0,d._E)(e.target.checked))},checked:v,size:"small"}),"C\u1eadp nh\u1eadt khi di chuy\u1ec3n b\u1ea3n \u0111\u1ed3"]}),(0,o.jsx)("div",{className:"map-filter-cnt__right-tag",children:(0,o.jsx)("ul",{className:"flex-row map-filter-tags",children:m.map((e=>(0,o.jsx)("li",{onClick:()=>(async e=>{var t,a,l,s;const r=null===i||void 0===i||null===(t=i.current)||void 0===t||null===(a=t.getCenter())||void 0===a?void 0:a.lat,o=null===i||void 0===i||null===(l=i.current)||void 0===l||null===(s=l.getCenter())||void 0===s?void 0:s.lng;var c;g((0,d.An)(e)),g((0,d.P)()),"fulfilled"===(await g((0,d.ty)({page:1,mountNth:2,tags:j.includes(e)?j.filter((i=>i!==e)).join("|"):[...j,e].join("|"),LatLng:`${r},${o}`}))).meta.requestStatus&&(null===n||void 0===n||null===(c=n.current)||void 0===c||c.slickGoTo(0))})(e.title),className:"map-filter-tags__item",children:(0,o.jsx)("div",{style:j.includes(e.title)?{backgroundColor:"var(--purple)",color:"var(--bgWhite)"}:{},className:"map-filter-tags__item-cnt",children:e.title})},e.id)))})})]})]})})},oe=t(93543),ne=t(4358);var ce=function(e){const{getValueCenter:i}=(0,l.v9)((e=>e.ORGS_MAP)),t=(0,l.I0)(),{handleBackCurrentUser:s,setMapStyle:r}=e,[n,_]=(0,a.useState)(i);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(oe.Z,{open:n,anchorOrigin:{vertical:"top",horizontal:"center"},autoHideDuration:1400,onClose:()=>_(!1),children:(0,o.jsxs)(ne.Z,{severity:"success",sx:{width:"100%"},children:[!i&&"T\u1eaft"," c\u1eadp nh\u1eadt khi di chuy\u1ec3n b\u1ea3n \u0111\u1ed3"]})}),(0,o.jsxs)("div",{className:"map-current-user",children:[(0,o.jsx)("button",{className:"flex-row map-current-user__btn",children:(0,o.jsx)(ie,{size:"small",onChange:e=>{t((0,d._E)(e.target.checked)),_(!0)},checked:i})}),(0,o.jsx)("button",{onClick:async()=>{s()},className:"map-current-user__btn",children:(0,o.jsx)("img",{src:c.Z.pinMapRedGoogle,alt:""})})]}),(0,o.jsx)("div",{className:y.map_style_ctrl,children:(0,o.jsxs)("ul",{className:y.map_style_list,children:[(0,o.jsx)("li",{onClick:()=>r&&r("mapbox://styles/mapbox/streets-v12"),className:y.style_item,children:(0,o.jsx)("img",{src:c.Z.street,alt:""})}),(0,o.jsx)("li",{onClick:()=>r&&r("mapbox://styles/mapbox/satellite-streets-v12"),className:y.style_item,children:(0,o.jsx)("img",{src:c.Z.stateLlite,alt:""})})]})})]})},de=t(89681);t(43161);var _e=e=>{var i,t,r,n;const _=(0,b.oG)(),[h,v]=(0,a.useState)("mapbox://styles/mapbox/streets-v12"),{orgs:x,isDetail:j}=e,N=(0,a.useRef)(null),{orgCenter:k,getValueCenter:w,tags:y}=(0,l.v9)((e=>e.ORGS_MAP)),Z=(0,s.TH)(),C=(0,f.x)(),R=(0,l.v9)((e=>e.ORG.org)),M=(0,l.I0)(),$=(0,a.useRef)(),[T,O]=(0,a.useState)({open:!1,check:!1}),[z]=(0,a.useState)({lat:j?null===(i=x[0])||void 0===i?void 0:i.latitude:C?parseFloat(null===C||void 0===C?void 0:C.split(",")[0]):null===(t=x[0])||void 0===t?void 0:t.latitude,long:j?null===(r=x[0])||void 0===r?void 0:r.longitude:C?parseFloat(null===C||void 0===C?void 0:C.split(",")[1]):null===(n=x[0])||void 0===n?void 0:n.longitude}),P=(0,a.useRef)(),[B,E]=(0,a.useState)(!0),{totalItem:F,page:L}=(0,l.v9)((e=>e.ORGS_MAP.orgsMap)),A=()=>{"/ban-do"===Z.pathname&&F>=15&&x.length<F&&M((0,d.ty)({page:L+1,sort:"distance",path_url:Z.pathname,mountNth:2,tags:y.join("|")}))},H=(e,i)=>{var t;e&&i&&(null===N||void 0===N||null===(t=N.current)||void 0===t||t.flyTo({center:[i,e]}))},U=e=>{var i;null===$||void 0===$||null===(i=$.current)||void 0===i||i.slickGoTo(e)},W={dots:!1,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,centerPadding:"30px",className:"center",centerMode:!0,afterChange:function(e){var i,t;e===x.length-3&&A(),(null===N||void 0===N?void 0:N.current.getZoom())<15&&(null===N||void 0===N||N.current.setZoom(15)),H(null===(i=x[e])||void 0===i?void 0:i.latitude,null===(t=x[e])||void 0===t?void 0:t.longitude)}},J=(e,i)=>{(null===N||void 0===N?void 0:N.current.getZoom())<15&&(null===N||void 0===N||N.current.setZoom(15)),M((0,G.Gv)(e.subdomain)),M((0,d.Z9)(e)),_&&i&&U&&U(i),O({...T,open:!0,check:!0}),((e,i)=>{var t;e&&i&&(null===N||void 0===N||null===(t=N.current)||void 0===t||t.panTo([i,e]))})(e.latitude,e.longitude)},V=()=>{C&&(M((0,d.P)()),M((0,d.ty)({page:1,sort:"distance",mountNth:2})),H(parseFloat(null===C||void 0===C?void 0:C.split(",")[0]),parseFloat(null===C||void 0===C?void 0:C.split(",")[1])))},Q=(0,a.useCallback)((0,I.debounce)(((e,i,t)=>{105===i&&M((0,d.P)()),M((0,d.ty)({page:1,LatLng:e,mountNth:2,tags:t.join("|")}))}),500),[]),X=()=>{var e,i,t,a;const l=null===N||void 0===N||null===(e=N.current)||void 0===e||null===(i=e.getCenter())||void 0===i?void 0:i.lat,s=null===N||void 0===N||null===(t=N.current)||void 0===t||null===(a=t.getCenter())||void 0===a?void 0:a.lng;w&&Q(`${l},${s}`,x.length,y)};return(0,o.jsxs)("div",{className:"map-content",children:[(0,o.jsx)(re,{slideRef:$,mapRef:N,onFlyTo:H,openDetail:T,setOpenDetail:O}),(0,o.jsx)(ce,{handleBackCurrentUser:V,setMapStyle:v}),(0,o.jsxs)(de.ZP,{onMouseMove:X,onTouchMove:X,style:{width:"100vw",height:"100vh"},initialViewState:{latitude:z.lat,longitude:z.long,zoom:16},attributionControl:!0,mapboxAccessToken:"pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsNnJmajVuZDBrNzEzY3BpNnB6dHpwMHAifQ.JsWqTj6D7GLSDGgNfnclXw",mapStyle:h,ref:N,children:[(0,o.jsx)(de.Pv,{position:"bottom-right",showZoom:!0,showCompass:!0}),(0,o.jsx)(de.$j,{position:"bottom-right",onGeolocate:e=>{V()}}),C&&(0,o.jsx)(de.Jx,{latitude:parseFloat(null===C||void 0===C?void 0:C.split(",")[0]),longitude:parseFloat(null===C||void 0===C?void 0:C.split(",")[1]),children:(0,o.jsx)("img",{onError:e=>(0,p.bW)(e),style:{width:"42px"},src:c.Z.pinMapRedGoogle,alt:""})}),x.map(((e,i)=>(0,o.jsx)(de.Jx,{onClick:()=>J(e,i),latitude:e.latitude,longitude:e.longitude,children:(0,o.jsx)("div",{style:e.id===(null===k||void 0===k?void 0:k.id)?{transform:"scale(1.2)"}:{},className:"map-marker-org",children:(0,o.jsx)("img",{src:e.image_url,alt:"",className:"map-marker-org__img",onError:e=>(0,p.bW)(e)})})},i))),(0,o.jsx)(me,{})]}),(0,o.jsx)("div",{className:!0===B?"dialog-map__wrapper list-org__active ":"dialog-map__wrapper",ref:P,children:(0,o.jsxs)("div",{className:"dialog-wrap__list",children:[(0,o.jsx)("div",{id:"scrollableDiv",className:"dialog-map__list",children:(0,o.jsx)(g.Z,{hasMore:!0,loader:(0,o.jsx)(o.Fragment,{}),next:A,dataLength:x.length,scrollableTarget:"scrollableDiv",children:null===x||void 0===x?void 0:x.map(((e,i)=>(0,o.jsx)(m,{onMarkerClick:J,item:e},i)))})}),!0===T.open&&R?(0,o.jsx)(S,{org:R,setOpenDetail:O,openDetail:T}):null,(0,o.jsx)("div",{onClick:()=>{P.current.classList.toggle("list-org__active"),E(!B),!1===B&&!1===T.open&&!0===T.check?O({...T,open:!0}):O({...T,open:!1}),!1===B&&!0===T.open&&!0===T.check&&O({...T,open:!0})},className:"open-list__org close",children:(0,o.jsx)("img",{src:!0===B?c.Z.arrownLeftWhite:c.Z.arrownRightWhite,alt:""})})]})}),_&&(0,o.jsx)("div",{className:j?"map-list__mobile map":"map-list__mobile",style:j?{position:"fixed",width:"auto",height:"auto",left:0,right:0}:{},children:(0,o.jsx)(u.Z,{ref:$,...W,children:x.length>0&&x.map(((e,i)=>(0,o.jsx)(D,{item:e},i)))})})]})};const me=()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(de.Jx,{latitude:16.534439,longitude:111.610783,children:(0,o.jsx)("span",{className:y.island_marker,children:"Qu\u1ea7n \u0111\u1ea3o Ho\xe0ng Sa"})}),(0,o.jsx)(de.Jx,{latitude:10.342131,longitude:114.700143,children:(0,o.jsx)("span",{className:y.island_marker,children:"Qu\u1ea7n \u0111\u1ea3o Tr\u01b0\u1eddng Sa"})})]});var ge=function(){const e=(0,l.I0)(),{orgs:i,status:t,mountNth:r}=(0,l.v9)((e=>e.ORGS_MAP.orgsMap)),_=(0,s.TH)(),m=(0,s.k6)();return(0,a.useEffect)((()=>{t!==se.Q.SUCCESS&&e((0,d.ty)({page:1,sort:"distance",path_url:_.pathname,mountNth:2}))}),[]),(0,o.jsxs)("div",{className:"map",children:[(0,o.jsx)("div",{onClick:()=>{m.push("/")},className:"dialog-map__close",children:(0,o.jsx)("div",{className:"dialog-map__close-img",children:(0,o.jsx)("img",{src:c.Z.closeCircleWhite,alt:""})})}),2===r?(0,o.jsx)(_e,{orgs:i}):(0,o.jsx)(n,{})]})}},43161:function(){}}]);
//# sourceMappingURL=610.af71d530.chunk.js.map