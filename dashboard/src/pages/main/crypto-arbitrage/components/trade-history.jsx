
import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

// Generate realistic mock data
const generateData = () => {
    const assets = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "ADA/USDT", "XRP/USDT", "DOT/USDT", "AVAX/USDT"]
    const exchanges = ["Binance", "Coinbase", "Kraken", "Bybit", "Huobi", "KuCoin", "Gate.io"]
    const statuses = ["Completed", "Completed", "Completed", "Pending", "Failed"]

    return Array.from({ length: 124 }).map((_, i) => {
        const asset = assets[Math.floor(Math.random() * assets.length)]
        const buy = exchanges[Math.floor(Math.random() * exchanges.length)]
        let sell = exchanges[Math.floor(Math.random() * exchanges.length)]
        while (sell === buy) sell = exchanges[Math.floor(Math.random() * exchanges.length)]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const isProfit = status !== "Failed"

        return {
            id: i + 1,
            time: `${Math.floor(Math.random() * 23).toString().padStart(2, '0')}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
            route: { asset, buy, sell },
            unit: isProfit ? `+$${(Math.random() * 50).toFixed(2)}` : "-$0.00",
            rateDiff: isProfit ? `+${(Math.random() * 1.5).toFixed(2)}%` : `-${(Math.random() * 0.5).toFixed(2)}%`,
            peakRate: `${Math.floor(Math.random() * 200 + 50)}ms`,
            profit: isProfit ? (Math.random() * 200).toFixed(2) : 0,
            status
        }
    })
}

const tradeHistoryData = generateData()

export function TradeHistory() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState("10")

    const totalPages = Math.ceil(tradeHistoryData.length / parseInt(itemsPerPage))
    const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
    const endIndex = startIndex + parseInt(itemsPerPage)
    const currentData = tradeHistoryData.slice(startIndex, endIndex)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    const handlePageSizeChange = (value) => {
        setItemsPerPage(value)
        setCurrentPage(1) // Reset to first page on size change
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>История последних операций</CardTitle>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Показать:</span>
                    <Select value={itemsPerPage} onValueChange={handlePageSizeChange}>
                        <SelectTrigger className="w-[70px] h-8">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Время</TableHead>
                            <TableHead>Маршрут сделки</TableHead>
                            <TableHead>Юнит</TableHead>
                            <TableHead>Разница курса</TableHead>
                            <TableHead>Пикрейт</TableHead>
                            <TableHead className="text-right">Прибыль (USDT)</TableHead>
                            <TableHead className="text-right">Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs text-muted-foreground">{item.time}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{item.route.asset}</span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            {item.route.buy} &rarr; {item.route.sell}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-emerald-500 font-medium">
                                    {item.unit}
                                </TableCell>
                                <TableCell className={`font-mono font-medium ${item.rateDiff.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {item.rateDiff}
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                    {item.peakRate}
                                </TableCell>
                                <TableCell className="text-right font-bold font-mono">
                                    {item.profit > 0 ? '+' : ''}{item.profit}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={item.status === "Completed" ? "outline" : item.status === "Pending" ? "secondary" : "destructive"}>
                                        {item.status === "Completed" ? "Завершено" : item.status === "Pending" ? "В ожидании" : "Ошибка"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                    Показано {startIndex + 1}-{Math.min(endIndex, tradeHistoryData.length)} из {tradeHistoryData.length}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <IconChevronLeft className="h-4 w-4 mr-1" />
                        Назад
                    </Button>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        Страница {currentPage} из {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Вперед
                        <IconChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
