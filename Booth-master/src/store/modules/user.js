import { getUser } from "@/utils/auth";

const user = {
  state: {
    UserID: getUser()
  },
  mutations: {
    SET_USERID: (state, UserID) => {
      state.UserID = UserID;
    }
  }
};

export default user;
