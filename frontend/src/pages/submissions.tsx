import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchSubmissions, Submission } from "../api/code";

const Submissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        const data: Submission[] = await fetchSubmissions();
        setSubmissions(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getSubmissions();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center min-h-screen">
        <div className="w-3/4">
          <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Submitted Code
            </h1>
            {submissions.map((submission, index) => (
              <div
                key={index}
                className="text-white mb-4 p-4 border rounded-md bg-gray-700 max-h-1/2 overflow-auto"
              >
                <h2 className="text-lg font-semibold">Code:</h2>
                <pre className="bg-gray-500 p-2 rounded-md">
                  {submission.code}
                </pre>
                <h2 className="text-lg font-semibold mt-2">Output:</h2>
                <pre className="bg-gray-500 p-2 rounded-md">
                  {submission.output}
                </pre>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Submissions;
