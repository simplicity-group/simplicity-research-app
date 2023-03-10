import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import TransactionModal from '../components/general/TransactionModal';

const SpecificReport = () => {
  const navigate = useNavigate();

  var {selectedReport, setOnSpecificReport, getValueLabel, profileReportsDownloads} = UserAuth();
  const [modalOpen, setModalOpen] = useState(false)
  const [transactionLoading, setTransactionLoading] = useState(false);

  function backToReports(){
    setOnSpecificReport(true);
    navigate('/reports');
  }

  function handleDownload(){
    if(profileReportsDownloads.includes(selectedReport.name)){
      downloadReport()
    }
    else{
      setModalOpen(true);
    }
  }

  async function downloadReport(){
    const downloadURL = selectedReport.downloadURL;
    setModalOpen(false);
    window.open(downloadURL, '_blank');
    setTransactionLoading(false);
  }

  useEffect(() => {
    if(selectedReport.length === 0){
      navigate('/reports');
    }
  }, [])

  return (
    <div className='h-full bg-gray-100'>

    <TransactionModal 
      modalOpen={[modalOpen, setModalOpen]} 
      transactionLoading={[transactionLoading, setTransactionLoading]}
      transactionTitle="Download Report"
      transactionDescription="Downloading this report will transact 1 credit from your account, would you like to proceed?"
      transactionCost={1}
      postTransactionAction={downloadReport}
      transactionData={selectedReport.name}
    />

    <div className='p-6'>
      <div className='mb-6'>
        <div onClick={() => backToReports()}
         className='flex h-full justify-center items-center w-56 pl-4 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900 hover:cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <p className='justify-center'>All Reports</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md border border-gray-400  h-full mx-auto grid grid-cols-1 gap-y-4 gap-x-8 py-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        
        <div className=''>
          <h2 className="text-2xl font-bold mb-4 pb-5 tracking-tight text-gray-900 sm:text-6xl border-b border-gray-200">{selectedReport.name}</h2>
          <p className="mt-4 mb-4 text-gray-500">
            {selectedReport.summary}
          </p>
          { selectedReport.downloadURL &&
          <button 
            onClick={() => handleDownload()}
            className='flex mb-2 mt-2  pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
            >
              Download Report &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-download" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <polyline points="9 14 12 17 15 14" />
            </svg>
          </button>
          }
          { !selectedReport.downloadURL &&
            <p className='m-auto text-gray-500 text-sm'>no report document provided &nbsp; ???(?????????)???</p> 
          }

        </div>

        <div className=" grid grid-cols- grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="border-t border-gray-200 pt-4">
            <dt className="text-xl sm:text-2xl font-bold">Rating</dt>
            <dd className="text-xl mt-2 text-md text-gray-500">{getValueLabel('rating', selectedReport.rating)}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="text-xl sm:text-2xl font-bold">Stage</dt>
            <dd className="text-xl mt-2 text-md text-gray-500">{getValueLabel('stage', selectedReport.stage)}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="text-xl sm:text-2xl font-bold">Sectors</dt>
            <dd className="text-xl mt-2 text-md text-gray-500">{getValueLabel('sectors', selectedReport.sectors)}</dd>
          </div>
          <div>
          </div>
        </div>

      </div>
  </div>
    </div>


  )
}

export default SpecificReport
