"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'

const Form = ({ 
  checkIn, 
  setCheckIn, 
  checkOut, 
  setCheckOut, 
  adultCount, 
  setAdultCount, 
  childCount, 
  setChildCount, 
  hotels,
  rows,
  setRows,
  childrenAges,
  setChildrenAges
 }: { 
  checkIn: string, 
  setCheckIn: (checkIn: string) => void, 
  checkOut: string, 
  setCheckOut: (checkOut: string) => void, 
  adultCount: number, 
  setAdultCount: (adultCount: number) => void, 
  childCount: number, 
  setChildCount: (childCount: number) => void, 
  hotels: string[],
  rows: any,
  setRows: (rows: any) => void,
  childrenAges: number[],
  setChildrenAges: (childrenAges: number[]) => void
}) => {
  const [freeFormat, setFreeFormat] = useState("")
  const [rawInput, setRawInput] = useState("")
  const [showRawInput, setShowRawInput] = useState(false)

  const handleFreeFormat = (e: any) => {
    setFreeFormat(e.target.value)
  }

  const handleAddFreeFormat = () => {
    setRows([...rows, {hotel: freeFormat}])
    setFreeFormat("")
  }

  const handleRawInputChange = (e: any) => {
    setRawInput(e.target.value)
  }

  const handleApplyRawInput = () => {
    try {
      const data = JSON.parse(rawInput)
      
      if (data.checkIn) setCheckIn(data.checkIn)
      if (data.checkOut) setCheckOut(data.checkOut)
      if (data.adultCount !== undefined) setAdultCount(data.adultCount)
      if (data.childCount !== undefined) setChildCount(data.childCount)
      if (data.childrenAges) setChildrenAges(data.childrenAges)
      if (data.rows) setRows(data.rows)
      
      setRawInput("")
      alert("Veriler başarıyla uygulandı!")
    } catch (error) {
      alert("JSON formatı hatalı! Lütfen doğru format kullanın.")
      console.error("JSON parse error:", error)
    }
  }

  const generateRawInput = () => {
    const currentData = {
      checkIn,
      checkOut,
      adultCount,
      childCount,
      childrenAges,
      rows
    }
    setRawInput(JSON.stringify(currentData, null, 2))
  }

  return (
    <div className='flex flex-col gap-4 w-full items-center p-8'>
      {/* Raw Input Toggle Button */}
      <div className='flex gap-2'>
        <Button 
          variant="outline" 
          onClick={() => setShowRawInput(!showRawInput)}
          className="mb-4"
        >
          {showRawInput ? "Normal Form" : "Raw JSON Girişi"}
        </Button>
        {showRawInput && (
          <Button 
            variant="outline" 
            onClick={generateRawInput}
            className="mb-4"
          >
            Mevcut Verileri Kopyala
          </Button>
        )}
      </div>

      {/* Raw Input Section */}
      {showRawInput && (
        <div className='flex flex-col gap-4 w-full items-center border-2 border-blue-300 rounded-md p-4 bg-blue-50 max-w-2xl shadow-md'>
          <Label className="text-lg font-semibold">JSON Formatında Veri Girişi</Label>
          <div className="w-full">
            <Textarea
              placeholder={`Örnek format:
{
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-22",
  "adultCount": 2,
  "childCount": 1,
  "childrenAges": [8],
  "rows": [
    {"hotel": "Wome Deluxe"},
    {"hotel": "Angel's Marmaris"}
  ]
}`}
              value={rawInput}
              onChange={handleRawInputChange}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApplyRawInput} className="bg-green-600 hover:bg-green-700">
              Verileri Uygula
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setRawInput("")}
            >
              Temizle
            </Button>
          </div>
        </div>
      )}

      {/* Normal Form Section */}
      {!showRawInput && (
        <div className='flex flex-col gap-4 w-full items-center border-2 border-gray-300 rounded-md p-4 bg-gray-100 max-w-md shadow-md'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <Label>Giris Tarihi</Label>
              <Input type="date" value={checkIn} onChange={(e: any) => setCheckIn(e.target.value)} />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <Label>Cikis Tarihi</Label>
              <Input type="date" value={checkOut} onChange={(e: any) => setCheckOut(e.target.value)} />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <Label>Yetiskin Sayisi</Label>
              <Input type="number" value={adultCount} onChange={(e: any) => setAdultCount(Number(e.target.value))} />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <Label>Cocuk Sayisi</Label>
              <Input type="number" value={childCount} onChange={(e: any) => {
                const newChildCount = Number(e.target.value);
                setChildCount(newChildCount);
                // Çocuk sayısı değiştiğinde yaşları da güncelle
                if (newChildCount > childrenAges.length) {
                  // Yeni çocuk eklendiğinde yaşını 0 olarak ayarla
                  setChildrenAges([...childrenAges, ...Array(newChildCount - childrenAges.length).fill(0)]);
                } else if (newChildCount < childrenAges.length) {
                  // Çocuk sayısı azaldığında fazla yaşları kaldır
                  setChildrenAges(childrenAges.slice(0, newChildCount));
                }
              }} />
            </div>
          </div>
          {
            childCount > 0 && (
              <div className='flex flex-col gap-2 w-full'>
                <Label>Cocuk Yaşları</Label>
                {
                  childrenAges.map((age, index) => (
                    <Input 
                      key={index}
                      type="number" 
                      value={age} 
                      onChange={(e: any) => setChildrenAges(childrenAges.map((age, i) => i === index ? Number(e.target.value) : age))} 
                    />
                  ))
                }
              </div>
            ) 
          }
          {/* otel ekle */}
          <div className='flex flex-col gap-2 w-full'>
            <Select onValueChange={(value) => setRows([...rows, {hotel: value}])}  >
              <SelectTrigger>
                <SelectValue placeholder='Otel Seçiniz'>
                  {rows.length > 0 ? rows[rows.length - 1].hotel : "Otel Seçiniz"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* free format  */}
            <Input type="text" placeholder='Otel Seçiniz' value={freeFormat} onChange={handleFreeFormat} />
            <Button onClick={handleAddFreeFormat}>Otel Ekle</Button>

          </div>
        </div>
      )}
    </div>
  )
}

export default Form