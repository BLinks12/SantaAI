const votes = {}; // Store votes in memory

// Fetch votes dynamically
async function fetchVotes() {
    return votes;
}

// Add or increment votes for a link
async function sendVote(link) {
    if (votes[link]) {
        votes[link]++;
    } else {
        votes[link] = 1;
    }
}

// Update the voting section dynamically
async function updateVotingSection() {
    const votingContainer = document.getElementById('voting-container');

    // Sort projects by votes
    const sortedProjects = Object.entries(votes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    // Clear and re-render the voting section
    votingContainer.innerHTML = '';
    sortedProjects.forEach(([link, voteCount]) => {
        const voteItem = document.createElement('div');
        voteItem.classList.add('vote-item');
        voteItem.innerHTML = `
            <span>${link}</span>
            <span>Votes: ${voteCount}</span>
            <button onclick="vote('${link}')">Vote</button>
        `;
        votingContainer.appendChild(voteItem);
    });
}

// Handle the form submission
document.getElementById('feed-santa-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const linkInput = document.getElementById('santa-link');
    const link = linkInput.value.trim();

    if (!link) {
        alert('Please enter a valid URL.');
        return;
    }

    await sendVote(link);
    await updateVotingSection();

    linkInput.value = ''; // Clear the input field
});

// Voting button handler
async function vote(link) {
    await sendVote(link);
    await updateVotingSection();
}

// Initialize the voting section
updateVotingSection();
