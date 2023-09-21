const links = document.querySelectorAll('.has-tooltip');

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.y,
      left: box.left,
      right: box.right,
      height: box.height,
      width: box.width,
    };
}

function clearActiveTooltips(element, elements) {
    elements.forEach((e) => {
        if (element != e) {e.classList.remove('tooltip_active')};
    });
};

function setPosition(tooltip, link) {
    if (tooltip.getAttribute('data-position') == 'top') {
        tooltip.style.top = `${getCoords(link).top - getCoords(tooltip).height}px`;
        tooltip.style.left = `${getCoords(link).left}px`
    };

    if (tooltip.getAttribute('data-position') == 'bottom') {
        tooltip.style.top = `${getCoords(link).top + getCoords(link).height}px`;
        tooltip.style.left = `${getCoords(link).left}px`
    };

    if (tooltip.getAttribute('data-position') == 'right') {
        tooltip.style.top = `${getCoords(link).top}px`;
        let x = getCoords(link).right + getCoords(tooltip).width;
        x > window.innerWidth ? tooltip.style.left = `${getCoords(link).left - getCoords(tooltip).width}px` : tooltip.style.left = `${getCoords(link).right}px`
    };

    if (tooltip.getAttribute('data-position') == 'left') {
        tooltip.style.top = `${getCoords(link).top}px`;
        let x = getCoords(link).left - getCoords(tooltip).width;
        x < 0 ? tooltip.style.left = `${getCoords(link).right}px` : tooltip.style.left = `${x}px`
    };
};
  

links.forEach((e, i) => {
    let div = document.createElement('div');
    div.className = 'tooltip';
    div.textContent = e.title;

    div.dataset.position = 'bottom';
    
    e.addEventListener('click', (event) => {
        event.preventDefault();
        e.insertAdjacentElement('afterEnd', div);
        div.classList.toggle('tooltip_active');
        clearActiveTooltips(div, document.querySelectorAll('.tooltip'))
        setPosition(div, e)
    }); 

    document.addEventListener('scroll', () => {
        let tooltip = document.querySelectorAll('.tooltip');
        if (tooltip.length != 0) {
            tooltip.forEach((evt) => {
                if (evt.innerHTML == e.title) {
                    setPosition(evt, e)
                };
            });
        };
    })
});







