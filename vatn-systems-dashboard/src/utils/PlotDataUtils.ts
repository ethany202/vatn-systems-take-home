import type { PlotData, PlotPoint, PlotMetrics } from "./model";


export function generatePlotTitle(plotData: PlotData){
    const {
        xLabel,
        yLabel
    } = plotData;

    return `${xLabel} VS ${yLabel}`
}

export function generatePlotMetrics(points: PlotPoint[]) : PlotMetrics {
    return {
        max: Math.max(...points.map(p => p.y)),
        min: Math.min(...points.map(p => p.y)),
        mean: points.reduce((acc, p) => acc + p.y, 0) / points.length,
        median: (() => {
            const sorted = [...points.map(p => p.y)].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        })(),
        start: points[0]?.y || 0,
        end: points[points.length - 1]?.y || 0    
    }
}