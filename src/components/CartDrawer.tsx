import React from 'react';
import { CartItem, CurrencyCode, CurrencyInfo } from '../types';
import { X, Trash2, ShoppingBag, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { generateMasterBatchScript, downloadFile } from '../data/scriptsGenerator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentCurrency: CurrencyCode;
  currencyRates: Record<CurrencyCode, CurrencyInfo>;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentCurrency,
  currencyRates,
}) => {
  if (!isOpen) return null;

  const curr = currencyRates[currentCurrency] || currencyRates.USD;

  const totalUSD = items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const totalConverted = (totalUSD * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);

  const handleCheckoutDownload = () => {
    const bat = generateMasterBatchScript();
    downloadFile('QubitXD_Esports_Complete_Pack_Order.bat', bat);
    alert('Thank you for ordering! Your optimization bundle has been generated and downloaded. Join Discord for your VIP role!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md h-full bg-[#090514] border-l border-white/10 p-5 sm:p-6 flex flex-col justify-between shadow-2xl text-white animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-orbitron font-bold text-lg text-white">
                Arsenal Cart
              </h3>
              <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          {items.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-jakarta">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300 mb-1">Your cart is empty</p>
              <p className="text-xs text-slate-500">
                Add the Complete Pack or individual modules to access instant downloads.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {items.map((item) => {
                const itemPrice = (item.priceUSD * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                        {item.category}
                      </div>
                      <h4 className="font-space font-bold text-xs text-white truncate">
                        {item.title}
                      </h4>
                      <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">
                        {curr.symbol}{itemPrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-xs text-slate-400 hover:text-white font-mono px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-xs text-slate-400 hover:text-white font-mono px-1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Subtotal:</span>
              <span className="font-orbitron font-black text-2xl text-cyan-400 text-glow-cyan">
                {curr.symbol}{totalConverted}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Instant Digital Delivery &bull; Safe Sandbox Verified</span>
            </div>

            <button
              onClick={handleCheckoutDownload}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-black font-jakarta font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Checkout &amp; Download Bundle</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full py-2 text-center text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
