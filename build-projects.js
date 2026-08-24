const fs = require('fs');
const path = require('path');

const studentProjectsDir = path.join(__dirname, 'student_projects');
const indexPath = path.join(__dirname, 'index.html');

let directories = [];
try {
    directories = fs.readdirSync(studentProjectsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
} catch (e) {
    console.error("Error reading student_projects: ", e);
    process.exit(1);
}

let projectsHtml = `
        <!-- Student Projects Section -->
        <section id="student-projects" class="py-20 border-t border-brand-border w-full">
            <h2 class="text-3xl font-semibold mb-4">Student Projects</h2>
            <p class="text-brand-textmuted mb-12">Amazing projects built by students during the 2 Days Web Development Workshop.</p>
            
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
`;

directories.forEach(dir => {
    const dirPath = path.join(studentProjectsDir, dir);
    let htmlFiles = [];
    try {
        htmlFiles = fs.readdirSync(dirPath).filter(f => f.toLowerCase().endsWith('.html'));
    } catch (e) { }

    // determine main html file
    let mainHtml = '';
    if (htmlFiles.length > 0) {
        if (htmlFiles.includes('index.html')) {
            mainHtml = 'index.html';
        } else if (htmlFiles.includes(`${dir}.html`)) {
            mainHtml = `${dir}.html`;
        } else {
            mainHtml = htmlFiles[0];
        }
    } else {
        // Fallback
        mainHtml = 'index.html';
    }

    const relativeLink = `./student_projects/${encodeURIComponent(dir)}/${encodeURIComponent(mainHtml)}`;

    projectsHtml += `
                <!-- Project: ${dir} -->
                <div class="bg-brand-surface border border-brand-border rounded-lg p-6 group hover:border-white/30 transition-colors flex flex-col justify-between items-start min-h-[160px]">
                    <div>
                        <h3 class="font-mono text-sm font-semibold mb-1 text-white truncate w-full" title="${dir}">${dir}</h3>
                        <p class="text-xs text-brand-textmuted line-clamp-2">Student Portfolio Project</p>
                    </div>
                    <a href="${relativeLink}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-brand-border rounded bg-brand-bg text-xs group-hover:bg-white group-hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                        View Website
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                </div>
`;
});

projectsHtml += `
            </div>
        </section>
`;

let indexContent = fs.readFileSync(indexPath, 'utf-8');

// The section should go after the resources section and before the routine section
const insertionPoint = '<!-- Student Projects Placeholder -->';
if (indexContent.includes('<!-- Student Projects Section -->')) {
    console.log("Projects section already exists.");
} else if (indexContent.includes(insertionPoint)) {
    indexContent = indexContent.replace(insertionPoint, projectsHtml);
    fs.writeFileSync(indexPath, indexContent);
    console.log("Successfully added Student Projects section.");
} else {
    console.error("Could not find insertion point.", insertionPoint);
}

// 2. Add 'Student Projects' to desktop and mobile navigation menu
// Finding desktop menu
const desktopMenuEnd = '                <a href="#project" class="hover:text-white transition-colors">Final Project</a>\n            </div>';
const desktopLinkToAdd = '                <a href="#student-projects" class="hover:text-white transition-colors">Student Projects</a>\n';
if (!indexContent.includes('href="#student-projects" class="hover:text-white transition-colors"')) {
    indexContent = indexContent.replace(desktopMenuEnd, desktopLinkToAdd + desktopMenuEnd);
}

const mobileMenuEnd = '            <a href="#project" class="mobile-link text-brand-textmuted hover:text-white">Final Project</a>\n        </div>';
const mobileLinkToAdd = '            <a href="#student-projects" class="mobile-link text-brand-textmuted hover:text-white">Student Projects</a>\n';
if (!indexContent.includes('href="#student-projects" class="mobile-link')) {
    indexContent = indexContent.replace(mobileMenuEnd, mobileLinkToAdd + mobileMenuEnd);
}

fs.writeFileSync(indexPath, indexContent);
console.log("Navigated and Updated.");

