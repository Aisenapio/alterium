
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    IconServer,
    IconBrain,
    IconChartDots,
    IconShieldCheck,
    IconTerminal2,
    IconDeviceAnalytics,
    IconRocket,
    IconDeviceFloppy,
    IconEye,
    IconEyeOff,
    IconPlus,
    IconTrash,
    IconCoins
} from "@tabler/icons-react"

export default function TechnicalPage() {
    // System Mode State
    const [isTechnicalMode, setIsTechnicalMode] = useState(false)

    // Configuration State
    const [config, setConfig] = useState({
        tradingMode: "paper",
        initialBalance: 1000,
        binanceKey: "",
        binanceSecret: "",
        okxKey: "",
        okxSecret: "",
        dailyLossLimit: -50,
        maxDrawdown: 20,
        maxConsecutiveLosses: 3,
        enableMl: true,
        mlMode: "training",
        mlTraffic: [100],
        minProfitCross: 0.3,
        minProfitTriangular: 0.8
    })

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

    const [showSecrets, setShowSecrets] = useState(false)

    const handleConfigChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const handleSaveConfig = () => {
        // In a real app, this would send data to the backend
        console.log("Saving configuration:", config)
        alert("Конфигурация успешно сохранена!");
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
                    <Tabs defaultValue="config" className="w-full">
                        <div className="pb-4">
                            <TabsList className="w-full justify-start overflow-x-auto">
                                <TabsTrigger value="config">Конфигуратор</TabsTrigger>
                                <TabsTrigger value="assets">Активы</TabsTrigger>
                                <TabsTrigger value="overview">Обзор системы</TabsTrigger>
                                <TabsTrigger value="ml">AI и Аналитика</TabsTrigger>
                                <TabsTrigger value="ops">Эксплуатация</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                            {/* CONFIGURATION TAB (Interactive) */}
                            <TabsContent value="config" className="p-6 space-y-8 mt-0">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold tracking-tight">Редактор конфигурации</h2>
                                        <Button onClick={handleSaveConfig} className="gap-2">
                                            <IconDeviceFloppy size={18} /> Сохранить изменения
                                        </Button>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* General Config */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Общие параметры</CardTitle>
                                                <CardDescription>Базовые настройки режима работы</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Режим торговли</Label>
                                                    <Select
                                                        value={config.tradingMode}
                                                        onValueChange={(v) => handleConfigChange("tradingMode", v)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Выберите режим" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="paper">Paper Trading (Тестовый)</SelectItem>
                                                            <SelectItem value="live">Live Trading (Реальный)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Стартовый баланс (USDT)</Label>
                                                    <Input
                                                        type="number"
                                                        value={config.initialBalance}
                                                        onChange={(e) => handleConfigChange("initialBalance", e.target.value)}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Risk Management Config */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Управление рисками</CardTitle>
                                                <CardDescription>Ограничения и защита капитала</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <Label>Макс. просадка (%)</Label>
                                                        <span className="text-xs text-muted-foreground">{config.maxDrawdown}%</span>
                                                    </div>
                                                    <Slider
                                                        value={[config.maxDrawdown]}
                                                        max={50}
                                                        step={1}
                                                        onValueChange={(v) => handleConfigChange("maxDrawdown", v[0])}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Лимит убытка ($)</Label>
                                                        <Input
                                                            type="number"
                                                            value={config.dailyLossLimit}
                                                            onChange={(e) => handleConfigChange("dailyLossLimit", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Макс. убыточных</Label>
                                                        <Input
                                                            type="number"
                                                            value={config.maxConsecutiveLosses}
                                                            onChange={(e) => handleConfigChange("maxConsecutiveLosses", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* API Keys */}
                                        <Card className="md:col-span-2">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <CardTitle className="text-base">API Ключи бирж</CardTitle>
                                                        <CardDescription>Настройка подключений к биржам</CardDescription>
                                                    </div>
                                                    <Button variant="ghost" size="sm" onClick={() => setShowSecrets(!showSecrets)}>
                                                        {showSecrets ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-4 p-4 border rounded-lg">
                                                    <h4 className="font-medium flex items-center gap-2">Binance</h4>
                                                    <div className="space-y-2">
                                                        <Label>API Key</Label>
                                                        <Input
                                                            value={config.binanceKey}
                                                            onChange={(e) => handleConfigChange("binanceKey", e.target.value)}
                                                            placeholder="Binance API Key"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>API Secret</Label>
                                                        <Input
                                                            type={showSecrets ? "text" : "password"}
                                                            value={config.binanceSecret}
                                                            onChange={(e) => handleConfigChange("binanceSecret", e.target.value)}
                                                            placeholder="Binance API Secret"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4 p-4 border rounded-lg">
                                                    <h4 className="font-medium flex items-center gap-2">OKX</h4>
                                                    <div className="space-y-2">
                                                        <Label>API Key</Label>
                                                        <Input
                                                            value={config.okxKey}
                                                            onChange={(e) => handleConfigChange("okxKey", e.target.value)}
                                                            placeholder="OKX API Key"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>API Secret</Label>
                                                        <Input
                                                            type={showSecrets ? "text" : "password"}
                                                            value={config.okxSecret}
                                                            onChange={(e) => handleConfigChange("okxSecret", e.target.value)}
                                                            placeholder="OKX API Secret"
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* ML & Strategy */}
                                        <Card className="md:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="text-base">AI и Стратегия</CardTitle>
                                                <CardDescription>Настройка машинного обучения и торговых порогов</CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                                        <Label htmlFor="ml-mode" className="flex flex-col space-y-1">
                                                            <span>Включить ML</span>
                                                            <span className="font-normal text-xs text-muted-foreground">
                                                                Использовать ИИ для оптимизации
                                                            </span>
                                                        </Label>
                                                        <Switch
                                                            id="ml-mode"
                                                            checked={config.enableMl}
                                                            onCheckedChange={(v) => handleConfigChange("enableMl", v)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Режим ML</Label>
                                                        <Select
                                                            value={config.mlMode}
                                                            onValueChange={(v) => handleConfigChange("mlMode", v)}
                                                            disabled={!config.enableMl}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Режим работы" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="training">Training (Обучение)</SelectItem>
                                                                <SelectItem value="inference">Inference (Работа)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <Label>ML Traffic (%)</Label>
                                                            <span className="text-xs text-muted-foreground">{config.mlTraffic}%</span>
                                                        </div>
                                                        <Slider
                                                            value={config.mlTraffic}
                                                            max={100}
                                                            step={10}
                                                            disabled={!config.enableMl}
                                                            onValueChange={(v) => handleConfigChange("mlTraffic", v)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4 border-l pl-6">
                                                    <div className="space-y-2">
                                                        <Label>Мин. профит (Cross-Exchange) %</Label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={config.minProfitCross}
                                                            onChange={(e) => handleConfigChange("minProfitCross", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Мин. профит (Triangular) %</Label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={config.minProfitTriangular}
                                                            onChange={(e) => handleConfigChange("minProfitTriangular", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

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
                                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                                    {assets.map((asset) => (
                                                        <div key={asset.symbol} className="flex items-center justify-between p-3 border rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                                    <IconCoins size={16} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium leading-none">{asset.symbol}</p>
                                                                    {asset.name && <p className="text-xs text-muted-foreground mt-1">{asset.name}</p>}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground hover:text-destructive"
                                                                onClick={() => handleDeleteAsset(asset.symbol)}
                                                            >
                                                                <IconTrash size={16} />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    {assets.length === 0 && (
                                                        <div className="text-center py-8 text-muted-foreground text-sm">
                                                            Нет добавленных активов
                                                        </div>
                                                    )}
                                                </div>
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
