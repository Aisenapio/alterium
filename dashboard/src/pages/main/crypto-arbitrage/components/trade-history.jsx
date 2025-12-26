
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tradeHistory = [
    {
        id: 1,
        time: "2023-10-27 10:30:00",
        coin: "BTC/USDT",
        buyExchange: "Binance",
        sellExchange: "Coinbase",
        profit: 180,
        status: "Completed",
    },
    {
        id: 2,
        time: "2023-10-27 10:25:00",
        coin: "ETH/USDT",
        buyExchange: "Kraken",
        sellExchange: "Bybit",
        profit: 12,
        status: "Completed",
    },
    {
        id: 3,
        time: "2023-10-27 10:15:00",
        coin: "SOL/USDT",
        buyExchange: "Huobi",
        sellExchange: "Binance",
        profit: 0.5,
        status: "Pending",
    },
]

export function TradeHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>История последних сделок</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Время</TableHead>
                            <TableHead>Монета</TableHead>
                            <TableHead>Биржа покупки</TableHead>
                            <TableHead>Биржа продажи</TableHead>
                            <TableHead>Прибыль (USDT)</TableHead>
                            <TableHead>Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tradeHistory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.time}</TableCell>
                                <TableCell className="font-medium">{item.coin}</TableCell>
                                <TableCell>{item.buyExchange}</TableCell>
                                <TableCell>{item.sellExchange}</TableCell>
                                <TableCell className="text-green-600 font-bold">
                                    +{item.profit}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.status === "Completed" ? "outline" : "secondary"}>
                                        {item.status === "Completed" ? "Завершено" : "В ожидании"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
