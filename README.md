![image](https://github.com/Flecart/ai-theological-debate/blob/main/logo.png)

# 🤖 AI Debate Arena

A modern, mobile-friendly web application that facilitates AI-powered debates between Christian and Atheist perspectives using OpenAI's GPT models.

## Features

- **Frontend-only**: No server required - runs entirely in your browser, so that you are sure I am not stealing your keys :).
- **Mobile-friendly**: Responsive design that works on all devices
- **Secure**: Your OpenAI API key stays in your browser and is never sent to any server
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Export functionality**: Download debate transcripts as text files
- **Multiple AI models**: Choose from GPT-5, GPT-5 Mini, GPT-5 Nano, GPT-4o, GPT-4o Mini, or GPT-3.5 Turbo

## How to Use
1. **Open the application**: Simply open `index.html` in your web browser, or go to the associated [website](https://flecart.github.io/ai-theological-debate/)
2. **Enter your OpenAI API key**: Get one from [OpenAI's platform](https://platform.openai.com/api-keys)
3. **Select an AI model**: Choose your preferred model (GPT-5 recommended)
4. **Enter a debate question**: Ask anything you'd like the AI personas to debate
5. **Start the debate**: Click "Start Debate" to begin
6. **Continue the conversation**: Click "Continue" to add more rounds
7. **Export or start new**: Download the transcript or begin a fresh debate

## Setup

No installation required! Just download the files and open `index.html` in your browser.

### Files included:
- `index.html` - Main application interface
- `styles.css` - Modern, responsive styling
- `script.js` - Application logic and OpenAI API integration
- `logo.svg` - Vector logo for the application
- `generate-logos.html` - Helper tool to generate PNG favicons and social media images
- `site.webmanifest` - PWA manifest file
- `README.md` - This file

### Logo Generation:
To generate the required PNG files for favicons and social media sharing:
1. Open `generate-logos.html` in your browser
2. Click the download buttons to generate:
   - `favicon-16x16.png` - Small favicon
   - `favicon-32x32.png` - Standard favicon
   - `apple-touch-icon.png` - iOS home screen icon
   - `logo.png` - Social media sharing image (1200x630)

## API Key Security

- Your OpenAI API key is stored locally in your browser's localStorage
- It's never transmitted to any server except OpenAI's API
- You can clear it anytime by clearing your browser's local storage

## Usage Tips

- **Start with broad questions**: "What is the meaning of life?" or "Does God exist?"
- **Be specific**: "How do you explain suffering in the world?" or "What evidence supports your worldview?"
- **Let it develop**: Use multiple rounds to see the conversation evolve
- **Export interesting debates**: Save particularly engaging conversations for later review

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: OpenAI Chat Completions API
- **Storage**: Browser localStorage for API key persistence
- **Responsive**: Mobile-first design with CSS Grid and Flexbox
- **No dependencies**: Pure vanilla implementation for maximum compatibility

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application! 
