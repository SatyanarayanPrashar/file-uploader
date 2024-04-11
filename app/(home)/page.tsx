"use client"

import { useState } from 'react';
import axios from 'axios';
import { FileText } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFileSelected(true);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post('/api/upload', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleChooseAnotherFile = () => {
    setSelectedFile(null);
    setFileSelected(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border rounded-md p-7 flex gap-10">
        <div>
          <h2 className="font-[600] mb-4">Upload your recent resume or CV</h2>
          <p className="text-[14px]">Upload your most up-to-date resume <br /> File types: DOC, DOCX, PDF, TXT</p>
        </div>
        <div className="w-full">
          <p><a>View your resume</a> or upload a new one below</p>
          <div className="h-[7rem] mt-4 w-full border-dotted border border-black p-4 flex justify-center items-center">
            {!fileSelected ? (
              <label htmlFor="fileUpload" className="cursor-pointer flex flex-col justify-center items-center">
                <FileText color="blue" size="35px" />
                <p className="text-center text-[#9e9ea1] text-[12px]">click here to select file</p>
              </label>
            ) : (
              <div className="flex justify-center items-center">
                <div className='flex flex-col mr-5 items-end justify-center'>
                  <p className="text-[#9e9ea1] text-[14px]">Selected file: {selectedFile?.name}</p>
                  <a className=" text-[#525252] text-[14px] underline hover:text-[blue] cursor-pointer" onClick={handleChooseAnotherFile}>Choose another file</a>
                </div>
                  <div className="flex">
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFileUpload}>Upload</button>
                  </div>
              </div>
            )}
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              accept=".doc,.docx,.pdf,.txt"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
