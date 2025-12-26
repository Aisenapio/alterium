
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const arbitrageOpportunities = [
  {
    id: 1,
    coin: "BTC/USDT",
    buyExchange: "Binance",
    buyPrice: 42000,
    sellExchange: "Coinbase",
    sellPrice: 42200,
    spread: 0.48,
    profit: 200,
  },
  {
    id: 2,
    coin: "ETH/USDT",
    buyExchange: "Kraken",
    buyPrice: 2200,
    sellExchange: "Bybit",
    sellPrice: 2215,
    spread: 0.68,
    profit: 15,
  },
  {
    id: 3,
    coin: "SOL/USDT",
    buyExchange: "Huobi",
    buyPrice: 95.5,
    sellExchange: "Binance",
    sellPrice: 96.2,
    spread: 0.73,
    profit: 0.7,
  },
  {
    id: 4,
    coin: "XRP/USDT",
    buyExchange: "Coinbase",
    buyPrice: 0.55,
    sellExchange: "Kraken",
    sellPrice: 0.56,
    spread: 1.82,
    profit: 0.01,
  },
]

export function ArbitrageTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Арбитражные возможности в реальном времени</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Монета</TableHead>
              <TableHead>Биржа покупки</TableHead>
              <TableHead>Цена покупки</TableHead>
              <TableHead>Биржа продажи</TableHead>
              <TableHead>Цена продажи</TableHead>
              <TableHead>Спред (%)</TableHead>
              <TableHead>Расч. прибыль</TableHead>
              <TableHead className="text-right">Действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arbitrageOpportunities.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.coin}</TableCell>
                <TableCell>{item.buyExchange}</TableCell>
                <TableCell>${item.buyPrice.toLocaleString()}</TableCell>
                <TableCell>{item.sellExchange}</TableCell>
                <TableCell>${item.sellPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={item.spread > 1 ? "default" : "secondary"}>
                    {item.spread}%
                  </Badge>
                </TableCell>
                <TableCell>${item.profit.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Выполнить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
