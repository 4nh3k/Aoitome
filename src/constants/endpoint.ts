export const URL_BASE = "http://localhost:6001";
// Identity api
export const IDENTITY_PREFIX = "/identity.api/v1";
export const URL_REGISTER = "/users/register";
export const URL_LOGIN = "/users/login";
export const URL_LOGOUT = "/users/logout";
export const URL_TOKEN = "/users/resetpass-token";
export const URL_RESETPASS = "/users/resetpass";
export const URL_FILE_UPLOAD = "/files/upload";
export const URL_UPDATEPASS = "/update-password"
export const URL_PROFILE = "/users/profile"
export const URL_UPDATE_PROFILE = "/users"

// Catalog api
export const CATALOG_PREFIX = "/catalog.api/v1";
export const URL_BOOKS = "/books";
export const URL_GENRES = "/genres";
export const URL_BOOK_REVIEWS = "/book-reviews"
export const URL_FORMATS = "/formats"
export const URL_PUBLISHERS = "/publishers"
export const SUFFIX_LANG_CODES = "/lang-codes"

// Basket api
export const CART_PREFIX = "/basket.api/v1";
export const URL_CART = "/baskets";

// Ordering api
export const ORDERING_PREFIX = "/ordering.api/v1"
export const URL_ORDERS = "/orders"
export const URL_PAYMENT = "/payment-webhook"
export const URL_TRANSACTIONS = "/transactions"

// RecSys api
export const RECSYS_PREFIX = "/recsys.api"
export const URL_PREDICT = "/predict"

