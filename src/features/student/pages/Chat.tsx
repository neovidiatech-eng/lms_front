import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, User as UserIcon, MoreVertical, Image as ImageIcon, Paperclip, Smile } from 'lucide-react';

export default function StudentChat() {
  const { i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const isRtl = language === 'ar';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'السلام عليكم يا أستاذ، لدي استفسار بخصوص الدرس السابق.', sender: 'student', time: '10:00 AM' },
    { id: 2, text: 'وعليكم السلام ورحمة الله وبركاته. تفضل يا بني، ما هو استفسارك؟', sender: 'teacher', time: '10:05 AM' },
    { id: 3, text: 'لم أفهم الجزء الخاص بالمعادلات التربيعية بشكل جيد.', sender: 'student', time: '10:07 AM' },
    { id: 4, text: 'لا تقلق، سنقوم بمراجعته في بداية الحصة القادمة إن شاء الله.', sender: 'teacher', time: '10:10 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: message,
        sender: 'student',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">أ. أحمد محمد</h2>
            <p className="text-xs text-gray-500">مدرس الرياضيات</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {messages.map((msg) => {
          const isStudent = msg.sender === 'student';
          return (
            <div key={msg.id} className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                isStudent 
                  ? 'bg-primary text-white rounded-tl-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tr-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`text-[10px] mt-1.5 ${isStudent ? 'text-primary-100' : 'text-gray-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors flex-shrink-0">
            <Smile className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors flex-shrink-0">
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isRtl ? "اكتب رسالتك هنا..." : "Type your message here..."}
            className="flex-1 min-w-0 bg-gray-50 border border-gray-100 text-gray-800 text-sm rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          
          <button 
            type="submit"
            disabled={!message.trim()}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-white"
            style={{ backgroundColor: '#29bae3' }}
          >
            <Send className={`w-5 h-5 bg-[#29bae3] text-white ${isRtl ? 'rotate-180 mb-0.5' : 'ml-1'}`} />
          </button>
        </form>
      </div>
    </div>
  );
}
