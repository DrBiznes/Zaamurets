import React, { useState, useRef } from 'react';
import { Train, TrainCar } from 'zaamurets';
import Marquee from 'react-fast-marquee';
import html2canvas from 'html2canvas';
import './TrainCreator.css';

interface TrainCarConfig {
  id: string;
  type: 'badge' | 'text';
  content: string;
  href?: string;
  badgeConfig?: {
    label: string;
    message: string;
    color: string;
    style: string;
    logo?: string;
    logoColor?: string;
    labelColor?: string;
  };
}

interface TrainConfig {
  animated: boolean;
  additionalTrackSegments: number;
  useMarquee: boolean;
  marqueeSpeed: number;
  marqueeGradient: boolean;
  marqueePauseOnHover: boolean;
  previewBackground: string;
}

const TrainCreator: React.FC = () => {
  const trainRef = useRef<HTMLDivElement>(null);
  const [cars, setCars] = useState<TrainCarConfig[]>([{
    id: '1',
    type: 'badge',
    content: '',
    badgeConfig: {
      label: 'hello',
      message: 'world',
      color: 'blue',
      style: 'flat'
    }
  }]);
  
  const [trainConfig, setTrainConfig] = useState<TrainConfig>({
    animated: true,
    additionalTrackSegments: 10,
    useMarquee: false,
    marqueeSpeed: 40,
    marqueeGradient: false,
    marqueePauseOnHover: true,
    previewBackground: '#1a1a1a'
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);

  const addCar = () => {
    if (cars.length >= 3) return;
    setCars(prev => [...prev, {
      id: Date.now().toString(),
      type: 'badge',
      content: '',
      badgeConfig: {
        label: 'new',
        message: 'car',
        color: 'green',
        style: 'flat'
      }
    }]);
  };

  const removeCar = (id: string) => {
    setCars(prev => prev.filter(car => car.id !== id));
  };

  const updateCar = (id: string, updates: Partial<TrainCarConfig>) => {
    setCars(prev => prev.map(car => 
      car.id === id ? { ...car, ...updates } : car
    ));
  };

  const updateBadgeConfig = (id: string, updates: Partial<NonNullable<TrainCarConfig['badgeConfig']>>) => {
    setCars(prev => prev.map(car => {
      if (car.id !== id) return car;
      if (!car.badgeConfig) return car;
      return {
        ...car,
        badgeConfig: {
          ...car.badgeConfig,
          ...updates
        }
      };
    }));
  };

  const generateBadgeUrl = (config: TrainCarConfig['badgeConfig']) => {
    if (!config) return '';
    try {
      const baseUrl = 'https://img.shields.io/badge';
      const label = encodeURIComponent(config.label || '');
      const message = encodeURIComponent(config.message || '');
      const color = encodeURIComponent(config.color || 'blue');
      
      let url = `${baseUrl}/${label}-${message}-${color}`;
      
      const params = new URLSearchParams();
      if (config.style) params.append('style', config.style);
      if (config.logo) params.append('logo', config.logo);
      if (config.logoColor) params.append('logoColor', config.logoColor);
      if (config.labelColor) params.append('labelColor', config.labelColor);
      
      const queryString = params.toString();
      if (queryString) {
        url += '?' + queryString;
      }
      
      return url;
    } catch (error) {
      console.error('Error generating badge URL:', error);
      return '';
    }
  };

  const renderTrainCar = (car: TrainCarConfig) => {
    if (car.type === 'badge' && car.badgeConfig) {
      const badgeUrl = generateBadgeUrl(car.badgeConfig);
      return (
        <TrainCar key={car.id} href={car.href}>
          <img src={badgeUrl} alt={`${car.badgeConfig.label} ${car.badgeConfig.message}`} />
        </TrainCar>
      );
    }
    return (
      <TrainCar key={car.id} href={car.href}>
        <span>{car.content}</span>
      </TrainCar>
    );
  };

  const renderTrain = () => {
    const train = (
      <Train 
        animated={trainConfig.animated} 
        additionalTrackSegments={trainConfig.additionalTrackSegments}
      >
        {cars.map(renderTrainCar)}
      </Train>
    );

    if (trainConfig.useMarquee) {
      return (
        <Marquee 
          speed={trainConfig.marqueeSpeed}
          gradient={trainConfig.marqueeGradient}
          pauseOnHover={trainConfig.marqueePauseOnHover}
        >
          {train}
        </Marquee>
      );
    }

    return train;
  };

  const handleShare = async () => {
    if (!trainRef.current) return;

    try {
      const canvas = await html2canvas(trainRef.current, {
        background: getComputedStyle(document.documentElement)
          .getPropertyValue('--code-bg')
          .trim(),
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      const imageUrl = canvas.toDataURL('image/png');
      setShareImage(imageUrl);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const downloadImage = () => {
    if (!shareImage) return;
    const link = document.createElement('a');
    link.href = shareImage;
    link.download = 'zaamurets-train.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const commonBadgeColors = [
    'brightgreen',
    'green',
    'yellow',
    'yellowgreen',
    'orange',
    'red',
    'blue',
    'lightgrey',
    'success',
    'important',
    'critical',
    'informational',
    'inactive'
  ];

  const commonLogos = [
    'github',
    'npm',
    'docker',
    'react',
    'vue.js',
    'angular',
    'typescript',
    'javascript',
    'python',
    'rust',
    'go',
    'modrinth',
    'curseforge',
    'X'
  ];

  return (
    <section className="train-creator">
      <div className="train-creator-content">
        <div className="train-creator-header">
          <h2>Zaamurets Builder</h2>
          <p>Create your custom ASCII train with badges and animations.</p>
        </div>

        <div className="train-controls">
          <div className="train-config-section">
            <h3>Train Configuration</h3>
            <div className="config-grid">
              <div className="config-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={trainConfig.animated}
                    onChange={e => setTrainConfig(prev => ({ ...prev, animated: e.target.checked }))}
                  />
                  Track Animation
                </label>
              </div>

              <div className="config-group">
                <label className="number-label">
                  Track Segments
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={trainConfig.additionalTrackSegments}
                    onChange={e => setTrainConfig(prev => ({ 
                      ...prev, 
                      additionalTrackSegments: parseInt(e.target.value) || 0 
                    }))}
                  />
                </label>
              </div>

              <div className="config-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={trainConfig.useMarquee}
                    onChange={e => setTrainConfig(prev => ({ ...prev, useMarquee: e.target.checked }))}
                  />
                  Use Marquee
                </label>
              </div>

              {trainConfig.useMarquee && (
                <div className="marquee-options">
                  <div className="config-group">
                    <label className="number-label">
                      Speed
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={trainConfig.marqueeSpeed}
                        onChange={e => setTrainConfig(prev => ({ 
                          ...prev, 
                          marqueeSpeed: parseInt(e.target.value) || 40 
                        }))}
                      />
                    </label>
                  </div>

                  <div className="config-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={trainConfig.marqueeGradient}
                        onChange={e => setTrainConfig(prev => ({ 
                          ...prev, 
                          marqueeGradient: e.target.checked 
                        }))}
                      />
                      Show Gradient
                    </label>
                  </div>

                  <div className="config-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={trainConfig.marqueePauseOnHover}
                        onChange={e => setTrainConfig(prev => ({ 
                          ...prev, 
                          marqueePauseOnHover: e.target.checked 
                        }))}
                      />
                      Pause on Hover
                    </label>
                  </div>
                </div>
              )}

              <div className="config-group">
                <label className="color-label">
                  Preview Background
                  <div className="color-input-group">
                    <input
                      type="color"
                      value={trainConfig.previewBackground}
                      onChange={e => setTrainConfig(prev => ({ 
                        ...prev, 
                        previewBackground: e.target.value 
                      }))}
                    />
                    <input
                      type="text"
                      value={trainConfig.previewBackground}
                      onChange={e => setTrainConfig(prev => ({ 
                        ...prev, 
                        previewBackground: e.target.value 
                      }))}
                      placeholder="#000000"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="cars-section">
            <div className="cars-header">
              <h3>Train Cars ({cars.length}/3)</h3>
              <div className="cars-actions">
                <button onClick={handleShare} className="share-button">
                  Share
                </button>
                <button 
                  onClick={addCar} 
                  disabled={cars.length >= 3}
                  className="add-car-button"
                >
                  Add Car
                </button>
              </div>
            </div>
            
            <div className="cars-grid">
              {cars.map(car => (
                <div key={car.id} className="car-config">
                  <div className="car-header">
                    <select
                      value={car.type}
                      onChange={e => updateCar(car.id, { type: e.target.value as 'badge' | 'text' })}
                    >
                      <option value="badge">Badge</option>
                      <option value="text">Text</option>
                    </select>
                    <button 
                      onClick={() => removeCar(car.id)}
                      className="remove-car-button"
                      disabled={cars.length <= 1}
                    >
                      ×
                    </button>
                  </div>

                  {car.type === 'badge' ? (
                    <div className="badge-config">
                      <div className="badge-row">
                        <div className="badge-input-group">
                          <label>Label</label>
                          <input
                            type="text"
                            className="badge-input"
                            placeholder="Label"
                            value={car.badgeConfig?.label || ''}
                            onChange={e => updateBadgeConfig(car.id, { label: e.target.value })}
                          />
                        </div>
                        <div className="badge-input-group">
                          <label>Message</label>
                          <input
                            type="text"
                            className="badge-input"
                            placeholder="Message"
                            value={car.badgeConfig?.message || ''}
                            onChange={e => updateBadgeConfig(car.id, { message: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="badge-row">
                        <div className="badge-input-group">
                          <label>Color</label>
                          <div className="color-select">
                            <input
                              type="text"
                              className="badge-input"
                              placeholder="Color (name or hex)"
                              value={car.badgeConfig?.color || ''}
                              onChange={e => updateBadgeConfig(car.id, { color: e.target.value })}
                            />
                            <div className="color-presets">
                              {commonBadgeColors.map(color => (
                                <button
                                  key={color}
                                  className="color-preset"
                                  style={{ backgroundColor: color }}
                                  onClick={() => updateBadgeConfig(car.id, { color })}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="badge-input-group">
                          <label>Label Color (optional)</label>
                          <input
                            type="text"
                            className="badge-input"
                            placeholder="Label Color"
                            value={car.badgeConfig?.labelColor || ''}
                            onChange={e => updateBadgeConfig(car.id, { labelColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="badge-row">
                        <div className="badge-input-group">
                          <label>Logo</label>
                          <select
                            className="badge-input"
                            value={car.badgeConfig?.logo || ''}
                            onChange={e => updateBadgeConfig(car.id, { logo: e.target.value })}
                          >
                            <option value="">Custom Logo URL</option>
                            {commonLogos.map(logo => (
                              <option key={logo} value={logo}>{logo}</option>
                            ))}
                          </select>
                        </div>
                        <div className="badge-input-group">
                          <label>Logo Color (optional)</label>
                          <input
                            type="text"
                            className="badge-input"
                            placeholder="Logo Color"
                            value={car.badgeConfig?.logoColor || ''}
                            onChange={e => updateBadgeConfig(car.id, { logoColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="badge-row">
                        <div className="badge-input-group">
                          <label>Style</label>
                          <select
                            className="badge-input"
                            value={car.badgeConfig?.style || 'flat'}
                            onChange={e => updateBadgeConfig(car.id, { style: e.target.value })}
                          >
                            <option value="flat">Flat</option>
                            <option value="flat-square">Flat Square</option>
                            <option value="plastic">Plastic</option>
                            <option value="for-the-badge">For the Badge</option>
                            <option value="social">Social</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-config">
                      <div className="badge-input-group">
                        <label>Text Content</label>
                        <input
                          type="text"
                          className="badge-input"
                          placeholder="Text content"
                          value={car.content}
                          onChange={e => updateCar(car.id, { content: e.target.value })}
                          maxLength={20}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="badge-input-group">
                    <label>Link URL (optional)</label>
                    <input
                      type="text"
                      className="badge-input-long"
                      placeholder="Link URL"
                      value={car.href || ''}
                      onChange={e => updateCar(car.id, { href: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          className="train-preview" 
          ref={trainRef}
          style={{ backgroundColor: trainConfig.previewBackground }}
        >
          {renderTrain()}
        </div>
      </div>

      {showShareModal && (
        <div className="share-modal">
          <div className="share-modal-content">
            <h3>Share Your Train</h3>
            {shareImage && (
              <div className="share-preview">
                <img src={shareImage} alt="Train Preview" />
              </div>
            )}
            <div className="share-actions">
              <button onClick={downloadImage} className="download-button">
                Download Image
              </button>
              <button onClick={() => setShowShareModal(false)} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainCreator; 