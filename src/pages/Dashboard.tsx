import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, Settings, Search, Plus, ChevronDown, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-400 mr-4 cursor-pointer hover:text-gray-600 lg:hidden" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
                Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-72 pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50/50 transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 group">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white group-hover:animate-pulse"></span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-6 w-6" />
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900">{user?.email}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center ring-2 ring-white">
                  <User className="h-5 w-5 text-white" />
                </div>
                <button
                  onClick={handleSignOut}
                  className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects Overview</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200">
              <Plus className="h-4 w-4 mr-1.5" />
              New Project
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="group bg-white overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-100 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Project {i}</h3>
                      <p className="text-sm text-gray-500">Last updated 2 days ago</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500 ease-out group-hover:from-teal-600 group-hover:to-emerald-600" 
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700 font-medium">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center ring-2 ring-white"
                        >
                          <User className="h-4 w-4 text-white" />
                        </div>
                      ))}
                    </div>
                    <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200">
                      View details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}