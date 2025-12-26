import { Header } from "@/components/layout/header"
import Overview from "./boards/overview"
import Dashboard1Actions from "./components/dashboard-1-actions"

export default function Dashboard1Page() {
  return (
    <>
      <Header />

      <div className="space-y-6 p-6">
        <div className="mb-8 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
            <p className="text-muted-foreground">Обзор ключевых показателей и статистики.</p>
          </div>
          <Dashboard1Actions />
        </div>

        <Overview />
      </div>
    </>
  )
}
