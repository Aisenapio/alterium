
import { useState, useMemo } from "react"
import { IconTrendingUp, IconTrendingDown, IconPlus, IconSearch, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Header } from "@/components/layout/header"
import { availableCryptos } from "@/pages/main/dashboard-1/boards/overview/data/data"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const timeRanges = [
    { label: "1Д", value: "1d" },
    { label: "7Д", value: "7d" },
    { label: "1М", value: "1m" },
    { label: "3М", value: "3m" },
    { label: "6М", value: "6m" },
    { label: "1Г", value: "1y" },
    { label: "5Л", value: "5y" },
    { label: "MAX", value: "max" },
]

// Enhanced mock data generator based on range
const generateChartData = (basePrice, range) => {
    let price = basePrice
    let points = 50
    let volatility = 0.02

    switch (range) {
        case "1d": points = 24; volatility = 0.01; break;
        case "7d": points = 7; volatility = 0.03; break;
        case "1m": points = 30; volatility = 0.05; break;
        case "3m": points = 45; volatility = 0.08; break; // ~every 2 days
        case "6m": points = 60; volatility = 0.12; break; // ~every 3 days
        case "1y": points = 52; volatility = 0.20; break; // weekly
        case "5y": points = 60; volatility = 0.40; break; // monthly
        case "max": points = 100; volatility = 0.60; break;
    }

    return Array.from({ length: points }, (_, i) => {
        const change = (Math.random() - 0.48) * volatility // Slight upward drift
        price = price * (1 + change)

        let timeLabel = ""
        if (range === "1d") timeLabel = `${i}:00`
        else if (range === "7d") timeLabel = `День ${i + 1}`
        else if (range.includes("m") || range === "1y") timeLabel = `Нед ${i + 1}`
        else timeLabel = `Год ${i + 1}`

        return {
            time: timeLabel,
            price: price,
        }
    })
}

export default function MarketPage() {
    const [selectedCoin, setSelectedCoin] = useState(availableCryptos[0])
    const [timeRange, setTimeRange] = useState("1d")

    // State for instruments management
    const [visibleCryptos, setVisibleCryptos] = useState(availableCryptos)
    const [isManageModalOpen, setIsManageModalOpen] = useState(false)
    const [modalSearchQuery, setModalSearchQuery] = useState("")

    // Memoize chart data so it doesn't regenerate on every render
    const chartData = useMemo(() => {
        return generateChartData(selectedCoin.stats, timeRange)
    }, [selectedCoin, timeRange])

    const startPrice = chartData[0]?.price || 0
    const endPrice = chartData[chartData.length - 1]?.price || 0
    const priceChange = endPrice - startPrice
    const priceChangePercent = (priceChange / startPrice) * 100
    const isPositive = priceChange >= 0

    // Filter logic for the modal list
    const filteredModalCryptos = availableCryptos.filter(coin =>
        coin.label.toLowerCase().includes(modalSearchQuery.toLowerCase())
    )

    const toggleCryptoVisibility = (label) => {
        const isVisible = visibleCryptos.some(c => c.label === label)
        if (isVisible) {
            // Cannot remove the currently selected coin
            if (visibleCryptos.length > 1 && label !== selectedCoin.label) {
                setVisibleCryptos(visibleCryptos.filter(c => c.label !== label))
            }
        } else {
            const coinToAdd = availableCryptos.find(c => c.label === label)
            if (coinToAdd) {
                setVisibleCryptos([...visibleCryptos, coinToAdd])
            }
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col gap-6 p-6 h-[calc(100vh-4rem)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Рынок</h1>
                        <p className="text-muted-foreground">
                            Обзор состояния рынка криптовалют.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
                    {/* Main Chart Section */}
                    <Card className="lg:col-span-2 flex flex-col">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <selectedCoin.icon size={28} className="text-primary" />
                                        <span>{selectedCoin.label}</span>
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-bold font-mono">
                                            ${endPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                        <span className={cn(
                                            "flex items-center text-sm font-medium px-2 py-0.5 rounded",
                                            isPositive ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                                        )}>
                                            {isPositive ? '+' : ''}{priceChange.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({priceChangePercent.toFixed(2)}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Time Range Selector */}
                                <div className="flex items-center p-1 bg-muted rounded-lg overflow-x-auto max-w-full">
                                    {timeRanges.map((range) => (
                                        <button
                                            key={range.value}
                                            onClick={() => setTimeRange(range.value)}
                                            className={cn(
                                                "px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                                                timeRange === range.value
                                                    ? "bg-background text-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                            )}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-[400px] p-0 pb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={isPositive ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)"} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={isPositive ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)"} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                                    <XAxis
                                        dataKey="time"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        domain={['auto', 'auto']}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                                        width={60}
                                        orientation="right"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: '1px solid hsl(var(--border))',
                                            background: 'hsl(var(--background) / 0.95)',
                                            backdropFilter: 'blur(4px)',
                                            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)'
                                        }}
                                        labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '0.25rem' }}
                                        formatter={(value) => [`$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Цена']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke={isPositive ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)"}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Market List */}
                    <Card className="flex flex-col h-full overflow-hidden">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle>Инструменты</CardTitle>
                                <CardDescription>Доступные активы</CardDescription>
                            </div>
                            <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <IconPlus size={16} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Управление инструментами</DialogTitle>
                                        <DialogDescription>
                                            Выберите криптовалюты, которые будут отображаться в списке.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-4 py-4">
                                        <div className="relative">
                                            <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Поиск монеты..."
                                                className="pl-8"
                                                value={modalSearchQuery}
                                                onChange={(e) => setModalSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 h-[300px] overflow-y-auto pr-2">
                                            {filteredModalCryptos.map((coin) => {
                                                const isVisible = visibleCryptos.some(c => c.label === coin.label)
                                                return (
                                                    <div key={coin.label} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50">
                                                        <Checkbox
                                                            id={`coin-${coin.label}`}
                                                            checked={isVisible}
                                                            onCheckedChange={() => toggleCryptoVisibility(coin.label)}
                                                        />
                                                        <label
                                                            htmlFor={`coin-${coin.label}`}
                                                            className="flex flex-1 items-center justify-between cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <coin.icon size={16} className="text-muted-foreground" />
                                                                <span>{coin.label}</span>
                                                            </div>
                                                            {isVisible && <span className="text-xs text-muted-foreground">Отображается</span>}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                            {filteredModalCryptos.length === 0 && (
                                                <p className="text-center text-sm text-muted-foreground py-4">Ничего не найдено</p>
                                            )}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="overflow-y-auto flex-1 pr-2">
                            <div className="space-y-2">
                                {visibleCryptos.map((coin) => (
                                    <div
                                        key={coin.label}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all hover:bg-muted/50 ${selectedCoin.label === coin.label ? 'bg-muted ring-1 ring-primary/20 border-primary/50' : 'border-transparent'}`}
                                        onClick={() => setSelectedCoin(coin)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-background rounded-lg border shadow-sm">
                                                <coin.icon size={18} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">{coin.label.split(' ')[0]}</div>
                                                <div className="text-xs text-muted-foreground">{coin.label.split('(')[1].replace(')', '')}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-sm">${coin.stats.toLocaleString()}</div>
                                            <div className={`text-xs flex items-center justify-end gap-1 ${coin.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {coin.type === 'up' ? '+' : ''}{coin.percentage}%
                                                {coin.type === 'up' ? <IconTrendingUp size={12} /> : <IconTrendingDown size={12} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {visibleCryptos.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>Список пуст.</p>
                                        <p className="text-xs">Добавьте инструменты через кнопку "+"</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
