import {
  IconCurrencyBitcoin,
  IconCurrencyEthereum,
  IconCurrencySolana,
  IconCurrencyDollar,
} from "@tabler/icons-react"

// Helper to generate mock data
const generateChartData = (points, startValue, volatility) => {
  let currentValue = startValue
  return Array.from({ length: points }, (_, i) => {
    const change = (Math.random() - 0.45) * volatility
    currentValue = currentValue * (1 + change)
    return {
      date: i,
      value: currentValue,
    }
  })
}

export const dashboard2Stats = [
  {
    label: "Tether (USDT)",
    description: "Текущий курс Tether",
    stats: 1.00,
    balance: 1240.50,
    type: "up",
    percentage: 0.01,
    profitPercentage: 0.01,
    profitNumber: 0.0001,
    chartData: {
      "7d": generateChartData(7, 1.00, 0.001),
      "30d": generateChartData(30, 1.00, 0.001),
      "3m": generateChartData(90, 1.00, 0.002),
      "1y": generateChartData(12, 1.00, 0.005),
    },
    strokeColor: "#22c55e",
    icon: IconCurrencyDollar,
  },

  {
    label: "Bitcoin (BTC)",
    description: "Текущий курс Bitcoin",
    stats: 96543,
    balance: 0.45,
    type: "up",
    percentage: 1.25,
    profitPercentage: 1.25,
    profitNumber: 1206,
    chartData: {
      "7d": generateChartData(7, 94000, 0.02),
      "30d": generateChartData(30, 88000, 0.03),
      "3m": generateChartData(90, 70000, 0.05),
      "1y": generateChartData(12, 45000, 0.1),
    },
    strokeColor: "var(--chart-1)",
    icon: IconCurrencyBitcoin,
  },
  {
    label: "Ethereum (ETH)",
    description: "Текущий курс Ethereum",
    stats: 3452,
    balance: 12.5,
    type: "down",
    percentage: 0.85,
    profitPercentage: 0.85,
    profitNumber: -29,
    chartData: {
      "7d": generateChartData(7, 3500, 0.02),
      "30d": generateChartData(30, 3200, 0.03),
      "3m": generateChartData(90, 2800, 0.05),
      "1y": generateChartData(12, 2200, 0.1),
    },
    strokeColor: "var(--chart-2)",
    icon: IconCurrencyEthereum,
  },
  {
    label: "Solana (SOL)",
    description: "Текущий курс Solana",
    stats: 187,
    balance: 145.0,
    type: "up",
    percentage: 5.4,
    profitPercentage: 5.4,
    profitNumber: 10,
    chartData: {
      "7d": generateChartData(7, 175, 0.03),
      "30d": generateChartData(30, 160, 0.04),
      "3m": generateChartData(90, 140, 0.06),
      "1y": generateChartData(12, 80, 0.15),
    },
    strokeColor: "#6366f1",
    icon: IconCurrencySolana,
  },
]

export const availableCryptos = [
  ...dashboard2Stats,
  {
    label: "Cardano (ADA)",
    description: "Текущий курс Cardano",
    stats: 0.45,
    balance: 5000,
    type: "down",
    percentage: 2.1,
    profitPercentage: 2.1,
    profitNumber: -0.01,
    chartData: {
      "7d": generateChartData(7, 0.48, 0.02),
      "30d": generateChartData(30, 0.50, 0.03),
      "3m": generateChartData(90, 0.55, 0.05),
      "1y": generateChartData(12, 0.60, 0.1),
    },
    strokeColor: "#3b82f6",
    icon: IconCurrencyBitcoin, // Fallback icon
  },
  {
    label: "Ripple (XRP)",
    description: "Текущий курс Ripple",
    stats: 0.62,
    balance: 2500,
    type: "up",
    percentage: 1.5,
    profitPercentage: 1.5,
    profitNumber: 0.01,
    chartData: {
      "7d": generateChartData(7, 0.60, 0.02),
      "30d": generateChartData(30, 0.58, 0.03),
      "3m": generateChartData(90, 0.55, 0.05),
      "1y": generateChartData(12, 0.50, 0.1),
    },
    strokeColor: "#ec4899",
    icon: IconCurrencyBitcoin, // Fallback icon
  },
  {
    label: "Dogecoin (DOGE)",
    description: "Текущий курс Dogecoin",
    stats: 0.12,
    balance: 10000,
    type: "up",
    percentage: 8.4,
    profitPercentage: 8.4,
    profitNumber: 0.01,
    chartData: {
      "7d": generateChartData(7, 0.11, 0.05),
      "30d": generateChartData(30, 0.10, 0.08),
      "3m": generateChartData(90, 0.08, 0.1),
      "1y": generateChartData(12, 0.07, 0.2),
    },
    strokeColor: "#eab308",
    icon: IconCurrencyBitcoin, // Fallback icon
  },
]