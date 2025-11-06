import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Building2, Users, Package } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const userTypes = [
    { value: 'industry', label: 'Industry', icon: Building2, description: 'Access your business dashboard' },
    { value: 'professional', label: 'Professional', icon: Users, description: 'Find opportunities and projects' },
    { value: 'vendor', label: 'Vendor', icon: Package, description: 'Manage quotations and services' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!userType) newErrors.userType = 'Please select your user type';

    // Email validation
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'userType') setUserType(value);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: 'Invalid credentials. Please try again.' });
    }
  };
//   bg-gradient-to-br from-[#1A2A4F] to-[#2F80ED]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-800 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">
              D
            </div>
            <span className="text-2xl font-bold">Deligence.ai</span>
          </Link>
        </div> */}

        {/* Login Form */}
        <div className="rounded-2xl shadow-xl p-8 bg-white/95 backdrop-blur-lg border border-white/20 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#333333] mb-2">Welcome Back</h2>
            <p className="text-[#828282]">Sign in to access your dashboard</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-3">
                User Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.value}
                      onClick={() => handleInputChange('userType', type.value)}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${ 
                        userType === type.value
                          ? 'border-[#2F80ED] bg-[#2F80ED]/5'
                          : 'border-[#E0E0E0] hover:border-[#2F80ED]/50'
                      }`}
                    >
                      <div className="text-center flex flex-row">
                        <Icon className={`w-6 h-6 mx-auto ${ 
                          userType === type.value ? 'text-[#2F80ED]' : 'text-[#828282]'
                        }`} />
                        <h3 className="font-medium text-[#333333] text-sm mt-1">{type.label}</h3>
                        {/* <p className="text-xs text-[#828282]">{type.description}</p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.userType && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm">{errors.userType}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${ 
                    errors.email ? 'border-red-500' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm">{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#333333] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${ 
                    errors.password ? 'border-red-500' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm">{errors.password}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-[#2F80ED] border-[#E0E0E0] rounded focus:ring-[#2F80ED]" />
                <span className="ml-2 text-sm text-[#828282]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#2F80ED] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F80ED] text-white py-3 rounded-lg hover:bg-[#1A2A4F] transition-colors font-medium disabled:bg-gray-400"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          {/* <div className="mt-8 p-4 bg-[#FAFAFA] rounded-lg">
            <p className="text-sm text-[#828282] mb-2 font-medium">Demo Credentials:</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-[#2F80ED] font-medium">Industry:</p>
                <p className="text-sm text-[#333333]">industry@deligence.ai / Industry@123</p>
              </div>
              <div>
                <p className="text-xs text-[#27AE60] font-medium">Professional:</p>
                <p className="text-sm text-[#333333]">professional@deligence.ai / Professional@123</p>
              </div>
              <div>
                <p className="text-xs text-[#F2994A] font-medium">Vendor:</p>
                <p className="text-sm text-[#333333]">vendor@deligence.ai / Vendor@123</p>
              </div>
            </div>
          </div> */}

          <div className="mt-6 text-center">
            <p className="text-sm text-[#828282]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#2F80ED] hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;