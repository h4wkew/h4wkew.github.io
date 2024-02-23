const projects_table = document.getElementById("container-projects");

document.addEventListener('DOMContentLoaded', async (_event) => {
    if (projects_table === null)
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

function add_project(project) {
    const { date, name, description, platform, tech_stack, in_progress } = project;

    const template = 
    `<tr>
        <td>${date}</td>
        <td class="project-name">${name}
            ${in_progress ? '<span class="project-in-progress">(in progress)</span>' : ''}
        </td>
        <td class="project-description">${description}</td>
        <td>${platform}</td>
        <td>${tech_stack}</td>
    </tr>`;

    projects_table.innerHTML += template;
}

