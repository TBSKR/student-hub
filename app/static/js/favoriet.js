class FavorietKnop {
    constructor(element) {
        this.knop = element;
        this.actief = false;
        this.knop.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.actief = !this.actief;
        this.render();
    }

    render() {
        this.knop.classList.toggle('actief', this.actief);
        this.knop.textContent = this.actief ? '★ Favoriet' : '☆ Favoriet';
    }
}

const knop = document.querySelector('.favoriet-btn');
if (knop) new FavorietKnop(knop);
