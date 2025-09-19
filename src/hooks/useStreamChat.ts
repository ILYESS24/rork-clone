import { useState, useCallback } from 'react';
import { IpcClient } from '../ipc/ipc_client';
import { showError, showSuccess } from '../utils/notifications';

interface StreamMessageParams {
  prompt: string;
  chatId?: number;
  attachments?: any[];
  redo?: boolean;
  selectedComponent?: any;
}

interface UseStreamChatOptions {
  hasChatId?: boolean;
}

export function useStreamChat(options: UseStreamChatOptions = {}) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamMessage = useCallback(async (params: StreamMessageParams) => {
    if (isStreaming) return;
    
    setIsStreaming(true);
    setError(null);

    try {
      if (options.hasChatId === false || !params.chatId) {
        // Create new app with initial prompt using the real Dyad system
        const result = await IpcClient.getInstance().createApp({
          name: `App ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          initialPrompt: params.prompt
        });
        
        showSuccess('Application créée avec succès ! Redirection vers l\'éditeur Dyad...');
        
        // Return the result so the component can handle navigation
        return result;
      } else {
        // Stream message to existing chat using the real Dyad system
        await IpcClient.getInstance().streamChatMessage({
          chatId: params.chatId,
          prompt: params.prompt,
          attachments: params.attachments || [],
          redo: params.redo || false,
          selectedComponent: params.selectedComponent
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Stream message error:', err);
      throw err; // Re-throw so the component can handle it
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming, options.hasChatId]);

  return {
    streamMessage,
    isStreaming,
    setIsStreaming,
    error,
    setError
  };
}
