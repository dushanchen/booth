const getters = {
  UserID: state => state.user.UserID, //
  name: state => state.userData.name, //
  nameEng: state => state.userData.nameEng, //
  nameShort: state => state.userData.nameShort, //
  member: state => state.userData.member, //
  address: state => state.userData.address, // 地点
  linkman: state => state.userData.linkman, //
  position: state => state.userData.position, //
  mobile: state => state.userData.mobile, // 
  linkmanEmail: state => state.userData.linkmanEmail, //
  oneIndustry: state => state.userData.oneIndustry, // 
  oneIndustryname: state => state.userData.oneIndustryname,
  twoIndustry: state => state.userData.twoIndustry,
  competitor: state => state.userData.competitor,
  keywords: state => state.userData.keywords,
  supplier: state => state.userData.supplier,
  mainProcess: state => state.userData.mainProcess,
  facilitator: state => state.userData.facilitator,
  summary: state => state.userData.summary,
  exhibitions: state => state.userData.exhibitions,
  exhibitionOne:state => state.userData.exhibitionOne,
  customer: state => state.userData.customer,
  imgList: state => state.userData.imgList,
  imgListUrl: state => state.userData.imgListUrl,
  titles: state => state.userData.titles,
  imgListUrlArr: state => state.userData.imgListUrlArr,
  logoPic: state => state.userData.logoPic,
  logoPicUrl: state => state.userData.logoPicUrl,
  introductionPic: state => state.userData.introductionPic,
  introductionPicUrl: state => state.userData.introductionPicUrl,
  products: state => state.userData.products,
  fansNumber: state => state.userData.fansNumber,
  Percent: state => state.userData.Percent
};
export default getters;
