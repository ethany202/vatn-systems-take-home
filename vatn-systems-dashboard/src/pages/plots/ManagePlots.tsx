import { useState, useEffect } from 'react';
import type { PlotData } from '../../utils/model';
import { appendPlotData } from '../../utils/PlotDataUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChannelControls from '../../components/plots/ChannelControls';
import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';
import StatsPanel from '../../components/plots/StatsPanel';

export default function ManagePlots(){


    const [allPlotData, setAllPlotData] = useState<PlotData[]>([]);
    // Number representing the index for which stats panel is visible, -1 means none
    const [visibleGraph, setVisibleGraph] = useState<number>(-1);

    const deletePlotData = (index: number) => {
        if(allPlotData.length === 1){
            return;
        }

        setAllPlotData(prevData => prevData.filter((_, i) => i !== index));
        setVisibleGraph(0);
    }

    const processFile = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target?.result as string
            const lines = text.split("\n").filter((line) => line.trim())
            const headers = lines[0].split(",").map((h) => h.trim())

            const data = lines.slice(1).map((line) => {
                const values = line.split(",")
                const row: any = {}
                headers.forEach((header, index) => {
                    row[header] = values[index]?.trim() || ""
                })
                return row
            })

            updatePlotData(data)

        }
        reader.readAsText(file)
    }

    const updatePlotData = (data : any[]) => {
        const currentPlotData = JSON.parse(localStorage.getItem("collectedPlotData") || '[]')
        const updatedPlotData = appendPlotData(data, currentPlotData);

        localStorage.setItem("collectedPlotData", JSON.stringify(updatedPlotData))

        setAllPlotData(updatedPlotData)
    }

    useEffect(() => {
        // Fetch data from cache (localStorage)
        const fetchedData = localStorage.getItem("collectedPlotData");
        if(fetchedData){
            const parsedData: PlotData[] = JSON.parse(fetchedData);
            setAllPlotData(parsedData);
            // Set visible graph to first one by default
            if(parsedData.length > 0){
                setVisibleGraph(0);
            }
        }
    }, []);

    return (
        <div className="w-full">
            <h1 className="page-header text-white px-2 text-center">View Plot Data</h1>
            <div className="flex gap-8 w-full justify-center">

                {/* Left side: chart */}
                <Card sx={{ backgroundColor: '#060606',  border: '2px dashed #222222', borderRadius: '1rem', color: 'white', width: '75%', padding: '1.75rem', margin: "0 1rem"}}>
                    {visibleGraph !== -1 &&
                        <>
                            <CardHeader
                                title={<Typography variant="h5" component="div" sx={{ color: '#B0CDD9' }}>
                                    `{allPlotData[visibleGraph].yLabel}` VS {allPlotData[visibleGraph].xLabel}
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
                                        <YAxis width={30} label={{angle: -90}}/>
                                        <Tooltip labelFormatter={(label) => `X: ${label}`} formatter={(value) => [`Y: ${value}`]} />
                                        <Line type="monotone" dataKey="y" stroke={allPlotData[visibleGraph].lineColor} activeDot={{r: 8}}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </>
                    }
                </Card>

                {/* Right side: controls */}
                <Card
                sx={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '1rem',
                    color: 'black',
                    width: '15%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    margin: '0 1rem',
                }}
                >                    
                    <CardHeader
                        title={
                        <Typography variant="h6" component="div" sx={{ color: 'black', padding: '0.5rem' }}>
                            Plots
                        </Typography>}
                        />
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        height: '100%',
                        }}>
                          <ChannelControls
                            plotData={allPlotData}
                            visibleGraph={visibleGraph}
                            setVisibleGraph={setVisibleGraph}
                            deletePlotData={deletePlotData}
                            />
                        <Button 
                            tabIndex={-1} 
                            variant='contained' 
                            disableRipple
                            size="small"
                            sx = {{
                                color: 'white',
                                backgroundColor: '#333333',
                            }}
                            component="label"
                            >Add Plot
                            
                            <input
                                type="file"
                                hidden                       // hide actual file input
                                accept=".csv"                // adjust accepted types
                                onChange={(e) => {
                                    processFile(e.target.files[0]);
                                }}/>
                            </Button>
                    </CardContent>
                </Card>
            </div>

            {(visibleGraph !== -1) &&
                <div className="w-full flex justify-center">
                    
                    <Card sx={{margin: '4rem 0', width: '90%', backgroundColor: '#060606',  border: '2px dashed #222222', borderRadius: '1rem'}}>
                        <CardHeader
                            title={
                            <Typography variant="h5" component="div" sx={{ color: '#B0CDD9', padding: '0.5rem' }}>
                                Key Metrics
                            </Typography>}
                            />
                        <CardContent>
                            <StatsPanel
                                points={allPlotData[visibleGraph].points}
                                />
                        </CardContent>
                    </Card>
                </div>
            }
        </div>
    )
}