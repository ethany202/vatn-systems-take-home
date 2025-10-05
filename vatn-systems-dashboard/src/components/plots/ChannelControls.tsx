import { Radio, Button } from '@mui/material';
import type { PlotData } from '../../utils/model';
import './ChannelControls.css';

interface Props{
    plotData: PlotData[],
    visibleGraph: number,
    setVisibleGraph: (index: number) => void,
    deletePlotData: (index: number) => void
}

export default function ChannelControls({plotData, visibleGraph, setVisibleGraph, deletePlotData} : Props){

    return (
        <div className="flex flex-col w-full">
            {(plotData && plotData.length > 0) && 
                plotData.map((currPlot, idx) => {
                    return (
                        <div key={idx} className='plot-control-body flex w-full m-2 items-center'>
                            <Radio 
                                size='small'
                                checked={idx == visibleGraph} 
                                onChange={() => setVisibleGraph(idx)}
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
                                sx={{
                                    flexShrink: 1,       // allow shrinking
                                    minWidth: 0,         // remove default min-width
                                    backgroundColor: '#A70A0C',
                                }}
                                onClick={() => deletePlotData(idx)}
                                >X</Button>
                        </div>
                    )
                })
            }

        </div>
    )

}