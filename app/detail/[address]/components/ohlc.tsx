import { createChart, ColorType, PriceLineOptions } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { black } from "tailwindcss/colors";
import { formatNumber } from '../../../../lib/utils';

export default function ChartComponent(props: any) {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 18, 255, 0.28)",
    } = {},
  } = props;
  // console.log(data)
  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "rgb(10,10,10)" },
        textColor,
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    const myPriceLine: PriceLineOptions = {
      price: 0,
      color: "#3179F5",
      lineWidth: 2,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title: "price",
      lineVisible: true,
      axisLabelColor: "white",
      axisLabelTextColor: "white",
    };
    // const myPriceFormatter = (p: number) => "$"+formatNumber(p).combined;
    const myPriceFormatter = (p: number) => "$"+p;
    chart.applyOptions({
      localization: {
          priceFormatter: myPriceFormatter,
      }
  });
  // candlestickSeries.setMarkers([
  //   {
  //     time: data[data.length - 1].time, // Place marker at the latest price
  //     position: "aboveBar",
  //     color: "#8c003e",
  //     shape: "circle",
  //     text: `$${data[data.length - 1].close}`, // Custom price label inside chart
  //   },
  // ]);
  
    candlestickSeries.createPriceLine(myPriceLine);
    candlestickSeries.setData(data);
    candlestickSeries.priceScale().applyOptions({
      autoScale: true, // disables auto scaling based on visible content
      // position: 'left'
    });
    chart.timeScale().fitContent();
    chart.timeScale().applyOptions({
      barSpacing: 25,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    
    <div className="relative">
    {/* <div>
      <p>Open:  {data[data.length-1].open}</p>
      <p>Close: {data[data.length-1].close}</p>
      <p>High:  {data[data.length-1].high}</p>
      <p>Low:   {data[data.length-1].low}</p>
      </div>   */}
      {/* <div className="absolute top-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white z-10 flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{data[0].open} {data[0].open}</h3>
          <p className="text-sm">Mint: {data[0].open}</p>
        </div>
        <div className="text-right">
          <p>Price: ${data[0].open}</p>
          <p>Invested: ${data[0].open}</p>
          <p>Sold: ${data[0].open}</p>
        </div>
      </div> */}

      <div className="border-ton-blue-900" ref={chartContainerRef} />
      {/* {data.length > 0 && (
    <div
      className="absolute top-4 right-4 bg-black text-white px-2 py-1 rounded z-[99]"
    >
      ${data[data.length - 1].close}
    </div>
  )} */}
    </div>
  )
}
