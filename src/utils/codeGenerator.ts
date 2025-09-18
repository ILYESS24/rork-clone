// Générateur de code React/JSX
export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  style?: Record<string, any>;
}

export class ReactCodeGenerator {
  private imports: Set<string> = new Set();
  private componentCounter = 0;

  // Générer le code React complet
  generateReactCode(components: Component[]): string {
    this.imports.clear();
    this.componentCounter = 0;

    // Ajouter les imports de base
    this.imports.add("import React from 'react';");
    this.imports.add("import './App.css';");

    // Générer les composants
    const componentCode = this.generateComponents(components);
    
    // Générer le composant principal App
    const appCode = this.generateAppComponent(components);

    // Combiner tout
    return [
      Array.from(this.imports).join('\n'),
      '',
      componentCode,
      '',
      appCode,
      '',
      'export default App;'
    ].join('\n');
  }

  // Générer les composants individuels
  private generateComponents(components: Component[]): string {
    const componentCodes: string[] = [];

    components.forEach((component, index) => {
      const componentName = `Component${index + 1}`;
      const componentCode = this.generateComponent(component, componentName);
      componentCodes.push(componentCode);
    });

    return componentCodes.join('\n\n');
  }

  // Générer un composant individuel
  private generateComponent(component: Component, componentName: string): string {
    const { type, props, children, style } = component;

    // Ajouter les imports nécessaires
    this.addImportsForComponent(type);

    // Générer les props
    const propsString = this.generateProps(props);
    
    // Générer le style
    const styleString = this.generateStyle(style);
    
    // Générer les enfants
    const childrenString = children ? this.generateChildren(children) : '';

    // Générer le JSX
    const jsxElement = this.generateJSXElement(type, propsString, styleString, childrenString);

    return `const ${componentName} = () => {
  return (
    ${jsxElement}
  );
};`;
  }

  // Générer le composant App principal
  private generateAppComponent(components: Component[]): string {
    const componentNames = components.map((_, index) => `Component${index + 1}`);
    const componentElements = componentNames.map((name, index) => 
      `      <${name} key={${index}} />`
    ).join('\n');

    return `const App = () => {
  return (
    <div className="app">
${componentElements}
    </div>
  );
};`;
  }

  // Générer les props
  private generateProps(props: Record<string, any>): string {
    const propStrings: string[] = [];

    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          propStrings.push(`${key}="${value}"`);
        } else if (typeof value === 'boolean') {
          propStrings.push(value ? key : `${key}={false}`);
        } else {
          propStrings.push(`${key}={${JSON.stringify(value)}}`);
        }
      }
    });

    return propStrings.join(' ');
  }

  // Générer le style
  private generateStyle(style?: Record<string, any>): string {
    if (!style || Object.keys(style).length === 0) {
      return '';
    }

    const styleObject = Object.entries(style)
      .map(([key, value]) => `    ${this.camelToKebab(key)}: '${value}'`)
      .join(',\n');

    return `style={{\n${styleObject}\n}}`;
  }

  // Générer les enfants
  private generateChildren(children: Component[]): string {
    if (children.length === 0) return '';

    return children.map((child, index) => {
      const childName = `Child${this.componentCounter++}`;
      const childCode = this.generateComponent(child, childName);
      return childCode;
    }).join('\n\n');
  }

  // Générer l'élément JSX
  private generateJSXElement(
    type: string, 
    props: string, 
    style: string, 
    children: string
  ): string {
    const elementType = this.getJSXElementType(type);
    
    if (style && children) {
      return `<${elementType} ${props} ${style}>\n    ${children}\n  </${elementType}>`;
    } else if (style) {
      return `<${elementType} ${props} ${style} />`;
    } else if (children) {
      return `<${elementType} ${props}>\n    ${children}\n  </${elementType}>`;
    } else {
      return `<${elementType} ${props} />`;
    }
  }

  // Convertir le type de composant en élément JSX
  private getJSXElementType(type: string): string {
    const elementMap: Record<string, string> = {
      'Container': 'div',
      'Grid': 'div',
      'Flexbox': 'div',
      'Section': 'section',
      'Sidebar': 'aside',
      'Button': 'button',
      'Text': 'p',
      'Heading': 'h1',
      'List': 'ul',
      'Quote': 'blockquote',
      'Badge': 'span',
      'Image': 'img',
      'Video': 'video',
      'Input': 'input',
      'Textarea': 'textarea',
      'Select': 'select',
      'Checkbox': 'input',
      'Radio': 'input',
      'Card': 'div',
      'Modal': 'div',
      'Tooltip': 'div',
      'Dropdown': 'div',
      'Navbar': 'nav',
      'Footer': 'footer',
      'Form': 'form',
      'Table': 'table',
      'Chart': 'div',
      'Calendar': 'div',
      'Timeline': 'div',
      'ProgressBar': 'div',
    };

    return elementMap[type] || 'div';
  }

  // Ajouter les imports nécessaires
  private addImportsForComponent(type: string): void {
    const importMap: Record<string, string[]> = {
      'Button': ['import { Button } from "@/components/ui/button";'],
      'Card': ['import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";'],
      'Input': ['import { Input } from "@/components/ui/input";'],
      'Textarea': ['import { Textarea } from "@/components/ui/textarea";'],
      'Select': ['import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";'],
      'Checkbox': ['import { Checkbox } from "@/components/ui/checkbox";'],
      'Radio': ['import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";'],
      'Modal': ['import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";'],
      'Tooltip': ['import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";'],
      'Dropdown': ['import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";'],
      'Tabs': ['import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";'],
      'Accordion': ['import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";'],
      'Table': ['import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";'],
      'Chart': ['import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";'],
      'Calendar': ['import { Calendar } from "@/components/ui/calendar";'],
    };

    const imports = importMap[type];
    if (imports) {
      imports.forEach(imp => this.imports.add(imp));
    }
  }

  // Convertir camelCase en kebab-case
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  // Générer le CSS
  generateCSS(components: Component[]): string {
    const cssRules: string[] = [];

    // CSS de base
    cssRules.push(`
.app {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`);

    // Générer les styles pour chaque composant
    components.forEach((component, index) => {
      const className = `.component-${index}`;
      if (component.style) {
        const styles = Object.entries(component.style)
          .map(([key, value]) => `  ${this.camelToKebab(key)}: ${value};`)
          .join('\n');
        
        cssRules.push(`${className} {\n${styles}\n}`);
      }
    });

    return cssRules.join('\n');
  }

  // Générer le package.json
  generatePackageJson(): string {
    return JSON.stringify({
      "name": "rork-generated-app",
      "version": "1.0.0",
      "private": true,
      "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "@radix-ui/react-slot": "^1.0.2",
        "@radix-ui/react-tabs": "^1.1.13",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.1",
        "lucide-react": "^0.408.0",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7"
      },
      "devDependencies": {
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        "autoprefixer": "^10.4.19",
        "postcss": "^8.4.39",
        "tailwindcss": "^3.4.4",
        "typescript": "^5.2.2",
        "vite": "^5.3.1"
      },
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      }
    }, null, 2);
  }

  // Générer le fichier de configuration Vite
  generateViteConfig(): string {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;
  }

  // Générer le fichier Tailwind
  generateTailwindConfig(): string {
    return `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  }
}
