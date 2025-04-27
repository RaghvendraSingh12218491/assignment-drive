interface Incident {
    id: number;
    title: string;
    description: string;
    severity: string;
    reported_at: string;
  }
  
  const incidents: Incident[] = [
    { id: 1, title: 'Biased Recommendation Algorithm', description: 'Algorithm consistently favored certain demographics...', severity: 'Medium', reported_at: '2025-03-15T10:00:00Z' },
    { id: 2, title: 'LLM Hallucination in Critical Info', description: 'LLM provided incorrect safety procedure information...', severity: 'High', reported_at: '2025-04-01T14:30:00Z' },
    { id: 3, title: 'Minor Data Leak via Chatbot', description: 'Chatbot inadvertently exposed non-sensitive user metadata...', severity: 'Low', reported_at: '2025-03-20T09:15:00Z' }
  ];
  
  let filteredIncidents = [...incidents];
  
  // Function to render incidents
  function renderIncidents() {
    const incidentList = document.getElementById('incidentList') as HTMLDivElement;
    incidentList.innerHTML = ''; // Clear the list
  
    filteredIncidents.forEach((incident) => {
      const incidentCard = document.createElement('div');
      incidentCard.className = 'incident-card';
      
      incidentCard.innerHTML = `
        <h4>${incident.title}</h4>
        <p>Severity: <span class="severity ${incident.severity.toLowerCase()}">${incident.severity}</span></p>
        <p>Reported: ${new Date(incident.reported_at).toLocaleDateString()}</p>
        <button class="viewDetailsBtn" data-id="${incident.id}">View Details</button>
        <div class="incident-description hidden" id="description-${incident.id}">
          <p>${incident.description}</p>
        </div>
      `;
      
      incidentList.appendChild(incidentCard);
    });
  
    // Attach event listeners to "View Details" buttons
    const viewDetailsBtns = document.querySelectorAll('.viewDetailsBtn') as NodeListOf<HTMLButtonElement>;
    viewDetailsBtns.forEach(button => {
      button.addEventListener('click', toggleDetailsVisibility);
    });
  }
  
  // Toggle visibility of incident description
  function toggleDetailsVisibility(event: Event) {
    const button = event.target as HTMLButtonElement;
    const id = button.getAttribute('data-id');
    const description = document.getElementById(`description-${id}`) as HTMLDivElement;
  
    if (description.classList.contains('hidden')) {
      description.classList.remove('hidden');
      button.textContent = 'Hide Details';
    } else {
      description.classList.add('hidden');
      button.textContent = 'View Details';
    }
  }
  
  // Apply filters and sorting
  function applyFiltersAndSorting() {
    const severityFilter = document.getElementById('severityFilter') as HTMLSelectElement;
    const dateSort = document.getElementById('dateSort') as HTMLSelectElement;
  
    filteredIncidents = incidents.filter((incident) => {
      return severityFilter.value === 'All' || incident.severity === severityFilter.value;
    });
  
    // Sort incidents by date
    filteredIncidents.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
  
      return dateSort.value === 'NewestFirst' ? dateB - dateA : dateA - dateB;
    });
  
    renderIncidents();
  }
  
  // Handle "Report New Incident" form submission
  function handleFormSubmit(event: Event) {
    event.preventDefault();
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const severity = (document.getElementById('severity') as HTMLSelectElement).value;
  
    if (title && description && severity) {
      const newIncident: Incident = {
        id: incidents.length + 1,
        title,
        description,
        severity,
        reported_at: new Date().toISOString()
      };
  
      incidents.push(newIncident);
      filteredIncidents.push(newIncident);
      renderIncidents();
    }
  }
  
  // Event listeners
  document.getElementById('severityFilter')?.addEventListener('change', applyFiltersAndSorting);
  document.getElementById('dateSort')?.addEventListener('change', applyFiltersAndSorting);
  document.getElementById('incidentFormElement')?.addEventListener('submit', handleFormSubmit);
  document.getElementById('showFormBtn')?.addEventListener('click', () => {
    document.getElementById('incidentForm')?.classList.toggle('hidden');
  });
  
  // Initial render
  renderIncidents();
  