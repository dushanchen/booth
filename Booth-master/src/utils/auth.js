import Cookies from "js-cookie";

const UserID = "UserID";
const industryOne = "industryOne";
const industryTwo = "industryTwo";
// 用户ID
export function getUser() {
  return Cookies.get(UserID);
}

export function setUser(id) {
  return Cookies.set(UserID, id);
}
export function removeUser() {
  return Cookies.remove(UserID);
}
// 一级行业
export function getOne() {
  return Cookies.get(industryOne);
}

export function setOne(One) {
  return Cookies.set(industryOne, One);
}

export function removeOne() {
  return Cookies.remove(industryOne);
}
// 二级行业
export function getTwo() {
  return Cookies.get(industryTwo);
}

export function setTwo(Two) {
  return Cookies.set(industryTwo, Two);
}
export function removeTwo() {
  return Cookies.remove(industryTwo);
}
//  判断缓存

const Token = "token";
const Name = "name";
const NameTwo = "nametwo";
const Way = "way";
const Type = "type";
export function gettoken() {
  return Cookies.get(Token);
}

export function settoken(token) {
  return Cookies.set(Token, token);
}

export function getname() {
  return Cookies.get(Name);
}

export function setname(name) {
  return Cookies.set(Name, name);
}
export function getnameTwo() {
  return Cookies.get(NameTwo);
}

export function setnameTwo(name) {
  return Cookies.set(NameTwo, name);
}

export function getway() {
  return Cookies.get(Way);
}

export function setway(way) {
  return Cookies.set(Way, way);
}
export function gettype() {
  return Cookies.get(Type);
}

export function settype(type) {
  return Cookies.set(Type, type);
}