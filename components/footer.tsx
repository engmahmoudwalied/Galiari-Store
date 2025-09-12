"use client"

import { Heart, Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* معلومات الشركة */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-400" />
              <h3 className="text-xl font-bold text-rose-400">جاليرى العربى</h3>
            </div>
            <p className="text-sm text-gray-300 text-pretty leading-relaxed">
              متخصصون في تصميم وتنسيق الأفراح والمناسبات الخاصة. نقدم أجمل تصاميم الكوشة والديكورات الفاخرة لجعل يومكم الخاص لا يُنسى.
            </p>
            
            {/* روابط التواصل الاجتماعي */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <a
                  href="https://www.facebook.com/jalyry.al.rby.2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="صفحة الفيسبوك"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="hidden sm:inline">فيسبوك</span>
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2 hover:bg-green-600 hover:text-white transition-colors"
              >
                <a
                  href="https://wa.me/201128734187"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">واتساب</span>
                </a>
              </Button>
            </div>
          </div>

          {/* خدماتنا */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">خدماتنا</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                كوشة العروس الفاخرة
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                تنسيق الحفلات والمناسبات
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                الهدايا والتذكارات المميزة
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                الإكسسوارات والقطع الفنية
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                الديكورات الزخرفية
              </li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">تواصل معنا</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <a 
                  href="tel:+201128734187" 
                  className="hover:text-rose-400 transition-colors"
                >
                  01128734187
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/201128734187" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  واتساب مباشر
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a 
                  href="https://www.facebook.com/jalyry.al.rby.2025" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  صفحة الفيسبوك
                </a>
              </div>
            </div>
          </div>

          {/* ساعات العمل */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ساعات العمل</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span> طول الأسبوع :</span>
                <span className="text-rose-400">24 ساعه</span>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400 text-center">
                  متاحون للاستشارات عبر الواتساب
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الخط الفاصل */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              © {currentYear} جاليرى العربى . جميع الحقوق .
            
          </div>
        </div>
      </div>
    </footer>
  )
}
