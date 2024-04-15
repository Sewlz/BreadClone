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

// js menu bar
const menuBar = document.querySelector('.menu-bar-container')
const layoutCoating = document.querySelector('.layout-close-menu-bar')
const btnCloseMenu = document.querySelector('.button-close-menu')

btnCloseMenu.addEventListener('click', ()=>{
    menuBar.style = 'transform: translateX(-100%)'
    layoutCoating.style.display = 'none'
    menuLv1.classList.remove('active-menu-bar')
    btnShowLv1.classList.remove('rotation-icon-down')
    menuLv2.classList.remove('active-menu-bar')
    btnShowLv2.classList.remove('rotation-icon-down')
})

layoutCoating.addEventListener('click', ()=>{
    menuBar.style = 'transform: translateX(-100%)'
    layoutCoating.style.display = 'none'
    menuLv1.classList.remove('active-menu-bar')
    btnShowLv1.classList.remove('rotation-icon-down')
    menuLv2.classList.remove('active-menu-bar')
    btnShowLv2.classList.remove('rotation-icon-down')
})

const btnShowLv2 = document.querySelector('.menu-bar_lv2 i')
const btnShowLv1 = document.querySelector('.menu-bar_lv1 div > i')
const menuLv2 = document.querySelector('.menu-bar-wrapper_lv3')
const menuLv1 = document.querySelector('.menu-bar-container_lv2')

btnShowLv1.addEventListener('click', ()=>{
    menuLv1.classList.toggle('active-menu-bar')
    btnShowLv1.classList.toggle('rotation-icon-down')
    menuLv2.classList.remove('active-menu-bar')
    btnShowLv2.classList.remove('rotation-icon-down')
    menuBar.style.overflow = 'auto'
})

btnShowLv2.addEventListener('click', ()=>{
    menuLv2.classList.toggle('active-menu-bar')
    btnShowLv2.classList.toggle('rotation-icon-down')
})

const btnMenuBar = document.querySelector('.btn-menu-bar')
btnMenuBar.addEventListener('click', () => {
    menuBar.style = 'transform: translateX(0)'
    layoutCoating.style.display = 'block'
})