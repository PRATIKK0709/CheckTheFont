document.getElementById('fontUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'font/ttf') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fontData = e.target.result;
            const fontFace = new FontFace('customFont', fontData);
            fontFace.load().then(function(loadedFont) {
                document.fonts.add(loadedFont);
                document.getElementById('textOutput').style.fontFamily = 'customFont';
            }).catch(function(error) {
                console.error('Failed to load font:', error);
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid .ttf font file.');
    }
});

document.getElementById('textInput').addEventListener('input', function() {
    const text = this.value;
    document.getElementById('textOutput').innerText = text;
});

document.getElementById('colorPicker').addEventListener('input', function() {
    const color = this.value;
    document.getElementById('textOutput').style.color = color;
});

document.getElementById('generateImage').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const color = document.getElementById('colorPicker').value;
    const font = 'customFont';
    const textOutput = document.getElementById('textOutput');
    const width = textOutput.clientWidth;
    const height = textOutput.clientHeight;

    const scale = 2; // Scale factor for high DPI
    const canvas = document.getElementById('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    ctx.fillStyle = '#1c1f24'; // Match background color
    ctx.fillRect(0, 0, width, height);

    const fontSize = 16 * scale; // Adjust font size with scale
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;

    // Adjust the position to center the text
    const textMetrics = ctx.measureText(text);
    const textX = (width - textMetrics.width) / 2;
    const textY = (height + fontSize / 2) / 2;

    ctx.fillText(text, textX, textY);

    const dataURL = canvas.toDataURL('image/png');

    const img = new Image();
    img.src = dataURL;
    img.alt = 'Generated Image';
    img.className = 'generated-image';

    const imageOutput = document.getElementById('imageOutput');
    imageOutput.innerHTML = '';
    imageOutput.appendChild(img);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = dataURL;
    downloadLink.style.display = 'inline-block';
});
