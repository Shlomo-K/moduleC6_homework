const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    let screenWidth = window.screen.width
    let screenHeight = window.screen.height
    alert('Размеры вашего экрана ' + screenWidth + ':' + screenHeight)
});