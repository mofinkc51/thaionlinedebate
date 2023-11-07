import JSZip from 'jszip';


export default async function downloadFilesAsZip(dataArray) {
    const zip = new JSZip();
  
    dataArray.forEach((data, index) => {
      // Create a JSON file for each data set
      const jsonData = JSON.stringify(data, null, 2);
      zip.file(`labeled-data-${[index+1]}.json`, jsonData);
  
      // Create a CSV file for each data set
      const headers = Object.keys(data[0]);
      const csvData = data.map(item => headers.map(header => item[header]).join(','));
      const csvContent = [headers.join(','), ...csvData].join('\n');
      zip.file(`labeled-data-${[index+1]}.csv`, csvContent);
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
  
  // export default downloadFilesAsZip;