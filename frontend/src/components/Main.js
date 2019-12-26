import React from 'react'
import {Row, Col, Layout, Typography} from 'antd'

import NewOrderForm from './NewOrderForm'
import ProductTable from './ProductTable'
import OrderTable from './OrderTable'
import Toolbox from './Toolbox'

import styles from './Main.module.css'

const {Header, Content, Footer} = Layout;
const {Title} = Typography;


export default function Main() {
  return (
    <Layout>
      <Header className={styles.Header}>
        <Row type="flex" align="middle">
          <Col>
            <div className="logo"/>
          </Col>
          <Col>
            <Title className={styles.Title}>Urmart</Title>
          </Col>
        </Row>
      </Header>
      <Content className={styles.Content}>
        <div className={styles.FormSection}>
          <NewOrderForm/>
        </div>
        <div className={styles.TableSection}>
          <Title level={2}>商品列表</Title>
          <ProductTable/>
        </div>
        <div className={styles.TableSection}>
          <Title level={2}>訂單紀錄</Title>
          <OrderTable/>
        </div>
        <div className={styles.ToolboxSection}>
          <Toolbox/>
        </div>
      </Content>
      <Footer className={styles.Footer}>Copyright © 2019 - 兩大類</Footer>
    </Layout>
  )
}
