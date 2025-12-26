
"use client"

import {
    IconActivity,
    IconTrendingUp,
    IconArrowRight,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ArbitrageCard({ opportunity }) {
    const { symbol, spread, spreadPercentage, bestBuy, bestSell, prices, route } = opportunity

    // Default route if not provided (2-step)
    const displayRoute = route || [
        { type: 'buy', label: 'Покупка (Low)', exchange: bestBuy.exchange, price: bestBuy.price },
        { type: 'sell', label: 'Продажа (High)', exchange: bestSell.exchange, price: bestSell.price }
    ]

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl">
                            <IconActivity className="text-primary h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold">{symbol}</CardTitle>
                            <Badge variant="outline" className="mt-1 text-emerald-500 border-emerald-500/20 bg-emerald-500/10 gap-1 rounded-md">
                                <IconTrendingUp size={12} />
                                {spreadPercentage.toFixed(2)}% Спред
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 bg-background p-3 rounded-xl border">
                        <div className="text-right border-r pr-4 mr-0">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Юнит</p>
                            <p className="text-lg font-mono text-emerald-500 font-bold">+${spread.toFixed(2)}</p>
                        </div>
                        <div className="text-right border-r pr-4 mr-0">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Разница курса</p>
                            <p className={cn(
                                "text-lg font-mono font-bold",
                                opportunity.rateDifference?.startsWith('+') ? "text-emerald-500" :
                                    opportunity.rateDifference?.startsWith('-') ? "text-red-500" : "text-foreground"
                            )}>
                                {opportunity.rateDifference || 'N/A'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Пикрейт</p>
                            <p className="text-lg font-mono text-emerald-500 font-bold">{opportunity.peakRate || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                {/* Best Route */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Арбитражный маршрут</h3>
                        <span className="text-[10px] text-muted-foreground">Получено: {opportunity.receivedTime || '--:--:--'}</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent w-full">
                        {displayRoute.map((step, index, array) => (
                            <div key={index} className="flex items-center gap-2 flex-1 min-w-[120px]">
                                <div className={cn(
                                    "flex-1 p-3 rounded-lg border w-full",
                                    step.type === 'buy' ? "bg-emerald-500/5 border-emerald-500/20" :
                                        step.type === 'sell' ? "bg-red-500/5 border-red-500/20" :
                                            "bg-blue-500/5 border-blue-500/20"
                                )}>
                                    <p className="text-[10px] text-muted-foreground mb-1">{step.label}</p>
                                    <p className="text-sm font-bold text-foreground">{step.exchange}</p>
                                    <p className="text-lg font-mono font-medium">${step.price.toLocaleString()}</p>
                                </div>

                                {index < array.length - 1 && (
                                    <div className="flex flex-col items-center justify-center px-1">
                                        <IconArrowRight className="text-muted-foreground h-5 w-5" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Execution Stats */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Статистика исполнения</h3>
                        <span className="text-[10px] text-muted-foreground">Завершено: {opportunity.completedTime || '--:--:--'}</span>
                    </div>



                    {/* Execution Route Visualization */}
                    {opportunity.executionRoute && (
                        <div className="mt-2">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent w-full">
                                {opportunity.executionRoute.map((step, index, array) => (
                                    <div key={index} className="flex items-center gap-2 flex-1 min-w-[120px]">
                                        <div className={cn(
                                            "flex-1 p-3 rounded-lg border w-full",
                                            step.type === 'buy' ? "bg-emerald-500/5 border-emerald-500/20" :
                                                step.type === 'sell' ? "bg-red-500/5 border-red-500/20" :
                                                    "bg-blue-500/5 border-blue-500/20"
                                        )}>
                                            <p className="text-[10px] text-muted-foreground mb-1">{step.label}</p>
                                            <p className="text-sm font-bold text-foreground">{step.exchange}</p>
                                            <p className="text-lg font-mono font-medium">${step.price.toLocaleString()}</p>
                                        </div>

                                        {index < array.length - 1 && (
                                            <div className="flex flex-col items-center justify-center px-1">
                                                <IconArrowRight className="text-muted-foreground h-5 w-5" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
