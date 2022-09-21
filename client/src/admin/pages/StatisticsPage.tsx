import React from 'react'
import useGet from '../../hooks/useGet'
import { HourlyStatistics, MonthlyStatistics } from '../../types'
import BarChartCard from '../BarChartCard'
import LineChartCard from '../LineChartCard'


export default function StatisticsPage() {

  const [postMonthly] = useGet<MonthlyStatistics[]>('/admin/post-report-monthly')
  const [postHourly] = useGet<HourlyStatistics[]>('/admin/post-hourly')
  const [messageMonthly] = useGet<MonthlyStatistics[]>('/admin/message-report-monthly')
  const [messageHourly] = useGet<HourlyStatistics[]>('/admin/message-hourly')
  return (
    <div>
      <div style={{ fontSize: '24px', textAlign: 'center' }}>
        Number of posts per month
      </div>
      <div>
        <LineChartCard
          data={postMonthly}
        />
      </div>
      <div style={{ fontSize: '24px', textAlign: 'center' }}>
        Number of posts per hour
      </div>
      <div>
        <BarChartCard
          title='Posts'
          data={postHourly}
        />
      </div>
      <div style={{ fontSize: '24px', textAlign: 'center' }}>
        Number of messages per month
      </div>
      <div>
        <LineChartCard
          data={messageMonthly}
        />
      </div>
      <div style={{ fontSize: '24px', textAlign: 'center' }}>
        Number of messages per hour
      </div>
      <div>
        <BarChartCard
          title='Messages'
          data={messageHourly}
        />
      </div>
    </div>
  )
}
