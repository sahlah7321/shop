function sendDataAndWhatsApp() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
  

    // 1. Send data to SheetDB
    fetch('https://sheetdb.io/api/v1/7sh202clnnsvw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                ID: Math.random().toString(36).substr(2, 9),
                Name: input1,
                Phone: input2,
                Text: input3,
                Contry: Intl.DateTimeFormat().resolvedOptions().timeZone,
                Date: new Date().toLocaleDateString(),
                Time: new Date().toLocaleTimeString(),
                Status: 'New'
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        // 2. Send WhatsApp message after successful SheetDB submission
        const message = `أسم العميل : *${input1}*\n\nرقم الجوال :*${input2}*\n\nالرسالة : *${input3}*`;
        fetch(`https://api.callmebot.com/whatsapp.php?phone=967730505521&text=${encodeURIComponent(message)}&apikey=4637254`)
        .then(response => response.text())
        .then(whatsappData => {
            alert('تم الإرسال بنجاح!');
        })
        .catch(whatsappError => {
            console.error('Error sending WhatsApp message:', whatsappError);
            alert('تم الإرسال بنجاح!');
        });
    })
    .catch(sheetDBError => {
        console.error('Error sending data to SheetDB:', sheetDBError);
        alert('فشل الإرسال!');
    });
}