export default function Position({ data }: any) {
  // const [tokenData, solPrice] = data;
  // let pnl = 0;
  // let pnlperc = 0;
  // if (data) {
  //   pnl =
  //     tokenData?.price * tokenData?.amount -
  //     tokenData?.invested +
  //     tokenData?.sold;
  //   pnlperc = (pnl / (tokenData?.invested - tokenData?.sold)) * 100;
  // }

  const [tokenData, solPrice] = data;
let pnl = 0;
let pnlperc = 0;

if (tokenData) {
  const currentValue = tokenData.price * tokenData.amount; // Market value of holdings
  const totalInvested = tokenData.invested; // Amount spent on purchase
  const totalSold = tokenData.sold; // Revenue from sold tokens

  pnl = (currentValue + totalSold) - totalInvested;
  pnlperc = (pnl / totalInvested) * 100;
}


  // console.log({data}, "GGGGGGGGGGGG")

  return (
    <div className="text-sm items-center w-full">
      <div className="flex gap-2 w-full justify-between  border-b border-b-[#8c003e] p-3">
        <div>Invested</div>
        <div className="flex gap-1">
          <div>
            ${parseFloat((+tokenData?.invested).toFixed(3)) || 0}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-between  border-b border-b-[#8c003e] p-3">
        <div>Sold</div>
        <div className="flex gap-1">
          <div>${parseFloat(Number(tokenData?.sold).toFixed(3)) || 0}</div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-between  border-b border-b-[#8c003e] p-3">
        <div>Remaining</div>
        <div className="flex gap-1">
          <div>
            ${parseFloat((tokenData?.amount * +tokenData?.price).toFixed(3)) || 0}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-between  border-b border-b-[#8c003e] p-3">
        <div>{`PnL`}</div>
        <div className="flex gap-1 ">
          <div className={pnl > 0 ? "text-green-500" : pnl < 0 ? "text-red-500" : "text-white"}>
            ${parseFloat(pnl.toFixed(4)) || 0}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-between  border-b border-b-[#8c003e] p-3">
        <div>{`PnL`}</div>
        <div className="flex gap-1">
          <div className={pnl > 0 ? "text-green-500" : pnl < 0 ? "text-red-500" : "text-white"}>
            {parseFloat(pnlperc.toFixed(4)) || 0}%
          </div>
        </div>
      </div>
    </div>
  );
}
