fetch('https://translate.zfc.com.tr/translate', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({text:'Merhaba ben zfc',lang:'en'})
});