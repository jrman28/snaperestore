
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load language preference from localStorage or user profile
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        // First, check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Load from user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('preferred_language')
            .eq('id', user.id)
            .single();
          
          if (profile?.preferred_language) {
            setCurrentLanguage(profile.preferred_language);
          }
        } else {
          // Load from localStorage for anonymous users
          const savedLanguage = localStorage.getItem('preferred_language');
          if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
          }
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguagePreference();
  }, []);

  const changeLanguage = useCallback(async (languageCode: string) => {
    try {
      setCurrentLanguage(languageCode);
      
      // Save to localStorage
      localStorage.setItem('preferred_language', languageCode);
      
      // If user is authenticated, also save to profile
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ preferred_language: languageCode })
          .eq('id', user.id);
        
        if (error) {
          console.error('Error updating language preference:', error);
        }
      }

      // Track language change event
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_type: 'language_changed',
        event_data: { 
          from_language: currentLanguage,
          to_language: languageCode 
        },
        user_language: languageCode,
        session_id: Math.random().toString(36).substring(7)
      });

      toast({
        title: "Language changed",
        description: `Language set to ${getLanguageName(languageCode)}`,
      });
    } catch (error) {
      console.error('Error changing language:', error);
      toast({
        title: "Error",
        description: "Failed to change language preference.",
        variant: "destructive",
      });
    }
  }, [currentLanguage, toast]);

  const getLanguageName = (code: string): string => {
    const languageNames: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French', 
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese'
    };
    return languageNames[code] || code;
  };

  return {
    currentLanguage,
    changeLanguage,
    getLanguageName,
    isLoading
  };
}
