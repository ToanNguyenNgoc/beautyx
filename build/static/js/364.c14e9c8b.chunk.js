"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[364],{55364:function(e,i,l){l.r(i),l.d(i,{default:function(){return U}});var a=l(15917),s=l(86599),t=l(71544),n=l(88886),r=(l(11738),l(97449),l(90393));const o=()=>(0,r.jsx)("div",{className:"load-org-cnt",children:(0,r.jsx)("div",{className:"load-org-cnt__left",children:(0,r.jsx)("ul",{className:"list",children:[1,2,3,4,5,6,7,8,9,10].map((e=>(0,r.jsx)("li",{className:"list-item",children:(0,r.jsxs)("div",{className:"flex-row-sp list-item__cnt",children:[(0,r.jsx)("div",{className:"list-item__cnt-img",children:(0,r.jsx)(n.A,{width:"100%",height:"100%"})}),(0,r.jsxs)("div",{className:"list-item__cnt-de",children:[(0,r.jsx)("span",{children:(0,r.jsx)(n.A,{width:"100%",height:"100%"})}),(0,r.jsx)("span",{children:(0,r.jsx)(n.A,{width:"100%",height:"100%"})}),(0,r.jsx)("span",{children:(0,r.jsx)(n.A,{width:"100%",height:"100%"})})]})]})},e)))})})});var d=l(51302),c=l(23264),_=l(1686);function m(e){const{item:i,onMarkerClick:l}=e,a=(0,s.wA)();return(0,r.jsxs)("div",{id:`${i.id}`,onMouseEnter:()=>{a((0,c.tH)(i))},onClick:()=>{l(i)},className:"dialog-map__item",children:[(0,r.jsx)("div",{className:"map-item__img",children:(0,r.jsx)("img",{onError:e=>(0,_.Ay)(e),src:null!==i&&void 0!==i&&i.image_url?null===i||void 0===i?void 0:i.image_url:null===i||void 0===i?void 0:i.image,alt:""})}),(0,r.jsxs)("div",{className:"map-item__content",children:[(0,r.jsx)("div",{className:"map-item__name",children:(0,r.jsx)("p",{children:null===i||void 0===i?void 0:i.name})}),(0,r.jsx)("div",{className:"map-item__address",children:(0,r.jsx)("p",{children:null===i||void 0===i?void 0:i.full_address})}),(0,r.jsxs)("div",{className:"map-item__evaluate",children:[(0,r.jsxs)("div",{className:"evaluate-item",children:[(0,r.jsx)("img",{src:d.A.star,alt:""}),(0,r.jsx)("p",{children:"5"})]}),(0,r.jsxs)("div",{className:"evaluate-item",children:[(0,r.jsx)("img",{src:d.A.cartCheckPurple,alt:""}),(0,r.jsx)("p",{children:"10"})]})]})]})]})}var g=l(94927),u=l(72700),p=l(12013),v=l(8263),h=l(68821),x=l(52301),j=l(57552),N=l(14998),f=l(85214),b=l(72508),k=l(16459),w=l(47533),y={org_detail_cnt:"map_org_detail_cnt__x2pEI",org_detail_head:"map_org_detail_head__0xEWe",org_detail_head_btn:"map_org_detail_head_btn__SgFMr",org_detail:"map_org_detail__BRJVg",org_detail_banners:"map_org_detail_banners__F7Vhx",org_banner_linear:"map_org_banner_linear__m2-Bs",org_banner_img:"map_org_banner_img__7QWjH",org_banner_count:"map_org_banner_count__quYof",org_detail_card:"map_org_detail_card__j9xpp",org_detail_avatar:"map_org_detail_avatar__fWp64",org_detail_info:"map_org_detail_info__ezrj4",org_name:"map_org_name__yFe5r",org_address:"map_org_address__JTt49",org_exc:"map_org_exc__mwdoz",org_exc_left:"map_org_exc_left__IJnNK",org_exc_item:"map_org_exc_item__XfjT9",org_exc_left_btn:"map_org_exc_left_btn__Hw0-t",org_exc_right:"map_org_exc_right__2r1Yr",org_section_title:"map_org_section_title__k4T7c",org_time_word_head_icon:"map_org_time_word_head_icon__irUSS",time_icon_ch:"map_time_icon_ch__3kEKA",org_time_word_head:"map_org_time_word_head__RXbvp",org_time_word:"map_org_time_word__BE5i5",org_time_word_body:"map_org_time_word_body__F2XmT",org_time_word_body_act:"map_org_time_word_body_act__iOlz9",org_list_time_item:"map_org_list_time_item__eHmax",time_day:"map_time_day__tyMkV",time_word:"map_time_word__MNGnC",org_galleries:"map_org_galleries__IebtR",org_galleries_list:"map_org_galleries_list__01ET4",org_gallery_item:"map_org_gallery_item__Z1UBj",org_gallery_item_img:"map_org_gallery_item_img__gw+vn",org_special_par:"map_org_special_par__4dlLs",org_special_list:"map_org_special_list__a78kd",org_special_item:"map_org_special_item__A8eis",island_marker:"map_island_marker__lIjvk",map_style_ctrl:"map_map_style_ctrl__USgQQ",style_item:"map_style_item__RdXD+"},A=l(54074);function C(e){var i,l,s,n;const{org:o,setOpenDetail:c,openDetail:_}=e,m=(0,f.c9)(),g=(0,t.W6)(),{t:u}=(0,a.useContext)(x.B),v=(0,a.useRef)(null),h=(0,a.useRef)(null),C=(0,a.useRef)(null),M=(0,b.Z)(),D=(0,f.YJ)({API_URL:N.A.ORG(null===o||void 0===o?void 0:o.id),enable:o,params:{"filter[location]":M}}).response,T=(null!==(i=(0,f.wX)({enable:null===o||void 0===o?void 0:o.id,API_URL:N.A.GALLERIES_ORG_ID(null===o||void 0===o?void 0:o.id),params:j.tB}).resData)&&void 0!==i?i:[]).map((e=>{var i;const l=null===e||void 0===e||null===(i=e.images)||void 0===i?void 0:i.map((e=>e.image_url));return[e.image_url].concat(l)})).flat().filter(Boolean),{favoriteSt:G,onToggleFavorite:H}=(0,f.Af)({org_id:o.id,type:"ORG",count:null===D||void 0===D?void 0:D.favorites_count,favorite:null===D||void 0===D?void 0:D.is_favorite}),I=(0,A.HB)(o.opening_time);return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:y.org_detail_cnt,children:[(0,r.jsx)("div",{className:y.org_detail_head,children:(0,r.jsx)(k.b2,{onClick:()=>{if(!m)return c({..._,open:!1});c(!1)},className:y.org_detail_head_btn,icon:d.A.closeBlack,iconSize:20})}),(0,r.jsxs)("div",{className:y.org_detail,children:[(0,r.jsxs)("div",{ref:v,className:y.org_detail_banners,children:[(0,r.jsx)("div",{className:y.org_banner_linear}),(0,r.jsx)("img",{className:y.org_banner_img,src:null!==(l=null!==(s=T[0])&&void 0!==s?s:null===o||void 0===o?void 0:o.image_url)&&void 0!==l?l:p.Ay.imgDefault,alt:""}),(null===T||void 0===T?void 0:T.length)>0&&(0,r.jsxs)("div",{className:y.org_banner_count,children:[null===T||void 0===T?void 0:T.length," ",u("Mer_de.galleries")]})]}),(0,r.jsxs)("div",{className:y.org_detail_card,children:[(0,r.jsx)("div",{className:y.org_detail_avatar,children:(0,r.jsx)("img",{src:null!==(n=null===o||void 0===o?void 0:o.image_url)&&void 0!==n?n:p.Ay.imgDefault,alt:""})}),(0,r.jsxs)("div",{className:y.org_detail_info,children:[(0,r.jsx)("p",{className:y.org_name,children:o.name}),(0,r.jsx)("p",{className:y.org_address,children:o.full_address}),(0,r.jsxs)("div",{className:y.org_exc,children:[(0,r.jsxs)("div",{className:y.org_exc_left,children:[(0,r.jsx)(k.b2,{onClick:()=>{m?g.push((0,w.p7)(o.subdomain)):window.open((0,w.p7)(o.subdomain),"_blank","noopener,noreferrer")},className:y.org_exc_left_btn,title:u("app.details")}),(0,r.jsxs)("div",{className:y.org_exc_item,children:[(0,r.jsx)("img",{src:d.A.heartBoldRed,alt:""}),(0,r.jsx)("span",{children:G.favorite_count})]})]}),(0,r.jsx)(k.b2,{onClick:H,className:y.org_exc_right,icon:null!==G&&void 0!==G&&G.is_favorite?d.A.heart:d.A.unHeart,iconSize:16})]})]})]}),(0,r.jsxs)("div",{className:y.org_time_word,children:[(0,r.jsxs)("div",{onClick:()=>{var e,i;null===(e=h.current)||void 0===e||e.classList.toggle(y.org_time_word_body_act),null===(i=C.current)||void 0===i||i.classList.toggle(y.time_icon_ch)},className:y.org_time_word_head,children:[(0,r.jsx)("p",{className:y.org_section_title,children:u("pr.open_time")}),(0,r.jsx)("img",{ref:C,src:d.A.chevronRightBlack,className:y.org_time_word_head_icon,alt:""})]}),(0,r.jsx)("div",{ref:h,className:y.org_time_word_body,children:(0,r.jsx)("ul",{className:y.org_list_time,children:I.map(((e,i)=>(0,r.jsxs)("li",{style:e.todayAct?{color:"var(--green)"}:{},className:y.org_list_time_item,children:[(0,r.jsx)("span",{className:y.time_day,children:e.day_week}),"on"===e.status?(0,r.jsxs)("div",{className:y.time_word,children:[u("se.from")," ",(0,r.jsx)("h4",{style:{marginRight:"16px"},children:e.from_time_opening})," ",u("se.to")," ",(0,r.jsx)("h4",{children:e.to_time_opening})]}):(0,r.jsx)("div",{className:y.time_word,children:"----"})]},i)))})}),(null===T||void 0===T?void 0:T.length)>0&&(0,r.jsx)(S,{images_url:T}),(0,r.jsx)(R,{org:o})]})]})]})})}const S=e=>{let{images_url:i}=e;const{t:l}=(0,a.useContext)(x.B);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:y.org_section_title,children:l("Mer_de.galleries")}),(0,r.jsx)("div",{className:y.org_galleries,children:(0,r.jsx)("ul",{className:y.org_galleries_list,children:i.map((e=>(0,r.jsx)("li",{className:y.org_gallery_item,children:(0,r.jsx)(M,{image_url:e})},e)))})})]})},M=e=>{let{image_url:i}=e;const[l,s]=(0,a.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("img",{onClick:()=>s(!0),src:i,className:y.org_gallery_item_img,alt:""}),(0,r.jsx)(k.zl,{open:l,setOpen:s,src:[i]})]})},R=e=>{let{org:i}=e;const{t:l}=(0,a.useContext)(x.B),{services_special:s}=(0,A.Jx)(i),{products_special:t}=(0,A.rS)(i);return(0,r.jsxs)(r.Fragment,{children:[(null===s||void 0===s?void 0:s.length)>0&&(0,r.jsxs)("div",{className:y.org_special_cnt,children:[(0,r.jsx)("p",{className:y.org_section_title,children:l("Mer_de.services")}),(0,r.jsx)("div",{className:y.org_special_par,children:(0,r.jsx)("ul",{className:y.org_special_list,children:null===s||void 0===s?void 0:s.map(((e,l)=>(0,r.jsx)("li",{className:y.org_special_item,children:(0,r.jsx)(k.zc,{item:e,org:i,type:"SERVICE"})},l)))})})]}),(null===t||void 0===t?void 0:t.length)>0&&(0,r.jsxs)("div",{className:y.org_special_cnt,children:[(0,r.jsx)("p",{className:y.org_section_title,children:l("Mer_de.products")}),(0,r.jsx)("div",{className:y.org_special_par,children:(0,r.jsx)("ul",{className:y.org_special_list,children:null===t||void 0===t?void 0:t.map(((e,l)=>(0,r.jsx)("li",{className:y.org_special_item,children:(0,r.jsx)(k.zc,{item:e,org:i,type:"PRODUCT"})},l)))})})]})]})};var D=function(e){const{open:i,setOpen:l,org:a,handleDirection:s}=e;return(0,r.jsx)(h.Ay,{open:i,onClose:()=>l(!1),anchor:"bottom",children:(0,r.jsx)("div",{className:"map map-org-de-mb-wrap",children:(0,r.jsx)(C,{org:a,openDetail:i,setOpenDetail:l,handleDirection:s})})})};function T(e){var i;const{item:l,handleDirection:s}=e,[t,n]=(0,a.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(D,{open:t,setOpen:n,org:l,handleDirection:s}),(0,r.jsx)("div",{onClick:()=>{n(!0)},className:"map-item__wrap",children:(0,r.jsxs)("div",{className:"map-item__mobile",children:[(0,r.jsx)("div",{className:"item-img",children:(0,r.jsx)("img",{onError:e=>(0,v.pG)(e),src:null!==l&&void 0!==l&&l.image_url?null===l||void 0===l?void 0:l.image_url:p.Ay.beautyX,alt:""})}),(0,r.jsxs)("div",{className:"item-content",children:[(0,r.jsx)("div",{className:"item-content__name",children:(0,r.jsx)("p",{children:null===l||void 0===l?void 0:l.name})}),(0,r.jsx)("div",{className:"item-content__address",children:(0,r.jsx)("p",{children:null===l||void 0===l?void 0:l.full_address})}),(0,r.jsxs)("div",{className:"item-content__evaluate",children:[(0,r.jsxs)("div",{className:"evaluate-item",children:[(0,r.jsx)("div",{className:"evaluate-item__img",children:(0,r.jsx)("img",{src:d.A.star,alt:""})}),(0,r.jsx)("p",{children:"5"})]}),(0,r.jsxs)("div",{className:"evaluate-item",children:[(0,r.jsx)("div",{className:"evaluate-item__img",children:(0,r.jsx)("img",{src:d.A.heart,alt:""})}),(0,r.jsx)("p",{children:null===l||void 0===l||null===(i=l.favorites)||void 0===i?void 0:i.length})]})]})]})]})})]})}var G=l(80076),H=l(75646),I=l(43697),B=l(73988),O=l(73148),F=l(47850);var L=function(){return(0,r.jsx)("div",{className:"loading-cnt",children:(0,r.jsx)(F.A,{})})},E=l(35909);var z=e=>{const{mapRef:i,onFlyTo:l,setOpenDetail:t,openDetail:n,slideRef:o}=e,{t:_}=(0,a.useContext)(x.B),m=[{id:4,title:"Spa",text:"Spa",img:p.u.spa},{id:3,title:"Salon",text:"Salon",img:""},{id:1,title:"Nail",text:"Nail",img:p.u.nails},{id:6,title:"clinic",text:"clinic",img:p.u.clinic},{id:8,title:"Massage",text:"Massage",img:p.u.massage},{id:5,title:"Th\u1ea9m m\u1ef9 vi\u1ec7n",text:_("home_2.beauty_salon"),img:p.u.skinCare},{id:2,title:"nha khoa",text:_("home_2.dentistry"),img:p.u.nhaKhoa}],g=(0,s.wA)(),[u,v]=(0,a.useState)([]),{getValueCenter:h,tags:j,orgsMap:N}=(0,s.d4)((e=>e.ORGS_MAP)),f=(0,a.useCallback)((0,H.debounce)((e=>{(async e=>{try{const i=await G.A.getAll({page:1,limit:5,keyword:e,sort:"distance"});v(i.data.context.data)}catch(i){}})(e)}),1e3),[]),[b,k]=(0,a.useState)([]),[w,y]=(0,a.useState)("");return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" map-filter-cnt",children:[(0,r.jsxs)("div",{className:"map-filter-cnt__left",children:[(0,r.jsxs)("div",{className:"map-filter-cnt__input",children:[(0,r.jsx)("input",{type:"text",placeholder:"T\xecm ki\u1ebfm tr\xean b\u1ea3n \u0111\u1ed3",value:w,onChange:async e=>{var i;const l=e.target.value;y(l);const a=`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsNnJmajVuZDBrNzEzY3BpNnB6dHpwMHAifQ.JsWqTj6D7GLSDGgNfnclXw&country=vn`,s=await O.A.get(a);k(null===s||void 0===s||null===(i=s.data)||void 0===i?void 0:i.features),f(l)}}),(0,r.jsx)("div",{className:"map-filter-cnt__input-btn",children:N.status===E.X.LOADING?(0,r.jsx)(L,{}):(0,r.jsx)("button",{onClick:()=>y(""),children:(0,r.jsx)("img",{src:d.A.closeBlack,alt:""})})})]}),(0,r.jsx)("div",{className:"map-filter-cnt__drop",children:(0,r.jsxs)("ul",{className:"map-filter-list-org",children:[(null===w||void 0===w?void 0:w.length)>0&&(null===b||void 0===b?void 0:b.length)>0&&(null===b||void 0===b?void 0:b.map(((e,a)=>(0,r.jsx)("li",{onClick:()=>(e=>{y(e.place_name),k([]),t({...n,open:!1,check:!1}),v([]),(null===i||void 0===i?void 0:i.current.getZoom())<15&&(null===i||void 0===i||i.current.setZoom(13));const a=e.center.reverse().join(",");l(e.center[0],e.center[1]),g((0,c.IV)()),g((0,c.MH)({page:1,LatLng:a,mountNth:2,tags:j.join("|")})),setTimeout((()=>{var e;null===o||void 0===o||null===(e=o.current)||void 0===e||e.slickGoTo(0)}),500)})(e),className:"map-list-org__item",children:e.place_name},a)))),(null===u||void 0===u?void 0:u.length)>0&&(null===w||void 0===w?void 0:w.length)>0&&(null===u||void 0===u?void 0:u.map(((e,a)=>(0,r.jsx)("li",{onClick:()=>{return l((a=e).latitude,a.longitude),(null===i||void 0===i?void 0:i.current.getZoom())<15&&(null===i||void 0===i||i.current.setZoom(13)),g((0,c.IV)()),g((0,c.MH)({page:1,LatLng:`${a.latitude},${a.longitude}`,mountNth:2,tags:j.join("|")})),t({...n,open:!0,check:!0}),v([]),k([]),g((0,c.tH)(a)),g((0,I.bp)(a.subdomain)),void setTimeout((()=>{var e;null===o||void 0===o||null===(e=o.current)||void 0===e||e.slickGoTo(0)}),500);var a},className:"map-list-org__item",children:e.name},a))))]})})]}),(0,r.jsxs)("div",{className:"flex-row-sp map-filter-cnt__right",children:[(0,r.jsxs)("div",{className:"flex-row map-filter-cnt__right-switch",children:[(0,r.jsx)(B.A,{onChange:e=>{g((0,c.YN)(e.target.checked))},checked:h,size:"small"}),"C\u1eadp nh\u1eadt khi di chuy\u1ec3n b\u1ea3n \u0111\u1ed3"]}),(0,r.jsx)("div",{className:"map-filter-cnt__right-tag",children:(0,r.jsx)("ul",{className:"flex-row map-filter-tags",children:m.map((e=>(0,r.jsx)("li",{onClick:()=>(async e=>{var l,a,s,t;const n=null===i||void 0===i||null===(l=i.current)||void 0===l||null===(a=l.getCenter())||void 0===a?void 0:a.lat,r=null===i||void 0===i||null===(s=i.current)||void 0===s||null===(t=s.getCenter())||void 0===t?void 0:t.lng;var d;g((0,c.T2)(e)),g((0,c.IV)()),"fulfilled"===(await g((0,c.MH)({page:1,mountNth:2,tags:j.includes(e)?j.filter((i=>i!==e)).join("|"):[...j,e].join("|"),LatLng:`${n},${r}`}))).meta.requestStatus&&(null===o||void 0===o||null===(d=o.current)||void 0===d||d.slickGoTo(0))})(e.title),className:"map-filter-tags__item",children:(0,r.jsx)("div",{style:j.includes(e.title)?{backgroundColor:"var(--purple)",color:"var(--bgWhite)"}:{},className:"map-filter-tags__item-cnt",children:e.title})},e.id)))})})]})]})})},V=l(42876),Z=l(42069);var J=function(e){const{getValueCenter:i}=(0,s.d4)((e=>e.ORGS_MAP)),l=(0,s.wA)(),{handleBackCurrentUser:t,setMapStyle:n}=e,[o,_]=(0,a.useState)(i);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(V.A,{open:o,anchorOrigin:{vertical:"top",horizontal:"center"},autoHideDuration:1400,onClose:()=>_(!1),children:(0,r.jsxs)(Z.A,{severity:"success",sx:{width:"100%"},children:[!i&&"T\u1eaft"," c\u1eadp nh\u1eadt khi di chuy\u1ec3n b\u1ea3n \u0111\u1ed3"]})}),(0,r.jsxs)("div",{className:"map-current-user",children:[(0,r.jsx)("button",{className:"flex-row map-current-user__btn",children:(0,r.jsx)(B.A,{size:"small",onChange:e=>{l((0,c.YN)(e.target.checked)),_(!0)},checked:i})}),(0,r.jsx)("button",{onClick:async()=>{t()},className:"map-current-user__btn",children:(0,r.jsx)("img",{src:d.A.pinMapRedGoogle,alt:""})})]}),(0,r.jsx)("div",{className:y.map_style_ctrl,children:(0,r.jsxs)("ul",{className:y.map_style_list,children:[(0,r.jsx)("li",{onClick:()=>n&&n("mapbox://styles/mapbox/streets-v12"),className:y.style_item,children:(0,r.jsx)("img",{src:d.A.street,alt:""})}),(0,r.jsx)("li",{onClick:()=>n&&n("mapbox://styles/mapbox/satellite-streets-v12"),className:y.style_item,children:(0,r.jsx)("img",{src:d.A.stateLlite,alt:""})})]})})]})},W=l(74012);l(64887);var P=e=>{var i,l,n,o;const _=(0,f.c9)(),[p,h]=(0,a.useState)("mapbox://styles/mapbox/streets-v12"),{orgs:x,isDetail:j}=e,N=(0,a.useRef)(null),{orgCenter:k,getValueCenter:w,tags:y}=(0,s.d4)((e=>e.ORGS_MAP)),A=(0,t.zy)(),S=(0,b.Z)(),M=(0,s.d4)((e=>e.ORG.org)),R=(0,s.wA)(),D=(0,a.useRef)(),[G,B]=(0,a.useState)({open:!1,check:!1}),[O]=(0,a.useState)({lat:j?null===(i=x[0])||void 0===i?void 0:i.latitude:S?parseFloat(null===S||void 0===S?void 0:S.split(",")[0]):null===(l=x[0])||void 0===l?void 0:l.latitude,long:j?null===(n=x[0])||void 0===n?void 0:n.longitude:S?parseFloat(null===S||void 0===S?void 0:S.split(",")[1]):null===(o=x[0])||void 0===o?void 0:o.longitude}),F=(0,a.useRef)(),[L,E]=(0,a.useState)(!0),{totalItem:V,page:Z}=(0,s.d4)((e=>e.ORGS_MAP.orgsMap)),P=()=>{"/ban-do"===A.pathname&&V>=15&&x.length<V&&R((0,c.MH)({page:Z+1,sort:"distance",path_url:A.pathname,mountNth:2,tags:y.join("|")}))},U=(e,i)=>{var l;e&&i&&(null===N||void 0===N||null===(l=N.current)||void 0===l||l.flyTo({center:[i,e]}))},Y=e=>{var i;null===D||void 0===D||null===(i=D.current)||void 0===i||i.slickGoTo(e)},$={dots:!1,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,centerPadding:"30px",className:"center",centerMode:!0,afterChange:function(e){var i,l;e===x.length-3&&P(),(null===N||void 0===N?void 0:N.current.getZoom())<15&&(null===N||void 0===N||N.current.setZoom(15)),U(null===(i=x[e])||void 0===i?void 0:i.latitude,null===(l=x[e])||void 0===l?void 0:l.longitude)}},Q=(e,i)=>{(null===N||void 0===N?void 0:N.current.getZoom())<15&&(null===N||void 0===N||N.current.setZoom(15)),R((0,I.bp)(e.subdomain)),R((0,c.tH)(e)),_&&i&&Y&&Y(i),B({...G,open:!0,check:!0}),((e,i)=>{var l;e&&i&&(null===N||void 0===N||null===(l=N.current)||void 0===l||l.panTo([i,e]))})(e.latitude,e.longitude)},q=()=>{S&&(R((0,c.IV)()),R((0,c.MH)({page:1,sort:"distance",mountNth:2})),U(parseFloat(null===S||void 0===S?void 0:S.split(",")[0]),parseFloat(null===S||void 0===S?void 0:S.split(",")[1])))},K=(0,a.useCallback)((0,H.debounce)(((e,i,l)=>{105===i&&R((0,c.IV)()),R((0,c.MH)({page:1,LatLng:e,mountNth:2,tags:l.join("|")}))}),500),[]),ee=()=>{var e,i,l,a;const s=null===N||void 0===N||null===(e=N.current)||void 0===e||null===(i=e.getCenter())||void 0===i?void 0:i.lat,t=null===N||void 0===N||null===(l=N.current)||void 0===l||null===(a=l.getCenter())||void 0===a?void 0:a.lng;w&&K(`${s},${t}`,x.length,y)};return(0,r.jsxs)("div",{className:"map-content",children:[(0,r.jsx)(z,{slideRef:D,mapRef:N,onFlyTo:U,openDetail:G,setOpenDetail:B}),(0,r.jsx)(J,{handleBackCurrentUser:q,setMapStyle:h}),(0,r.jsxs)(W.Ay,{onMouseMove:ee,onTouchMove:ee,style:{width:"100vw",height:"100vh"},initialViewState:{latitude:O.lat,longitude:O.long,zoom:16},attributionControl:!0,mapboxAccessToken:"pk.eyJ1IjoidG9hbjA2MDExOTk4IiwiYSI6ImNsNnJmajVuZDBrNzEzY3BpNnB6dHpwMHAifQ.JsWqTj6D7GLSDGgNfnclXw",mapStyle:p,ref:N,children:[(0,r.jsx)(W.ov,{position:"bottom-right",showZoom:!0,showCompass:!0}),(0,r.jsx)(W.tG,{position:"bottom-right",onGeolocate:e=>{q()}}),S&&(0,r.jsx)(W.pH,{latitude:parseFloat(null===S||void 0===S?void 0:S.split(",")[0]),longitude:parseFloat(null===S||void 0===S?void 0:S.split(",")[1]),children:(0,r.jsx)("img",{onError:e=>(0,v.pG)(e),style:{width:"42px"},src:d.A.pinMapRedGoogle,alt:""})}),x.map(((e,i)=>(0,r.jsx)(W.pH,{onClick:()=>Q(e,i),latitude:e.latitude,longitude:e.longitude,children:(0,r.jsx)("div",{style:e.id===(null===k||void 0===k?void 0:k.id)?{transform:"scale(1.2)"}:{},className:"map-marker-org",children:(0,r.jsx)("img",{src:e.image_url,alt:"",className:"map-marker-org__img",onError:e=>(0,v.pG)(e)})})},i))),(0,r.jsx)(X,{})]}),(0,r.jsx)("div",{className:!0===L?"dialog-map__wrapper list-org__active ":"dialog-map__wrapper",ref:F,children:(0,r.jsxs)("div",{className:"dialog-wrap__list",children:[(0,r.jsx)("div",{id:"scrollableDiv",className:"dialog-map__list",children:(0,r.jsx)(g.A,{hasMore:!0,loader:(0,r.jsx)(r.Fragment,{}),next:P,dataLength:x.length,scrollableTarget:"scrollableDiv",children:null===x||void 0===x?void 0:x.map(((e,i)=>(0,r.jsx)(m,{onMarkerClick:Q,item:e},i)))})}),!0===G.open&&M?(0,r.jsx)(C,{org:M,setOpenDetail:B,openDetail:G}):null,(0,r.jsx)("div",{onClick:()=>{F.current.classList.toggle("list-org__active"),E(!L),!1===L&&!1===G.open&&!0===G.check?B({...G,open:!0}):B({...G,open:!1}),!1===L&&!0===G.open&&!0===G.check&&B({...G,open:!0})},className:"open-list__org close",children:(0,r.jsx)("img",{src:!0===L?d.A.arrownLeftWhite:d.A.arrownRightWhite,alt:""})})]})}),_&&(0,r.jsx)("div",{className:j?"map-list__mobile map":"map-list__mobile",style:j?{position:"fixed",width:"auto",height:"auto",left:0,right:0}:{},children:(0,r.jsx)(u.A,{ref:D,...$,children:x.length>0&&x.map(((e,i)=>(0,r.jsx)(T,{item:e},i)))})})]})};const X=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W.pH,{latitude:16.534439,longitude:111.610783,children:(0,r.jsx)("span",{className:y.island_marker,children:"Qu\u1ea7n \u0111\u1ea3o Ho\xe0ng Sa"})}),(0,r.jsx)(W.pH,{latitude:10.342131,longitude:114.700143,children:(0,r.jsx)("span",{className:y.island_marker,children:"Qu\u1ea7n \u0111\u1ea3o Tr\u01b0\u1eddng Sa"})})]});var U=function(){const e=(0,s.wA)(),{orgs:i,status:l,mountNth:n}=(0,s.d4)((e=>e.ORGS_MAP.orgsMap)),_=(0,t.zy)(),m=(0,t.W6)();return(0,a.useEffect)((()=>{l!==E.X.SUCCESS&&e((0,c.MH)({page:1,sort:"distance",path_url:_.pathname,mountNth:2}))}),[]),(0,r.jsxs)("div",{className:"map",children:[(0,r.jsx)("div",{onClick:()=>{m.push("/")},className:"dialog-map__close",children:(0,r.jsx)("div",{className:"dialog-map__close-img",children:(0,r.jsx)("img",{src:d.A.closeCircleWhite,alt:""})})}),2===n?(0,r.jsx)(P,{orgs:i}):(0,r.jsx)(o,{})]})}},64887:function(){}}]);
//# sourceMappingURL=364.c14e9c8b.chunk.js.map