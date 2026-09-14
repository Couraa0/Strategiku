import { mockStore, MockKnowledgeDocument } from '../../database/mockStore.js';

export class KnowledgeService {
  static getDocuments(businessId: string) {
    return mockStore.knowledge_documents.filter((d) => d.business_id === businessId || d.business_id === 'UMKM001');
  }

  static addDocument(businessId: string, input: Omit<MockKnowledgeDocument, 'document_id' | 'business_id' | 'created_at'>) {
    const newDoc: MockKnowledgeDocument = {
      document_id: `KNOW-${Date.now()}`,
      business_id: businessId,
      created_at: new Date().toISOString(),
      ...input,
    };
    mockStore.knowledge_documents.unshift(newDoc);
    return newDoc;
  }

  static updateDocument(id: string, updateData: Partial<MockKnowledgeDocument>) {
    const doc = mockStore.knowledge_documents.find((d) => d.document_id === id);
    if (!doc) {
      throw new Error('Dokumen knowledge base tidak ditemukan');
    }
    Object.assign(doc, updateData);
    return doc;
  }

  static deleteDocument(id: string) {
    const index = mockStore.knowledge_documents.findIndex((d) => d.document_id === id);
    if (index === -1) {
      throw new Error('Dokumen knowledge base tidak ditemukan');
    }
    mockStore.knowledge_documents.splice(index, 1);
    return { success: true };
  }
}
