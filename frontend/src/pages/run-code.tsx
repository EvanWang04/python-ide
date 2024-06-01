import React from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";

const RunCode: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Run Your Code</h1>
        <CodeEditor />
      </main>
    </div>
  );
};

export default RunCode;
