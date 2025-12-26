
import Stats from "./components/stats"
import RecentOperations from "./components/recent-operations"
import WalletBalanceChart from "./components/wallet-balance-chart"
import { useState } from "react"

export default function Overview() {
  const [range, setRange] = useState("30d")

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletBalanceChart range={range} onRangeChange={setRange} />
        <RecentOperations />
      </div>

      <div className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Stats range={range} />
      </div>
    </div>
  )
}
