
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
import { Button } from "@/components/ui/button"
import { IconCoins, IconTrash } from "@tabler/icons-react"

export function AssetList({ assets, onDelete }) {
    return (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {assets.map((asset) => (
                <div key={asset.symbol} className="group flex items-center justify-between p-3 border rounded-xl bg-card/50 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <IconCoins size={16} />
                        </div>
                        <div>
                            <p className="font-medium leading-none">{asset.symbol}</p>
                            {asset.name && <p className="text-xs text-muted-foreground mt-1">{asset.name}</p>}
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <IconTrash size={16} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Это действие удалит {asset.symbol} из списка отслеживаемых активов.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(asset.symbol)}>Удалить</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ))}
            {assets.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                    Нет добавленных активов
                </div>
            )}
        </div>
    )
}
