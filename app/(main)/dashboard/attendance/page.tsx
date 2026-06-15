"use client";

import { useEffect, useState } from "react";

export default function AttendancePage() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/api/attendance/live")
            .then(res => res.json())
            .then(data => setRecords(data));
    }, []);

    return (
        
        <div className="p-10">
            

            <h1 className="text-3xl font-bold mb-6">
                Attendance Records
            </h1>

            <table className="w-full border">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Enrollment</th>
                        <th>Branch</th>
                        <th>Marked By</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>

                    {records.map(record => (

                        <tr key={record._id}>

                            <td>{record.name}</td>

                            <td>
                                {record.enrollmentNumber}
                            </td>

                            <td>{record.branch}</td>

                            <td>{record.markedBy}</td>

                            <td>
                                {new Date(
                                    record.createdAt
                                ).toLocaleTimeString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}