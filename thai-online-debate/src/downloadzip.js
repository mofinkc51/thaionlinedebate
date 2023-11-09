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

async function downloadFilesAsZip(dataArray) {
  const zip = new JSZip();

  dataArray.forEach((data, index) => {
    // Create a JSON file for each data set
    const jsonData = JSON.stringify(data, null, 2);
    zip.file(`labeled-debate-topic-${index + 1}.json`, jsonData);

    // Create a CSV file for each data set
    const headers = Object.keys(data[0]);
    const csvData = data.map((item) =>
      headers.map((header) => `"${item[header]}"`).join(',')
    );
    const csvContent = [headers.join(','), ...csvData].join('\n');
    zip.file(`labeled-debate-topic-${index + 1}.csv`, csvContent);

    // Create an XML file for each data set
    const xmlContent = jsonToXML(data);
    zip.file(`labeled-debate-topic-${index + 1}.xml`, xmlContent);
  });

  // Generate the zip content
  const content = await zip.generateAsync({ type: 'blob' });

  // Create a URL and trigger the download
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'dataset.zip'; // You can customize the zip file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default downloadFilesAsZip;
