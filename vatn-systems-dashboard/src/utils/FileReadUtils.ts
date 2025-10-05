

export function parseCsvFile (file: File) {
    const reader = new FileReader()

    let columns : string[] = []
    let data : number[] = []
    reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())
        columns = lines[0].split(",").map((h) => h.trim())

        data = lines.slice(1).map((line) => {
            const values = line.split(",")
            const row: any = {}
            columns.forEach((column, index) => {
                row[column] = values[index]?.trim() || ""
            })
            return row
        })
    }
    reader.readAsText(file)

    return {
        columns: columns,
        data: data
    }
}