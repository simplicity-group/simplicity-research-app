import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SRCoin from '../../images/coin.svg'
import { transactTokens, saveReportDownloadTransaction, getReportDownloads } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';

export default function TransactionModal(props) {
    
  const { profile, setProfileTokens, setProfileReportsDownloads } = UserAuth();
  const [modalOpen, setModalOpen] = props.modalOpen;
  const [transactionLoading, setTransactionLoading] = props.transactionLoading;
  const [errorMessage, setErrorMessage] = useState('');

  const cancelButtonRef = useRef(null)

  async function callTransaction(){
    const cost = props.transactionCost;
    setTransactionLoading(true);
    
    const transactionSuccess = await transactTokens(cost, profile.id)

    if(transactionSuccess[0] === true){

      //If this transaction is for a report download
      if(props.transactionTitle === 'Download Report'){
        await saveReportDownloadTransaction(profile.id, props.transactionData);
      }
      setProfileReportsDownloads(await getReportDownloads(profile.id));

      setProfileTokens(transactionSuccess[1]);
      props.postTransactionAction();

      return
    } else {
      setErrorMessage('You do not have enough credits to make this transaction.')
      setTransactionLoading(false);
      return
    }
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModalOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="border border-gray-400 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                        <img src={SRCoin} className="w-6" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {props.transactionTitle}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {props.transactionDescription}
                        </p>
                        <p className='mt-2 text-sm text-red-500'>
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-black text-white py-2 px-4 text-base font-medium text-white shadow-sm hover:shadow-md hover:border-gray-400 hover:bg-gray-900  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => callTransaction()}
                    disabled={transactionLoading === true}
                  >
                  { transactionLoading === false &&
                    <p>Proceed</p>
                  }
                  { transactionLoading === true &&
                    <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                  }
                  </button>
                  { transactionLoading === false &&
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setModalOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  }

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
