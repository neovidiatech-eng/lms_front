import { useState } from 'react';
import { Eye, EyeOff, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleLogin } from '@react-oauth/google';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
    // TODO: Add actual authentication logic here
    onLoginSuccess();
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 rounded-2xl p-4">
              <GraduationCap className="w-12 h-12 text-gray-800" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('academyName')}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {t('academySubtitle')}
          </p>
          <p className="text-sm text-gray-500">
            {t('academyDescription')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <button
            onClick={handleCreateAccount}
            className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold mb-4 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <span>{t('createNewStudentAccount')}</span>
            <ArrowIcon className="w-5 h-5" />
          </button>

          <div className="text-center text-gray-400 text-sm mb-6">
            {t('orLogin')}
          </div>

          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log('Google Sign In Success:', credentialResponse);
                // TODO: Send credentialResponse.credential (the ID token) to your backend
                onLoginSuccess();
              }}
              onError={() => {
                console.log('Google Sign In Failed');
              }}
              useOneTap
            />
          </div>

          <div className="text-center text-gray-400 text-sm my-4">
            {language === 'ar' ? 'أو باستخدام البريد الإلكتروني' : 'Or with email'}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-right text-gray-700 font-medium mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-right"
                placeholder="admin@admin.com"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-right text-gray-700 font-medium mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                {t('forgotPassword')}
              </a>

              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-700">
                  {t('rememberMe')}
                </span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('login')}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          {t('footerText')}
        </div>
      </div>
    </div>
  );
}
