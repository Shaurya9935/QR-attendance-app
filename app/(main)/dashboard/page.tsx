"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/dashboard")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-8">
                Attendance Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-6">

                <div className="border p-6 rounded-lg">
                    <h2>Total Students</h2>
                    <p className="text-3xl">
                        {data.totalStudents}
                    </p>
                </div>

                <div className="border p-6 rounded-lg">
                    <h2>Present Students</h2>
                    <p className="text-3xl">
                        {data.presentStudents}
                    </p>
                </div>

                <div className="border p-6 rounded-lg">
                    <h2>Absent Students</h2>
                    <p className="text-3xl">
                        {data.absentStudents}
                    </p>
                </div>

                <div className="border p-6 rounded-lg">
                    <h2>Attendance %</h2>
                    <p className="text-3xl">
                        {data.attendancePercentage}%
                    </p>
                </div>

            </div>

        </div>
    );
}