export interface PlotPoint {
    x: number,
    y: number
}

export interface PlotData {
    xLabel: string,
    yLabel: string,
    points: PlotPoint[],
    lineColor: string
}

export interface PlotMetrics {
    max: number,
    min: number,
    mean: number,
    median: number,
    start: number,
    end: number;
}