
import React from 'react';
import { Upload, Zap, Shield, Sparkles, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeatureCards = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload & Go",
      description: "Simply upload your photo—no technical skills needed. Our AI handles the rest.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Watch your memories transform in seconds with our lightning-fast AI processing.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your precious memories stay yours. We never store or share your photos.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Magic",
      description: "Advanced restoration algorithms bring faded photos back to life with stunning clarity.",
      color: "from-violet-500 to-violet-600"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "What used to take hours in photo editors now happens in seconds automatically.",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: Heart,
      title: "Preserve Memories",
      description: "Give your family photos the love they deserve with professional-quality restoration.",
      color: "from-rose-500 to-rose-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose SnapRestore?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of cutting-edge AI technology and user-friendly design. 
            Restore your precious memories with confidence and ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-soft-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-soft">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
