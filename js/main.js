import { Notification } from './notification.js';

const projects_table_element = document.getElementById("container-projects");

const notification_element = document.getElementById("notification");
const notification = new Notification(notification_element);

document.addEventListener('DOMContentLoaded', async (_event) => {
    if (projects_table_element === null)
    {
        throw new Error("Projects table not found");
    }

    const response  = await fetch('assets/projects.json', {
        headers: {
            "Accept": "application/json"
          }
    });
    const json = await response.json();
    const projects = json.projects;

    for (const project of projects) {
        add_project(project);
    }
});

projects_table_element.addEventListener('click', (event) => {
    const target = event.target;
    
    if (!target.classList.contains('project-name'))
        return;

    const url = target.parentElement.getAttribute('data-url');

    if (!url)
    {
        notification.show('info', 'This project is currently private and cannot be accessed. Be free to contact me on my email if you want to know more about it.', 8000);
        return;
    }

    notification.show('success', 'Opening project', 2000);
    window.open(url, '_blank');
});

function add_project(project) {
    const { visible, date, name, description, platform, tech_stack, in_progress, url } = project;

    if (!visible)
        return;
    
    const template = 
    `<tr ${url.length > 0 ? `data-url="${url}"` : ''}>
        <td>${date}</td>
        <td class="project-name">${name}
            ${in_progress ? '<span class="project-in-progress">(in progress)</span>' : ''}
        </td>
        <td class="project-description">${description}</td>
        <td>${platform}</td>
        <td>${tech_stack}</td>
    </tr>`;

    projects_table_element.innerHTML += template;
}

