let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.getElementById('slider');
const slideWidthPercent = 100;
let allSlides = Array.from(slides);

function showSlide(withTransition = true) {
    slider.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
    slider.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;

    allSlides.forEach(slide => slide.classList.remove('active'));
    allSlides[slideIndex % allSlides.length].classList.add('active');
}

function nextSlide() {
    slideIndex++;

    if (slideIndex >= allSlides.length - 1) {
        const newSlides = Array.from(slides).map(slide => slide.cloneNode(true));
        newSlides.forEach(slide => slider.appendChild(slide));
        allSlides = Array.from(slider.querySelectorAll('.slide'));

        showSlide(false); // cập nhật vị trí ngay lập tức

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                showSlide(); // có hiệu ứng
            });
        });

        return;
    }

    showSlide();
}

function prevSlide() {
    // Clone slides vào đầu giống như next
    const newSlides = Array.from(slides).map(slide => slide.cloneNode(true));
    newSlides.reverse().forEach(slide => slider.insertBefore(slide, slider.firstChild));

    slideIndex += newSlides.length; // cập nhật index vì có thêm slide vào đầu
    allSlides = Array.from(slider.querySelectorAll('.slide'));

    showSlide(false); // nhảy đến vị trí mới ngay lập tức

    slideIndex--; // lùi lại 1 slide
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            showSlide(); // chuyển động mượt về slide trước
        });
    });
}




let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Slider Phim Đề Xuất (movies-grid)
document.querySelectorAll('.movies-container').forEach(container => {
    let movieIndex = 0;
    const moviesGrid = container.querySelector('.movies-grid');
    const movies = container.querySelectorAll('.movie');
    const movieWidth = 220; // Chiều rộng mỗi movie
    let allMovies = Array.from(movies); // Danh sách các movie (bao gồm cả movie được thêm động)

    function showMovie(withTransition = true) {
        if (withTransition) {
            moviesGrid.style.transition = 'transform 0.5s ease-in-out';
        } else {
            moviesGrid.style.transition = 'none';
        }

        // Cập nhật vị trí movies-grid
        moviesGrid.style.transform = `translateX(-${movieIndex * movieWidth}px)`;
    }
    function nextMovie() {
        movieIndex++;
    
        const visibleMovies = Math.floor(window.innerWidth / movieWidth);
        if (movieIndex >= allMovies.length - visibleMovies) {
            const newMovies = Array.from(movies).map(movie => movie.cloneNode(true));
            newMovies.forEach(movie => moviesGrid.appendChild(movie));
            allMovies = Array.from(moviesGrid.querySelectorAll('.movie'));
        }
    
        showMovie();
    }
    
    function prevMovie() {
        // Luôn chèn thêm phim từ đầu giống nextMovie
        const newMovies = Array.from(movies).map(movie => movie.cloneNode(true));
        newMovies.reverse().forEach(movie => moviesGrid.insertBefore(movie, moviesGrid.firstChild));
    
        movieIndex += newMovies.length; // cập nhật lại chỉ số
        allMovies = Array.from(moviesGrid.querySelectorAll('.movie'));
    
        showMovie(false); // dịch ngay mà không có hiệu ứng
    
        movieIndex--; // lùi lại 1 phim
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                showMovie(); // mượt mà
            });
        });
    }
    

    // Gắn sự kiện cho nút prev và next trong container này
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    prevBtn.addEventListener('click', prevMovie);
    nextBtn.addEventListener('click', nextMovie);

    // Khởi tạo vị trí ban đầu
    showMovie(false);
});

// Khởi động slider chính
startSlideAutoPlay();