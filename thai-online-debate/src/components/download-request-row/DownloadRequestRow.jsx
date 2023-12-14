import React from "react";
import "./DownloadRequestRow.css";
import deleteButtonIcon from "../../assets/icon/trash.svg";
import editButtonIcon from "../../assets/icon/edit.svg";
import { makeRequest } from "../../axios";
function DownloadRequestRow(props) {
  const rowData = {
    topicName: props.data.dbt_title,
    stanceOne: props.data.dbt_agree,
    stanceTwo: props.data.dbt_disagree,
    commentQuantity: props.data.count,
    dbt_id: props.data.dbt_id,
  };
  const deleteLocalStorage = async () => {
    console.log(rowData.dbt_id);
    let downloadList = JSON.parse(localStorage.getItem("downloadList"));

    // ตรวจสอบว่า downloadList มีข้อมูลหรือไม่
    if (downloadList) {
      downloadList = downloadList.filter((item) => item !== rowData.dbt_id);
      localStorage.setItem("downloadList", JSON.stringify(downloadList));
    }

    // ไม่ว่า downloadList จะมีข้อมูลหรือไม่ก็ตาม, ดำเนินการลบข้อมูลต่อไป
    try {
      const res = await makeRequest.delete(`/downloads/${rowData.dbt_id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    props.refresh();
  };

  return (
    <>
      <tr className="download-request-row">
        <td>{rowData.topicName}</td>
        <td className="download-request-row-stance">{rowData.stanceOne}</td>
        <td className="download-request-row-stance">{rowData.stanceTwo}</td>
        <td className="download-request-row-number">
          <p>{rowData.commentQuantity}</p>
        </td>
        <td>
          {/* <button><img src={editButtonIcon} alt="" /></button> */}
          <button onClick={deleteLocalStorage}>
            <img src={deleteButtonIcon} alt="" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default DownloadRequestRow;
