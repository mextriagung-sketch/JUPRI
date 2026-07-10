import React, { useState } from 'react';
import { Copy, Check, Gift, CreditCard, Send, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const bankAccounts = [
    {
      id: 'bank-3',
      bankName: 'BANK BNI',
      accountNumber: '0310827369',
      accountHolder: 'JUPRIANTO',
      logo: 'BNI'
    },
    {
      id: 'bank-4',
      bankName: 'BANK SUMSEL BABEL',
      accountNumber: '17209014568',
      accountHolder: 'Dea Husnul Khotimah',
      logo: 'SumselBabel'
    }
  ];

  const shippingAddress = {
    recipient: 'Dea Husnul Khotimah, S.Pd',
    phone: '082281270125',
    fullAddress: 'Desa Galih Sari (P12) RT 22 RW 05, Kec. Lalan, Kab. Musi Banyuasin, Sumatera Selatan (Kode Pos: 30758)',
  };

  const handleCopy = (accNum: string, id: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedBank(id);
    setTimeout(() => {
      setCopiedBank(null);
    }, 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center px-4">
      <div className="py-8 px-6 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-md relative shadow-2xl overflow-hidden">
        {/* Sparkle top right */}
        <div className="absolute top-4 right-4 text-gold/30">
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="mb-6">
          <Gift className="w-6 h-6 text-gold mx-auto mb-2" />
          <h3 className="text-2xl font-serif text-amber-100 font-medium tracking-wide">Kado Digital</h3>
          <p className="text-rose-200/50 font-sans text-xs mt-1">Doa restu Anda adalah kado terindah bagi kami. Namun, apabila Anda ingin memberikan tanda kasih secara cashless, berikut detail rekening kami:</p>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-3" />
        </div>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            id="tampil-kado-btn"
            className="px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 font-sans text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
          >
            Tampilkan Rekening & Alamat Kirim
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6 overflow-hidden"
          >
            {/* Bank Transfer Cards */}
            <div className="space-y-4">
              {bankAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-5 rounded-2xl border border-gold/10 bg-maroon-950/20 backdrop-blur-sm relative text-left shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Bank Name */}
                      <span className="font-luxury text-xs text-rose-200 font-bold tracking-wider block mb-1">
                        {acc.bankName}
                      </span>
                      {/* Account Number */}
                      <span className="font-sans text-lg font-bold text-amber-200 tracking-wider block mb-1">
                        {acc.accountNumber}
                      </span>
                      {/* Account Holder */}
                      <span className="font-sans text-xs text-rose-100/60 font-light block">
                        A/N {acc.accountHolder}
                      </span>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(acc.accountNumber, acc.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                        copiedBank === acc.id
                          ? 'bg-emerald-950 border-emerald-500/30 text-emerald-400'
                          : 'bg-stone-950 border-gold/15 text-gold hover:bg-gold/10'
                      }`}
                      title="Salin No. Rekening"
                    >
                      {copiedBank === acc.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator line */}
            <div className="flex items-center gap-2 text-[10px] text-rose-200/40 uppercase tracking-widest font-sans">
              <div className="h-[1px] flex-1 bg-gold/10" />
              <span>ATAU KIRIM KADO FISIK</span>
              <div className="h-[1px] flex-1 bg-gold/10" />
            </div>

            {/* Shipping Address Card */}
            <div className="p-5 rounded-2xl border border-gold/10 bg-maroon-950/20 text-left relative shadow-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-sans text-xs font-semibold text-rose-100 block">
                    Alamat Pengiriman Kado
                  </span>
                  <span className="font-sans text-xs text-rose-200/80 font-medium block">
                    Penerima: {shippingAddress.recipient}
                  </span>
                  <span className="font-sans text-[11px] text-rose-200/60 leading-relaxed block">
                    {shippingAddress.fullAddress}
                  </span>
                  <span className="font-sans text-[10px] text-rose-200/50 block">
                    Telepon: {shippingAddress.phone}
                  </span>
                </div>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={() => handleCopy(shippingAddress.fullAddress, 'shipping')}
                className="absolute right-4 bottom-4 px-3 py-1.5 rounded-lg border border-gold/10 hover:border-gold/30 bg-stone-950 text-gold font-sans text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all duration-300"
              >
                {copiedBank === 'shipping' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>

            {/* Hide button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-rose-200/40 hover:text-rose-200 text-xs font-sans underline transition-colors"
            >
              Sembunyikan Rekening
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
