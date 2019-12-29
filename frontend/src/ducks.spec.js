import React from 'react'
import {call, put, select, delay} from 'redux-saga/effects'

import * as ducks from './ducks'
import * as apis from './apis'

describe('action creator', () => {

  test('fetchShopsRequest should create an action to fetch shops', () => {
    const expectedAction = {
      type: 'fetchShopsRequest'
    }
    expect(ducks.fetchShopsRequest()).toEqual(expectedAction)
  })

  test('fetchShopsProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'fetchShopsProcessing'
    }
    expect(ducks.fetchShopsProcessing()).toEqual(expectedAction)
  })

  test('fetchShopsSuccess should create an action to notify success', () => {
    const shops = [
      {
        id: 1,
        name: 'shop 1',
      },
      {
        id: 2,
        name: 'shop 2',
      },
    ]

    const expectedAction = {
      type: 'fetchShopsSuccess',
      payload: shops
    }
    expect(ducks.fetchShopsSuccess(shops)).toEqual(expectedAction)
  })

  test('fetchShopsFailure should create an action to notify failure', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'fetchShopsFailure',
      payload: error
    }
    expect(ducks.fetchShopsFailure(error)).toEqual(expectedAction)
  })

  test('fetchProductsRequest should create an action to fetch products', () => {
    const expectedAction = {
      type: 'fetchProductsRequest'
    }
    expect(ducks.fetchProductsRequest()).toEqual(expectedAction)
  })

  test('fetchProductsProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'fetchProductsProcessing'
    }
    expect(ducks.fetchProductsProcessing()).toEqual(expectedAction)
  })

  test('fetchProductsSuccess should create an action to notify success', () => {
    const products = [
      {
        key: 1,
        id: 1,
        name: 'product A1',
        stockPcs: 4,
        price: 100.0,
        shopId: 1,
        vip: false
      },
      {
        key: 2,
        id: 2,
        name: 'product A2',
        stockPcs: 19,
        price: 200.0,
        shopId: 1,
        vip: false
      },
    ]

    const expectedAction = {
      type: 'fetchProductsSuccess',
      payload: products
    }
    expect(ducks.fetchProductsSuccess(products)).toEqual(expectedAction)
  })

  test('fetchProductsFailure should create an action to notify failure', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'fetchProductsFailure',
      payload: error
    }
    expect(ducks.fetchProductsFailure(error)).toEqual(expectedAction)
  })

  test('fetchOrdersRequest should create an action to fetch orders', () => {
    const expectedAction = {
      type: 'fetchOrdersRequest'
    }
    expect(ducks.fetchOrdersRequest()).toEqual(expectedAction)
  })

  test('fetchOrdersProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'fetchOrdersProcessing'
    }
    expect(ducks.fetchOrdersProcessing()).toEqual(expectedAction)
  })

  test('fetchOrdersSuccess should create an action to notify success', () => {
    const orders = [
      {
        key: 1,
        id: 1,
        productId: 1,
        qty: 1,
        price: 100.0,
        customerId: 1,
        vip: false,
      },
      {
        key: 2,
        id: 2,
        productId: 2,
        qty: 2,
        price: 200.0,
        customerId: 2,
        vip: true,
      },
    ]

    const expectedAction = {
      type: 'fetchOrdersSuccess',
      payload: orders
    }
    expect(ducks.fetchOrdersSuccess(orders)).toEqual(expectedAction)
  })

  test('fetchOrderFailure should create an action to notify failure', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'fetchOrderFailure',
      payload: error
    }
    expect(ducks.fetchOrderFailure(error)).toEqual(expectedAction)
  })

  test('createOrderRequest should create an action to create an order', () => {
    const orderData = {
      productId: 1,
      qty: 1,
      customerId: 1,
      vip: false,
    }
    const expectedAction = {
      type: 'createOrderRequest',
      payload: orderData,
    }
    expect(ducks.createOrderRequest(orderData)).toEqual(expectedAction)
  })

  test('createOrderProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'createOrderProcessing'
    }
    expect(ducks.createOrderProcessing()).toEqual(expectedAction)
  })

  test('createOrderSuccess should create an action to notify success', () => {
    const newOrder = {
      id: 1,
      productId: 1,
      qty: 1,
      customerId: 1,
      vip: false,
    }
    const expectedAction = {
      type: 'createOrderSuccess',
      payload: newOrder,
    }
    expect(ducks.createOrderSuccess(newOrder)).toEqual(expectedAction)
  })

  test('createOrderFailure should create an action to set the error', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'createOrderFailure',
      payload: error
    }
    expect(ducks.createOrderFailure(error)).toEqual(expectedAction)
  })

  test('deleteOrderRequest should create an action to delete an order', () => {
    const orderId = 1
    const expectedAction = {
      type: 'deleteOrderRequest',
      payload: orderId,
    }
    expect(ducks.deleteOrderRequest(orderId)).toEqual(expectedAction)
  })

  test('deleteOrderProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'deleteOrderProcessing'
    }
    expect(ducks.deleteOrderProcessing()).toEqual(expectedAction)
  })

  test('deleteOrderSuccess should create an action to notify success', () => {
    const orderId = 1
    const expectedAction = {
      type: 'deleteOrderSuccess',
      payload: orderId,
    }
    expect(ducks.deleteOrderSuccess(orderId)).toEqual(expectedAction)
  })

  test('deleteOrderFailure should create an action to notify failure', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'deleteOrderFailure',
      payload: error
    }
    expect(ducks.deleteOrderFailure(error)).toEqual(expectedAction)
  })

  test('createReportRequest should create an action to create a report', () => {
    const type = 'top3'
    const expectedAction = {
      type: 'createReportRequest',
      payload: type,
    }
    expect(ducks.createReportRequest(type)).toEqual(expectedAction)
  })

  test('createReportProcessing should create an action to set loading state', () => {
    const expectedAction = {
      type: 'createReportProcessing'
    }
    expect(ducks.createReportProcessing()).toEqual(expectedAction)
  })

  test('createReportSuccess should create an action to notify success', () => {
    const expectedAction = {
      type: 'createReportSuccess',
    }
    expect(ducks.createReportSuccess()).toEqual(expectedAction)
  })

  test('createReportFailure should create an action to notify failure', () => {
    const error = new Error('something is wrong')
    const expectedAction = {
      type: 'createReportFailure',
      payload: error
    }
    expect(ducks.createReportFailure(error)).toEqual(expectedAction)
  })
})

describe('reducer', () => {

  describe('reducer should handle shops data', () => {

    it('should handle the loading state', () => {
      const state = {
        shops: {
          loading: false,
          data: [],
        },
      }
      const action = ducks.fetchShopsProcessing()
      const expectedNextState = {
        shops: {
          loading: true,
          data: [],
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle the data', () => {
      const shops = [
        {
          id: 1,
          name: 'shop 1',
        },
        {
          id: 2,
          name: 'shop 2',
        },
      ]

      const state = {
        shops: {
          loading: true,
          data: [],
        },
      }

      const action = ducks.fetchShopsSuccess(shops)
      const expectedNextState = {
        shops: {
          loading: false,
          data: shops,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle error', () => {
      const error = new Error('something is wrong')

      const state = {
        shops: {
          loading: true,
          data: [],
          error: undefined,
        },
      }

      const action = ducks.fetchShopsFailure(error)
      const expectedNextState = {
        shops: {
          loading: false,
          data: [],
          error: error,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })
  })


  describe('reducer should handle products data', () => {

    it('should handle the loading state', () => {
      const state = {
        products: {
          loading: false,
          data: [],
        },
      }
      const action = ducks.fetchProductsProcessing()
      const expectedNextState = {
        products: {
          loading: true,
          data: [],
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle the data', () => {
      const products = [
        {
          key: 1,
          id: 1,
          name: 'product A1',
          stockPcs: 4,
          price: 100.0,
          shopId: 1,
          vip: false
        },
        {
          key: 2,
          id: 2,
          name: 'product A2',
          stockPcs: 19,
          price: 200.0,
          shopId: 1,
          vip: false
        },
      ]

      const state = {
        products: {
          loading: true,
          data: [],
        },
      }

      const action = ducks.fetchProductsSuccess(products)
      const expectedNextState = {
        products: {
          loading: false,
          data: products,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle error', () => {
      const error = new Error('something is wrong')

      const state = {
        products: {
          loading: true,
          data: [],
          error: undefined,
        },
      }

      const action = ducks.fetchProductsFailure(error)
      const expectedNextState = {
        products: {
          loading: false,
          data: [],
          error: error,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })
  })

  describe('reducer should handle order data', () => {

    it('should handle the loading state', () => {
      const state = {
        orders: {
          loading: false,
          data: [],
        },
      }
      const action = ducks.fetchOrdersProcessing()
      const expectedNextState = {
        orders: {
          loading: true,
          data: [],
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle the data', () => {
      const orders = [
        {
          key: 1,
          id: 1,
          productId: 1,
          qty: 1,
          price: 100.0,
          customerId: 1,
          vip: false,
        },
        {
          key: 2,
          id: 2,
          productId: 2,
          qty: 2,
          price: 200.0,
          customerId: 2,
          vip: true,
        },
      ]

      const state = {
        orders: {
          loading: true,
          data: [],
        },
      }

      const action = ducks.fetchOrdersSuccess(orders)
      const expectedNextState = {
        orders: {
          loading: false,
          data: orders,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle error', () => {
      const error = new Error('something is wrong')

      const state = {
        orders: {
          loading: true,
          data: [],
          error: undefined,
        },
      }

      const action = ducks.fetchOrderFailure(error)
      const expectedNextState = {
        orders: {
          loading: false,
          data: [],
          error: error,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })
  })

  describe('reducer should handle create order task', () => {

    it('should handle the loading state', () => {
      const state = {
        createOrderTask: {
          loading: false,
        },
      }
      const action = ducks.createOrderProcessing()
      const expectedNextState = {
        createOrderTask: {
          loading: true,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle success', () => {
      const state = {
        createOrderTask: {
          loading: true,
        },
      }

      const action = ducks.createOrderSuccess()
      const expectedNextState = {
        createOrderTask: {
          loading: false,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle error', () => {
      const error = new Error('something is wrong')

      const state = {
        createOrderTask: {
          loading: true,
        },
      }

      const action = ducks.createOrderFailure(error)
      const expectedNextState = {
        createOrderTask: {
          loading: false,
          error: error,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })
  })


  describe('reducer should handle create report task', () => {

    it('should handle the loading state', () => {
      const state = {
        createReportTask: {
          loading: false,
        },
      }
      const action = ducks.createReportProcessing()
      const expectedNextState = {
        createReportTask: {
          loading: true,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle success', () => {
      const state = {
        createReportTask: {
          loading: true,
        },
      }

      const action = ducks.createReportSuccess()
      const expectedNextState = {
        createReportTask: {
          loading: false,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })

    it('should handle error', () => {
      const error = new Error('something is wrong')

      const state = {
        createReportTask: {
          loading: true,
        },
      }

      const action = ducks.createReportFailure(error)
      const expectedNextState = {
        createReportTask: {
          loading: false,
          error: error,
        },
      }

      expect(ducks.reducer(state, action)).toEqual(expectedNextState)
    })
  })
})


describe('selector', () => {

  test('isShopsLoading should return loading state of shops', () => {
    const state = {
      shops: {
        loading: true
      }
    }
    const expected = true
    expect(ducks.isShopsLoading(state)).toEqual(expected)
  })

  test('getShops should return shops', () => {
    const shops = [
      {
        id: 1,
        name: 'shop 1',
      },
      {
        id: 2,
        name: 'shop 2',
      },
    ]

    const state = {
      shops: {
        data: shops
      }
    }
    expect(ducks.getShops(state)).toEqual(shops)
  })

  test('getShopMap should return shop map', () => {
    const shops = [
      {
        id: 1,
        name: 'shop 1',
      },
      {
        id: 2,
        name: 'shop 2',
      },
    ]

    const state = {
      shops: {
        data: shops
      }
    }

    const expected = {
      1: {
        id: 1,
        name: 'shop 1',
      },
      2: {
        id: 2,
        name: 'shop 2',
      },
    }
    expect(ducks.getShopMap(state)).toEqual(expected)
  })

  test('isProductsLoading should return loading state of products', () => {
    const state = {
      products: {
        loading: true
      }
    }
    const expected = true
    expect(ducks.isProductsLoading(state)).toEqual(expected)
  })

  test('getProducts should return products', () => {
    const products = [
      {
        key: 1,
        id: 1,
        name: 'product A1',
        stockPcs: 4,
        price: 100.0,
        shopId: 1,
        vip: false
      },
      {
        key: 2,
        id: 2,
        name: 'product A2',
        stockPcs: 19,
        price: 200.0,
        shopId: 1,
        vip: false
      },
    ]

    const state = {
      products: {
        data: products
      }
    }
    expect(ducks.getProducts(state)).toEqual(products)
  })

  test('getProductMap should return product map', () => {
    const products = [
      {
        key: 1,
        id: 1,
        name: 'product A1',
        stockPcs: 4,
        price: 100.0,
        shopId: 1,
        vip: false
      },
      {
        key: 2,
        id: 2,
        name: 'product A2',
        stockPcs: 19,
        price: 200.0,
        shopId: 1,
        vip: false
      },
    ]

    const state = {
      products: {
        data: products
      }
    }

    const expected = {
      1: {
        key: 1,
        id: 1,
        name: 'product A1',
        stockPcs: 4,
        price: 100.0,
        shopId: 1,
        vip: false
      },
      2: {
        key: 2,
        id: 2,
        name: 'product A2',
        stockPcs: 19,
        price: 200.0,
        shopId: 1,
        vip: false
      },
    }
    expect(ducks.getProductMap(state)).toEqual(expected)
  })

  test('isOrdersLoading should return loading state of orders', () => {
    const state = {
      orders: {
        loading: true
      }
    }
    const expected = true
    expect(ducks.isOrdersLoading(state)).toEqual(expected)
  })

  test('getOrders should return products', () => {
    const orders = [
      {
        key: 1,
        id: 1,
        productId: 1,
        qty: 1,
        price: 100.0,
        customerId: 1,
        vip: false,
      },
      {
        key: 2,
        id: 2,
        productId: 2,
        qty: 2,
        price: 200.0,
        customerId: 2,
        vip: true,
      },
    ]

    const state = {
      orders: {
        data: orders
      }
    }
    expect(ducks.getOrders(state)).toEqual(orders)
  })
})

describe('saga', () => {

  describe('fetchShopsSaga', () => {
    const generator = ducks.fetchShopsSaga()

    it('should get the loading state from state', () => {
      expect(generator.next().value).toEqual(select(ducks.isShopsLoading))
    })

    it('should set the loading state to state', () => {
      expect(generator.next(false).value).toEqual(put(ducks.fetchShopsProcessing()))
    })

    it('should fetch shops from backend', () => {
      expect(generator.next().value).toEqual(call(apis.getShopList))
    })

    it('should notify the success', () => {
      expect(generator.next({data: []}).value).toEqual(put(ducks.fetchShopsSuccess([])))
    })
  })

  describe('fetchProductListSaga', () => {
    const generator = ducks.fetchProductListSaga()

    it('should get the loading state from state', () => {
      expect(generator.next().value).toEqual(select(ducks.isProductsLoading))
    })

    it('should set the loading state to state', () => {
      expect(generator.next(false).value).toEqual(put(ducks.fetchProductsProcessing()))
    })

    it('should fetch products from backend', () => {
      expect(generator.next().value).toEqual(call(apis.getProductList))
    })

    it('should notify the success', () => {
      expect(generator.next({data: []}).value).toEqual(put(ducks.fetchProductsSuccess([])))
    })
  })

  describe('fetchOrderListSaga', () => {
    const generator = ducks.fetchOrderListSaga()

    it('should get the loading state from state', () => {
      expect(generator.next().value).toEqual(select(ducks.isOrdersLoading))
    })

    it('should set the loading state to state', () => {
      expect(generator.next(false).value).toEqual(put(ducks.fetchOrdersProcessing()))
    })

    it('should fetch orders from backend', () => {
      expect(generator.next().value).toEqual(call(apis.getOrderList))
    })

    it('should notify the success', () => {
      expect(generator.next({data: []}).value).toEqual(put(ducks.fetchOrdersSuccess([])))
    })
  })

  describe('createOrderSaga', () => {
    const orderData = {
      productId: 1,
      qty: 1,
      customerId: 1,
      vip: false,
    }
    const generator = ducks.createOrderSaga(ducks.createOrderRequest(orderData))

    it('should get the product map from state', () => {
      expect(generator.next().value).toEqual(select(ducks.getProductMap))
    })

    it('should set the loading state to state', () => {
      const productMap = {
        1: {
          key: 1,
          id: 1,
          name: 'product A1',
          stockPcs: 4,
          price: 100.0,
          shopId: 1,
          vip: false
        },
      }
      expect(generator.next(productMap).value).toEqual(put(ducks.createOrderProcessing()))
    })

    it('should create orders from backend', () => {
      expect(generator.next(false).value).toEqual(call(apis.postOrder, {
        productId: 1,
        qty: 1,
        customerId: 1,
        vip: false,
        price: 100.0,
      }))
    })

    it('should notify the success', () => {
      const newOrder = {
        id: 1,
        ...orderData
      }
      expect(generator.next({data: newOrder}).value).toEqual(put(ducks.createOrderSuccess(newOrder)))
    })

    it('should make a fetch orders request', () => {
      expect(generator.next().value).toEqual(put(ducks.fetchOrdersRequest()))
    })

    it('should make a fetch products request', () => {
      expect(generator.next().value).toEqual(put(ducks.fetchProductsRequest()))
    })
  })

  describe('deleteOrderSaga', () => {
    const orderId = 1
    const generator = ducks.deleteOrderSaga(ducks.deleteOrderRequest(orderId))

    it('should set the loading state to state', () => {
      expect(generator.next().value).toEqual(put(ducks.deleteOrderProcessing()))
    })

    it('should delete the target order from backend', () => {
      expect(generator.next().value).toEqual(call(apis.deleteOrder, orderId))
    })

    it('should notify the success', () => {
      expect(generator.next().value).toEqual(put(ducks.deleteOrderSuccess(orderId)))
    })

    it('should make a fetch orders request', () => {
      expect(generator.next().value).toEqual(put(ducks.fetchOrdersRequest()))
    })

    it('should make a fetch products request', () => {
      expect(generator.next().value).toEqual(put(ducks.fetchProductsRequest()))
    })
  })


  describe('createReportSaga', () => {
    const topic = 'top3'
    const generator = ducks.createReportSaga(ducks.createOrderRequest(topic))

    it('should set the loading state to state', () => {
      expect(generator.next().value).toEqual(put(ducks.createReportProcessing()))
    })

    it('should create the target report from backend', () => {
      expect(generator.next().value).toEqual(call(apis.postTask, topic))
    })
    it('should get the status from backend', () => {
      const response = {
        data: {
          id: 1
        }
      }
      expect(generator.next(response).value).toEqual(call(apis.getTaskStatus, response.data.id))
    })

    it('should wait a second', () => {
      const response = {
        data: {
          state: 'PENDING'
        }
      }
      expect(generator.next(response).value).toEqual(delay(1000))
    })

    it('should get the status from backend', () => {
      const response = {
        data: {
          id: 1
        }
      }
      expect(generator.next(response).value).toEqual(call(apis.getTaskStatus, response.data.id))
    })

    it('should download the report from backend', () => {
      const response = {
        data: {
          state: 'SUCCESS'
        }
      }
      expect(generator.next(response).value).toEqual(call(apis.downloadTaskResult, 1))
    })

    it('should notify the success', () => {
      expect(generator.next().value).toEqual(put(ducks.createReportSuccess()))
    })
  })
})

