import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthlyStatistics } from "../types";

let values: number[] = [];
for (let i = 0; i < 12; i++) {
  values.push(moment().month(i).startOf("month").valueOf());
}
const month = moment().startOf("month").valueOf();
interface Props {
  data?: MonthlyStatistics[],
  aspect?: number,
}

export default function LineChartCard(props: Props) {
  let years = Object.keys((props.data || []).reduce((acc, val) => {
    acc[val.year] = true
    return acc;
  }, {} as any)).map(e => Number(e));
  return (
    <ResponsiveContainer width="100%" aspect={props.aspect || (16 / 9)}>
      <LineChart data={(props.data || []).map(resolve)}>
        <XAxis
          domain={domain}
          ticks={values}
          type="number"
          dataKey="interval"
          scale="time"
          tickFormatter={format}
        />
        <YAxis />
        <ReferenceLine stroke="#BC2C3D" strokeDasharray="6 4" x={month} />
        <Tooltip
          labelFormatter={() => ""}
        />
        <CartesianGrid vertical={false} />
        {years.map((year) => {
          return (
            <Line key={year} isAnimationActive={false} name={year + ''} type="monotone" dataKey={"value" + year} stroke="#142041" />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
const domain = [moment().startOf("year").valueOf(), moment().endOf("year").startOf("month").valueOf()];
function format(time: string | Date) {
  return moment(time).format("MMM");
}
function resolve(item: MonthlyStatistics) {
  return {
    ["value" + item.year]: item.value,
    interval: moment().month(item.month - 1).startOf('month').valueOf(),
  };
}
