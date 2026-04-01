import { useState } from "react";
import {
  Eye,
  EyeOff,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLanguage } from "../contexts/LanguageContext";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
    onLoginSuccess();
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-100">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-4 shadow-inner">
                <GraduationCap className="w-12 h-12 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("academyName")}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{t("academySubtitle")}</p>
            <p className="text-sm text-gray-500">{t("academyDescription")}</p>
          </div>

          {/* Google Login */}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-right text-gray-700 font-medium mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary 
                transition-all text-right hover:border-gray-300"
                placeholder="admin@admin.com"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-right text-gray-700 font-medium mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary 
                  transition-all pr-12"
                  dir={language === "ar" ? "rtl" : "ltr"}
                  placeholder="********"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${language === "ar" ? "left" : "right"}-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + For  got */}
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                {t("forgotPassword")}
              </a>

              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <span className="text-sm text-gray-700">{t("rememberMe")}</span>

                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-200
                  ${
                    rememberMe
                      ? "bg-primary border-primary scale-105"
                      : "border-gray-300"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-white transition-all duration-200 ${
                      rememberMe ? "scale-100" : "scale-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold 
              hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2
              shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <span>{t("login")}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>
            <p className="text-center text-gray-500">{t("or")}</p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const idToken = credentialResponse.credential;
                    console.log("ID Token:", idToken);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  theme="outline"
                  size="large"
                  shape="circle"
                  width="384px"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">
                  {language === "ar" ? "أو" : "OR"}
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            </div>

            {/* Register */}
            <p className="text-center text-gray-500">
              {t("donthaveanaccount")}
            </p>

            <button
              onClick={handleCreateAccount}
              type="button"
              className="w-full bg-white border border-primary text-primary rounded-xl py-4 px-6 font-semibold 
              hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{t("createNewStudentAccount")}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          {t("footerText")}
        </div>
      </div>
    </div>
  );
}
