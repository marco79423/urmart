import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Cascader, Checkbox, Col, Form, Input, InputNumber, message, Row, Tooltip} from 'antd'
import {createSelector} from '@reduxjs/toolkit'

import * as ducks from '../duck'


export function NewOrderForm({form, productOptions, createOrder, createOrderTask}) {
  useEffect(() => {
    if (createOrderTask.error) {
      message.error(createOrderTask.error.message);
    }
  }, [createOrderTask.error])

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      createOrder({
        productId: values.shopIdAndProductId[1],
        qty: values.qty,
        customerId: +values.customerId,
        vip: !!values.vip,
      })
    })
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Row type="flex" justify="space-between">
        <Col span={18}>
          <Form.Item>
            {form.getFieldDecorator('shopIdAndProductId', {
              rules: [{required: true, message: '請選擇商品'}],
            })(
              <Cascader options={productOptions} placeholder="商品"/>,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('qty', {
              rules: [{required: true, message: '請選擇個數'}],
            })(
              <InputNumber min={1} placeholder="個數"/>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createOrderTask.loading}>新增</Button>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Tooltip
              trigger={['focus']}
              title={'輸入任意數字即可'}
              placement="topLeft"
              overlayClassName="numeric-input"
            >{form.getFieldDecorator('customerId', {
              rules: [{
                required: true,
                transform: value => +value,
                pattern: /\d+/,
                message: '請指定 Customer ID'
              }],
            })(<Input placeholder="Customer ID"/>)}
            </Tooltip>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('vip', {
              valuePropName: 'checked',
            })(
              <Checkbox>是否為 VIP 身份</Checkbox>,
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

const getProductOptions = createSelector(
  ducks.isShopsFetching,
  ducks.isProductsFetching,
  ducks.getShops,
  ducks.getProducts,
  (isShopsFetching, isProductsFetching, shops, products) => (isShopsFetching || isProductsFetching) ? [] : shops
    .map(shop => ({
      value: shop.id,
      label: shop.name,
      children: products
        .filter(product => shop.id === product.shopId)
        .map(product => ({
          value: product.id,
          label: product.name,
        }))
    }))
)

export default Form.create({name: 'new-order'})(function ({form}) {
  const productOptions = useSelector(getProductOptions)
  const createOrderTask = useSelector(ducks.getCreateOrderTask)

  const dispatch = useDispatch()
  const createOrder = useCallback(orderData => dispatch(ducks.createOrderRequest(orderData)), [dispatch])

  useEffect(() => {
    dispatch(ducks.fetchShopsRequest())
    dispatch(ducks.fetchProductsRequest())
    dispatch(ducks.fetchOrdersRequest())
  }, [dispatch])

  return (
    <NewOrderForm form={form} productOptions={productOptions} createOrder={createOrder}
                  createOrderTask={createOrderTask}/>
  )
})
