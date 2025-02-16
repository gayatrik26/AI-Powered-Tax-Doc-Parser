import React from "react";
import { FiCopy } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";

const ExtractedData = ({
  responseData,
  copyToClipboard,
  handleDownloadJSON,
}) => {
  if (!responseData) return null;

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-md w-3/4 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Extracted Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extracted Text */}
        <div className="p-6 bg-gray-700 rounded-lg shadow-md h-auto max-h-72 overflow-y-auto">
          <h3 className="text-xl font-bold text-green-400 mb-2">
            Extracted Text:
          </h3>
          <div className="max-h-48 overflow-y-auto p-2">
            <p className="text-gray-300 text-sm leading-6">
              {responseData.extracted_text || "No text found"}
            </p>
          </div>
        </div>

        {/* Entities as Tags */}
        <div className="p-6 bg-gray-700 rounded-lg shadow-md h-72 overflow-hidden">
          <h3 className="text-xl font-bold text-green-400 mb-2">Entities:</h3>
          <div className="max-h-48 overflow-y-auto flex flex-wrap gap-2 p-2">
            {responseData.entities &&
              Object.entries(responseData.entities).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <span className="text-green-300 font-semibold">{key}:</span>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </div>
                )
              )}
          </div>
        </div>

        {/* Compliance Report */}
        <div className="p-6 bg-gray-700 rounded-lg shadow-md h-72 overflow-hidden">
          <h3 className="text-xl font-bold text-green-400 mb-2">
            Compliance Report:
          </h3>
          <div className="max-h-48 overflow-y-auto">
            <ul>
              {responseData.compliance_report?.issues?.map((issue, index) => (
                <li key={index} className="text-red-400">
                  ⚠️ {issue}
                </li>
              ))}
              {responseData.compliance_report?.warnings?.map(
                (warning, index) => (
                  <li key={index} className="text-yellow-400">
                    ⚠️ {warning}
                  </li>
                )
              )}
              {responseData.compliance_report?.recommendations?.map(
                (fix, index) => (
                  <li key={index} className="text-green-400">
                    ✅ {fix}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Chatbot Response */}
        <div className="p-6 bg-gray-700 rounded-lg shadow-md h-72 overflow-hidden">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">
            Chatbot Response:
          </h3>
          <div className="max-h-48 overflow-y-auto">
            <p className="text-gray-300 text-sm">
              {responseData.chatbot_response || "No response available."}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-green-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
          onClick={handleDownloadJSON}
        >
          <AiOutlineDownload className="text-xl" /> Download JSON
        </button>

        <button
          onClick={() => copyToClipboard(responseData.extracted_text)}
          className="bg-gray-600 p-2 rounded-lg text-white flex items-center hover:bg-gray-700 transition-all"
        >
          <FiCopy className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ExtractedData;
