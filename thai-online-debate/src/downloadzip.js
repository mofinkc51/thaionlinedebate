import JSZip from 'jszip';

function jsonToXML(jsonData) {
  // Simple function to convert JSON data to XML format
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  for (const [key, value] of Object.entries(jsonData)) {
    if (value instanceof Array) {
      value.forEach((item) => {
        xml += `<${key}>\n`;
        xml += jsonToXML(item);
        xml += `</${key}>\n`;
      });
    } else if (typeof value === 'object') {
      xml += `<${key}>\n`;
      xml += jsonToXML(value);
      xml += `</${key}>\n`;
    } else {
      xml += `<${key}>${value}</${key}>\n`;
    }
  }
  return xml;
}
  // dataArray.forEach((data, index) => {
  //   // Create a JSON file for each data set
  //   const jsonData = JSON.stringify(data, null, 2);
  //   zip.file(`labeled-debate-topic-${index + 1}.json`, jsonData);

  //   // Create a CSV file for each data set
  //   const headers = Object.keys(data[0]);
  //   const csvData = data.map((item) =>
  //     headers.map((header) => `"${item[header]}"`).join(',')
  //   );
  //   const csvContent = [headers.join(','), ...csvData].join('\n');
  //   zip.file(`labeled-debate-topic-${index + 1}.csv`, csvContent);

  //   // Create an XML file for each data set
  //   const xmlContent = jsonToXML(data);
  //   zip.file(`labeled-debate-topic-${index + 1}.xml`, xmlContent);
  // });

  async function downloadFilesAsZip(dataArray) {
    const zip = new JSZip();
  
    dataArray.forEach((data, index) => {
      // Create a JSON file for each data set
      const jsonData = JSON.stringify(data, null, 2);
      zip.file(`debate-topic-${index + 1}.json`, jsonData);
  
      // Create an XML file for each data set
      const xmlContent = jsonToXML(data);
      zip.file(`debate-topic-${index + 1}.xml`, xmlContent);
  
      // Check if the data.dbt_comment is valid for CSV creation
      if (data.dbt_comment && data.dbt_comment.length > 0) {
        const headers = Object.keys(data.dbt_comment[0]);
        const csvData = data.dbt_comment.map((item) =>
          headers.map((header) => `"${item[header]}"`).join(',')
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
