document.addEventListener('DOMContentLoaded', (event) => {
    let codeElements = Array.from(document.getElementsByTagName('code'));
    let textContents = codeElements.map(code => code.textContent);

    setInterval(() => {
        // Shuffle array
        textContents.sort(() => Math.random() - 0.5);

        // Assign new text contents to code elements
        for (let i = 0; i < codeElements.length; i++) {
            codeElements[i].textContent = textContents[i];
        }
    }, 1000);
});


