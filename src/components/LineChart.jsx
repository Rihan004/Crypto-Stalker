import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
const LineChart = ({histroicalData}) => {
    const [data, setData] = useState([["Date" ,"price"]]);
    useEffect(() => {
      let datacopy = [["Date" ,"price"]];
      if(histroicalData.prices){
        histroicalData.prices.map((item , index)=>{
            datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0 ,-5)}`, item[1]])
        })
        setData(datacopy)
      }
    }, [histroicalData]);
    
  return (
    <Chart 
      chartType='LineChart'
      data={data}
      legendToggle
    />
  )
}

export default LineChart
