import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//chat
import chat from "./chat/reducer"

//contacts
import contacts from "./contacts/reducer"

import orders from "./orders/reducer"

import DashboardSaas from "./dashboard-saas/reducer";
import Dashboard from "./dashboard/reducer";

const rootReducer = combineReducers({

  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  chat,
  contacts,
  orders,
  DashboardSaas,
  Dashboard,
})

export default rootReducer
