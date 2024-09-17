const containerSummary = document.getElementById('content-summary');
const containerPresentation = document.getElementById('content-presentation');
const containerFiche = document.getElementById('content-sheet')
const actionButtons = document.querySelectorAll('.container .header span');


function removeAttributesAndClasses() {
    // Remove aria- and data- attributes and collapse and show classes
    document.querySelectorAll('*').forEach(element => {
        const attributes = Array.from(element.attributes);
        
        attributes.forEach(attr => {
            if (attr.name.startsWith('aria-') || attr.name.startsWith('data-')) {
                element.removeAttribute(attr.name);
            }
        });
        
        element.classList.remove('collapse', 'show');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    removeAttributesAndClasses();

    document.querySelectorAll('.container .content a[href]').forEach(anchor => {
        let href = anchor.getAttribute('href');
        if (!href.startsWith('vie-publique.fr') && href.length > 1) {
            anchor.setAttribute('href', 'https://vie-publique.fr' + href);
            anchor.setAttribute('target', '_blank');
        }
    });

    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
    
            actionButtons.forEach(b => b.classList.remove('active'))
            e.target.classList.add('active')
            const which = button.id;
    
            switch (which) {
                case '0':
                    containerSummary.style.display = 'flex';
                    containerPresentation.style.display = 'none';
                    containerFiche.style.display = 'none';
                    break;
                case '1':
                    containerSummary.style.display = 'none';
                    containerPresentation.style.display = 'flex'
                    containerFiche.style.display = 'none';
                    break;
                case '2':
                    containerSummary.style.display = 'none';
                    containerPresentation.style.display = 'none'
                    containerFiche.style.display = 'flex';
                    break;
                default:
                    return;
            }
        })
    })
});
