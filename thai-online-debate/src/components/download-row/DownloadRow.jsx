import React from 'react'
import './DownloadRow.css'


function DownloadRow() {
    const rowData = {
        date: '13/05/2022  16.30',
        timeRemaining: '6 วัน 23 ชั่วโมง',
        quantity: '3',
        status: 'อนุมัติแล้ว'
    }
  return (
    <>
        <tr className='download-list-row'>
            <td>{rowData.date}</td>
            <td>{rowData.timeRemaining}</td>
            <td>{rowData.quantity}</td>
            <td>{rowData.status}</td>
            <td><button><img src={rowData.status} alt="" /></button></td>
        </tr>
    </>
  )
}

export default DownloadRow