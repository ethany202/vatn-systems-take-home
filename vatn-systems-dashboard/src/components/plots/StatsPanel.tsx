import { useMemo } from "react"
import type { PlotMetrics, PlotPoint } from "../../utils/model"
import { generatePlotMetrics } from "../../utils/PlotDataUtils"

interface Props {
    points: PlotPoint[]
}

export default function StatsPanel({points} : Props){

    const metrics : PlotMetrics = useMemo(() => {
        return generatePlotMetrics(points);
    }, [points])

    // Displayed at the bottom of the plot: can be toggled by selecting a specific type of plot
    return (
        <div className="w-full max-w-2xl mx-auto mt-4">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow bg-[#F5F5F5]">
                <thead>
                    <tr className="bg-[#B0CDD9] text-white">
                        <th className="py-2 px-4 text-center">Max</th>
                        <th className="py-2 px-4 text-center">Min</th>
                        <th className="py-2 px-4 text-center">Mean</th>
                        <th className="py-2 px-4 text-center">Median</th>
                        <th className="py-2 px-4 text-center">Start</th>
                        <th className="py-2 px-4 text-center">End</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.max}</td>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.min}</td>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.mean.toFixed(2)}</td>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.median}</td>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.start}</td>
                        <td className="py-2 px-4 text-[#B0B0B0] font-semibold text-center">{metrics.end}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}