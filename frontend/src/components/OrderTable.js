import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createSelector} from '@reduxjs/toolkit'
import {Button, Popconfirm, Spin, Table} from 'antd'

import * as ducks from '../duck'

export function OrderTable({loading, orders, deleteOrder}) {

  const columns = [
    {
      title: '訂單 ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '產品',
      key: 'productName',
      dataIndex: 'productName',
    },
    {
      title: '購買數量',
      key: 'qty',
      dataIndex: 'qty',
    },
    {
      title: '商品單價',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Customer ID',
      key: 'customerId',
      dataIndex: 'customerId',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, order) => (
        <Popconfirm
          title="你確定要刪除嗎？"
          onConfirm={() => deleteOrder(order.id)}
          okText="刪除"
          cancelText="取消"
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={orders}/>
    </Spin>
  )
}

const selectOrders = createSelector(
  ducks.getOrders,
  ducks.isShopsLoading,
  ducks.isProductsLoading,
  ducks.getShopMap,
  ducks.selectProductMap,
  (orders, isShopsFetching, isProductsFetching, shopMap, productMap) => (isShopsFetching || isProductsFetching) ? [] : orders
    .map(order => ({
      key: order.id,
      id: order.id,
      productName: productMap[order.productId] ? productMap[order.productId].name : null,
      qty: order.qty,
      price: order.price,
      shopName: productMap[order.productId] ? shopMap[productMap[order.productId].shopId].name : null,
      customerId: order.customerId,
    }))
)


export default function () {
  const orders = useSelector(selectOrders)
  const loading = useSelector(ducks.isOrdersLoading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ducks.fetchShopsRequest())
    dispatch(ducks.fetchProductsRequest())
    dispatch(ducks.fetchOrdersRequest())
  }, [dispatch])

  const deleteOrder = useCallback(orderId => dispatch(ducks.deleteOrderRequest(orderId)), [dispatch])

  return (
    <OrderTable loading={loading} orders={orders} deleteOrder={deleteOrder}/>
  )
}
