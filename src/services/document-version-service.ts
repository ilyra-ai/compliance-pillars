
import { v4 as uuidv4 } from 'uuid';

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string;
  createdAt: string;
  createdBy: string;
  comment: string;
}

export interface Document {
  id: string;
  title: string;
  currentVersionId: string;
  versions: DocumentVersion[];
  pillarId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

class DocumentVersionService {
  private static instance: DocumentVersionService;
  private documents: Record<string, Document>;
  
  private constructor() {
    // Carrega documentos do localStorage se disponível
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      try {
        this.documents = JSON.parse(savedDocuments);
      } catch (e) {
        this.documents = {};
      }
    } else {
      this.documents = {};
    }
  }

  public static getInstance(): DocumentVersionService {
    if (!DocumentVersionService.instance) {
      DocumentVersionService.instance = new DocumentVersionService();
    }
    return DocumentVersionService.instance;
  }

  private saveToStorage(): void {
    localStorage.setItem('documents', JSON.stringify(this.documents));
  }

  // Criar um novo documento
  public createDocument(title: string, content: string, pillarId?: string, tags: string[] = []): Document {
    const documentId = uuidv4();
    const versionId = uuidv4();
    const now = new Date().toISOString();
    
    const version: DocumentVersion = {
      id: versionId,
      documentId,
      version: 1,
      content,
      createdAt: now,
      createdBy: 'Sistema', // Pode ser substituído pelo usuário atual
      comment: 'Versão inicial'
    };
    
    const document: Document = {
      id: documentId,
      title,
      currentVersionId: versionId,
      versions: [version],
      pillarId,
      tags,
      createdAt: now,
      updatedAt: now
    };
    
    this.documents[documentId] = document;
    this.saveToStorage();
    return document;
  }

  // Obter documento por ID
  public getDocument(documentId: string): Document | null {
    return this.documents[documentId] || null;
  }

  // Listar todos os documentos
  public getAllDocuments(): Document[] {
    return Object.values(this.documents);
  }

  // Obter documentos por Pilar
  public getDocumentsByPillar(pillarId: string): Document[] {
    return Object.values(this.documents).filter(doc => doc.pillarId === pillarId);
  }

  // Criar nova versão de documento
  public createVersion(documentId: string, content: string, comment: string = ''): DocumentVersion | null {
    const document = this.documents[documentId];
    if (!document) return null;
    
    const lastVersion = document.versions.reduce((max, v) => v.version > max ? v.version : max, 0);
    const versionId = uuidv4();
    const now = new Date().toISOString();
    
    const newVersion: DocumentVersion = {
      id: versionId,
      documentId,
      version: lastVersion + 1,
      content,
      createdAt: now,
      createdBy: 'Sistema', // Pode ser substituído pelo usuário atual
      comment: comment || `Versão ${lastVersion + 1}`
    };
    
    document.versions.push(newVersion);
    document.currentVersionId = versionId;
    document.updatedAt = now;
    
    this.saveToStorage();
    return newVersion;
  }

  // Obter versão específica de um documento
  public getVersion(documentId: string, versionId: string): DocumentVersion | null {
    const document = this.documents[documentId];
    if (!document) return null;
    
    return document.versions.find(v => v.id === versionId) || null;
  }

  // Listar versões de um documento
  public getVersions(documentId: string): DocumentVersion[] {
    const document = this.documents[documentId];
    if (!document) return [];
    
    return [...document.versions].sort((a, b) => b.version - a.version);
  }

  // Restaurar versão anterior
  public restoreVersion(documentId: string, versionId: string): boolean {
    const document = this.documents[documentId];
    if (!document) return false;
    
    document.currentVersionId = versionId;
    document.updatedAt = new Date().toISOString();
    
    this.saveToStorage();
    return true;
  }

  // Atualizar metadados do documento
  public updateDocument(documentId: string, updates: Partial<Omit<Document, 'id' | 'versions' | 'currentVersionId'>>): Document | null {
    const document = this.documents[documentId];
    if (!document) return null;
    
    Object.assign(document, updates, { updatedAt: new Date().toISOString() });
    this.saveToStorage();
    return document;
  }

  // Excluir documento
  public deleteDocument(documentId: string): boolean {
    if (!this.documents[documentId]) return false;
    
    delete this.documents[documentId];
    this.saveToStorage();
    return true;
  }
}

export const documentVersionService = DocumentVersionService.getInstance();
