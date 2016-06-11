var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 40,
    x_colors: 'random'
});
document.body.appendChild(pattern.canvas())