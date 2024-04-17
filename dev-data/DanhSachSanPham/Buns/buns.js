const cells = document.querySelectorAll('.product-grid .cell');
const inforProduct = document.querySelector('.count-product')
const titlePage = document.querySelectorAll('.breadcrumb_item')[2]

const cellsPerPage = 16;
let currentPage = 1;

const totalCells = cells.length;
const totalPages = Math.ceil(totalCells / cellsPerPage);

function updateDisplay() {
    const start = (currentPage - 1) * cellsPerPage;
    const end = (currentPage === totalPages) ? totalCells : start + cellsPerPage;

    inforProduct.innerText = `Hiển thị ${start + 1}–${end} của ${cells.length} kết quả`
    if(currentPage > 1 && currentPage <= totalPages){
        titlePage.classList.add('number-page')
        titlePage.innerText = `(trang ${currentPage})`
    }

    cells.forEach((cell, index) => {
        if (index >= start && index < end) {
            cell.style.display = 'block';
        } else {
            cell.style.display = 'none';
        }
    });

    updatePagination();
}

function updatePagination() {
    const screenWidth = window.innerWidth;
    const paginationContainer = document.querySelector('.product-pagination');
    paginationContainer.innerHTML = '';
    const maxPagesToShow = 4;


    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        button.addEventListener('click', () => {
            currentPage = i;
            updateDisplay();
        });

        if (i === currentPage) {
            button.classList.add('active-pagination');
        }

        paginationContainer.appendChild(button);
    }

    if(screenWidth <= 600){
        const paginations = document.querySelectorAll('.product-pagination button')
        paginations.forEach(item =>{
            item.style.display = 'none'
        })
        paginations[currentPage - 1].style.display = 'block'
    }else {
        const paginations = document.querySelectorAll('.product-pagination button');
        
        if (totalPages > maxPagesToShow) {
            paginations.forEach(item => {
                item.style.display = 'none';
            });
    
            let startPage = currentPage;
            if (currentPage > 1) {
                startPage = currentPage - 1;
            }
    
            let endPage = startPage + 2;
            if (endPage > totalPages) {
                endPage = totalPages;
            }
    
            for (let i = startPage; i <= endPage; i++) {
                paginations[i - 1].style.display = 'block';
            }
    
            paginations[totalPages - 1].style.display = 'block';
    
            if (startPage > 2) {
                const ellipsisBefore = document.createElement('span');
                ellipsisBefore.textContent = '...';
                paginationContainer.insertBefore(ellipsisBefore, paginations[startPage - 2]);
                paginations[0].style.display = 'block'
                paginations[2].style.display = 'block'
            }
            if (endPage < totalPages) {
                const ellipsisAfter = document.createElement('span');
                ellipsisAfter.textContent = '...';
                paginationContainer.insertBefore(ellipsisAfter, paginations[endPage]);
            }
        }
    }

    const prevButton = document.querySelector('.btn-prev-pagination');
    const nextButton = document.querySelector('.btn-next-pagination');

    prevButton.style.display = currentPage === 1 ? 'none' : 'block';
    nextButton.style.display = currentPage === totalPages ? 'none' : 'block';
}

window.addEventListener('resize', function() {
    updatePagination();
});

document.querySelector('.btn-prev-pagination').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateDisplay();
    }
});

document.querySelector('.btn-next-pagination').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updateDisplay();
    }
});

updateDisplay();
