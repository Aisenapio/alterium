
import { useState } from "react"
import { AssetList } from "./components/AssetList"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    IconServer,
    IconBrain,
    IconChartDots,
    IconShieldCheck,
    IconTerminal2,
    IconDeviceAnalytics,
    IconRocket,


    IconPlus,
    IconCoins
} from "@tabler/icons-react"

export default function TechnicalPage() {
    // System Mode State
    const [isTechnicalMode, setIsTechnicalMode] = useState(false)



    // Assets State
    const [img, setImg] = useState("")
    const [assets, setAssets] = useState([
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "SOL", name: "Solana" },
        { symbol: "USDT", name: "Tether" }
    ])
    const [newAsset, setNewAsset] = useState({ symbol: "", name: "" })

    const handleAddAsset = () => {
        if (newAsset.symbol) {
            setAssets([...assets, { ...newAsset, symbol: newAsset.symbol.toUpperCase() }])
            setNewAsset({ symbol: "", name: "" })
        }
    }

    const handleDeleteAsset = (symbol) => {
        setAssets(assets.filter(a => a.symbol !== symbol))
    }





    return (
        <>
            <Header />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Техническая панель</h1>
                        <p className="text-muted-foreground">
                            Спецификация, архитектура и настройка системы Crypto Arbitrage Pro.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Settings Section */}
                    <div>
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-lg">Системные настройки</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 pb-4 flex items-center justify-between space-x-2">
                                <Label htmlFor="technical-mode" className="flex flex-col space-y-1">
                                    <span>Режим отладки (Debug Mode)</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Включает отображение технических ID, таймстампов и сырых данных в интерфейсе.
                                    </span>
                                </Label>
                                <Switch
                                    id="technical-mode"
                                    checked={isTechnicalMode}
                                    onCheckedChange={setIsTechnicalMode}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Documentation Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <div className="pb-4">
                            <TabsList className="w-full justify-start overflow-x-auto">

                                <TabsTrigger value="assets">Активы</TabsTrigger>
                                <TabsTrigger value="overview">Обзор системы</TabsTrigger>
                                <TabsTrigger value="ml">AI и Аналитика</TabsTrigger>
                                <TabsTrigger value="ops">Эксплуатация</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                            {/* CONFIGURATION TAB (Interactive) */}


                            {/* ASSETS TAB */}
                            <TabsContent value="assets" className="p-6 space-y-8 mt-0">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold tracking-tight">Управление активами</h2>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="h-7">
                                                Всего: {assets.length}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Add New Asset */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Добавить актив</CardTitle>
                                                <CardDescription>Добавление новой криптовалюты для отслеживания</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Символ (Тикер)</Label>
                                                    <Input
                                                        placeholder="BTC"
                                                        value={newAsset.symbol}
                                                        onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Название (Опционально)</Label>
                                                    <Input
                                                        placeholder="Bitcoin"
                                                        value={newAsset.name}
                                                        onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                                                    />
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full gap-2" onClick={handleAddAsset} disabled={!newAsset.symbol}>
                                                    <IconPlus size={18} /> Добавить актив
                                                </Button>
                                            </CardFooter>
                                        </Card>

                                        {/* Asset List */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Активные активы</CardTitle>
                                                <CardDescription>Список доступных для торговли пар</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <AssetList assets={assets} onDelete={handleDeleteAsset} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* OVERVIEW TAB */}
                            <TabsContent value="overview" className="p-4 space-y-6 mt-0">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <IconDeviceAnalytics className="text-primary" /> Crypto Arbitrage Pro
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Профессиональный торговый бот для криптоарбитража с расширенным управлением рисками, машинным обучением, бэктестингом и поддержкой нескольких бирж.
                                    </p>
                                </div>

                                {/* Active Assets Overview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <IconCoins size={20} /> Активные активы
                                        </CardTitle>
                                        <CardDescription>
                                            Краткий обзор отслеживаемых криптовалют
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <AssetList assets={assets} onDelete={handleDeleteAsset} />
                                    </CardContent>
                                </Card>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <IconRocket size={20} /> Основные возможности
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm">
                                            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                                                <li><strong className="text-foreground">Межбиржевой арбитраж:</strong> Покупка на одной бирже, продажа на другой.</li>
                                                <li><strong className="text-foreground">Треугольный арбитраж:</strong> Три сделки на одной бирже (USDT → BTC → ETH → USDT).</li>
                                                <li><strong className="text-foreground">Сканирование Real-time:</strong> Непрерывный поиск возможностей.</li>
                                                <li><strong className="text-foreground">Smart Decision Engine:</strong> Оценка возможностей с использованием ИИ.</li>
                                                <li><strong className="text-foreground">Поддержка 4+ бирж:</strong> Binance, Kraken, Bybit, OKX.</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <IconShieldCheck size={20} /> Управление рисками
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm">
                                            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                                                <li><strong className="text-foreground">Лимиты убытков:</strong> Авто-стоп при дневном убытке.</li>
                                                <li><strong className="text-foreground">Максимальная просадка:</strong> Защита капитала.</li>
                                                <li><strong className="text-foreground">Охлаждение:</strong> Пауза после серии неудач.</li>
                                                <li><strong className="text-foreground">Slippage Protection:</strong> Защита от проскальзывания.</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <IconServer size={20} /> Архитектура
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-8 text-sm">
                                            <div>
                                                <h4 className="font-semibold mb-2">Core Components</h4>
                                                <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                                                    <li>src/core/ExchangeManager.js</li>
                                                    <li>src/core/DecisionEngine.js</li>
                                                    <li>src/executors/ArbitrageExecutor.js</li>
                                                    <li>src/risk/RiskManager.js</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Storage & ML</h4>
                                                <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                                                    <li>MongoDB (History & Metrics)</li>
                                                    <li>Redis (Caching & Price Data)</li>
                                                    <li>src/ml/MLDecisionEngine.js</li>
                                                    <li>src/backtesting/BacktestEngine.js</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* ML & ANALYTICS TAB */}
                            <TabsContent value="ml" className="p-4 space-y-6 mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <IconBrain className="text-purple-500" /> Система Машинного Обучения
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <h3 className="font-semibold mb-2">ThresholdOptimizer</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Адаптивная оптимизация порогов прибыльности на основе рыночных условий.
                                                Использует линейную регрессию с онлайн-обучением по 7 признакам (волатильность, ликвидность и др.).
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge variant="outline">Dynamic Thresholds</Badge>
                                                <Badge variant="outline">Online Learning</Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">StrategyManager (RL)</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Reinforcement Learning с Q-learning для выбора оптимальной стратегии.
                                                Оценивает 6 состояний рынка и выбирает из 5 доступных действий.
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge variant="outline">Q-Learning</Badge>
                                                <Badge variant="outline">Auto-Optimization</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <IconChartDots className="text-blue-500" /> Бэктестинг
                                        </CardTitle>
                                        <CardDescription>Поддержка 4 режимов анализа на исторических данных</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="modes">
                                                <AccordionTrigger>Режимы бэктестинга</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                                        <li><strong>Quick:</strong> Быстрый анализ на 30 днях.</li>
                                                        <li><strong>Standard:</strong> Стандартный анализ с полными метриками.</li>
                                                        <li><strong>Advanced:</strong> Продвинутый анализ с оптимизацией.</li>
                                                        <li><strong>Optimization:</strong> Grid Search для поиска идеальных параметров.</li>
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="metrics">
                                                <AccordionTrigger>Рассчитываемые метрики</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Badge variant="secondary">Sharpe Ratio</Badge>
                                                        <Badge variant="secondary">Max Drawdown</Badge>
                                                        <Badge variant="secondary">Win Rate</Badge>
                                                        <Badge variant="secondary">Profit Factor</Badge>
                                                        <Badge variant="secondary">Volatility</Badge>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* OPERATIONS TAB */}
                            <TabsContent value="ops" className="p-4 space-y-6 mt-0">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <IconTerminal2 size={20} /> Быстрый старт
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-sm">
                                                <p className="font-medium mb-1">Предварительные требования:</p>
                                                <ul className="list-disc pl-4 text-muted-foreground">
                                                    <li>Node.js 18+</li>
                                                    <li>MongoDB 7+, Redis 7+</li>
                                                </ul>
                                            </div>
                                            <div className="bg-muted p-3 rounded-md font-mono text-xs">
                                                git clone https://repo/crypto-arbitrage<br />
                                                npm install<br />
                                                docker-compose up -d
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Мониторинг & Логи</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex items-center gap-2">
                                                    <Badge className="bg-orange-500">Grafana</Badge>
                                                    <span>Визуализация метрик (localhost:3000)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Badge className="bg-red-500">Prometheus</Badge>
                                                    <span>Сбор метрик производительности</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Badge className="bg-blue-500">Telegram</Badge>
                                                    <span>Оповещения о событиях и ошибках</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Устранение неполадок</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="conn">
                                                <AccordionTrigger>Ошибки подключения к биржам</AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground">
                                                    Проверьте API-ключи, права доступа и настройки IP-whitelist.
                                                    Для OKX убедитесь в правильности Passphrase.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="db">
                                                <AccordionTrigger>Проблемы с базой данных</AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground">
                                                    Убедитесь, что MongoDB и Redis запущены (docker ps).
                                                    Проверьте строки подключения в .env.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="ml">
                                                <AccordionTrigger>Ошибки ML системы</AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground">
                                                    Проверьте наличие достаточного количества данных для обучения.
                                                    При критических ошибках установите ML_MODE=disabled.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
