import { useState, useMemo, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import QRCode from "react-qr-code"
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconPencil,
  IconPlus,
  IconArrowRight,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react"
import { Line, LineChart } from "recharts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { availableCryptos, dashboard2Stats } from "../data/data"

export default function Stats({ range = "30d" }) {
  const [statsData, setStatsData] = useState(dashboard2Stats)

  // DnD Sensors (Long Press Activation)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250, // Long press 250ms to activate drag
        tolerance: 5, // Allow 5px movement during press
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setStatsData((items) => {
        const oldIndex = items.findIndex((item) => item.label === active.id)
        const newIndex = items.findIndex((item) => item.label === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Add Asset Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)

  // Generate address when coin is selected
  useEffect(() => {
    if (selectedCoin) {
      const mockAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      setWalletAddress(mockAddress)
      setCopied(false)
    } else {
      setWalletAddress("")
    }
  }, [selectedCoin])

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Exchange Dialog State
  const [isExchangeOpen, setIsExchangeOpen] = useState(false)
  const [exchangeSourceLabel, setExchangeSourceLabel] = useState("")
  const [exchangeTargetLabel, setExchangeTargetLabel] = useState("")
  const [amountFrom, setAmountFrom] = useState("")
  const [amountTo, setAmountTo] = useState("")

  // Delete Confirmation State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [coinToDelete, setCoinToDelete] = useState(null)

  const handleDeleteRequest = (label) => {
    setCoinToDelete(label)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (coinToDelete) {
      setStatsData((prev) => prev.filter((item) => item.label !== coinToDelete))
      setIsDeleteOpen(false)
      setCoinToDelete(null)
    }
  }

  const handleAddSubmit = () => {
    if (!selectedCoin || !amount) return

    const cryptoToAdd = availableCryptos.find((c) => c.label === selectedCoin)
    if (cryptoToAdd) {
      setStatsData((prev) => [
        ...prev,
        {
          ...cryptoToAdd,
          walletAddress,
          balance: parseFloat(amount)
        }
      ])

      // Reset and close
      setIsDialogOpen(false)
      setSelectedCoin("")
      setWalletAddress("")
      setAmount("")
    }
  }

  const handleExchangeClick = (coin) => {
    setExchangeTargetLabel(coin.label)
    setAmountFrom("")
    setAmountTo("")
    // Default source to the first available coin that isn't the target
    const defaultSource = availableCryptos.find(c => c.label !== coin.label)
    setExchangeSourceLabel(defaultSource?.label || "")
    setIsExchangeOpen(true)
  }

  // Filter out already displayed cryptos from the available list
  const remainingCryptos = availableCryptos.filter(
    (crypto) => !statsData.some((item) => item.label === crypto.label)
  )

  // Calculate Exchange Logic
  const sourceCoinData = availableCryptos.find(c => c.label === exchangeSourceLabel)
  const targetCoinData = availableCryptos.find(c => c.label === exchangeTargetLabel)

  const exchangeRate = useMemo(() => {
    if (!sourceCoinData || !targetCoinData) return 0
    return sourceCoinData.stats / targetCoinData.stats
  }, [sourceCoinData, targetCoinData])

  const handleFromChange = (val) => {
    setAmountFrom(val)
    if (!val || !exchangeRate) {
      setAmountTo("")
      return
    }
    const calculated = parseFloat(val) * exchangeRate
    setAmountTo(calculated.toFixed(6))
  }

  const handleToChange = (val) => {
    setAmountTo(val)
    if (!val || !exchangeRate) {
      setAmountFrom("")
      return
    }
    const calculated = parseFloat(val) / exchangeRate
    setAmountFrom(calculated.toFixed(6))
  }

  // Handle coin changes (preserving the "From" amount logic usually)
  const handleSourceCoinChange = (val) => {
    setExchangeSourceLabel(val)
    // Recalculate To based on new rate if From amount exists
    const newSource = availableCryptos.find(c => c.label === val)
    if (newSource && targetCoinData && amountFrom) {
      const newRate = newSource.stats / targetCoinData.stats
      setAmountTo((parseFloat(amountFrom) * newRate).toFixed(6))
    }
  }

  const handleTargetCoinChange = (val) => {
    setExchangeTargetLabel(val)
    // Recalculate To based on new rate if From amount exists
    const newTarget = availableCryptos.find(c => c.label === val)
    if (sourceCoinData && newTarget && amountFrom) {
      const newRate = sourceCoinData.stats / newTarget.stats
      setAmountTo((parseFloat(amountFrom) * newRate).toFixed(6))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={statsData.map(item => item.label)}
        strategy={rectSortingStrategy}
      >
        {statsData.map((stats) => (
          <SortableStatsCard
            key={stats.label}
            id={stats.label}
            {...stats}
            range={range}
            onRemove={() => handleDeleteRequest(stats.label)}
            onExchange={() => handleExchangeClick(stats)}
          />
        ))}
      </SortableContext>

      {/* Add Asset Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Card className="group col-span-1 border-dashed bg-muted/30 transition-all hover:bg-muted/50 hover:border-primary/50 p-0 overflow-hidden cursor-pointer h-full min-h-[146px]">
            <Button
              variant="ghost"
              className="h-full w-full flex flex-col gap-2 rounded-xl hover:bg-transparent items-center justify-center py-0"
              disabled={remainingCryptos.length === 0}
            >
              <div className="rounded-full bg-background p-3 shadow-sm ring-1 ring-border group-hover:scale-110 transition-transform">
                <IconPlus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {remainingCryptos.length === 0
                  ? "Все валюты добавлены"
                  : "Добавить"}
              </span>
            </Button>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить актив</DialogTitle>
            <DialogDescription>
              Выберите криптовалюту и укажите данные кошелька для отслеживания.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="coin">Валюта</Label>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger id="coin">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  {remainingCryptos.map((crypto) => (
                    <SelectItem key={crypto.label} value={crypto.label}>
                      <div className="flex items-center gap-2">
                        <crypto.icon className="h-4 w-4" />
                        {crypto.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCoin && walletAddress && (
              <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <QRCode
                    value={walletAddress}
                    size={150}
                    level="M"
                    viewBox={`0 0 150 150`}
                    className="h-auto max-w-full"
                  />
                </div>

                <div className="w-full grid gap-2">
                  <Label>API Ключ</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={walletAddress}
                        readOnly
                        className="pr-10 bg-muted font-mono text-xs"
                      />
                    </div>
                    <Button variant="outline" size="icon" onClick={handleCopyAddress}>
                      {copied ? <IconCheck className="h-4 w-4 text-green-500" /> : <IconCopy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Скопируйте этот ключ для подключения {selectedCoin.split(' ')[0]}.
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="amount">Сумма пополнения</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAddSubmit} disabled={!selectedCoin || !amount}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Удалить актив?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить <strong>{coinToDelete}</strong> из отслеживания? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exchange Dialog */}
      <Dialog open={isExchangeOpen} onOpenChange={setIsExchangeOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Обмен криптовалюты</DialogTitle>
            <DialogDescription>Конвертация средств между вашими активами по текущему курсу.</DialogDescription>
          </DialogHeader>

          {sourceCoinData && (
            <div className="grid gap-6 py-4">
              {/* From Section */}
              <div className="grid gap-2">
                <Label>Отдаете</Label>
                <div className="flex items-center gap-3">
                  <Select value={exchangeSourceLabel} onValueChange={handleSourceCoinChange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCryptos.map(c => (
                        <SelectItem key={c.label} value={c.label}>
                          <div className="flex items-center gap-2">
                            <c.icon className="h-4 w-4" />
                            <span>{c.label.split(' ')[0]}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amountFrom}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right px-1">
                  Баланс: {sourceCoinData?.balance ? sourceCoinData.balance : 0} {sourceCoinData.label.split(' ')[1].replace(/[()]/g, '')}
                </div>
              </div>

              {/* Arrow Separator */}
              <div className="relative flex justify-center py-2">
                <div className="absolute inset-x-0 top-1/2 border-t -z-10"></div>
                <div className="bg-background px-2">
                  <IconArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              {/* To Section */}
              <div className="grid gap-2">
                <Label>Получаете</Label>
                <div className="flex items-center gap-3">
                  <Select value={exchangeTargetLabel} onValueChange={handleTargetCoinChange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCryptos.filter(c => c.label !== exchangeSourceLabel).map(c => (
                        <SelectItem key={c.label} value={c.label}>
                          <div className="flex items-center gap-2">
                            <c.icon className="h-4 w-4" />
                            <span>{c.label.split(' ')[0]}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amountTo}
                    onChange={(e) => handleToChange(e.target.value)}
                    className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Rate Display */}
              {targetCoinData && (
                <div className="rounded-md bg-muted p-3 text-sm flex justify-between items-center">
                  <span className="text-muted-foreground">Курс обмена:</span>
                  <div className="font-medium">
                    1 {sourceCoinData.label.split(' ')[1].replace(/[()]/g, '')} ≈ {exchangeRate.toFixed(4)} {targetCoinData.label.split(' ')[1].replace(/[()]/g, '')}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                setIsExchangeOpen(false)
                handleDeleteRequest(exchangeTargetLabel)
              }}
            >
              Удалить {exchangeTargetLabel ? exchangeTargetLabel.split(' ')[0] : ''}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsExchangeOpen(false)}>Отмена</Button>
              <Button onClick={() => setIsExchangeOpen(false)}>Обменять</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DndContext>
  )
}

function SortableStatsCard({ id, ...props }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={cn("col-span-1 h-full touch-none", isDragging && "scale-105")}>
      <StatsCard {...props} />
    </div>
  )
}

function StatsCard({
  label,
  description,
  chartData,
  strokeColor,
  icon: Icon,
  onExchange,
  range,
  balance,
}) {
  const chartConfig = {
    month: {
      label: "month",
      color: strokeColor,
    },
  }

  // Dynamic Calculation
  const data = chartData[range] || []
  const startValue = data.length > 0 ? data[0].value : 0
  const endValue = data.length > 0 ? data[data.length - 1].value : 0
  const diff = endValue - startValue
  const percentage = startValue !== 0 ? (diff / startValue) * 100 : 0
  const isUp = diff >= 0

  // Extract symbol from label (e.g. "Bitcoin (BTC)" -> "BTC")
  const symbolMatch = label.match(/\(([^)]+)\)/)
  const symbol = symbolMatch ? symbolMatch[1] : ""

  // Format balance if available
  const formattedBalance = balance !== undefined
    ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(balance)
    : null

  return (
    <Card className="group relative h-full bg-muted/50 cursor-grab active:cursor-grabbing selection:bg-transparent">
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-background/80"
          onClick={onExchange}
          onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking button
        >
          <IconPencil size={14} />
          <span className="sr-only">Обменять</span>
        </Button>
      </div>

      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-4 pb-2">
        <CardTitle className="flex items-center gap-2 truncate text-sm font-medium">
          <Icon size={16} />
          {label.split(' ')[0]}
        </CardTitle>
        {formattedBalance && (
          <div className="ml-auto text-sm font-medium text-muted-foreground mr-6 group-hover:mr-8 transition-all duration-200">
            {formattedBalance} {symbol}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col justify-between p-4 pt-0">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold leading-none">${endValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div
              className={cn("flex items-center text-xs font-medium", {
                "text-emerald-500 dark:text-emerald-400": isUp,
                "text-red-500 dark:text-red-400": !isUp,
              })}
            >
              {isUp ? (
                <IconCaretUpFilled size={12} className="mr-0.5" />
              ) : (
                <IconCaretDownFilled size={12} className="mr-0.5" />
              )}
              {Math.abs(percentage).toFixed(2)}%
              <span className="ml-1 opacity-70">
                ({isUp ? "+" : ""}{diff.toLocaleString(undefined, { maximumFractionDigits: 2 })})
              </span>
            </div>
          </div>

          <ChartContainer className="w-1/2 h-[50px]" config={chartConfig}>
            <LineChart accessibilityLayer data={data}>
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-month)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
