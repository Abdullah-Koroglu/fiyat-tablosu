"use client"
import Form from "@/components/form";
import HotelTable from "@/components/table";
import { Button } from "@/components/ui/button";
import VisibleTable from "@/components/VisibleTable";
import html2canvas from "html2canvas-pro";
import { useRef, useState } from "react";


const hotels = [
  "Wome Deluxe",
  "Angel's Marmaris",
  "Adenya Resort",
  "Şah Inn Paradise",
  "The Oba",
  "Adin Beach",
  "Bera Alanya",
  "Rizom Beach",
  "Selge Beach",
  "Royal Teos",
  "Rizom Tatil Köyü",
]

const discountTable = [
  {
    hotel: "Wome Deluxe",
    discount: 15
  },
  {
    hotel: "Angel's Marmaris",
    discount: 15
  },
  {
    hotel: "Adenya Resort",
    discount: 15
  },
  {
    hotel: "Şah Inn Paradise",
    discount: 15
  },
  {
    hotel: "The Oba",
    discount: 15
  },
  {
    hotel: "Adin Beach",
    discount: 12,
  },
  {
    hotel: "Bera Alanya",
    discount: 15,
  },
  {
    hotel: "Rizom Beach",
    discount: 15,
  },
  {
    hotel: "Selge Beach",
    discount: 15,
  },
  {
    hotel: "Royal Teos",
    discount: 15,
  },
  {
    hotel: "Rizom Tatil Köyü",
    discount: 15,
  },
]

export default function Home() {
  const [checkIn, setCheckIn] = useState<string>("")
  const [checkOut, setCheckOut] = useState<string>("")
  const [adultCount, setAdultCount] = useState<number>(0)
  const [childCount, setChildCount] = useState<number>(0)
  const [rows, setRows] = useState<any>([])
  const tableRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <Form 
        checkIn={checkIn} 
        setCheckIn={setCheckIn} 
        checkOut={checkOut} 
        setCheckOut={setCheckOut} 
        adultCount={adultCount} 
        setAdultCount={setAdultCount} childCount={childCount} setChildCount={setChildCount} 
        hotels={hotels} 
        rows={rows} 
        setRows={setRows} />
      <HotelTable 
        rows={rows} 
        setRows={setRows} 
        discountTable={discountTable} 
      />
      <div className="flex justify-center mt-4 mb-4 ">
        <Button onClick={() => {
          html2canvas(tableRef.current as HTMLElement).then((canvas: any) => {
            const link = document.createElement("a")
            link.href = canvas.toDataURL("image/png")
            link.download = "table.png"
            link.click()
          })
        }}>
          Tabloyu PDF'e çevir
        </Button>
      </div>
      <VisibleTable rows={rows} adultCount={adultCount} childCount={childCount} checkIn={checkIn} checkOut={checkOut} tableRef={tableRef}/>
    </div>
  );
}
