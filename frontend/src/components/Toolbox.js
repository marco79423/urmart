import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Col, message, Row} from 'antd'

import * as ducks from '../ducks'

import styles from './Toolbox.module.css'

export function Toolbox({createReportTask, downloadTop3Report, downloadStatisticsByShopReport}) {
  const loading = createReportTask.loading

  useEffect(() => {
    if (createReportTask.error) {
      message.error(createReportTask.error.message);
    }
  }, [createReportTask.error])

  return (
    <Row type="flex">
      <Col><Button loading={loading} className={styles.button} onClick={downloadTop3Report}>Top3</Button></Col>
      <Col><Button loading={loading} className={styles.button} onClick={downloadStatisticsByShopReport}>各館統計</Button></Col>
    </Row>
  )
}

export default function () {
  const dispatch = useDispatch()
  const createReportTask = useSelector(ducks.getCreateReportTask)
  const downloadTop3Report = useCallback(() => dispatch(ducks.createReportRequest('top3')), [dispatch])
  const downloadStatisticsByShopReport = useCallback(() => dispatch(ducks.createReportRequest('statistics_by_shop')), [dispatch])

  return (
    <Toolbox
      createReportTask={createReportTask}
      downloadTop3Report={downloadTop3Report}
      downloadStatisticsByShopReport={downloadStatisticsByShopReport}
    />
  )
}
