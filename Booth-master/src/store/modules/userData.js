import { getOne, getTwo } from "@/utils/auth";


const userData = {
  state: {
    name: "",
    nameEng: "",
    nameShort: "",
    member: "1",
    address: "", // 地点
    linkman: "",
    position: "1",
    mobile: "",
    linkmanEmail: "",
    oneIndustry: getOne(), // 一级
    oneIndustryname: "",
    twoIndustry: getTwo(), // 二级
    competitor: "", // 竞争
    keywords: "", // 关键词
    supplier: "", // 供应商
    mainProcess: "", // 工艺
    facilitator: "", // 服务商
    summary: "", // 简介
    exhibitions: "", // 会展
    exhibitionOne: "",
    customer: "", // 客户/
    imgList: [], // 上传图片
    imgListUrl: [], // 上传图片本地展示
    titles: [],
    imgListUrlArr: [], // 服务器图片
    logoPic: "",
    logoPicUrl: "",
    introductionPic: "",
    introductionPicUrl: "",
    products: [],
    fansNumber: "",
    Percent: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_NAMEENG: (state, nameEng) => {
      state.nameEng = nameEng;
    },
    SET_NAMESHORT: (state, nameShort) => {
      state.nameShort = nameShort;
    },
    SET_MEMBER: (state, member) => {
      state.member = member;
    },
    SET_ADDRESS: (state, address) => {
      state.address = address;
    },
    SET_LINKMAN: (state, linkman) => {
      state.linkman = linkman;
    },
    SET_POSITION: (state, position) => {
      state.position = position;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_LINKMANEMAIL: (state, linkmanEmail) => {
      state.linkmanEmail = linkmanEmail;
    },
    SET_oneIndustry: (state, oneIndustry) => {
      state.oneIndustry = oneIndustry;
    },
    SET_oneIndustryname: (state, oneIndustryname) => {
      state.oneIndustryname = oneIndustryname;
    },
    SET_twoIndustry: (state, twoIndustry) => {
      state.twoIndustry = twoIndustry;
    },
    SET_competitor: (state, competitor) => {
      state.competitor = competitor;
    },
    SET_keywords: (state, keywords) => {
      state.keywords = keywords;
    },
    SET_supplier: (state, supplier) => {
      state.supplier = supplier;
    },
    SET_mainProcess: (state, mainProcess) => {
      state.mainProcess = mainProcess;
    },
    SET_facilitator: (state, facilitator) => {
      state.facilitator = facilitator;
    },
    SET_summary: (state, summary) => {
      state.summary = summary;
    },
    SET_exhibitions: (state, exhibitions) => {
      state.exhibitions = exhibitions;
    },
    // exhibitionOne
    SET_exhibitionOne: (state, exhibitionOne) => {
      state.exhibitionOne = exhibitionOne;
    },
    SET_customer: (state, customer) => {
      state.customer = customer;
    },
    SET_imgList: (state, imgList) => {
      state.imgList = imgList;
    },
    SET_imgListUrl: (state, imgListUrl) => {
      state.imgListUrl = imgListUrl;
    },
    SET_titles: (state, titles) => {
      state.titles = titles;
    },
    SET_imgListUrlArr: (state, imgListUrlArr) => {
      state.imgListUrlArr = imgListUrlArr;
    },
    SET_logoPic: (state, logoPic) => {
      state.logoPic = logoPic;
    },
    SET_logoPicUrl: (state, logoPicUrl) => {
      state.logoPicUrl = logoPicUrl;
    },
    SET_introductionPic: (state, introductionPic) => {
      state.introductionPic = introductionPic;
    },
    SET_introductionPicUrl: (state, introductionPicUrl) => {
      state.introductionPicUrl = introductionPicUrl;
    },
    SET_products: (state, products) => {
      state.products = products;
    },
    SET_fansNumber: (state, fansNumber) => {
      state.fansNumber = fansNumber;
    },
    SET_Percent: (state, Percent) => {
      state.Percent = Percent;
    }
  }
};

export default userData;
