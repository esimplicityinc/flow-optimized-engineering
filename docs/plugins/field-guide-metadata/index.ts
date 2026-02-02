import type { LoadContext, Plugin } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface MethodMeta {
  id: string;
  title: string;
  maturity: string;
  path: string;
  guideId?: string;
  framework?: string;
}

interface ObservationMeta {
  id: string;
  title: string;
  status: string;
  sourceType: string;
  slug: string;
}

interface PluginContent {
  methods: Record<string, MethodMeta>;
  observations: Record<string, ObservationMeta>;
  observationsBySlug: Record<string, ObservationMeta>;
}

function extractIdFromFilename(filename: string): string | null {
  const match = filename.match(/^([MO]\d+)-/);
  return match ? match[1] : null;
}

function scanMethodFiles(docsPath: string): MethodMeta[] {
  const methods: MethodMeta[] = [];
  
  // Scan field-guides methods
  const fieldGuidesPath = path.join(docsPath, 'field-guides');
  if (fs.existsSync(fieldGuidesPath)) {
    const guides = fs.readdirSync(fieldGuidesPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name !== 'observations');
    
    for (const guide of guides) {
      const methodsPath = path.join(fieldGuidesPath, guide.name, 'methods');
      if (!fs.existsSync(methodsPath)) continue;
      
      const folders = fs.readdirSync(methodsPath, { withFileTypes: true })
        .filter(d => d.isDirectory());
      
      for (const folder of folders) {
        const folderPath = path.join(methodsPath, folder.name);
        const files = fs.readdirSync(folderPath)
          .filter(f => f.startsWith('M') && f.endsWith('.md'));
        
        for (const file of files) {
          const filePath = path.join(folderPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(content);
          
          const id = extractIdFromFilename(file) || data.methodId;
          if (!id) continue;
          
          methods.push({
            id,
            title: data.title || 'Untitled',
            maturity: data.maturity || 'hypothesized',
            path: `${guide.name}/methods/${folder.name}/${file.replace('.md', '')}`,
            guideId: guide.name,
          });
        }
      }
    }
  }
  
  // Scan external-frameworks methods
  const externalPath = path.join(docsPath, 'external-frameworks');
  if (fs.existsSync(externalPath)) {
    const frameworks = fs.readdirSync(externalPath, { withFileTypes: true })
      .filter(d => d.isDirectory());
    
    for (const framework of frameworks) {
      const methodsPath = path.join(externalPath, framework.name, 'methods');
      if (!fs.existsSync(methodsPath)) continue;
      
      const files = fs.readdirSync(methodsPath)
        .filter(f => f.startsWith('M') && f.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(methodsPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);
        
        const id = extractIdFromFilename(file) || data.methodId;
        if (!id) continue;
        
        methods.push({
          id,
          title: data.title || 'Untitled',
          maturity: data.foe_maturity || 'hypothesized',
          path: `external-frameworks/${framework.name}/methods/${file.replace('.md', '')}`,
          framework: framework.name,
        });
      }
    }
  }
  
  return methods;
}

function scanObservationFiles(docsPath: string): ObservationMeta[] {
  const observations: ObservationMeta[] = [];
  const observationsPath = path.join(docsPath, 'field-guides', 'observations');
  
  if (!fs.existsSync(observationsPath)) return observations;
  
  const types = fs.readdirSync(observationsPath, { withFileTypes: true })
    .filter(d => d.isDirectory());
  
  for (const type of types) {
    const typePath = path.join(observationsPath, type.name);
    const files = fs.readdirSync(typePath)
      .filter(f => f.startsWith('O') && f.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(typePath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      
      const id = extractIdFromFilename(file) || data.observationId;
      if (!id) continue;
      
      const slug = `${type.name}/${file.replace('.md', '')}`;
      
      observations.push({
        id,
        title: data.title || 'Untitled',
        status: data.status || 'in-progress',
        sourceType: data.source_type || type.name,
        slug,
      });
    }
  }
  
  return observations;
}

export default function fieldGuideMetadataPlugin(
  context: LoadContext
): Plugin<PluginContent> {
  return {
    name: 'field-guide-metadata',
    
    async loadContent(): Promise<PluginContent> {
      const docsPath = path.join(context.siteDir, 'docs');
      
      const methodsList = scanMethodFiles(docsPath);
      const observationsList = scanObservationFiles(docsPath);
      
      const methods: Record<string, MethodMeta> = {};
      methodsList.forEach(m => {
        methods[m.id] = m;
      });
      
      const observations: Record<string, ObservationMeta> = {};
      const observationsBySlug: Record<string, ObservationMeta> = {};
      observationsList.forEach(o => {
        observations[o.id] = o;
        observationsBySlug[o.slug] = o;
      });
      
      return { methods, observations, observationsBySlug };
    },
    
    async contentLoaded({ content, actions }): Promise<void> {
      const outputDir = path.join(context.siteDir, 'src', 'data');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, 'fieldGuideMetadata.ts');
      
      const fileContent = `// Auto-generated by field-guide-metadata plugin
// Do not edit manually - changes will be overwritten

export interface MethodMeta {
  id: string;
  title: string;
  maturity: 'hypothesized' | 'observing' | 'validated' | 'proven';
  path: string;
  guideId?: string;
  framework?: string;
}

export interface ObservationMeta {
  id: string;
  title: string;
  status: 'in-progress' | 'completed';
  sourceType: 'internal' | 'external';
  slug: string;
}

export const METHODS_BY_ID: Record<string, MethodMeta> = ${JSON.stringify(content.methods, null, 2)};

export const OBSERVATIONS_BY_ID: Record<string, ObservationMeta> = ${JSON.stringify(content.observations, null, 2)};

export const OBSERVATIONS_BY_SLUG: Record<string, ObservationMeta> = ${JSON.stringify(content.observationsBySlug, null, 2)};

/**
 * Resolve observation by either ID (O126) or full slug (internal/O126-...)
 */
export function resolveObservation(ref: string): ObservationMeta | undefined {
  return OBSERVATIONS_BY_ID[ref] || OBSERVATIONS_BY_SLUG[ref];
}

/**
 * Resolve method by ID (M148)
 */
export function resolveMethod(ref: string): MethodMeta | undefined {
  return METHODS_BY_ID[ref];
}
`;
      
      fs.writeFileSync(outputPath, fileContent, 'utf-8');
      console.log(`[field-guide-metadata] Generated metadata with ${Object.keys(content.methods).length} methods and ${Object.keys(content.observations).length} observations`);
    },
  };
}
