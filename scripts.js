const streams = {
    'hiru': 'https://radio.lotustechnologieslk.net:2020/stream/shaafmgarden',
    'stream2': 'https://example.com/stream2',
    'stream3': 'https://example.com/stream3'

};


async function checkStreamStatus(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error checking stream status:', error);
        return false;
    }
}


async function populateStreamsTable() {
    const tableBody = document.querySelector('#streamsTable tbody');
    

    tableBody.innerHTML = '';
    
    // Iterate through the streams and add rows to the table
    for (const [name, url] of Object.entries(streams)) {
        const isActive = await checkStreamStatus(url);
        const statusClass = isActive ? 'status-active' : 'status-inactive';
        const statusText = isActive ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td><a href="${url}" target="_blank">${url}</a></td>
            <td class="${statusClass}">${statusText}</td>
        `;
        
        tableBody.appendChild(row);
    }
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


function fetchRadioStream() {
    const streamParam = getQueryParam('stream');
    let radioStreamURL = streams[streamParam] || '';
    
    if (radioStreamURL) {
        const radioPlayer = document.getElementById('radioPlayer');
        const radioStream = document.getElementById('radioStream');
        
        radioStream.src = radioStreamURL;
        radioPlayer.load();
        radioPlayer.play();
    } else {
        alert('No stream available for the given parameter.');
    }
}


window.onload = populateStreamsTable;
