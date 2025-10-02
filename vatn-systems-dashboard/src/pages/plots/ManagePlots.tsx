import { useState, useEffect } from 'react';
import type { PlotData } from '../../utils/model';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";
import ChannelControls from '../../components/plots/ChannelControls';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import StatsPanel from '../../components/plots/StatsPanel';

// Temporary dummy data
const dummyData : PlotData = {
    xLabel: 'Time',
    yLabel: 'Some X Label',
    // xAxisPoints: [1, 2, 3, 4, 5],
    // yAxisPoints: [10, 20, 15, 25, 30],
    points: [
        {x: 1, y: 10},
        {x: 2, y: 20},
        {x: 3, y: 15},
        {x: 4, y: 25},
        {x: 5, y: 30}
    ],
    lineColor: '#8884d8'
}

export default function ManagePlots(){

    // List of plot data (might make this a parameter)
    // Generate random color data
    const [allPlotData, setAllPlotData] = useState<PlotData[]>([dummyData]);

    // Number representing the index for which stats panel is visible, -1 means none
    const [visibleGraph, setVisibleGraph] = useState<number>(0);

    useEffect(() => {
        // Fetch data from cache (localStorage)

    }, []);

    return (
        <div className="w-full flex flex-col font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
            {/* Render a single plot with multiple lines using Victory */}
            <div className="flex gap-8 w-full justify-center">

                {/* Left side: chart */}
                <Card sx={{ backgroundColor: '#1E1E1E', color: 'white', width: '750px', padding: '1rem', margin: "0 1rem", height: '500px'}}>
                    <CardHeader
                        title={<Typography variant="h4" component="div" sx={{ color: '#B0CCD9' }}>
                            {allPlotData[visibleGraph].yLabel} VS {allPlotData[visibleGraph].xLabel}
                        </Typography>}
                        subtitle={
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                            Toggle different plots to view them
                        </Typography>}
                        />
                    <CardContent>
                        <ResponsiveContainer width={'100%'} height={400}>
                            <LineChart data={allPlotData[visibleGraph].points} tabIndex={-1}>
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="x" />
                                <YAxis width="auto" label={{angle: -90}}/>
                                <Tooltip />
                                {/* <Legend /> */}
                                <Line type="monotone" dataKey="y" stroke={allPlotData[visibleGraph].lineColor} activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Right side: controls */}
                <Card sx={{ backgroundColor: '#F5F5F5', color: 'black', width: '250px', padding: '0', margin: "0 1rem",  marginTop: '0', height: '500px' }}>
                    <CardHeader
                        title={<Typography variant="h6" component="div" sx={{ color: 'black', padding: '0.5rem' }}>
                            Plots
                        </Typography>}
                        />
                    <CardContent>
                        <ChannelControls
                            plotData={allPlotData}
                            setVisibleGraph={setVisibleGraph}
                            />
                    </CardContent>
                </Card>
            </div>

            {(visibleGraph !== -1) &&
                <Card sx={{margin: '4rem 0', backgroundColor: '#1E1E1E'}}>
                    <CardHeader
                        title={
                        <Typography variant="h4" component="div" sx={{ color: '#B0CCD9', padding: '0.5rem' }}>
                            Key Metrics
                        </Typography>}
                        />
                    <CardContent>
                        <StatsPanel
                            points={allPlotData[visibleGraph].points}
                            />
                    </CardContent>
                </Card>
                
            }
        </div>
    )
}