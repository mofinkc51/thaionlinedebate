import JSZip from 'jszip';

function jsonToXML(jsonData) {
  // ตรวจสอบว่า jsonData เป็นอาร์เรย์
  if (!Array.isArray(jsonData)) {
    console.error('jsonData is not an array.');
    return '';
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += `<thaionlinedebate>\n`;
  for (const debate of jsonData) {
    xml += ` <debate id='${debate.dbt_id}'>\n`;
    xml += `  <dbt_name>${debate.dbt_title}</dbt_name>\n`;
    xml += `  <dbt_description>${debate.dbt_description}</dbt_description>\n`;
    xml += `  <dbt_tag>${debate.dbt_tag}</dbt_tag>\n`;
    xml += `  <comments>\n`;

    // วนลูปเข้าถึง comments และสร้าง XML สำหรับแต่ละ comment
    for (const comment of debate.dbt_comment) {
      xml += `    <dbt_comment id='${comment.dbc_id}' stance='${comment.stance}'>\n`;
      xml += `      <dbc_comment>${comment.comment}</dbc_comment>\n`;
      xml += `    </dbt_comment>\n`;
    }

    // เพิ่ม top5 tags
    xml += `    <dbt_top5_tags_stance stance='เห็นด้วย'>${debate.dbt_top5_tags_stance_agree}</dbt_top5_tags_stance>\n`;
    xml += `    <dbt_top5_tags_stance stance='ไม่เห็นด้วย'>${debate.dbt_top5_tags_stance_disagree}</dbt_top5_tags_stance>\n`;

    xml += `  </comments>\n`;
    xml += `</debate>\n`;
  }
  xml += `</thaionlinedebate>\n`;
  return xml;
}



async function downloadFilesAsZip(dataArray) {
  const zip = new JSZip();
  console.log(dataArray);

  dataArray.forEach((data, index) => {
    // Create a JSON file for each data set
    const jsonData = JSON.stringify(data, null, 2);
    zip.file(`debate-topic-${index + 1}.json`, jsonData);

    // Create an XML file for each data set
    const xmlContent = jsonToXML([data]); // ต้องส่งเป็นอาร์เรย์
    zip.file(`debate-topic-${index + 1}.xml`, xmlContent);

    // Check if the data.dbt_comment is valid for CSV creation
    if (data.dbt_comment && data.dbt_comment.length > 0) {
      // Assume all comments have the same structure, so use the headers from the first one
      const headers = Object.keys(data.dbt_comment[0]);
      const csvData = data.dbt_comment.map((comment) =>
        headers.map((header) => {
          const value = comment[header];
          // If the value contains a comma, newline or double-quote, enclose it in double quotes
          return typeof value === 'string' && /["\n,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(',')
      );
      const csvContent = [headers.join(','), ...csvData].join('\n');
      zip.file(`debate-topic-${index + 1}-comments.csv`, csvContent);
    } else {
      console.error('Invalid data for CSV creation:', data);
    }
  });

  // Generate the zip content
  const content = await zip.generateAsync({ type: 'blob' });

  // Create a URL and trigger the download
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'debate-data.zip'; // Customize the zip file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
  
export default downloadFilesAsZip;
