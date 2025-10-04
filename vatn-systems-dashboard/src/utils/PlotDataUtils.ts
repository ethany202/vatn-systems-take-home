import type { PlotData, PlotPoint, PlotMetrics } from "./model";

const timeColumnRegex = new RegExp(`\btime\b`, 'i');

/**
 * 
 * @param parsedData List of any objects, in which any consists of key-value pairs representing column name and value
 */
export function collectPlotData(parsedData: any[], downsampleRate: number = 1) : PlotData[] {
    const plotDataMap = new Map<string, PlotData>();

    if(parsedData.length === 0) return [];

    for (const columnName in parsedData[0]) {
        if(columnName === '' || columnName.toLowerCase().match(timeColumnRegex)) continue; // Skip empty columns or time column
        
        plotDataMap.set(columnName, {
            xLabel: "Time",
            yLabel: columnName,
            points: [],
            lineColor: generateRandomHexColor()
        });
    }

    let index;
    for (index = 0; index < parsedData.length; index+=downsampleRate) {
        for (const columnName in parsedData[index]) {
            if(columnName === '' || columnName.toLowerCase().match(timeColumnRegex)) continue; // Skip empty columns or time column
            
            const plotData = plotDataMap.get(columnName);
            plotData?.points.push({
                x: index, // Use index as x value (1-based)
                y: Number(parsedData[index][columnName])
            });
        }
    }

    console.log("Collected Plot Data:", Array.from(plotDataMap.values()));

    return Array.from(plotDataMap.values());
}

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

export function generateRandomHexColor() {
  // 16777215 = FFFFFF in hex
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Pad with leading zeros
  return '#' + randomColor.padStart(6, '0');
}
