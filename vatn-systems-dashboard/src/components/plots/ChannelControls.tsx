import {useState} from 'react';
import { Radio, Button } from '@mui/material';
import type { PlotData } from '../../utils/model';

interface Props{
    plotData: PlotData[],
    // Take in function to view StatsPanel of certain column
    setVisibleGraph: (index: number) => void
}

export default function ChannelControls({plotData, setVisibleGraph} : Props){

    // List representing view state for all plots
    const [plotStatuses, setPlotStatuses] = useState<boolean[]>(new Array(plotData.length).fill(false));
    
    const clearPlotStatuses = () => {
        setPlotStatuses(new Array(plotData.length).fill(false));
    }

    const togglePlotStatus = (index: number) => {
        clearPlotStatuses();
        setPlotStatuses(prevStatuses => {
            const newStatuses = [...prevStatuses];
            newStatuses[index] = !newStatuses[index];
            return newStatuses;
        });
        setVisibleGraph(index);
    }

    return (
        <div className="flex flex-col w-full">
            {(plotData && plotData.length > 0) && 
                plotData.map((currPlot, idx) => {
                    return (
                        <div key={idx} className='flex w-full mb-1 items-center'>
                            {/** Check button to toggle plot status and change what stats to view */}
                            {/** Plot title */}
                            {/** Button to remove the current plot */}
                            <Radio 
                                size='small'
                                checked={plotStatuses[idx]} 
                                onChange={() => togglePlotStatus(idx)}
                                sx={{
                                    color: currPlot.lineColor,
                                    "&.Mui-checked": { color: currPlot.lineColor },
                                    padding: '0.25rem',
                                }}/>
                            <span className='text-xs flex-1'>{currPlot.yLabel}</span>
                            <Button 
                                tabIndex={-1} 
                                variant='contained' 
                                disableRipple
                                size="small"
                                >Del</Button>
                        </div>
                    )
                })
            }

        </div>
    )

}