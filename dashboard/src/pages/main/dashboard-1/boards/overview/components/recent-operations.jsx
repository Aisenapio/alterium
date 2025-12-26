
"use client"

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
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

// Generate realistic mock data for general operations
const generateOperationsData = () => {
    const types = ["Арбитраж", "Покупка", "Продажа", "Депозит", "Вывод"]
    const assets = ["BTC", "ETH", "USDT", "SOL", "ADA", "XRP"]
    const statuses = ["success", "processing", "failed"]

    return Array.from({ length: 124 }).map((_, i) => {
        const type = types[Math.floor(Math.random() * types.length)]
        const asset = assets[Math.floor(Math.random() * assets.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const amount = (Math.random() * 5000).toFixed(2)
        const isPositive = ["Депозит", "Продажа", "Арбитраж"].includes(type)

        return {
            id: `op_${i + 1}`,
            type,
            asset,
            amount: parseFloat(amount),
            status,
            date: `2024-05-${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')} ${Math.floor(Math.random() * 23).toString().padStart(2, '0')}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
            isPositive
        }
    })
}

const operationsData = generateOperationsData()

export default function RecentOperations() {
    const [currentPage, setCurrentPage] = useState(1)
    // Fixed items per page since selector is removed
    const itemsPerPage = 10

    const totalPages = Math.ceil(operationsData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = operationsData.slice(startIndex, endIndex)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    const getStatusConfig = (status) => {
        switch (status) {
            case "success": return { label: "Успех", variant: "outline" }
            case "processing": return { label: "Процесс", variant: "secondary" }
            case "failed": return { label: "Ошибка", variant: "destructive" }
            default: return { label: status, variant: "outline" }
        }
    }

    return (
        <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex-none p-6 pb-1">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">Недавние операции</CardTitle>
                        <CardDescription>Последние действия и транзакции</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent border-b border-border/50">
                            <TableHead className="h-9 text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-6">Тип</TableHead>
                            <TableHead className="h-9 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Актив</TableHead>
                            <TableHead className="h-9 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Объем</TableHead>
                            <TableHead className="h-9 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Статус</TableHead>
                            <TableHead className="h-9 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right pr-6">Дата</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((item) => {
                                const statusInfo = getStatusConfig(item.status)
                                return (
                                    <TableRow key={item.id} className="hover:bg-muted/30 border-b border-border/50 last:border-0">
                                        <TableCell className="py-1 font-medium text-foreground pl-6">
                                            {item.type}
                                        </TableCell>
                                        <TableCell className="py-1">
                                            <Badge variant="outline" className="font-mono text-[10px] tracking-wider text-muted-foreground">
                                                {item.asset}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-1 text-right font-mono font-bold">
                                            <span className="text-foreground">
                                                {item.isPositive ? "+" : "-"}${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-1">
                                            <Badge variant={statusInfo.variant}>
                                                {statusInfo.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-1 text-right text-xs text-muted-foreground pr-6">
                                            {item.date}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Нет данных
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4 bg-background/50">
                <div className="text-sm text-muted-foreground">
                    {startIndex + 1}-{Math.min(endIndex, operationsData.length)} из {operationsData.length}
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
                        Страница {currentPage}
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
