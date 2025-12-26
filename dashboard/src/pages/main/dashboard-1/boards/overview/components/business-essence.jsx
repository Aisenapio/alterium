
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IconInfoCircle, IconZoomCode, IconChartArrowsVertical, IconRobot, IconWallet } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export default function BusinessEssence() {
    const steps = [
        {
            id: 1,
            title: "Мониторинг цен",
            description: "Система отслеживает цены на одну и ту же монету (например, BTC/USDT) на множестве бирж (Binance, Coinbase, Kraken).",
            icon: IconZoomCode,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            id: 2,
            title: "Поиск спреда",
            description: "Находит разницу в ценах, которая превышает все сопутствующие издержки (комиссии, перевод).",
            icon: IconChartArrowsVertical,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            id: 3,
            title: "Автоматическая торговля",
            description: "Выполняет сделки: покупает на бирже с низкой ценой и продает на бирже с высокой ценой.",
            icon: IconRobot,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            id: 4,
            title: "Фиксация прибыли",
            description: "Получает прибыль в виде разницы цен (обычно в стейблкоинах, например, USDT).",
            icon: IconWallet,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ]

    return (
        <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                        <IconInfoCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Суть бизнеса</CardTitle>
                        <CardDescription>
                            Как работает ваша арбитражная система
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="group flex flex-col gap-3 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className={cn("p-2 rounded-lg", step.bg)}>
                                    <step.icon className={cn("w-5 h-5", step.color)} />
                                </div>
                                <span className="text-4xl font-bold opacity-[0.03] select-none text-foreground">
                                    {step.id}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h4 className="font-semibold text-sm">{step.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
