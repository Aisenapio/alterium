"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const chartConfig = {
    balance: {
        label: "Баланс",
        color: "#10b981",
    },
}

// Mock data generation
const generateData = (points, startValue, volatility) => {
    let currentValue = startValue
    return Array.from({ length: points }, (_, i) => {
        const change = (Math.random() - 0.45) * volatility // Slight upward trend
        currentValue = currentValue * (1 + change)
        return {
            date: `Day ${i + 1}`,
            balance: Math.round(currentValue),
        }
    })
}

const data7d = [
    { date: "Пн", balance: 95400 },
    { date: "Вт", balance: 96200 },
    { date: "Ср", balance: 95800 },
    { date: "Чт", balance: 97500 },
    { date: "Пт", balance: 101200 },
    { date: "Сб", balance: 103500 },
    { date: "Вс", balance: 105152 },
]

const data30d = generateData(30, 85000, 0.02).map((d, i) => ({ ...d, date: `${i + 1} июн` }))
const data3m = generateData(12, 60000, 0.05).map((d, i) => ({ ...d, date: `Нед ${i + 1}` }))
const data1y = [
    { date: "Янв", balance: 45000 },
    { date: "Фев", balance: 52000 },
    { date: "Мар", balance: 48000 },
    { date: "Апр", balance: 61000 },
    { date: "Май", balance: 58000 },
    { date: "Июн", balance: 65000 },
    { date: "Июл", balance: 72000 },
    { date: "Авг", balance: 69000 },
    { date: "Сен", balance: 85000 },
    { date: "Окт", balance: 92000 },
    { date: "Ноя", balance: 98000 },
    { date: "Дек", balance: 105152 },
]

const chartDataMap = {
    "7d": data7d,
    "30d": data30d,
    "3m": data3m,
    "1y": data1y,
}

export default function WalletBalanceChart({ range = "30d", onRangeChange }) {

    const data = chartDataMap[range]
    const startBalance = data[0].balance
    const currentBalance = data[data.length - 1].balance
    const diff = currentBalance - startBalance
    const percentage = ((diff / startBalance) * 100).toFixed(2)
    const isPositive = diff >= 0

    return (
        <Card className="h-full w-full">
            <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">Общий баланс кошелька</CardTitle>
                        <CardDescription>Динамика изменения баланса за выбранный период</CardDescription>
                        <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-4xl font-bold">
                                ${currentBalance.toLocaleString()}
                            </span>
                            <span className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                {isPositive ? '+' : ''}{diff.toLocaleString()} ({percentage}%)
                            </span>
                        </div>
                    </div>

                    <Tabs
                        onValueChange={onRangeChange}
                        defaultValue="30d"
                        value={range}
                        className="w-full sm:w-auto"
                    >
                        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                            <TabsTrigger value="7d">7 дней</TabsTrigger>
                            <TabsTrigger value="30d">30 дней</TabsTrigger>
                            <TabsTrigger value="3m">3 мес</TabsTrigger>
                            <TabsTrigger value="1y">1 год</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6">
                <div className="h-[300px] w-full">
                    <ChartContainer
                        className="h-full w-full"
                        config={chartConfig}
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartDataMap[range]}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                width={60}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey="balance"
                                type="monotone"
                                fill="url(#fillBalance)"
                                fillOpacity={0.4}
                                stroke="var(--color-balance)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
