import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    IconDeviceFloppy,
    IconEye,
    IconEyeOff,
} from "@tabler/icons-react"

export function ConfigurationEditor() {
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
    )
}
