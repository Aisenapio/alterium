"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, min = 0, max = 100, step = 1, value = [0], onValueChange, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(value)

    React.useEffect(() => {
        setLocalValue(value)
    }, [value])

    const handleInputChange = (e) => {
        const newValue = [parseFloat(e.target.value)]
        setLocalValue(newValue)
        if (onValueChange) {
            onValueChange(newValue)
        }
    }

    const percentage = ((localValue[0] - min) / (max - min)) * 100

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)} {...props} ref={ref}>
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <div
                    className="absolute h-full bg-primary"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={localValue[0]}
                onChange={handleInputChange}
                className="absolute h-full w-full opacity-0 cursor-pointer z-10"
            />
            <div
                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                style={{
                    position: 'absolute',
                    left: `calc(${percentage}% - 10px)`
                }}
            />
        </div>
    )
})
Slider.displayName = "Slider"

export { Slider }
