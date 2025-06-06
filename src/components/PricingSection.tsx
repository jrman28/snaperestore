
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

interface PricingSectionProps {
  onSignUpClick: () => void;
}

const PricingSection = ({ onSignUpClick }: PricingSectionProps) => {
  const plans = [
    {
      name: "Starter Pack",
      credits: 10,
      price: "$9",
      description: "Perfect for trying our restoration magic",
      features: [
        "10 photo restorations",
        "High-quality output",
        "Fast processing",
        "Download in multiple formats"
      ],
      icon: Sparkles,
      popular: false
    },
    {
      name: "Family Pack",
      credits: 50,
      price: "$39",
      description: "Great for preserving family memories",
      features: [
        "50 photo restorations",
        "High-quality output",
        "Priority processing",
        "Download in multiple formats",
        "Batch upload support"
      ],
      icon: Zap,
      popular: true
    },
    {
      name: "Heritage Pack",
      credits: 150,
      price: "$99",
      description: "For serious photo restoration projects",
      features: [
        "150 photo restorations",
        "Highest quality output",
        "Lightning-fast processing",
        "Download in multiple formats",
        "Batch upload support",
        "Priority customer support"
      ],
      icon: Crown,
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-violet-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple Credit-Based Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pay only for what you use. No subscriptions, no monthly fees. 
            Buy credits and restore photos whenever you need to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-purple-500 shadow-xl scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${plan.popular ? 'bg-gradient-to-br from-purple-500 to-violet-500' : 'bg-gradient-to-br from-purple-400 to-violet-400'}`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/ {plan.credits} credits</span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check size={18} className="text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onSignUpClick}
                    className={`w-full py-3 font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    Get {plan.credits} Credits
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ✨ Credits never expire • Restore photos anytime • No hidden fees
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            💡 Need more credits? Contact us for custom packages
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
