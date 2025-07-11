import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Baby, Moon, MapPin, Tag } from "lucide-react"
import dayjs from "dayjs"

const VisibleTable = ({
  rows,
  adultCount,
  childCount,
  checkIn,
  checkOut,
  tableRef,
  childrenAges
}: {
  rows: any
  adultCount: number
  childCount: number
  checkIn: string
  checkOut: string
  tableRef: React.RefObject<HTMLDivElement | null>
  childrenAges: number[]
}) => {
  const nightCount = dayjs(checkOut).diff(dayjs(checkIn), "day")

  return (
    <div ref={tableRef} className="w-full max-w-6xl mx-auto my-10 p-8">
      <Card className="shadow-lg bg-gradient-to-br from-white to-gray-50 p-0 border border-blue-400/30 rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <img src="logo.png" alt="logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold">+90 533 818 99 58</h2>
                <p className="text-blue-100 text-sm">info@helaltrip.com</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Booking Details */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CalendarDays className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <Label className="text-xs text-green-600 font-medium uppercase tracking-wide">Giriş</Label>
                <p className="font-semibold text-gray-800">{dayjs(checkIn).format("DD.MM.YYYY")}</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <CalendarDays className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <Label className="text-xs text-red-600 font-medium uppercase tracking-wide">Çıkış</Label>
                <p className="font-semibold text-gray-800">{dayjs(checkOut).format("DD.MM.YYYY")}</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Moon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <Label className="text-xs text-purple-600 font-medium uppercase tracking-wide">Gece</Label>
                <p className="font-semibold text-gray-800">{nightCount}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Label className="text-xs text-blue-600 font-medium uppercase tracking-wide">Yetişkin</Label>
                <p className="font-semibold text-gray-800">{adultCount}</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Baby className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <Label className="text-xs text-orange-600 font-medium uppercase tracking-wide">Çocuk</Label>
                <p className="font-semibold text-gray-800">{childCount}</p>
              </div>
            </div>
            {
              childCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Baby className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <Label className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Çocuk Yaşları</Label>
                    <p className="font-semibold text-gray-800">{childrenAges.join(", ")}</p>
                  </div>
                </div>
              )
            }
          </div>

          {/* Hotels Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 py-4">
                    <div className="flex items-center gap-2 pl-8">
                      <MapPin className="w-4 h-4" />
                      Otel
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      İndirimli Fiyat
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Oda Tipi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row: any, index: number) => {
                  const discountedPrice = row.discount
                    ? Math.ceil((row.cost * (1 - row.discount / 100)) / 1000) * 1000
                    : 0

                  return (
                    <TableRow
                      key={row.hotel}
                      className={`pl-8 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                    >
                      <TableCell className="py-4 pl-8">
                        <div className="font-medium text-gray-900 text-base">{row.hotel}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            {discountedPrice.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-gray-700">{row.roomType}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">⚠️</span>
              <span>
                <strong>Önemli:</strong> Fiyatlarımız anlıktır. Zam gelme ihtimaline göre fiyatlarımız değişebilir.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VisibleTable
