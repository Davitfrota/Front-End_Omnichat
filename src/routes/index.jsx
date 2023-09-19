import React from "react";
import { Redirect } from "react-router-dom";

import OrderScreen from "../pages/OrderScreen/OrderScreen";
import DashboardSaas from "../pages/Dashboard-saas/index";
import Chat from "../pages/Chat/Chat";


// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// //  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";

import Register1 from "../pages/AuthenticationInner/Register";

import Recoverpw from "../pages/AuthenticationInner/Recoverpw";

import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";

import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";

import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";


// // Charts



const authProtectedRoutes = [
  { path: "/", component: () => <Redirect to="/chat" />},
  
  //chat
  { path: "/chat", component: Chat },

  { path: "/orders", component: OrderScreen }, 
  { path: "/dashboard-saas", component: DashboardSaas },                                        

  
  //   // //profile
  { path: "/profile", component: UserProfile },

  //   //Charts


//  { path: "/", exact: true, component: () => <Redirect to="/chat" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
 // { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  //   // Authentication Inner
  { path: "/pages-login", component: Login1 },
 
  { path: "/pages-register", component: Register1 },

  // { path: "/page-recoverpw", component: Recoverpw },

 // { path: "/pages-forgot-pwd", component: ForgetPwd1 },

  // {  path: "/auth-lock-screen", component: LockScreen },
,
  //{ path: "/page-confirm-mail", component: ConfirmMail },

  // { path: "/auth-email-verification", component: EmailVerification },

 // { path: "/auth-two-step-verification", component: TwostepVerification },

];

export { authProtectedRoutes, publicRoutes };
