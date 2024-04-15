const btnSearch = document.querySelector('.search-container a svg');
const btnClose = document.querySelector('.btn-close');
const button = document.querySelector('.search-container a');
const layoutSearch = document.querySelector('.search-main');

button.addEventListener('click', () => {
    const statusBtn = window.getComputedStyle(btnSearch).display;
    
    if (statusBtn === 'block') {
        btnClose.style.display = 'block';
        btnSearch.style.display = 'none';
        layoutSearch.style.display = 'block';
    } else {
        btnClose.style.display = 'none';
        btnSearch.style.display = 'block';
        layoutSearch.style.display = 'none';
    }
});
