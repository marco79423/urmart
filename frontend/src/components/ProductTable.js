import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createSelector} from '@reduxjs/toolkit'
import {Checkbox, Spin, Table} from 'antd'

import * as ducks from '../ducks'


export function ProductTable({loading, products}) {

  const columns = [
    {
      title: '商品 ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '商品名稱',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '商品庫存數量',
      key: 'stockPcs',
      dataIndex: 'stockPcs',
    },
    {
      title: '商品單價',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '館別',
      key: 'shopName',
      dataIndex: 'shopName',
    },
    {
      title: 'VIP',
      key: 'vip',
      dataIndex: 'vip',
      render: (vip) => {
        return <Checkbox defaultChecked={vip} disabled/>
      }
    },
  ]

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={products}/>
    </Spin>
  )
}

const selectProducts = createSelector(
  ducks.getProducts,
  ducks.getShopMap,
  (products, shopMap) => products
    .map(product => ({
      key: product.id,
      id: product.id,
      name: product.name,
      stockPcs: product.stockPcs,
      price: product.price,
      shopName: shopMap[product.shopId] ? shopMap[product.shopId].name : null,
      vip: product.vip,
    }))
)

export default function () {
  const products = useSelector(selectProducts)
  const loading = useSelector(ducks.isProductsLoading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ducks.fetchProductsRequest())
  }, [dispatch])

  return (
    <ProductTable loading={loading} products={products}/>
  )
}
