import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import React from 'react'
import { Input } from './ui/input'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { discountTable } from '@/app/page'

const HotelTable = ({
  rows,
  setRows
}: {
  rows: any,
  setRows: (rows: any) => void
}) => {
  return (
    <Table className='w-full max-w-5xl mx-auto bg-gray-100 rounded-md p-4'>
      <TableHeader>
        <TableRow>
          <TableHead>Otel</TableHead>
          <TableHead>iskonto Orani</TableHead>
          <TableHead>Maliyet</TableHead>
          <TableHead>Fiyat</TableHead>
          <TableHead>Oda tipi</TableHead>
          <TableHead>Aksiyon</TableHead>
          <TableHead>Burut Iskonto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          rows.map((row: any) => (
            <TableRow key={row.hotel}>
              <TableCell>{row.hotel}</TableCell>
              <TableCell>
                <Input type="number" value={row.discount} onChange={(e: any) => setRows(rows.map((thisRow: any) => thisRow.hotel === row.hotel ? { ...thisRow, discount: e.target.value } : thisRow))} />
                {/* <span>%</span> */}
              </TableCell>
              <TableCell>
                <Input type="number" value={row.cost} onChange={(e: any) => setRows(rows.map((thisRow: any) => thisRow.hotel === row.hotel ? { ...thisRow, cost: e.target.value } : thisRow))} />
                {/* <span>₺</span> */}
              </TableCell>
              <TableCell>
                {
                  row.discount && row.cost ? (row.cost * (1 - row.discount / 100)).toFixed(2) : 0
                }
                {/* <span>₺</span> */}
              </TableCell>
              <TableCell>
                  <Input type="text" value={row.roomType} onChange={(e: any) => setRows(rows.map((thisRow: any) => thisRow.hotel === row.hotel ? { ...thisRow, roomType: e.target.value } : thisRow))} />
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => setRows(rows.filter((thisRow: any) => thisRow.hotel !== row.hotel))}>
                  <Trash2 />
                </Button>
              </TableCell>
              <TableCell>
                {
                  discountTable.find((discount: any) => discount.hotel === row.hotel)?.discount
                }
              </TableCell>
            </TableRow> 
          ))
        }
      </TableBody>
    </Table>
  )
}

export default HotelTable