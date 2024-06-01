import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { testCode, submitCode } from "@/api/code";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("print('Hello Datacurve')");
  const [output, setOutput] = useState<string>("Hello Datacurve");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTestCode = async () => {
    try {
      setLoading(true);
      const result: string = await testCode(code);
      setOutput(result);
    } catch (error: any) {
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    try {
      setLoading(true);
      const result: string = await submitCode(code);
      setOutput(result);
    } catch (error: any) {
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-700 text-white rounded-md">
      <Editor
        height="60vh"
        language="python"
        value={code}
        onChange={(value) => setCode(value || "")}
        className="border rounded-md"
      />
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleTestCode}
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          Test Code
        </button>
        <button
          onClick={handleSubmitCode}
          className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded"
        >
          Submit Code
        </button>
      </div>
      <pre className="mt-4 p-2 bg-gray-500 rounded-md overflow-auto">
        {loading ? "Loading..." : output}
      </pre>
    </div>
  );
};

export default CodeEditor;
