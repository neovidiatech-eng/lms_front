import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { GoogleLogin } from "@react-oauth/google";

interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  sessions: number;
  description?: string;
}

interface RegisterProps {
  onRegisterSuccess: () => void;
}

export default function Register({ onRegisterSuccess }: RegisterProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    countryCode: "+20",
    birthDate: "",
    gender: "",
    country: "",
    password: "",
    selectedPackage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);

  const countries = [
    { id: "", label: "اختر الدولة", labelEn: "Select Country" },
    { id: "egypt", label: "مصر", labelEn: "Egypt" },
    { id: "saudi", label: "السعودية", labelEn: "Saudi Arabia" },
    { id: "uae", label: "الإمارات", labelEn: "UAE" },
    { id: "kuwait", label: "الكويت", labelEn: "Kuwait" },
  ];

  const genders = [
    { id: "", label: "اختر الجنس", labelEn: "Select Gender" },
    { id: "male", label: "ذكر", labelEn: "Male" },
    { id: "female", label: "أنثى", labelEn: "Female" },
  ];

  const countryCodes = [
    { code: "+20", country: "مصر", countryEn: "Egypt" },
    { code: "+966", country: "السعودية", countryEn: "Saudi Arabia" },
    { code: "+971", country: "الإمارات", countryEn: "UAE" },
    { code: "+965", country: "الكويت", countryEn: "Kuwait" },
  ];

  useEffect(() => {
    const mockPackages: Package[] = [
      {
        id: "1",
        name: language === "ar" ? "باقة الفضية" : "Silver Package",
        price: 100.0,
        currency: "SAR",
        sessions: 10,
      },
      {
        id: "2",
        name: language === "ar" ? "باقة الماس" : "Diamond Package",
        price: 125.0,
        currency: "SAR",
        sessions: 25,
        description: "test",
      },
      {
        id: "3",
        name: language === "ar" ? "باقة نوعية" : "Premium Package",
        price: 125.0,
        currency: "SAR",
        sessions: 30,
        description: language === "ar" ? "وصف الخطة" : "Plan description",
      },
      {
        id: "4",
        name: language === "ar" ? "عرض المصريين" : "Egyptians Offer",
        price: 170.0,
        currency: "EG",
        sessions: 8,
      },
      {
        id: "5",
        name: language === "ar" ? "باقة الدماسية" : "Damascus Package",
        price: 250.0,
        currency: "SAR",
        sessions: 20,
      },
    ];
    setPackages(mockPackages);
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    // TODO: Add actual registration logic here
    onRegisterSuccess();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate("/login")}
          className="mb-6 text-primary hover:text-primary-dark font-medium transition-colors flex items-center gap-2"
        >
          {language === "ar" ? (
            <>
              <ArrowRight className="w-5 h-5" />
              <span>{t("backToLogin")}</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-5 h-5" />
              <span>{t("backToLogin")}</span>
            </>
          )}
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("registerNewStudent")}
          </h1>
          <p className="text-gray-600">{t("joinAcademy")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const idToken = credentialResponse.credential;
                console.log("Google Register - ID Token:", idToken);
                onRegisterSuccess();
              }}
              onError={() => {
                console.log("Google Sign Up Failed");
              }}
              theme="outline"
              size="large"
              shape="rectangular"
              width="384"
              text="signup_with"
            />
          </div>

          <div className="text-center text-gray-400 text-sm my-4">
            {language === "ar"
              ? "أو سجل باستخدام البريد الإلكتروني"
              : "Or register with email"}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fullName")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder={
                    language === "ar" ? "أحمد محمد" : "Ahmed Mohamed"
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              </div>

              {/* Email */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("email")} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>

              {/* Phone and Country Code */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phoneNumber")} *
                </label>
                <div className="flex gap-2" dir="ltr">
                  <div className="relative w-32">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        handleInputChange("countryCode", e.target.value)
                      }
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      {countryCodes.map((cc) => (
                        <option key={cc.code} value={cc.code}>
                          {cc.code}+
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="500000000"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ar" ? "تاريخ الميلاد" : "Birth Date"}
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              </div>

              {/* Gender */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ar" ? "الجنس" : "Gender"}
                </label>
                <div className="relative">
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right appearance-none"
                  >
                    {genders.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {language === "ar" ? gender.label : gender.labelEn}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Country */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ar" ? "الدولة" : "Country"}
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right appearance-none"
                  >
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {language === "ar" ? country.label : country.labelEn}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="text-right md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")} *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right pr-12"
                    dir="ltr"
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
            </div>

            <div>
              <label className="block text-right text-gray-700 font-medium mb-3">
                {t("choosePackage")} *
              </label>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleInputChange("selectedPackage", pkg.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-right ${
                      formData.selectedPackage === pkg.id
                        ? "border-primary bg-white shadow-md"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className={`font-bold text-lg mb-1 ${
                            formData.selectedPackage === pkg.id
                              ? "text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          {pkg.name}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {pkg.sessions}{" "}
                          {language === "ar" ? "حصة" : "sessions"} •{" "}
                          {pkg.currency} {pkg.price.toFixed(2)}
                        </div>
                        {pkg.description && (
                          <div className="text-gray-500 text-xs mt-1">
                            {pkg.description}
                          </div>
                        )}
                      </div>
                      {formData.selectedPackage === pkg.id && (
                        <div className="mr-3">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.selectedPackage}
              className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>{t("registerNow")}</span>
            </button>

            <p className="text-center text-sm text-gray-500 leading-relaxed">
              {t("afterRegistration")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
