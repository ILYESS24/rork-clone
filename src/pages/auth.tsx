import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/components/auth/AuthModal';
import { ArrowLeft, Sparkles, Shield, Zap, Users } from 'lucide-react';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (user: any) => {
    login(user);
    navigate({ to: '/' });
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Builder',
      description: 'Create apps with artificial intelligence assistance'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your projects'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Build and deploy apps in minutes, not hours'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Work together with your team in real-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 relative">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Build Amazing Apps
                <span className="block text-yellow-300">with AI</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Join thousands of developers creating revolutionary applications with our AI-powered platform.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-purple-100">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold">Trusted by 10,000+ developers</p>
                  <p className="text-purple-100">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <button
                onClick={() => navigate({ to: '/' })}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to home
              </button>
              
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">🚀</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome back!' : 'Create your account'}
              </h2>
              <p className="text-gray-600">
                {mode === 'login' 
                  ? 'Sign in to continue building amazing apps' 
                  : 'Join thousands of developers creating the future'
                }
              </p>
            </div>

            {/* Auth Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {mode === 'login' ? (
                <LoginForm 
                  onSuccess={handleSuccess}
                  onSwitchToRegister={() => setMode('register')}
                />
              ) : (
                <RegisterForm 
                  onSuccess={handleSuccess}
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400">Microsoft</div>
                <div className="text-2xl font-bold text-gray-400">Google</div>
                <div className="text-2xl font-bold text-gray-400">Apple</div>
                <div className="text-2xl font-bold text-gray-400">Meta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
