
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IconInfoCircle } from "@tabler/icons-react"

export default function BusinessEssence() {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <IconInfoCircle className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Суть бизнеса (Что вы будете делать?)</CardTitle>
                </div>
                <CardDescription>
                    Вы создаете систему (бота), которая работает в реальном времени.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</span>
                        <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Мониторинг цен:</strong> Система отслеживает цены на одну и ту же монету (например, BTC/USDT) на множестве бирж (Binance, Coinbase, Kraken, Bybit, Huobi и т.д.).
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</span>
                        <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Поиск спреда:</strong> Находит разницу в ценах, которая превышает все сопутствующие издержки (комиссии, перевод).
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</span>
                        <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Автоматическая торговля:</strong> Выполняет сделки: покупает на бирже с низкой ценой и продает на бирже с высокой ценой.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">4</span>
                        <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Фиксация прибыли:</strong> Получает прибыль в виде разницы цен (обычно в стейблкоинах, например, USDT).
                        </span>
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}
