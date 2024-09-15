const container_summary = document.getElementById('content-summary');
const container_presentation = document.getElementById('content-presentation');
const container_fiche = document.getElementById('content-fiche')
const action_buttons = document.querySelectorAll('.container .header span');

action_buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        action_buttons.forEach(b => b.classList.remove('active'))
        e.target.classList.add('active')
        const which = button.id;

        switch (which) {
            case '0':
                container_summary.style.display = 'flex';
                container_presentation.style.display = 'none';
                container_fiche.style.display = 'none';
                break;
            case '1':
                container_summary.style.display = 'none';
                container_presentation.style.display = 'flex'
                container_fiche.style.display = 'none';
                break;
            case '2':
                container_summary.style.display = 'none';
                container_presentation.style.display = 'none'
                container_fiche.style.display = 'flex';
                break;
            default:
                return;
        }
    })
})
