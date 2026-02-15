import React, {useState, useEffect} from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  Statistics,
  Testimonials,
} from "./components";
import ScrollToTop from './components/ScrollToTop';
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>(() => {
        // Persist theme preference
        const savedMode = localStorage.getItem('theme-mode');
        return savedMode || 'dark';
    });

    const handleModeChange = () => {
        setMode(prevMode => {
            const newMode = prevMode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme-mode', newMode);
            return newMode;
        });
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <ScrollToTop />
        <FadeIn transitionDuration={700}>
            <Main/>
            <Expertise/>
            <Statistics/>
            <Project/>
            <Testimonials/>
            <Timeline/>
            <Contact/>
        </FadeIn>
        <Footer />
    </div>
    );
}

export default App;