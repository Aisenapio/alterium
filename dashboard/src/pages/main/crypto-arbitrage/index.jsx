
import { useState } from "react"
import { IconRefresh, IconPlayerPlay, IconPlayerPause, IconSettings, IconPlus, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArbitrageCard } from "./components/arbitrage-card"
import { ArbitragePriceChart } from "./components/arbitrage-price-chart"
import { TradeHistory } from "./components/trade-history"
import { Header } from "@/components/layout/header"

// Base Mock Data
const baseOpportunities = [
    {
        symbol: 'BTC/USDT',
        prices: [
            { exchange: 'Binance', symbol: 'BTC/USDT', price: 42000 },
            { exchange: 'Coinbase', symbol: 'BTC/USDT', price: 42200 },
            { exchange: 'Kraken', symbol: 'BTC/USDT', price: 42150 },
            { exchange: 'Bybit', symbol: 'BTC/USDT', price: 42050 },
            { exchange: 'Huobi', symbol: 'BTC/USDT', price: 42180 },
        ],
        bestBuy: { exchange: 'Binance', symbol: 'BTC/USDT', price: 42000 },
        bestSell: { exchange: 'Coinbase', symbol: 'BTC/USDT', price: 42200 },
        spread: 200,
        spreadPercentage: 0.48,
        route: [
            { type: 'buy', label: 'Покупка (Binance)', exchange: 'Binance', price: 42000 },
            { type: 'sell', label: 'Продажа (Coinbase)', exchange: 'Coinbase', price: 42200 }
        ],
        rateDifference: '+0.45%',
        liquidity: '$125,000',
        peakRate: '120ms',
        receivedTime: '14:20:45.100',
        completedTime: '14:20:45.220',
        executionRoute: [
            { type: 'buy', label: 'Покупка (Executed)', exchange: 'Binance', price: 42005 },
            { type: 'sell', label: 'Продажа (Executed)', exchange: 'Coinbase', price: 42195 }
        ]
    },
    {
        symbol: 'ETH Complex',
        prices: [
            { exchange: 'Binance', symbol: 'ETH/USDT', price: 2205 },
            { exchange: 'Coinbase', symbol: 'ETH/USDT', price: 2210 },
            { exchange: 'Kraken', symbol: 'ETH/USDT', price: 2200 },
            { exchange: 'Bybit', symbol: 'ETH/USDT', price: 2215 },
            { exchange: 'Huobi', symbol: 'ETH/USDT', price: 2208 },
        ],
        bestBuy: { exchange: 'Kraken', symbol: 'ETH/USDT', price: 2200 },
        bestSell: { exchange: 'Bybit', symbol: 'ETH/USDT', price: 2215 },
        spread: 45,
        spreadPercentage: 1.25,
        route: [
            { type: 'buy', label: 'Шаг 1: Покупка', exchange: 'Kraken', price: 2200 },
            { type: 'neutral', label: 'Шаг 2: Перевод', exchange: 'Wallet', price: 2202 },
            { type: 'sell', label: 'Шаг 3: Продажа', exchange: 'Bybit', price: 2215 }
        ],
        rateDifference: '-0.15%',
        liquidity: '$42,500',
        peakRate: '350ms',
        receivedTime: '14:21:10.050',
        completedTime: '14:21:10.400',
        executionRoute: [
            { type: 'buy', label: 'Шаг 1: Исполнено', exchange: 'Kraken', price: 2201 },
            { type: 'neutral', label: 'Шаг 2: Перевод', exchange: 'Wallet', price: 2202 },
            { type: 'sell', label: 'Шаг 3: Исполнено', exchange: 'Bybit', price: 2212 }
        ]
    },
    {
        symbol: 'SOL/USDT',
        prices: [
            { exchange: 'Binance', symbol: 'SOL/USDT', price: 95.5 },
            { exchange: 'Coinbase', symbol: 'SOL/USDT', price: 96.2 },
            { exchange: 'Kraken', symbol: 'SOL/USDT', price: 95.8 },
            { exchange: 'Bybit', symbol: 'SOL/USDT', price: 95.2 },
            { exchange: 'Huobi', symbol: 'SOL/USDT', price: 96.0 },
        ],
        bestBuy: { exchange: 'Bybit', symbol: 'SOL/USDT', price: 95.2 },
        bestSell: { exchange: 'Coinbase', symbol: 'SOL/USDT', price: 96.2 },
        spread: 1.0,
        spreadPercentage: 1.05,
        route: [
            { type: 'buy', label: 'Покупка (Low)', exchange: 'Bybit', price: 95.2 },
            { type: 'sell', label: 'Продажа (High)', exchange: 'Coinbase', price: 96.2 }
        ],
        rateDifference: '+0.95%',
        liquidity: '$15,200',
        peakRate: '50ms',
        receivedTime: '14:22:15.000',
        completedTime: '14:22:15.050',
        executionRoute: [
            { type: 'buy', label: 'Покупка (Executed)', exchange: 'Bybit', price: 95.3 },
            { type: 'sell', label: 'Продажа (Executed)', exchange: 'Coinbase', price: 96.1 }
        ]
    },
    {
        symbol: 'ADA/USDT',
        prices: [
            { exchange: 'Binance', symbol: 'ADA/USDT', price: 0.55 },
            { exchange: 'Coinbase', symbol: 'ADA/USDT', price: 0.56 },
            { exchange: 'Kraken', symbol: 'ADA/USDT', price: 0.54 },
        ],
        bestBuy: { exchange: 'Kraken', symbol: 'ADA/USDT', price: 0.54 },
        bestSell: { exchange: 'Coinbase', symbol: 'ADA/USDT', price: 0.56 },
        spread: 0.02,
        spreadPercentage: 3.7,
        route: [
            { type: 'buy', label: 'Покупка (Low)', exchange: 'Kraken', price: 0.54 },
            { type: 'sell', label: 'Продажа (High)', exchange: 'Coinbase', price: 0.56 }
        ],
        rateDifference: '-1.20%',
        liquidity: '$8,400',
        peakRate: '210ms',
        receivedTime: '14:23:05.100',
        completedTime: '14:23:05.310',
        executionRoute: [
            { type: 'buy', label: 'Покупка (Executed)', exchange: 'Kraken', price: 0.542 },
            { type: 'sell', label: 'Продажа (Executed)', exchange: 'Coinbase', price: 0.558 }
        ]
    }
]

// Generate 50 items for pagination demo
const mockOpportunities = Array.from({ length: 50 }).map((_, i) => {
    const base = baseOpportunities[i % baseOpportunities.length]
    return {
        ...base,
        symbol: `${base.symbol.split(' ')[0]} #${i + 1}`, // Make symbol unique-ish
        id: `opp-${i}`
    }
})

export default function BotManagementPage() {
    const [loading, setLoading] = useState(false)
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString())
    const [botActive, setBotActive] = useState(true)
    const [riskLevel, setRiskLevel] = useState([30])

    // State for visible charts. Default to first 2.
    const [visibleCharts, setVisibleCharts] = useState(["BTC/USDT #1", "ETH #2"])
    const [isAddChartOpen, setIsAddChartOpen] = useState(false)

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(mockOpportunities.length / itemsPerPage)

    const handleAddChart = (symbol) => {
        if (!visibleCharts.includes(symbol)) {
            setVisibleCharts([...visibleCharts, symbol])
        }
        setIsAddChartOpen(false)
    }

    const availableToAdd = mockOpportunities.slice(0, 5).filter(o => !visibleCharts.includes(o.symbol))

    const handleRefresh = () => {
        setLoading(true)
        // Simulate fetch
        setTimeout(() => {
            setLastUpdated(new Date().toLocaleTimeString())
            setLoading(false)
        }, 1000)
    }

    // Pagination Logic
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    const currentOpportunities = mockOpportunities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const getRiskLabel = (value) => {
        if (value < 25) return { text: "Консервативный", color: "bg-emerald-500", desc: "Минимальные риски, стабильный доход" }
        if (value < 50) return { text: "Умеренный", color: "bg-blue-500", desc: "Баланс между риском и прибылью" }
        if (value < 75) return { text: "Агрессивный", color: "bg-orange-500", desc: "Повышенная доходность, выше риски" }
        return { text: "Деген", color: "bg-red-500", desc: "Максимальный риск и потенциальная прибыль" }
    }

    const riskInfo = getRiskLabel(riskLevel[0])

    return (
        <>
            <Header />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Управление Ботом</h1>
                        <p className="text-muted-foreground">
                            Настройка торговой стратегии и мониторинг.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-full border bg-muted/50 text-sm text-muted-foreground">
                            Обновлено: {lastUpdated}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRefresh}
                            className={loading ? "animate-spin" : ""}
                        >
                            <IconRefresh size={20} />
                        </Button>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Bot Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>Состояние бота</span>
                            </CardTitle>
                            <CardDescription>Основной переключатель работы алгоритма</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-16 w-16 rounded-full transition-all duration-300 hover:scale-105 ${botActive ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                        onClick={() => setBotActive(!botActive)}
                                    >
                                        {botActive ? <IconPlayerPause size={32} stroke={2.5} /> : <IconPlayerPlay size={32} stroke={2.5} />}
                                    </Button>
                                    <div>
                                        <h3 className="font-bold text-lg">{botActive ? "Запущен" : "Остановлен"}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {botActive ? "Бот активно ищет и исполняет арбитражные сделки." : "Торговля приостановлена. Мониторинг продолжается."}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Uptime</p>
                                        <p className="text-xl font-bold font-mono">24ч 12м</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Эффективность</p>
                                        <p className="text-xl font-bold font-mono text-blue-500">98.5%</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Risk Management Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Управление рисками</span>
                                <Badge className={`${riskInfo.color} hover:${riskInfo.color} text-white`}>
                                    {riskInfo.text} ({riskLevel}%)
                                </Badge>
                            </CardTitle>
                            <CardDescription>{riskInfo.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <Slider
                                value={riskLevel}
                                onValueChange={setRiskLevel}
                                max={100}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Low Risk</span>
                                <span>High Yield</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Курсы бирж</h2>
                        <Dialog open={isAddChartOpen} onOpenChange={setIsAddChartOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <IconPlus size={16} /> Добавить криптовалюту
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Добавить график</DialogTitle>
                                    <DialogDescription>
                                        Выберите криптовалюту для отображения графика сравнения цен.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    {availableToAdd.length > 0 ? (
                                        <div className="grid gap-2">
                                            {availableToAdd.map(opp => (
                                                <Button
                                                    key={opp.symbol}
                                                    variant="outline"
                                                    className="justify-start"
                                                    onClick={() => handleAddChart(opp.symbol)}
                                                >
                                                    {opp.symbol}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted-foreground">Все доступные графики уже добавлены.</p>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {visibleCharts.map(symbol => {
                            const data = mockOpportunities.find(o => o.symbol === symbol) || mockOpportunities[0]
                            return <ArbitragePriceChart key={symbol} data={data ? [data] : []} symbol={symbol} />
                        })}
                    </div>
                </div>

                {/* Active Operations Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold">Активные возможности</h2>
                            <Badge variant="secondary" className="text-xs">
                                {mockOpportunities.length} найдено
                            </Badge>
                        </div>
                    </div>

                    <div className="grid gap-6 grid-cols-1">
                        {currentOpportunities.map((opp) => (
                            <div key={opp.id} className="space-y-4">
                                <ArbitrageCard opportunity={opp} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                            Показано {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, mockOpportunities.length)} из {mockOpportunities.length}
                        </p>
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
                            <div className="text-sm font-medium">
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
                    </div>
                </div>

                {/* Trade History Section */}
                <div className="space-y-4 pt-6 border-t">
                    <TradeHistory />
                </div>
            </div>
        </>
    )
}
