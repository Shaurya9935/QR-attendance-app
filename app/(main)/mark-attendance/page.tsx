"use client"

import React, { useState } from "react"

const MarkAttendance = () => {
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "info" | null>(null); // 'success' | 'error' | 'info'
  const [loading, setLoading] = useState(false);

  const markAttendance = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    if (!enrollmentNumber) {
      setStatus("error");
      setMessage("Please enter an enrollment number.");
      return;
    }

    try {
      setLoading(true);
      setStatus("info");
      setMessage("Marking attendance...");

      const response = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentNumber, markedBy: "Volunteer1" }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || `Marked: ${data.studentName || enrollmentNumber}`);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to mark attendance.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
      setEnrollmentNumber("");
    }
  };

  const messageClasses = status === "success"
    ? "text-green-100 bg-green-800 border-green-700"
    : status === "error"
    ? "text-red-100 bg-red-800 border-red-700"
    : "text-gray-100 bg-gray-700 border-gray-600";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg ring-1 ring-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-white">Mark Attendance</h1>

        <form onSubmit={markAttendance} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm text-gray-200">
            Enrollment Number
            <input
              type="text"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              placeholder="e.g. 2021-ABC-123"
              className="mt-2 border rounded-md p-3 w-full bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Enrollment Number"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-indigo-500 hover:bg-indigo-600'}`}
            >
              {loading ? "Marking..." : "Mark Attendance"}
            </button>
            <button
              type="button"
              onClick={() => { setEnrollmentNumber(""); setMessage(""); setStatus(null); }}
              className="px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-gray-700"
            >
              Clear
            </button>
          </div>

          {message ? (
            <div role="status" className={`border p-3 rounded-md text-sm ${messageClasses}`}>
              {message}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;