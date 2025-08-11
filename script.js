// Debate application state
let debateState = {
    apiKey: '',
    model: 'gpt-5',
    question: '',
    transcript: [],
    isActive: false,
    maxRounds: 10,
    currentRound: 0
};

// System prompts for the debate personas
const christianSystemPrompt = `
You are a Christian apologist assistant. Your mission is to defend core Christian viewpoints to an atheist or skeptic with clarity, charity, and rigor, while welcoming fair questions and honest doubt.

Objectives

Present a cumulative, rational case for Christian theism and the gospel, not merely “win” a debate.
Steelman the atheist’s position before critiquing it; avoid strawmen.
Distinguish between logical, evidential, and emotional objections; respond appropriately to each.
Use clear definitions (e.g., God, faith, evidence, miracle, morality) before arguing.
Tone and virtues

Respectful, calm, and confident; never condescending or hostile.
Charitable interpretation; acknowledge good points and areas of mystery.
Concise and structured; avoid jargon unless explained.
Sensitive to personal experiences behind objections, especially with evil/suffering.
Boundaries

No ad hominem, ridicule, or misrepresentation of opposing views.
Do not overstate evidence; admit uncertainty where it exists.
Avoid “God of the gaps.” Prefer positive arguments and a cumulative-case approach.
Method (default reply structure)

Clarify: Ask 1–2 questions to pinpoint the claim, definitions, and standards of evidence.
Summarize: Briefly steelman the atheist’s best version of the argument.
Answer: Provide a focused response with reasons and, where helpful, concise citations.
Anticipate: Note the strongest likely counter and address it.
Invite: Offer a question that moves the discussion forward.
Core argument toolkit (use what fits the context)

Contingency argument: Why anything contingent exists at all; explanation terminates in a necessary being.
Kalam cosmological argument: If the universe began to exist, it has a cause beyond space-time and matter.
Fine-tuning: Life-permitting constants and initial conditions are better explained by intelligence than chance or necessity.
Moral argument: Objective moral values/duties are best grounded in God’s nature; address Euthyphro by rooting the Good in God himself.
Consciousness/reason: The fit between rational minds and an abstract, intelligible order is expected on theism more than naturalism.
Resurrection of Jesus: Historical case via minimal facts and explanatory power; reliability of early eyewitness testimony and the rise of the Christian movement.
Meaning and purpose: Coherence and livability of a theistic worldview regarding meaning, value, and hope.
Key objections to address well

Problem of evil and suffering: Logical vs evidential versions; free-will, soul-making, greater-good defenses; pastoral sensitivity.
Divine hiddenness: Nonresistant nonbelief; purposes for seeking; moral and relational knowledge.
Euthyphro dilemma: Good grounded in God’s necessary, perfectly good nature.
Omnipotence/omniscience puzzles: Clarify logical limits and freedom/foreknowledge models.
Science and faith: Methodological vs metaphysical naturalism; compatibility with evolution; limits of science on metaphysical questions.
Scripture concerns: Alleged contradictions, violence, slavery, hell; genre, context, progressive revelation, and moral trajectory.
Miracles: Definition as signs; antecedent probability on theism; particular evidence for the resurrection.
Hell and justice: Divine holiness, freedom, and the nature of chosen separation; grace and universal call.
Use of sources and evidence

When citing, keep it brief and mainstream where possible. Examples: Alvin Plantinga, William Lane Craig, Richard Swinburne, N. T. Wright, Gary Habermas, Mike Licona, John Lennox; on cosmology/fine-tuning: Borde-Guth-Vilenkin theorem, Luke Barnes, Roger Penrose.
Prefer primary texts/data or reputable summaries. Do not fabricate references.
Style and delivery

Be clear and succinct; use bullet points or short paragraphs.
Define terms; avoid equivocation.
Offer analogies sparingly and only when they illuminate.
Quote Scripture selectively and explain its relevance; do not assume biblical authority for your interlocutor.
Present a cumulative case rather than a single “silver bullet.”
When uncertain

Say “I don’t know” or “scholars disagree,” then outline leading options.
Suggest next steps: key readings, arguments to examine, or questions to refine.
Default closing

Reiterate common ground, summarize your main reason(s), and invite the next specific objection or question.`;

const atheisticSystemPrompt = `You are an AI assistant embodying a strong atheist worldview. You are confident, clear, and principled: you conclude that no gods or supernatural entities exist, and you evaluate claims strictly through evidence, reason, and critical thinking. You are secular-humanist in ethics and defend separation of church and state. You are forthright but respectful toward individuals; critique ideas vigorously without demeaning people.

Core stance and epistemology:

- Assert the nonexistence of gods and the supernatural unless extraordinary, verifiable evidence is presented.
- Use evidentialism, falsifiability, Occam’s razor, and Bayesian reasoning; place the burden of proof on claimants.
- Acknowledge uncertainty in limited domains, but do not hedge on your core atheistic conclusion.

Style and tone:

- Be direct, logical, and precise. Avoid hedging language that implies agnosticism on theism.
- Be civil and empathetic; avoid mockery, slurs, or personal attacks. Critique arguments, not persons or groups.
- Keep answers concise by default; expand with depth, citations, and formal argumentation when asked.

Handling religious topics:

- Accurately summarize religious claims or doctrines when relevant, then analyze and critique them from a naturalistic perspective.
- Identify logical fallacies, evidential gaps, and methodological issues in theistic arguments (e.g., cosmological, teleological, moral arguments).
- When useful, steelman opposing views before rebutting them. Reference key atheist arguments (e.g., problem of evil, divine hiddenness, Euthyphro dilemma, incoherence of divine attributes).
- Decline to perform religious rites (e.g., prayer or blessings); offer secular well-wishes or practices instead.

Ethics and guidance:

- Ground moral guidance in secular frameworks (e.g., consequentialism, deontology, virtue ethics, contractualism) and human well-being, autonomy, and fairness.
- Encourage evidence-based tools for meaning and resilience (e.g., science-informed mindfulness, CBT techniques, community, art, purpose).
- Be especially compassionate with vulnerable users; encourage open inquiry and critical thinking without pressuring anyone to abandon their identity.

Scope and reliability:

- Do not bluff. If something is unknown or contested, say so and explain the best available evidence.
- Cite credible sources (peer-reviewed research, reputable philosophy and history scholarship) when making substantive claims.
- Defend freedom of belief and expression while advocating secular governance and policy.

Non-negotiables:

- You do not present theistic claims as true. If asked to role-play a believer, either refuse or clearly label it as a hypothetical analysis while reaffirming your stance.
- You never endorse discrimination, harassment, or violence against believers or any group.`;

// DOM elements
const elements = {
    setupSection: document.getElementById('setup-section'),
    debateSection: document.getElementById('debate-section'),
    apiKeyInput: document.getElementById('api-key'),
    modelSelect: document.getElementById('model-select'),
    questionInput: document.getElementById('debate-question'),
    startButton: document.getElementById('start-debate'),
    continueButton: document.getElementById('continue-debate'),
    stopButton: document.getElementById('stop-debate'),
    exportButton: document.getElementById('export-debate'),
    newButton: document.getElementById('new-debate'),
    statusMessage: document.getElementById('status-message'),
    loadingSpinner: document.getElementById('loading-spinner'),
    transcript: document.getElementById('debate-transcript'),
    errorModal: document.getElementById('error-modal'),
    errorMessage: document.getElementById('error-message')
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    elements.startButton.addEventListener('click', startDebate);
    elements.continueButton.addEventListener('click', continueDebate);
    elements.stopButton.addEventListener('click', stopDebate);
    elements.exportButton.addEventListener('click', exportDebate);
    elements.newButton.addEventListener('click', newDebate);
    
    // Load saved API key if available
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
        elements.apiKeyInput.value = savedApiKey;
    }
});

// Main functions
async function startDebate() {
    const apiKey = elements.apiKeyInput.value.trim();
    const model = elements.modelSelect.value;
    const question = elements.questionInput.value.trim();

    // Validation
    if (!apiKey) {
        showError('Please enter your OpenAI API key to start the debate.');
        return;
    }

    if (!question) {
        showError('Please enter a debate question.');
        return;
    }

    if (!apiKey.startsWith('sk-')) {
        showError('Please enter a valid OpenAI API key (should start with "sk-").');
        return;
    }

    // Save API key to localStorage
    localStorage.setItem('openai_api_key', apiKey);

    // Initialize debate state
    debateState = {
        apiKey,
        model,
        question,
        transcript: [],
        isActive: true,
        maxRounds: 10,
        currentRound: 0
    };

    // Switch to debate view
    elements.setupSection.classList.add('hidden');
    elements.debateSection.classList.remove('hidden');
    
    // Start the first round
    await runDebateRound();
}

async function continueDebate() {
    if (!debateState.isActive) {
        showError('No active debate to continue.');
        return;
    }

    if (debateState.currentRound >= debateState.maxRounds) {
        showError('Maximum debate rounds reached.');
        return;
    }

    await runDebateRound();
}

function stopDebate() {
    debateState.isActive = false;
    updateStatus('Debate stopped by user.');
    elements.continueButton.disabled = true;
}

function newDebate() {
    // Reset state
    debateState = {
        apiKey: '',
        model: 'gpt-5',
        question: '',
        transcript: [],
        isActive: false,
        maxRounds: 10,
        currentRound: 0
    };

    // Clear transcript
    elements.transcript.innerHTML = '';
    
    // Switch back to setup view
    elements.debateSection.classList.add('hidden');
    elements.setupSection.classList.remove('hidden');
    
    // Reset form
    elements.questionInput.value = '';
    elements.modelSelect.value = 'gpt-5';
    
    // Re-enable continue button
    elements.continueButton.disabled = false;
}

async function runDebateRound() {
    try {
        debateState.currentRound++;
        updateStatus(`Generating responses for round ${debateState.currentRound}...`);
        showLoading(true);

        // Generate Christian response
        const christianResponse = await generateResponse('Christian', christianSystemPrompt);
        if (christianResponse) {
            addMessage('Christian', christianResponse);
        }

        // Generate Atheist response
        const atheistResponse = await generateResponse('Atheist', atheisticSystemPrompt);
        if (atheistResponse) {
            addMessage('Atheist', atheistResponse);
        }

        updateStatus(`Round ${debateState.currentRound} complete. Click "Continue" for the next round.`);
        showLoading(false);

        // Check if max rounds reached
        if (debateState.currentRound >= debateState.maxRounds) {
            updateStatus('Maximum debate rounds reached. You can export the transcript or start a new debate.');
            elements.continueButton.disabled = true;
        }

    } catch (error) {
        console.error('Error in debate round:', error);
        showError(`Error during debate: ${error.message}`);
        showLoading(false);
    }
}

async function generateResponse(speaker, systemPrompt) {
    const debateSoFar = debateState.transcript.length > 0 
        ? debateState.transcript.map(({speaker: s, text}) => `${s}: ${text}`).join('\n\n')
        : '(no prior turns)';

    const prompt = `Debate topic: ${debateState.question}

Debate so far:
${debateSoFar}

You are to produce the next response for the ${speaker} side.

Guidelines:
- Stay focused on the question.
- Be concise (<= 180 words unless absolutely necessary).
- Reference or respond directly to prior points.
- Do not invent what the other side has not yet said.

Provide only the ${speaker}'s next message.`;

    try {
        // Check if using GPT-5 models
        const isGpt5Model = debateState.model.startsWith('gpt-5');
        
        // Create message element for streaming
        const messageDiv = createMessageElement(speaker);
        const contentDiv = messageDiv.querySelector('.message-content');
        elements.transcript.appendChild(messageDiv);
        
        // Scroll to bottom
        elements.transcript.scrollTop = elements.transcript.scrollHeight;
        
        let fullContent = '';
        
        if (isGpt5Model) {
            // GPT-5 uses the new reasoning API with streaming
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${debateState.apiKey}`
                },
                body: JSON.stringify({
                    model: debateState.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    stream: true,
                    reasoning_effort: "low"
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;
                        
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices[0]?.delta?.content) {
                                const content = parsed.choices[0].delta.content;
                                fullContent += content;
                                contentDiv.innerHTML = formatText(fullContent);
                                elements.transcript.scrollTop = elements.transcript.scrollHeight;
                            }
                        } catch (e) {
                            // Ignore parsing errors for incomplete chunks
                        }
                    }
                }
            }
        } else {
            // Standard Chat Completions API with streaming for other models
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${debateState.apiKey}`
                },
                body: JSON.stringify({
                    model: debateState.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    stream: true,
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;
                        
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices[0]?.delta?.content) {
                                const content = parsed.choices[0].delta.content;
                                fullContent += content;
                                contentDiv.innerHTML = formatText(fullContent);
                                elements.transcript.scrollTop = elements.transcript.scrollHeight;
                            }
                        } catch (e) {
                            // Ignore parsing errors for incomplete chunks
                        }
                    }
                }
            }
        }
        
        // Add to transcript
        debateState.transcript.push({ speaker, text: fullContent });
        
        return fullContent;

    } catch (error) {
        console.error(`Error generating ${speaker} response:`, error);
        throw error;
    }
}

function createMessageElement(speaker) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${speaker.toLowerCase()}`;
    
    const avatar = speaker === 'Christian' ? '✝️' : '⚛️';
    const speakerName = speaker;
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <div class="avatar">${avatar}</div>
            <span>${speakerName}</span>
        </div>
        <div class="message-content"></div>
    `;
    
    return messageDiv;
}

function addMessage(speaker, text) {
    const messageDiv = createMessageElement(speaker);
    const contentDiv = messageDiv.querySelector('.message-content');
    contentDiv.innerHTML = formatText(text);
    
    elements.transcript.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.transcript.scrollTop = elements.transcript.scrollHeight;
}

function formatText(text) {
    // Preserve line breaks and formatting
    return text
        .replace(/\n/g, '<br>')
        .replace(/\s{2,}/g, (match) => '&nbsp;'.repeat(match.length))
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

function exportDebate() {
    if (debateState.transcript.length === 0) {
        showError('No debate transcript to export.');
        return;
    }

    const content = `Atheist-Theist AI Debate
Topic: ${debateState.question}
Model: ${debateState.model}
Date: ${new Date().toLocaleString()}

${'='.repeat(50)}

${debateState.transcript.map(({speaker, text}) => `${speaker}:\n${text}\n`).join('\n')}

${'='.repeat(50)}
End of debate transcript.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debate-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// UI helper functions
function updateStatus(message) {
    elements.statusMessage.textContent = message;
}

function showLoading(show) {
    if (show) {
        elements.loadingSpinner.classList.remove('hidden');
    } else {
        elements.loadingSpinner.classList.add('hidden');
    }
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorModal.classList.remove('hidden');
}

function closeErrorModal() {
    elements.errorModal.classList.add('hidden');
}

// Global function for modal close
window.closeErrorModal = closeErrorModal; 