class Notification
{
    constructor(element)
    {
        if (!element)
        {
            throw new Error("Notification element not found");
        }

        this.element = element;

        this.icons = {
            success: 'fas fa-light fa-circle-check fa-2xl',
            error: 'fas fa-light fa-circle-exclamation fa-2xl',
            warning: 'fas fa-light fa-triangle-exclamation fa-2xl',
            info: 'fas fa-light fa-info-circle fa-2xl',
        };

        this.colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8',
        };

    }

    show(type, message, timeout, callback)
    {
        // Reset notification before showing a new one
        this.#reset();

        const text = document.createTextNode( message);
        const icon = document.createElement('i');
        icon.className = this.icons[type];

        this.element.appendChild(icon);
        this.element.appendChild(text);
        this.element.style.backgroundColor = this.colors[type];
        this.element.classList.add('show');

        setTimeout(() => {
            this.#reset();
            if (callback)
                callback();
        }, timeout);
    }

    #reset()
    {
        this.element.style = '';
        this.element.innerHTML = '';
        this.element.classList.remove('show');
    }
}

export { Notification };