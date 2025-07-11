"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'


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


  return (
    <div className='flex flex-col gap-4 w-full items-center p-8'>
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
            <Input type="number" value={childCount} onChange={(e: any) => setChildCount(Number(e.target.value))} />
          </div>
        </div>
        {
          childCount > 0 && (
            <div className='flex flex-col gap-2 w-full'>
              <Label>Cocuk Yaşları</Label>
              {
                childrenAges.map((age, index) => (
                  <Input type="number" value={age} onChange={(e: any) => setChildrenAges(childrenAges.map((age, i) => i === index ? Number(e.target.value) : age))} />
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

        </div>
      </div>
    </div>
  )
}

export default Form