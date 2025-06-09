
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Translation {
  key: string;
  value: string;
  category?: string;
}

interface TranslationsMap {
  [key: string]: string;
}

export function useTranslations(languageCode: string = 'en') {
  const [translations, setTranslations] = useState<TranslationsMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTranslations = useCallback(async (langCode: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('translations')
        .select('key, value, category')
        .eq('language_code', langCode);

      if (error) {
        console.error('Error fetching translations:', error);
        toast({
          title: "Translation Error",
          description: "Failed to load translations. Using default language.",
          variant: "destructive",
        });
        return;
      }

      const translationsMap: TranslationsMap = {};
      data?.forEach((translation: Translation) => {
        translationsMap[translation.key] = translation.value;
      });

      setTranslations(translationsMap);
    } catch (error) {
      console.error('Error fetching translations:', error);
      toast({
        title: "Translation Error",
        description: "Failed to load translations. Using default language.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTranslations(languageCode);
  }, [languageCode, fetchTranslations]);

  const t = useCallback((key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  }, [translations]);

  return {
    t,
    translations,
    isLoading,
    refetch: () => fetchTranslations(languageCode)
  };
}
