    // ─── FADE IN ON SCROLL ───
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));

    // ─── GITHUB REPOS (auto-fetching) ───
    async function fetchGitHubRepos() {
      const grid = document.getElementById('repos-grid');
      const updatedEl = document.getElementById('repo-updated');

      try {
        const res = await fetch('https://api.github.com/users/johnarp/repos?sort=pushed&per_page=8&type=public');

        if (!res.ok) throw new Error('API error');

        const repos = await res.json();
        updatedEl.textContent = 'Last fetched: ' + new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });

        if (!repos.length) {
          grid.innerHTML = '<div class="repo-error">No public repositories found yet.</div>';
          return;
        }

        grid.innerHTML = repos.map(repo => {
          const lang = repo.language || '';
          const stars = repo.stargazers_count;
          const forks = repo.forks_count;
          const desc = repo.description || 'No description provided.';
          const updated = new Date(repo.pushed_at).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });

          return `
            <a class="repo-card" href="${repo.html_url}" target="_blank" rel="noopener">
              <div class="repo-name">${escapeHtml(repo.name)}</div>
              <div class="repo-desc">${escapeHtml(desc)}</div>
              <div class="repo-meta">
                ${lang ? `<span>
                  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="var(--accent)" opacity="0.6"/></svg>
                  ${escapeHtml(lang)}
                </span>` : ''}
                ${stars > 0 ? `<span>⭐ ${stars}</span>` : ''}
                ${forks > 0 ? `<span>🍴 ${forks}</span>` : ''}
                <span style="margin-left:auto">${updated}</span>
              </div>
            </a>
          `;
        }).join('');

      } catch (err) {
        updatedEl.textContent = '';
        grid.innerHTML = `
          <div class="repo-error">
            Couldn't load repositories right now. 
            <br>
            <a href="https://github.com/johnarp" target="_blank" style="color:var(--accent)">View on GitHub →</a>
          </div>`;
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
    }

    fetchGitHubRepos();