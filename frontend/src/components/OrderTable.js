import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Popconfirm, Table} from 'antd'

import {
  deleteOrderRequest,
  fetchOrdersRequest,
  fetchProductsRequest,
  fetchShopsRequest,
  getOrders,
  getShopMap,
  isProductsFetching,
  isShopsFetching,
  selectProductMap
} from '../duck'
import {createSelector} from '@reduxjs/toolkit'

export function OrderTable({orders, deleteOrder}) {

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
    <Table columns={columns} dataSource={orders}/>
  )
}

const selectOrders = createSelector(
  getOrders,
  isShopsFetching,
  isProductsFetching,
  getShopMap,
  selectProductMap,
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

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchShopsRequest())
    dispatch(fetchProductsRequest())
    dispatch(fetchOrdersRequest())
  }, [dispatch])

  const deleteOrder = orderId => dispatch(deleteOrderRequest(orderId))

  return (
    <OrderTable orders={orders} deleteOrder={deleteOrder}/>
  )
}
