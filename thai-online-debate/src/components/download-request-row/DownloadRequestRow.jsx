import React from 'react'
import './DownloadRequestRow.css'
import deleteButtonIcon from '../../assets/icon/trash.svg'
import editButtonIcon from '../../assets/icon/edit.svg'
function DownloadRequestRow() {
    const rowData = {
        topicName: 'ไต้หวันเป็นประเทศ',
        stanceOne: 'เห็นด้วย',
        stanceTwo: 'ไม่เห็นด้วย',
        commentQuantity: 29
    }
  return (
    <>
        <tr className='download-request-row'>
            <td>{rowData.topicName}</td>
            <td>{rowData.stanceOne}</td>
            <td>{rowData.stanceTwo}</td>
            <td>{rowData.commentQuantity}</td>
            <td>
                <button><img src={editButtonIcon} alt="" /></button>
                <button><img src={deleteButtonIcon} alt="" /></button>
            </td>
        </tr>
    </>
  )
}

export default DownloadRequestRow