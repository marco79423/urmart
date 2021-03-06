import {createAction, createReducer, createSelector} from '@reduxjs/toolkit'
import {call, delay, put, select, takeEvery} from 'redux-saga/effects'

import * as apis from './apis'


export const fetchShopsRequest = createAction('fetchShopsRequest')
export const fetchShopsProcessing = createAction('fetchShopsProcessing')
export const fetchShopsSuccess = createAction('fetchShopsSuccess')
export const fetchShopsFailure = createAction('fetchShopsFailure')

export const fetchProductsRequest = createAction('fetchProductsRequest')
export const fetchProductsProcessing = createAction('fetchProductsProcessing')
export const fetchProductsSuccess = createAction('fetchProductsSuccess')
export const fetchProductsFailure = createAction('fetchProductsFailure')

export const fetchOrdersRequest = createAction('fetchOrdersRequest')
export const fetchOrdersProcessing = createAction('fetchOrdersProcessing')
export const fetchOrdersSuccess = createAction('fetchOrdersSuccess')
export const fetchOrderFailure = createAction('fetchOrderFailure')

export const createOrderRequest = createAction('createOrderRequest')
export const createOrderProcessing = createAction('createOrderProcessing')
export const createOrderSuccess = createAction('createOrderSuccess')
export const createOrderFailure = createAction('createOrderFailure')

export const deleteOrderRequest = createAction('deleteOrderRequest')
export const deleteOrderProcessing = createAction('deleteOrderProcessing')
export const deleteOrderSuccess = createAction('deleteOrderSuccess')
export const deleteOrderFailure = createAction('deleteOrderFailure')

export const createReportRequest = createAction('createReportRequest')
export const createReportProcessing = createAction('createReportProcessing')
export const createReportSuccess = createAction('createReportSuccess')
export const createReportFailure = createAction('createReportFailure')

export const initialState = {
  shops: {
    loading: false,
    data: [],
  },
  products: {
    loading: false,
    data: [],
  },
  orders: {
    loading: false,
    data: [],
  },
  createOrderTask: {
    loading: false,
  },
  createReportTask: {
    loading: false,
  },
}

export const reducer = createReducer(initialState, {
  // shop
  [fetchShopsProcessing]: (state, action) => ({
    ...state,
    shops: {
      loading: true,
      data: [],
    },
  }),
  [fetchShopsSuccess]: (state, action) => ({
    ...state,
    shops: {
      loading: false,
      data: action.payload
    },
  }),
  [fetchShopsFailure]: (state, action) => ({
    ...state,
    shops: {
      loading: false,
      data: [],
      error: action.payload,
    },
  }),

  // product
  [fetchProductsProcessing]: (state, action) => ({
    ...state,
    products: {
      loading: true,
      data: [],
    },
  }),
  [fetchProductsSuccess]: (state, action) => ({
    ...state,
    products: {
      loading: false,
      data: action.payload
    },
  }),
  [fetchProductsFailure]: (state, action) => ({
    ...state,
    products: {
      loading: false,
      data: [],
      error: action.payload,
    },
  }),

  // order
  [fetchOrdersProcessing]: (state, action) => ({
    ...state,
    orders: {
      loading: true,
      data: [],
    },
  }),
  [fetchOrdersSuccess]: (state, action) => ({
    ...state,
    orders: {
      loading: false,
      data: action.payload
    },
  }),
  [fetchOrderFailure]: (state, action) => ({
    ...state,
    orders: {
      loading: false,
      data: [],
      error: action.payload,
    },
  }),

  // create order task
  [createOrderProcessing]: (state, action) => ({
    ...state,
    createOrderTask: {
      loading: true,
    },
  }),
  [createOrderSuccess]: (state, action) => ({
    ...state,
    createOrderTask: {
      loading: false,
    },
  }),
  [createOrderFailure]: (state, action) => ({
    ...state,
    createOrderTask: {
      loading: false,
      error: action.payload,
    },
  }),

  // create report
   [createReportProcessing]: (state, action) => ({
    ...state,
    createReportTask: {
      loading: true,
    },
  }),
  [createReportSuccess]: (state, action) => ({
    ...state,
    createReportTask: {
      loading: false,
    },
  }),
  [createReportFailure]: (state, action) => ({
    ...state,
    createReportTask: {
      loading: false,
      error: action.payload,
    },
  }),
})


export const isShopsLoading = state => state.shops.loading
export const getShops = state => state.shops.data
export const getShopMap = createSelector(
  getShops,
  shops => shops
    .reduce((shopMap, shop) => ({
      ...shopMap,
      [shop.id]: shop,
    }), {})
)

export const isProductsLoading = state => state.products.loading
export const getProducts = state => state.products.data
export const getProductMap = createSelector(
  getProducts,
  products => products
    .reduce((productMap, product) => ({
      ...productMap,
      [product.id]: product,
    }), {})
)

export const isOrdersLoading = state => state.orders.loading
export const getOrders = state => state.orders.data

export const getCreateOrderTask = state => state.createOrderTask

export const getCreateReportTask = state => state.createReportTask

export function* rootSaga() {
  yield takeEvery(fetchShopsRequest, fetchShopsSaga)
  yield takeEvery(fetchProductsRequest, fetchProductListSaga)
  yield takeEvery(fetchOrdersRequest, fetchOrderListSaga)
  yield takeEvery(createOrderRequest, createOrderSaga)
  yield takeEvery(deleteOrderRequest, deleteOrderSaga)
  yield takeEvery(createReportRequest, createReportSaga)
}

export function* fetchShopsSaga() {
  try {
    if (yield select(isShopsLoading)) {
      return
    }
    yield put(fetchShopsProcessing())

    const response = yield call(apis.getShopList)
    const shops = response.data
    yield put(fetchShopsSuccess(shops))
  } catch (e) {
    yield put(fetchShopsFailure(e))
  }
}

export function* fetchProductListSaga() {
  try {
    if (yield select(isProductsLoading)) {
      return
    }
    yield put(fetchProductsProcessing())

    const response = yield call(apis.getProductList)
    const products = response.data
    yield put(fetchProductsSuccess(products))
  } catch (e) {
    yield put(fetchProductsFailure(e))
  }
}

export function* fetchOrderListSaga() {
  try {
    if (yield select(isOrdersLoading)) {
      return
    }
    yield put(fetchOrdersProcessing())
    const response = yield call(apis.getOrderList)


    const orders = response.data
    yield put(fetchOrdersSuccess(orders))
  } catch (e) {
    yield put(fetchOrderFailure(e))
  }
}

export function* createOrderSaga(action) {
  try {
    const productMap = yield select(getProductMap)

    const orderData = action.payload
    const targetProduct = productMap[orderData.productId]

    yield put(createOrderProcessing())
    const response = yield call(apis.postOrder, {
      ...orderData,
      price: targetProduct.price,
    })
    const newOrder = response.data
    yield put(createOrderSuccess(newOrder))
    yield put(fetchOrdersRequest())
    yield put(fetchProductsRequest())
  } catch (e) {
    yield put(createOrderFailure(e.response.data.error))
  }
}

export function* deleteOrderSaga(action) {
  try {
    const orderId = action.payload

    yield put(deleteOrderProcessing())
    yield call(apis.deleteOrder, orderId)
    yield put(deleteOrderSuccess(orderId))
    yield put(fetchOrdersRequest())
    yield put(fetchProductsRequest())
  } catch (e) {
    yield put(deleteOrderFailure(e))
  }
}

export function* createReportSaga(action) {
  try {
    const topic = action.payload

    yield put(createReportProcessing())
    const response = yield call(apis.postTask, topic)
    const taskId = response.data.id
    while (true) {
      const response = yield call(apis.getTaskStatus, taskId)
      if (response.data.state !== 'PENDING') {
        break
      }
      yield delay(1000)
    }

    yield call(apis.downloadTaskResult, taskId)
    yield put(createReportSuccess())
  } catch (e) {
    yield put(createReportFailure(e))
  }
}
