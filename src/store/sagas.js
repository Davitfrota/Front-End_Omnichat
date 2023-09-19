import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import chatSaga from "./chat/saga"
import contactsSaga from "./contacts/saga";
import ordersSaga from "./orders/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import dashboardSaga from "./dashboard/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(chatSaga),
    fork(contactsSaga),
    fork(ordersSaga),
    fork(dashboardSaasSaga),
    fork(dashboardSaga),
  ])
}
