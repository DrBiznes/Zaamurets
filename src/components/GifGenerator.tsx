import React, { useState, useRef, useCallback } from 'react';
import { Train, TrainCar } from 'zaamurets';
import html2canvas from 'html2canvas';
import GIF from 'gif.js';

interface GifGeneratorProps {
  onGifGenerated?: (gifUrl: string) => void;
}

const GifGenerator: React.FC<GifGeneratorProps> = ({ onGifGenerated }) => {
  const [content, setContent] = useState('');
  const [isShield, setIsShield] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGifUrl, setGeneratedGifUrl] = useState<string | null>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  const validateShieldUrl = (url: string) => {
    return url.startsWith('https://img.shields.io/') || url.startsWith('https://shields.io/');
  };

  const captureFrame = async () => {
    if (!trainRef.current) return null;
    
    const canvas = await html2canvas(trainRef.current, {
      background: '#1a1a1a',
      width: trainRef.current.offsetWidth,
      height: trainRef.current.offsetHeight,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    return canvas;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateGif = useCallback(async () => {
    if (!trainRef.current) {
      console.error('Train reference not found');
      return;
    }

    console.log('Starting GIF generation...');
    setIsGenerating(true);
    setProgress(0);
    setGeneratedGifUrl(null);

    try {
      // Initialize GIF encoder with absolute path to worker
      const workerPath = new URL('/gif.worker.js', window.location.origin).href;
      console.log('Using worker from:', workerPath);

      const gif = new GIF({
        workers: 2, // Reduced worker count for better stability
        quality: 5, // Higher quality (lower number = better quality)
        width: trainRef.current.offsetWidth,
        height: trainRef.current.offsetHeight,
        workerScript: workerPath,
        background: '#1a1a1a',
        debug: true // Enable debug logging
      });

      // Add event handlers
      gif.on('start', () => console.log('Started processing frames'));
      gif.on('progress', (p: number) => {
        const percent = Math.round(p * 100);
        console.log(`Encoding progress: ${percent}%`);
        setProgress(percent);
      });
      gif.on('abort', () => console.log('Processing aborted'));

      // Wait for initial animation state
      await sleep(500); // Increased initial delay

      // Capture frames with proper timing
      const frameCount = 30; // Increased frame count
      const frameDelay = 100; // Increased delay for smoother animation

      const frames = [];
      for (let i = 0; i < frameCount; i++) {
        console.log(`Capturing frame ${i + 1}/${frameCount}`);
        
        const canvas = await captureFrame();
        if (canvas) {
          frames.push({ canvas, delay: frameDelay });
        }
        
        // Wait for next animation frame
        await sleep(frameDelay);
      }

      console.log(`Successfully captured ${frames.length} frames`);

      // Add all frames to the GIF
      frames.forEach(({ canvas, delay }, index) => {
        console.log(`Adding frame ${index + 1} to GIF`);
        gif.addFrame(canvas, { delay, copy: true });
      });

      console.log('All frames added, starting render...');

      // Render the GIF
      const gifBlob = await new Promise<Blob>((resolve, reject) => {
        gif.on('finished', (blob) => {
          console.log('GIF rendering finished');
          resolve(blob);
        });
        
        console.log('Starting GIF render');
        gif.render();
      });

      const gifUrl = URL.createObjectURL(gifBlob);
      console.log('GIF generation complete, created URL:', gifUrl);
      setGeneratedGifUrl(gifUrl);
      onGifGenerated?.(gifUrl);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating GIF:', error);
      setIsGenerating(false);
      setProgress(0);
      setGeneratedGifUrl(null);
    }
  }, [onGifGenerated]);

  const handleDownload = useCallback(() => {
    if (!generatedGifUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedGifUrl;
    link.download = 'zaamurets-train.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedGifUrl]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isShield && !validateShieldUrl(value)) {
      return;
    }
    if (!isShield && value.length > 20) {
      return;
    }
    setContent(value);
  };

  return (
    <section id="gif-generator" className="gif-generator">
      <div className="section-content">
        <h2>GIF Generator</h2>
        <p>Create a GIF of your train animation to share anywhere!</p>

        <div className="generator-controls">
          <div className="input-group">
            <label>
              <input
                type="radio"
                checked={!isShield}
                onChange={() => setIsShield(false)}
              />
              Text Content (max 20 chars)
            </label>
            <label>
              <input
                type="radio"
                checked={isShield}
                onChange={() => setIsShield(true)}
              />
              Shields.io Badge
            </label>
          </div>

          <input
            type="text"
            value={content}
            onChange={handleContentChange}
            placeholder={isShield ? 'Enter shields.io URL' : 'Enter text content'}
            className="content-input"
          />

          <button
            onClick={generateGif}
            disabled={!content || isGenerating}
            className="generate-button"
          >
            {isGenerating 
              ? `Generating... ${progress}%` 
              : 'Generate GIF'}
          </button>
        </div>

        <div className="preview-container" ref={trainRef}>
          <Train animated={true}>
            <TrainCar>
              {isShield ? (
                <img src={content} alt="Shield" />
              ) : (
                <span>{content}</span>
              )}
            </TrainCar>
          </Train>
        </div>

        {generatedGifUrl && (
          <div className="generated-preview">
            <h3>Generated GIF</h3>
            <div className="gif-preview">
              <img src={generatedGifUrl} alt="Generated Train Animation" />
              <button onClick={handleDownload} className="download-button">
                Download GIF
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GifGenerator; 