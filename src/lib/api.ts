
const API_BASE_URL = 'http://localhost:5000/api'; // This should be in an env variable

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `API request failed: ${response.statusText}`);
    }

    if (response.status === 204) { // No Content
        return;
    }

    return response.json();
}

// Authentication
export const getNonce = (walletAddress: string) => fetchAPI(`/auth/nonce/${walletAddress}`);
export const loginWithWallet = (walletAddress: string, signature: string) => fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ walletAddress, signature }),
});


// User Profile
export const getProfile = (walletAddress: string) => fetchAPI(`/profile/${walletAddress}`);
export const updateProfile = (profileData: any) => fetchAPI('/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
});
export const getAllFreelancers = () => fetchAPI('/profile/freelancers');


// Jobs
export const createJob = (jobData: any) => fetchAPI('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
});

export const getAllJobs = (isActive?: boolean) => {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return fetchAPI(`/jobs${query}`);
};
export const getJobById = (jobId: string) => fetchAPI(`/jobs/${jobId}`);
export const getJobsByClient = (walletAddress: string) => fetchAPI(`/jobs/client/${walletAddress}`);
export const getJobsByFreelancer = (walletAddress: string) => fetchAPI(`/jobs/freelancer/${walletAddress}`);
export const updateJob = (jobId: string, jobData: any) => fetchAPI(`/jobs/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
});


// Proposals
export const submitProposal = (proposalData: any) => fetchAPI('/proposals', {
    method: 'POST',
    body: JSON.stringify(proposalData),
});
export const getProposalsByJob = (jobId: string) => fetchAPI(`/proposals/job/${jobId}`);
export const getProposalsByFreelancer = (walletAddress: string) => fetchAPI(`/proposals/freelancer/${walletAddress}`);
export const updateProposal = (proposalId: string, status: string) => fetchAPI(`/proposals/${proposalId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
});


// Escrow
export const getEscrowByJobId = (jobId: string) => fetchAPI(`/escrow/job/${jobId}`);
