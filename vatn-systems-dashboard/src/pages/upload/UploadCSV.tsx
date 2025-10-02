import { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { Upload, FileText, TrendingUp } from "lucide-react"

export default function UploadCSV(){

    const [isDragOver, setIsDragOver] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [csvData, setCsvData] = useState<any[]>([])
    const [columns, setColumns] = useState<string[]>([])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === "text/csv") {
        processFile(droppedFile)
        }
    }

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

        // Store data in localStorage for the chart page
        localStorage.setItem("csvData", JSON.stringify(data))
        localStorage.setItem("csvColumns", JSON.stringify(headers))
        localStorage.setItem("csvFileName", file.name)
        }
        reader.readAsText(file)
    }

    const navigateToChart = () => {
        // Use navigator.push() to go to /chart
        console.log("NAVIGATING...")
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">CSV Data Visualizer</h1>
                </div>
                <p className="text-muted-foreground text-lg">Upload your CSV file to create interactive time-series charts</p>
                </div>

                {/* Upload Area */}
                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                        {/* <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                                Upload CSV File
                            </CardTitle>
                        <CardDescription>Drag and drop your CSV file here, or click to browse</CardDescription> */}
                        <Upload className="h-5 w-5" />
                                Upload CSV File
                    </CardHeader>
                <CardContent>
                    <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    >
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                        <p className="text-sm font-medium">
                            {isDragOver ? "Drop your CSV file here" : "Choose a CSV file or drag it here"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Supports CSV files up to 10MB</p>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>

                {/* File Preview */}
                {file && csvData.length > 0 && (
                    <Card>
                        <CardHeader>
                            {/* <CardTitle>File Preview: {file.name}</CardTitle>
                            <CardDescription>
                                {csvData.length} rows, {columns.length} columns detected
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                            {/* Columns */}
                            <div>
                            <h4 className="text-sm font-medium mb-2">Columns:</h4>
                            <div className="flex flex-wrap gap-2">
                                {columns.map((column, index) => (
                                <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                                    {column}
                                </span>
                                ))}
                            </div>
                            </div>

                            {/* Sample Data */}
                            <div>
                            <h4 className="text-sm font-medium mb-2">Sample Data (first 3 rows):</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border border-border rounded-md">
                                <thead>
                                    <tr className="bg-muted">
                                    {columns.map((column, index) => (
                                        <th key={index} className="p-2 text-left border-r border-border last:border-r-0">
                                        {column}
                                        </th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvData.slice(0, 3).map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-t border-border">
                                        {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="p-2 border-r border-border last:border-r-0">
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
                            <Button onClick={navigateToChart} className="w-full">
                            <TrendingUp className="h-4 w-4 mr-2" />
                                Create Time-Series Charts
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}