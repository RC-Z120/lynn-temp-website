// scripts.js

// 自动更新时间
const lastUpdateElement = document.getElementById('last-update');
const lastUpdateDate = new Date();
const options = { year: 'numeric', month: 'long' };
lastUpdateElement.textContent = lastUpdateDate.toLocaleDateString('en-US', options);

// Accordion functionality
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            // Set max-height to a large value to ensure all content is visible
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}

// Toggle content functionality
function toggleContent(id) {
    var content = document.getElementById(id);
    var panel = content.closest('.panel');

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        // 动态调整 panel 的高度
        panel.style.maxHeight = panel.scrollHeight + "px";
    } else {
        content.style.display = "none";
        // 动态调整 panel 的高度
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

    // Load data from data.json and populate the HTML
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Profile Section
            document.getElementById('profile-image').src = data.profile.image;
            document.getElementById('profile-name').textContent = data.profile.name;
            document.getElementById('profile-title').textContent = data.profile.title;
            document.getElementById('profile-institution').textContent = data.profile.institution;
            document.getElementById('profile-email').textContent = data.profile.email;
            document.getElementById('profile-linkedin').textContent = data.profile.linkedin;

            // About Section
            document.getElementById('about-text').textContent = data.about;

            // Research Interest Section
            document.getElementById('research-interest-text').textContent = data.researchInterest;

            // Experience Section
            document.getElementById('experience-text').textContent = data.experience;

            // Services Section
            const servicesText = `
                <b>Teaching assistant: </b>${data.services.teachingAssistant.join(', ')}<br>
                <b>Reviewer:</b> ${data.services.reviewer.join(', ')}
            `;
            document.getElementById('services-text').innerHTML = servicesText;

            // Selected Publications Section
            const selectedPublications = data.selectedPublications.map((pub, index) => `
                <div class="publication">
                    <h2>${pub.title}</h2>
                    <p><strong>${pub.authors}</strong></p>
                    <p><em>${pub.conference}</em></p>
                    <p>
                        <a href="${pub.links.paper}" target="_blank">[Paper]</a>
                        <a href="${pub.links.arxiv}" target="_blank">[arXiv]</a>
                        <a href="${pub.links.code}" target="_blank">[Code]</a>
                        <a href="${pub.links.data}" target="_blank">[Data]</a>
                        <button class="toggle-button" onclick="toggleContent('bib${index}')">[BibTeX]</button>
                        <button class="toggle-button" onclick="toggleContent('abstract${index}')">[Abstract]</button>
                    </p>
                    <div id="bib${index}" class="toggle-content">
                        <pre>${pub.bibtex}</pre>
                    </div>
                    <div id="abstract${index}" class="toggle-content">
                        <p>${pub.abstract}</p>
                    </div>
                </div>
            `).join('');
            document.getElementById('selected-publications').innerHTML = selectedPublications;

            // Full Publications Section
            const fullPublications = Object.entries(data.fullPublications).map(([year, pubs]) => `
                <div id="year-${year}" class="year-section">
                    <h4>${year}</h4>
                    ${pubs.map((pub, index) => `
                        <div class="publication">
                            <h2>${pub.title}</h2>
                            <p><strong>${pub.authors}</strong></p>
                            <p><em>${pub.conference}</em></p>
                            <p>
                                <a href="${pub.links.paper}" target="_blank">[Paper]</a>
                                <a href="${pub.links.arxiv}" target="_blank">[arXiv]</a>
                                <a href="${pub.links.code}" target="_blank">[Code]</a>
                                <a href="${pub.links.data}" target="_blank">[Data]</a>
                                <button class="toggle-button" onclick="toggleContent('bib${year}-${index}')">[BibTeX]</button>
                                <button class="toggle-button" onclick="toggleContent('abstract${year}-${index}')">[Abstract]</button>
                            </p>
                            <div id="bib${year}-${index}" class="toggle-content">
                                <pre>${pub.bibtex}</pre>
                            </div>
                            <div id="abstract${year}-${index}" class="toggle-content">
                                <p>${pub.abstract}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
            document.getElementById('full-publications').innerHTML = fullPublications;

            // News Section
            const newsItems = data.news.map(item => `
                <div class="news-item">
                    <p>${item}</p>
                </div>
            `).join('');
            document.getElementById('news-items').innerHTML = newsItems;
        });
