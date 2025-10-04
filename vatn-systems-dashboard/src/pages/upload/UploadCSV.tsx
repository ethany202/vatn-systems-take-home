import { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Upload, TrendingUp } from "lucide-react"
import './UploadCSV.css'
import type { PlotData } from '../../utils/model';

export default function UploadCSV(){

    const [file, setFile] = useState<File | null>(null)
    const [csvData, setCsvData] = useState<any[]>([])
    const [columns, setColumns] = useState<string[]>([])

    const [collectedCsvData, setCollectedCsvData] = useState<PlotData[]>([])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            processFile(selectedFile)
        }
    }

    const processFile = (file: File) => {
        setFile(file)
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

        setColumns(headers)
        setCsvData(data)
        console.log("Parsed CSV Data:", data)

        // Store data in localStorage for the chart page
        localStorage.setItem("csvData", JSON.stringify(data))
        localStorage.setItem("csvFileName", file.name)
        }
        reader.readAsText(file)
    }

    const navigateToChart = () => {
        // Use navigator.push() to go to /chart
        console.log("NAVIGATING...")
    }
    

    return (
        <div className="w-3/4">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-white mb-2">Plot Manager</h1>
                <h3 className="text-lg text-[#B0CDD9] !font-normal">Upload your CSV file to create interactive time-series charts</h3>
            </div>

            {/* Upload Area */}
            <Card sx={{ 
                width: '100%',
                backgroundColor: 'transparent',
                margin: '2rem 0'
            }} className="w-full">
                <CardContent 
                    sx={{
                        backgroundColor: "#060606",
                        border: '2px dashed #333333',
                        borderRadius: '0.5rem',
                        width: '90%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifySelf: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        marginBottom: '2rem',
                        transition: 'border-color 0.2s',
                        '&:hover': {
                            borderColor: '#B0CDD9',
                        },
                    }}
                >
                    <label className="relative w-full text-center cursor-pointer">
                        <div className="flex w-full justify-center">
                            <div className="file-icon-container rounded-2xl bg-[#B0CDD9]/50 justify-center flex w-fit">
                                <Upload className="file-icon h-10 w-10 text-[#B0CDD9]"/>
                            </div>
                        </div>
                        
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <p className="text-[18px] text-[#F5F5F5]">Choose a CSV file to upload</p>
                        <p className="text-[12px] text-[#B0B0B0] mt-1">(Supports CSV files up to 10MB)</p>
                    </label>

                </CardContent>
            </Card>

            {/* File Preview */}
            {file && csvData.length > 0 && (
                <Card
                    sx = {{
                        backgroundColor: "#060606",
                        border: '2px solid #222222',
                        borderRadius: '0.5rem',
                    }}
                    >
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-[#F5F5F5] text-base font-semibold">File Preview: {file.name}</h3>
                                <p className="text-[#B0B0B0] text-sm">{csvData.length} rows, {columns.length} columns detected</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2 text-[#F5F5F5]">Sample Data (first 3 rows):</h4>
                                <div className=".hide-scrollbar overflow-x-auto">
                                    <table className="w-full text-xs border border-[#B0B0B0] rounded-md">
                                        <thead>
                                            <tr className="bg-[#B0CDD9]/20">
                                                {columns.map((column, index) => (
                                                    <th key={index} className="p-2 text-left border-r border-[#B0B0B0] last:border-r-0 text-[#B0CDD9]">
                                                        {column}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {csvData.slice(0, 3).map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-t border-[#B0B0B0]">
                                                    {columns.map((column, colIndex) => (
                                                        <td key={colIndex} className="p-2 border-r border-[#B0B0B0] last:border-r-0 text-[#F5F5F5]">
                                                            {row[column]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button onClick={navigateToChart} variant='contained' className="w-full hover:opacity-90">
                                <TrendingUp className="trending-icon h-4 w-4 mr-2 text-black" />
                                Create Time-Series Charts
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}