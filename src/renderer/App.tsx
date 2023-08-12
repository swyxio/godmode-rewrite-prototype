import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
// https://electron-react-boilerplate.js.org/docs/styling#tailwind-integration
import 'tailwindcss/tailwind.css';
import { getEnabledProviders } from 'utils';
import './App.css';
import OpenAi from '../providers/openai';
import Bard from '../providers/bard';
import Bing from '../providers/bing';
import Claude from '../providers/claude';
import Claude2 from '../providers/claude2';
import Together from '../providers/together';
import Perplexity from '../providers/perplexity';
import Phind from '../providers/phind';
import PerplexityLlama from '../providers/perplexity-llama.js';
import HuggingChat from '../providers/huggingchat';
import OobaBooga from '../providers/oobabooga';
import Smol from '../providers/smol';
import React, { useState } from 'react';

function Hello() {
  const providers = {
    OpenAi,
    Bard,
    Bing,
    // Claude,
    // Claude2,
    // Together,
    // Perplexity,
    // Phind,
    // PerplexityLlama,
    // HuggingChat,
    // OobaBooga,
    // Smol,
  };
  const enabledProviders = getEnabledProviders(providers);
  React.useEffect(() => {
    enabledProviders.forEach((provider) => {
      // Call provider-specific CSS handling and custom paste setup
      provider.handleCss();
      provider.setupCustomPasteBehavior();
    });
  }, [enabledProviders]);
  const [superprompt, setSuperprompt] = React.useState('');
  React.useEffect(() => {
    if (superprompt) {
      enabledProviders.forEach((provider) => {
        // Call provider-specific CSS handling and custom paste setup
        provider.handleInput(superprompt);
      });
    }
  }, [enabledProviders, superprompt]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    enabledProviders.forEach((provider) => {
      // Call provider-specific CSS handling and custom paste setup
      provider.handleSubmit(superprompt);
    });
  }
  return (
    <div>
      <div id="webviewContainer" className="split">
        {enabledProviders.map((provider) => (
          <div key={provider.paneId()} className="page darwin">
            <webview
              allowpopups={''}
              id={provider.webviewId}
              src={provider.url}
              useragent={provider.getUserAgent && provider.getUserAgent()}
            />
          </div>
        ))}
      </div>
      <form id="form" className="" onSubmit={handleSubmit}>
        <div id="form-wrapper">
          <textarea
            rows={4}
            id="prompt"
            value={superprompt}
            onChange={(e) => setSuperprompt(e.target.value)}
            name="prompt"
            placeholder="Enter a superprompt here.
  - Quick Open: Cmd+G or Submit: Cmd/Ctrl+Enter (customizable in menu)
  - Switch windows: Cmd+1/2/3/A, or Resize windows: Cmd -/+, or Back/Fwd: Cmd H/L
  - New chat: Cmd+R or Right-click menubar icon for more options!"
          />
          <button id="btn" type="submit" title="cmd+enter to submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
