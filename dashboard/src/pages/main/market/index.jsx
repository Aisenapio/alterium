
import { useState } from "react"
import { IconSearch, IconTrendingUp, IconTrendingDown, IconChartBar } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { availableCryptos } from "@/pages/main/dashboard-1/boards/overview/data/data"

// Extended mock data for the main chart
const generateChartData = (basePrice) => {
    let price = basePrice
    return Array.from({ length: 50 }, (_, i) => {
        price = price * (1 + (Math.random() - 0.45) * 0.05)
        return {
            time: `${10 + i}:00`,
            price: price
        }
    })
}

const mainChartData = generateChartData(96500)

export default function MarketPage() {
    const [selectedCoin, setSelectedCoin] = useState(availableCryptos[0])
    const [searchQuery, setSearchQuery] = useState("")

    const filteredCoins = availableCryptos.filter(coin =>
        coin.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-6 p-6 h-[calc(100vh-4rem)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Рынок</h1>
                    <p className="text-muted-foreground">
                        Обзор состояния рынка криптовалют.
                    </p>
                </div>
                <div className="relative w-full md:w-64">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Поиск..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
                {/* Main Chart Section */}
                <Card className="lg:col-span-2 flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <selectedCoin.icon size={24} className="text-primary" />
                                    {selectedCoin.label}
                                </CardTitle>
                                <CardDescription>График цены (24ч)</CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">${selectedCoin.stats.toLocaleString()}</div>
                                <div className={`flex items-center justify-end gap-1 text-sm font-medium ${selectedCoin.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {selectedCoin.type === 'up' ? '+' : ''}{selectedCoin.percentage}%
                                    {selectedCoin.type === 'up' ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mainChartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', background: 'hsl(var(--popover))', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`$${value.toFixed(2)}`, 'Цена']}
                                />
                                <Area type="monotone" dataKey="price" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Market List */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Инструменты</CardTitle>
                        <CardDescription>Доступные активы</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-auto pr-2">
                        <div className="space-y-2">
                            {filteredCoins.map((coin) => (
                                <div
                                    key={coin.label}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all hover:bg-muted/50 ${selectedCoin.label === coin.label ? 'bg-muted ring-1 ring-primary/20 border-primary/50' : ''}`}
                                    onClick={() => setSelectedCoin(coin)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-background rounded-lg border">
                                            <coin.icon size={18} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{coin.label.split(' ')[0]}</div>
                                            <div className="text-xs text-muted-foreground">{coin.label.split('(')[1].replace(')', '')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-sm">${coin.stats.toLocaleString()}</div>
                                        <div className={`text-xs ${coin.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {coin.percentage}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
