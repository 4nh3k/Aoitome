export const URL_BASE = "http://localhost:8080/api";
// Auth api
export const AUTH_PREFIX = "/auth";
export const URL_REGISTER = "/register";
export const URL_LOGIN = "/login";
export const URL_OTPS = "/otps";
export const URL_RESETPASS = "/resetPassword";
export const URL_FORGOTPASS = "/forgotPassword";

// Carrt api
export const USER_CART_PREFIX = "/user";
export const CART_SUFFIX = "/cart/items";

// Catalog api
export const CATALOG_PREFIX = "/catalogs";

// Order api
export const ORDER_PREFIX = "/OrderApi";
export const GET_ALL_ORDER_URL = "/getall";
export const GET_ORDER_BY_ID_URL = "/getbyid";
export const ADD_INFO_FROM_CART_URL = "/addFromCart";
export const CANCEL_ORDER_URL = "/cancel";
export const PAYMENT_CALLBACK_URL = "/PaymentCallBack";
export const GET_ORDER_BY_USERS_URL = "/getbyuser";

// Product api
export const PRODUCT_PREFIX = "/ProductApi";
export const GET_ALL_PRODUCT_URL = "/getall";
export const GET_PRODUCT_BY_ID_URL = "/getbyid";
export const ADD_PRODUCT_URL = "/add";
export const UPDATE_PRODUCT_URL = "/update";
export const DELETE_PRODUCT_URL = "/delete";

// Product coupon api
export const PRODUCT_COUPON_PREFIX = "/ProductCouponApi";
export const GET_ALL_COUPON_URL = "/getall";
export const GET_COUPON_BY_ID_URL = "/getbyid"; 
export const ADD_COUPON_URL = "/add";
export const UPDATE_COUPON_URL = "/update";
export const DELETE_COUPON_URL = "/delete";

// Role API
export const ROLE_PREFIX = "/roles";

// User API
export const USER_PREFIX = "/users";
export const USER_ASSIGN_ROLE_URL = "/assignRole";

// User coupon API
export const USER_COUPON_API = "/UserCouponApi";
export const USER_ALL_COUPONS_URL = "/getall";
export const USER_COUPON_RECEIVED_URL = "/receiveCoupon";
export const USER_APPLY_COUPON_URL = "/tryApply"
