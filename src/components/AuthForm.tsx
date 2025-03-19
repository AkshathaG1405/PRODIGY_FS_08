import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Mail, Lock, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SignUpInput, SignInInput, signUpSchema, signInSchema } from '../lib/auth';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const input = { email, password };
      
      if (mode === 'signup') {
        signUpSchema.parse(input);
        const { error } = await supabase.auth.signUp(input);
        if (error) throw error;
        navigate('/signin');
      } else {
        signInSchema.parse(input);
        const { error } = await supabase.auth.signInWithPassword(input);
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        background: `
          linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(6, 95, 70, 0.1) 100%),
          radial-gradient(circle at top left, rgba(20, 184, 166, 0.15) 0%, transparent 40%),
          radial-gradient(circle at bottom right, rgba(6, 95, 70, 0.15) 0%, transparent 40%),
          white
        `
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            {mode === 'signin' ? (
              <LogIn className="h-12 w-12 text-teal-600 transform transition-transform hover:scale-110 duration-300" />
            ) : (
              <UserPlus className="h-12 w-12 text-teal-600 transform transition-transform hover:scale-110 duration-300" />
            )}
            <div className="absolute -inset-2 bg-teal-100 rounded-full blur-lg opacity-50"></div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
          {mode === 'signin' ? 'Welcome back!' : 'Join us today'}
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          {mode === 'signin' ? (
            <>
              New to our platform?{' '}
              <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200">
                Create an account <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200">
                Sign in <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md flex items-center gap-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder={mode === 'signup' ? '8+ characters, 1 uppercase, 1 number' : '••••••••'}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-y-12 transition-transform duration-300"></div>
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <span className="flex items-center">
                    {mode === 'signin' ? 'Sign in' : 'Create account'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}