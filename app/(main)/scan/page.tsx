"use client";

import { use, useEffect, useState } from "react";

export default function ScanPage() {
  const [status, setStatus] = useState("");
  const [student, setStudent] = useState(null);
  
  
    useEffect(() => {
    let scanner;

    async function startScanner() {
        console.log("scanner starting...")
        console.log(navigator.mediaDevices);
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      console.log("scanner created...")
      scanner.render(
        async (decodedText) => {
            scanner.pause();
          console.log(decodedText);

          
            try{
          const res = await fetch("/api/attendance/mark", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              enrollmentNumber: decodedText,
              markedBy: "volunteer1",
            }),
          });
          const data = res.json();
          setStatus(data.message || "Attendance marked");
          setStudent(data);
        }finally{
            setTimeout(() => {
                scanner.resume();
            },2000)
        }
        },
        () => {}
      );
    }

    startScanner();

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, []);

  return <div id="reader">
    {status && (
  <div>
    <h2>{status}</h2>

    {student?.name && (
      <>
        <p>{student.name}</p>
        <p>{student.branch}</p>
      </>
    )}
  </div>
)}
  </div>;
}