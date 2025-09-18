import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';

interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  style?: Record<string, any>;
}

interface LivePreviewProps {
  components: Component[];
  isOpen: boolean;
  onClose: () => void;
}

export function LivePreview({ components, isOpen, onClose }: LivePreviewProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');

  // Générer le contenu de prévisualisation
  useEffect(() => {
    if (components.length === 0) {
      setPreviewContent('<div class="p-8 text-center text-gray-500">Aucun composant à prévisualiser</div>');
      return;
    }

    // Générer le HTML/CSS pour la prévisualisation
    const html = generatePreviewHTML(components);
    setPreviewContent(html);
  }, [components]);

  const generatePreviewHTML = (components: Component[]): string => {
    const componentHTML = components.map(component => renderComponent(component)).join('\n');
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prévisualisation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .preview-container { min-height: 100vh; background: white; }
  </style>
</head>
<body>
  <div class="preview-container">
    ${componentHTML}
  </div>
</body>
</html>`;
  };

  const renderComponent = (component: Component): string => {
    const { type, props, style, children } = component;
    const styleString = style ? Object.entries(style).map(([key, value]) => `${key}: ${value}`).join('; ') : '';
    
    switch (type) {
      case 'Container':
        return `<div class="p-4 border border-gray-200 rounded-lg ${props.className || ''}" style="${styleString}">
          ${children ? children.map(renderComponent).join('') : ''}
        </div>`;
      
      case 'Button':
        return `<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${props.className || ''}" style="${styleString}">
          ${props.text || props.children || 'Bouton'}
        </button>`;
      
      case 'Text':
        return `<p class="text-gray-700 ${props.className || ''}" style="${styleString}">
          ${props.text || props.children || 'Texte par défaut'}
        </p>`;
      
      case 'Heading':
        const level = props.level || 1;
        return `<h${level} class="text-${props.size || '2xl'} font-bold text-gray-900 ${props.className || ''}" style="${styleString}">
          ${props.text || props.children || 'Titre'}
        </h${level}>`;
      
      case 'Card':
        return `<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${props.className || ''}" style="${styleString}">
          ${props.title ? `<h3 class="text-lg font-semibold mb-2">${props.title}</h3>` : ''}
          ${props.description ? `<p class="text-gray-600">${props.description}</p>` : ''}
          ${children ? children.map(renderComponent).join('') : ''}
        </div>`;
      
      case 'Image':
        return `<img src="${props.src || 'https://via.placeholder.com/300x200'}" 
          alt="${props.alt || ''}" 
          class="rounded-lg ${props.className || ''}" 
          style="${styleString}" />`;
      
      case 'Input':
        return `<input type="${props.type || 'text'}" 
          placeholder="${props.placeholder || ''}" 
          value="${props.value || ''}"
          class="border border-gray-300 rounded px-3 py-2 ${props.className || ''}" 
          style="${styleString}" />`;
      
      case 'Textarea':
        return `<textarea 
          placeholder="${props.placeholder || ''}" 
          class="border border-gray-300 rounded px-3 py-2 w-full ${props.className || ''}" 
          style="${styleString}">${props.value || ''}</textarea>`;
      
      case 'Grid':
        return `<div class="grid grid-cols-${props.cols || 3} gap-4 ${props.className || ''}" style="${styleString}">
          ${children ? children.map(renderComponent).join('') : ''}
        </div>`;
      
      case 'Flexbox':
        return `<div class="flex ${props.direction || 'row'} ${props.justify || 'justify-start'} ${props.align || 'items-start'} gap-4 ${props.className || ''}" style="${styleString}">
          ${children ? children.map(renderComponent).join('') : ''}
        </div>`;
      
      default:
        return `<div class="p-4 border border-gray-300 rounded ${props.className || ''}" style="${styleString}">
          <span class="text-gray-500">${type}</span>
          ${children ? children.map(renderComponent).join('') : ''}
        </div>`;
    }
  };

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  if (!isOpen) return null;

  const dimensions = getPreviewDimensions();

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white rounded-lg shadow-xl ${isFullscreen ? 'w-full h-full rounded-none' : 'max-w-6xl w-full max-h-[90vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Prévisualisation en direct</h2>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'tablet' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPreviewContent('');
                setTimeout(() => {
                  const html = generatePreviewHTML(components);
                  setPreviewContent(html);
                }, 100);
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-4 overflow-auto" style={{ height: isFullscreen ? 'calc(100vh - 80px)' : 'calc(90vh - 120px)' }}>
          <div className="flex justify-center">
            <div 
              className="border border-gray-300 bg-white shadow-lg"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                maxHeight: '100%',
                overflow: 'auto'
              }}
            >
              <iframe
                srcDoc={previewContent}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                title="Live Preview"
              />
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="border-t p-2 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
          <span>Mode: {previewMode} | Composants: {components.length}</span>
          <span>Taille: {dimensions.width} × {dimensions.height}</span>
        </div>
      </div>
    </div>
  );
}
