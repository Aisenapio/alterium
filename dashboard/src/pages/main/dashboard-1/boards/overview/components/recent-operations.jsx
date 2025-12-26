"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data = [
    {
        id: "op_1",
        type: "Арбитраж",
        asset: "BTC/USDT",
        amount: 1250.00,
        status: "success",
        date: "2024-05-20 14:30",
    },
    {
        id: "op_2",
        type: "Покупка",
        asset: "ETH",
        amount: 3200.50,
        status: "processing",
        date: "2024-05-20 12:15",
    },
    {
        id: "op_3",
        type: "Вывод",
        asset: "USDT",
        amount: 500.00,
        status: "success",
        date: "2024-05-19 09:45",
    },
    {
        id: "op_4",
        type: "Арбитраж",
        asset: "SOL/USDT",
        amount: 180.20,
        status: "failed",
        date: "2024-05-18 16:20",
    },
    {
        id: "op_5",
        type: "Депозит",
        asset: "BTC",
        amount: 5000.00,
        status: "success",
        date: "2024-05-18 10:00",
    },
    {
        id: "op_6",
        type: "Покупка",
        asset: "ADA",
        amount: 450.00,
        status: "success",
        date: "2024-05-18 09:30",
    },
    {
        id: "op_7",
        type: "Арбитраж",
        asset: "ETH/BTC",
        amount: 2100.00,
        status: "processing",
        date: "2024-05-17 14:20",
    },
    {
        id: "op_8",
        type: "Вывод",
        asset: "USDC",
        amount: 1000.00,
        status: "success",
        date: "2024-05-17 11:00",
    },
    {
        id: "op_9",
        type: "Депозит",
        asset: "SOL",
        amount: 300.00,
        status: "failed",
        date: "2024-05-16 18:45",
    },
    {
        id: "op_10",
        type: "Арбитраж",
        asset: "XRP/USDT",
        amount: 800.00,
        status: "success",
        date: "2024-05-16 10:15",
    },
    {
        id: "op_11",
        type: "Покупка",
        asset: "DOGE",
        amount: 150.00,
        status: "success",
        date: "2024-05-15 22:30",
    },
    {
        id: "op_12",
        type: "Продажа",
        asset: "BTC",
        amount: 5200.00,
        status: "processing",
        date: "2024-05-15 15:40",
    },
]

const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Выбрать все"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Выбрать строку"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: "Тип операции",
        cell: ({ row }) => <div className="font-medium">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "asset",
        header: "Актив",
        cell: ({ row }) => <div>{row.getValue("asset")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Сумма ($)</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => {
            const status = row.getValue("status")
            let variant = "default"
            let label = status

            if (status === "success") {
                variant = "secondary" // Using secondary as green-ish equivalent typically
                label = "Успешно"
            } else if (status === "processing") {
                variant = "outline"
                label = "В процессе"
            } else if (status === "failed") {
                variant = "destructive"
                label = "Ошибка"
            }

            return (
                <div className={`capitalize ${status === 'success' ? 'text-emerald-500' : status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {label}
                </div>
            )
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-muted-foreground text-xs">{row.getValue("date")}</div>,
    },
]

export default function RecentOperations() {
    const [sorting, setSorting] = React.useState([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            rowSelection,
            pagination,
        },
    })

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle className="text-xl">Недавние операции</CardTitle>
                <CardDescription>Последние действия вашего бота и транзакции.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="rounded-md border flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Нет результатов.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4 flex-none">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} из{" "}
                        {table.getFilteredRowModel().rows.length} строк выбрано.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Назад
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Вперед
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
