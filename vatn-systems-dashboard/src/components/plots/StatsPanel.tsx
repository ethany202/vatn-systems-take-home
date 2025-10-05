import { useMemo } from "react"
import type { PlotMetrics, PlotPoint } from "../../utils/model"
import { generatePlotMetrics } from "../../utils/PlotDataUtils"
import './StatsPanel.css';

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
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow bg-[#222222]">
                <thead>
                    <tr className="bg-[#222222]">
                        <th className="metric-column">Max</th>
                        <th className="metric-column">Min</th>
                        <th className="metric-column">Mean</th>
                        <th className="metric-column">Median</th>
                        <th className="metric-column">Start</th>
                        <th className="metric-column">End</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-[#111111]">
                        <td className="metric-value">{metrics.max}</td>
                        <td className="metric-value">{metrics.min}</td>
                        <td className="metric-value">{metrics.mean.toFixed(2)}</td>
                        <td className="metric-value">{metrics.median}</td>
                        <td className="metric-value">{metrics.start}</td>
                        <td className="metric-value">{metrics.end}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}