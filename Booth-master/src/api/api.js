import axios from "axios";
export const ERR_OK = 200;
// import qs from 'qs'

const service = axios.create({
    baseURL: "./api", // api的base_url本地
    // baseURL: "https://www.booth.vip/booth", // api的base_url 服务器
});
// 获取行业列表   1
export function getIndustry(Class) {
    return service({
        url: "/industry/getIndustry",
        method: "get",
        params: {
            industryClass: Class
        }
    });
}
// 根据行业查询广告  1
export function getAdvert(id) {
    return service({
        url: "/advert/getAdvert",
        method: "get",
        params: {
            industryId: id
        }
    });
}
// 企业页面 1
export function discoverOtherCompanyByCondition(data) {
    return service({
        url: "/company/discoverOtherCompanyByCondition",
        method: "get",
        params: {
            id: data.id,
            name: data.name,
            firstIndustryId: data.firstIndustryId,
            secondIndustryId: data.secondIndustryId
        }
    });
}
// 获取收藏页面 1
export function getCollectionRecord(data) {
    return service({
        url: "/company/getCollectionRecord",
        method: "get",
        params: {
            id: data.id,
            companyName: data.name,
            firstIndustryId: data.firstIndustryId,
            secondIndustryId: data.secondIndustryId
        }
    });
}
// 获取历史记录 1
export function getHistoryRecord(id) {
    return service({
        url: "/company/getHistoryRecord",
        method: "get",
        params: {
            id: id
        }
    });
}
// 报名参加 1
export function enrollExhibition(data) {
    return service({
        url: "/enrollExhibition",
        method: "post",
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
        data: data
    });
}
// 查询所有展会 1
export function getAllExhibitions() {
    return service({
        url: "/getAllExhibitions",
        method: "get"
    });
}

// 获取所有参展商 
export function getAllExhibitiors(data) {
    return service({
        url: "/getAllExhibitiors",
        method: "get",
        params: {
            exhibitionId: data.exhibitionId,
            userId: data.userId,
            content: data.content
        }
    });
}

// 获取所有到访商 
export function getAllVisitors(data) {
    return service({
        url: "/getAllVisitors",
        method: "get",
        params: {
            exhibitionId: data.exhibitionId,
            userId: data.userId,
            content: data.content
        }
    });
}
// 获取某个展会详情 1
export function getExhibitionInfoById(id) {
    return service({
        url: "/getExhibitionInfoById",
        method: "get",
        params: {
            exhibitionId: id
        }
    });
}
// 关注 1
export function cancelFocus(data) {
    return service({
        url: "/cancelFocus",
        method: "post",
        data: data
    });
}
// 取消关注 1
export function focus(data) {
    return service({
        url: "/focus",
        method: "post",
        data: data
    });
}
// 获取参加同一个展会的公司
export function getCompanyByTheSameExhibition(id) {
    return service({
        url: "/index/getCompanyByTheSameExhibition",
        method: "get",
        params: {
            id: id
        }
    });
}
// 获查看首页推荐广告banner 1
export function getIndexBanner() {
    return service({
        url: "/index/getIndexBanner",
        method: "get"
    });
}
// 查看首页推荐公司 1
export function getRecommendCompany(data) {
    return service({
        url: "/index/getRecommendCompany",
        method: "get",
        params: {
            firstIndustryId: data.firstIndustryId,
            secondIndustryId: data.secondIndustryId,
            id: data.id
        }
    });
}
// 可能感兴趣的公司 1
export function mayBeInterestedCompany(data) {
    return service({
        url: "/index/mayBeInterestedCompany",
        method: "get",
        params: {
            firstIndustryId: data.firstIndustryId,
            secondIndustryId: data.secondIndustryId,
            id: data.id
        }
    });
}
// 点击链接激活用户 1
export function activate(data) {
    return service({
        url: `/activate/${data}`,
        method: "get"
    });
}

// 修改密码
export function changePassword(data) {
    return service({
        url: `/changePassword`,
        method: "post",
        data: {
            email: data.username,
            password: data.password
        }
    });
}
// 邮箱验证 1
export function checkEmail(id) {
    return service({
        url: `/checkEmail`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 判断是否激活 1
export function isActivate(id) {
    return service({
        url: `/isActivate/${id}`,
        method: "get"
    });
}
// 用户登录 1
export function login(data) {
    return service({
        url: `/login`,
        method: "post",
        data: data
    });
}
// 用户注册 1
export function register(data) {
    return service({
        url: `/register`,
        method: "post",
        data: data
    });
}
// 发送邮箱验证码 1
export function sendCode(email) {
    return service({
        url: `/sendCode`,
        method: "get",
        params: {
            email: email
        }
    });
}
// 获取所有消息通知 1
export function getAllMessage(id) {
    return service({
        url: `/getAllMessage`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 设置已读  1
export function setMessageRead(id) {
    return service({
        url: `/setMessageRead`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 删除产品手册 1
export function deleteProduct(id) {
    return service({
        url: `/product/deleteProduct`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 获取所有产品手册 1
export function getAllProducts(id, userId) {
    return service({
        url: `/product/getAllProducts`,
        method: "get",
        params: {
            id: id,
            userId: userId
        }
    });
}
// 保存产品手册 1
export function saveProduct(data) {
    return service({
        url: `/product/saveProduct`,
        method: "post",
        data: data
    });
}
// 搜索 1
export function search(content) {
    return service({
        url: `/search`,
        method: "get",
        params: {
            content: content
        }
    });
}
// 搜索展会名称 1

export function searchExhibition(name) {
    return service({
        url: `/search/searchExhibition`,
        method: "get",
        params: {
            name: name
        }
    });
}
// 搜索工商 1
export function searchCompany(content) {
    return service({
        url: `/search/searchCompany`,
        method: "get",
        params: {
            content: content
        }
    });
}
// 搜索展位/展商
export function searchExhibitior(data) {
    return service({
        url: `/search/searchExhibitior`,
        method: "get",
        params: {
            content: data.content,
            eid: data.eid
        }
    });
}
// 保存用户信息 1
export function addUserInfo(data) {
    return service({
        url: `/user/addUserInfo`,
        method: "post",
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
// 获取用户信息 1
export function getCompanyInfo(userId, id) {
    return service({
        url: `/user/getCompanyInfo`,
        method: "get",
        params: {
            userId: userId,
            id: id
        }
    });
}
// 获取资料百分比 1
export function getInfoPercent(id) {
    return service({
        url: `/user/getInfoPercent`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 我需要设计 1
export function needDesign(id) {
    return service({
        url: `/user/needDesign`,
        method: "get",
        params: {
            id: id
        }
    });
}
// 判断 公司名称是否注册
export function matchCompanyName(name) {
    return service({
        url: `/user/matchCompanyName`,
        method: "get",
        params: {
            name: name
        }
    });
}
// 匹配验证码
export function matchCode(data) {
    return service({
        url: `/matchCode`,
        method: "get",
        params: {
            email: data.username,
            code: data.code
        }
    });
}
// 查询谁看过谁  1
export function getAttention(id) {
    return service({
        url: `/user/getAttention`,
        method: "get",
        params: {
            userId: id
        }
    });
}
// 获取合作伙伴 1
// /user/getPartner
export function getPartner(id, type) {
    return service({
        url: `/user/getPartner`,
        method: "get",
        params: {
            userId: id,
            type: type
        }
    });
}
// 相似用户 1
export function getSimilarityCompany(id) {
    return service({
        url: `/user/getSimilarityCompany`,
        method: "get",
        params: {
            userId: id
        }
    });
}
// 查看产品手册
export function getProductById(productId, userId) {
    return service({
        url: `/product/getProductById`,
        method: "get",
        params: {
            productId: productId,
            userId: userId
        }
    });
}
// 查看图片
export function viewPicture(picId, userId) {
    return service({
        url: `/user/viewPicture`,
        method: "get",
        params: {
            picId: picId,
            userId: userId
        }
    });
}
// 认证
export function sendRelationMsg(data) {
    return service({
        url: "/sendRelationMsg",
        method: "post",
        data: data
    });
}
// 认证/sendAuthEmail
export function sendAuthEmail(data) {
    return service({
        url: "/sendAuthEmail",
        method: "post",
        data: data
    });
}
// 收藏
export function collection(data) {
    return service({
        url: "/collection",
        method: "post",
        data: data
    });
}
// 取消收藏
export function cancelCollection(data) {
    return service({
        url: "/cancelCollection",
        method: "post",
        data: data
    });
}
// 同意或拒绝  /isAgreeMsg
export function isAgreeMsg(token, isAgree, id) {
    return service({
        url: `/isAgreeMsg`,
        method: "get",
        params: {
            token: token,
            isAgree: isAgree,
            id: id
        }
    });
}

// 新保存接口
// /user/addUserInfoByEmail
export function addUserInfoByEmail(data) {
    return service({
        url: "/user/addUserInfoByEmail",
        method: "post",
        data: data
    });
}

// 邀请参加 /inviteToExhibition
export function inviteToExhibition(data) {
    return service({
        url: "/inviteToExhibition",
        method: "post",
        data: data
    });
}
// 获取合作伙伴
export function getAllPartner(id) {
    return service({
        url: "/user/getAllPartner",
        method: "get",
        params: {
            userId: id
        }
    });
}
// 上传图片到OSS 
export function upload(data) {
    return service({
        url: `/user/upload`,
        method: "post",
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
// 修改
export function updatePicture(data) {
    return service({
        url: `/user/updatePicture`,
        method: "post",
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
// 新增
export function savePicture(data) {
    return service({
        url: `/user/savePicture`,
        method: "post",
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 删除
export function deletePicture(ossId, id) {
    return service({
        url: `/user/deleteCompanyPic`,
        data: {
            ossId: ossId,
            id: id,  
        },
        method: "post",
    });
}